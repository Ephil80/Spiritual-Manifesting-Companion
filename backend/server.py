from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime, date
from ai_wisdom_service import ai_wisdom_service
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest
from fastapi import Request, HTTPException
import json
from journal_routes import create_journal_router
from notification_routes import create_notification_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe setup
stripe_api_key = os.environ.get('STRIPE_API_KEY')

# Donation packages (fixed amounts for security)
DONATION_PACKAGES = {
    "coffee": {"amount": 5.00, "name": "Coffee Blessing"},
    "lunch": {"amount": 15.00, "name": "Lunch Blessing"}, 
    "sacred": {"amount": 33.00, "name": "Sacred Number"},
    "abundance": {"amount": 108.00, "name": "Divine Abundance"}
}

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class DailyWisdomResponse(BaseModel):
    quote: str
    insight: str
    practice: str
    date: str

class SpiritualTeachingResponse(BaseModel):
    title: str
    principle: str
    teaching: str
    application: str
    reflection: str
    date: str

class DonationRequest(BaseModel):
    package_id: str = Field(..., description="Donation package ID")
    origin_url: str = Field(..., description="Frontend origin URL")

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    package_id: str
    amount: float
    currency: str = "usd"
    payment_status: str = "pending"
    status: str = "initiated"
    metadata: Dict[str, str] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.get("/daily-wisdom", response_model=DailyWisdomResponse)
async def get_daily_wisdom(target_date: Optional[str] = None):
    """Get AI-generated daily wisdom. If no date provided, uses today."""
    try:
        parsed_date = None
        if target_date:
            try:
                parsed_date = datetime.strptime(target_date, "%Y-%m-%d").date()
            except ValueError:
                parsed_date = None
        
        wisdom = await ai_wisdom_service.generate_daily_wisdom(parsed_date)
        wisdom["date"] = (parsed_date or date.today()).strftime("%Y-%m-%d")
        return DailyWisdomResponse(**wisdom)
    except Exception as e:
        logger.error(f"Error getting daily wisdom: {e}")
        # Return fallback wisdom
        return DailyWisdomResponse(
            quote="Divine Design creates beauty from any situation, even the challenges your ego creates.",
            insight="Your ego might create problems, but infinite wisdom has the power to transform any chaos into something beautiful for your growth.",
            practice="When facing any difficulty today, ask: 'How can Divine Design create beauty from this situation?'",
            date=(parsed_date or date.today()).strftime("%Y-%m-%d")
        )

@api_router.post("/donations/checkout")
async def create_donation_checkout(donation_request: DonationRequest, request: Request):
    """Create Stripe checkout session for donations"""
    try:
        # Validate package
        if donation_request.package_id not in DONATION_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid donation package")
        
        # Get package details
        package = DONATION_PACKAGES[donation_request.package_id]
        amount = package["amount"]
        
        # Initialize Stripe checkout
        host_url = donation_request.origin_url
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
        
        # Create success and cancel URLs
        success_url = f"{host_url}?donation_success=true&session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{host_url}?donation_cancelled=true"
        
        # Create checkout session request
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency="usd",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "type": "donation",
                "package_id": donation_request.package_id,
                "package_name": package["name"]
            }
        )
        
        # Create checkout session
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record
        transaction = PaymentTransaction(
            session_id=session.session_id,
            package_id=donation_request.package_id,
            amount=amount,
            currency="usd",
            payment_status="pending",
            status="initiated",
            metadata={
                "package_name": package["name"],
                "stripe_session_id": session.session_id
            }
        )
        
        # Save to database
        await db.payment_transactions.insert_one(transaction.dict())
        
        return {"checkout_url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        logger.error(f"Error creating donation checkout: {e}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")

@api_router.get("/donations/status/{session_id}")
async def get_donation_status(session_id: str):
    """Check donation payment status"""
    try:
        # Initialize Stripe checkout (webhook_url not needed for status check)
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
        
        # Get checkout status from Stripe
        status_response: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Find transaction in database
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        # Update transaction status if payment is complete and not already updated
        if status_response.payment_status == "paid" and transaction["payment_status"] != "paid":
            await db.payment_transactions.update_one(
                {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                {
                    "$set": {
                        "payment_status": "paid",
                        "status": "completed", 
                        "updated_at": datetime.utcnow()
                    }
                }
            )
        elif status_response.status == "expired":
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "payment_status": "expired",
                        "status": "expired",
                        "updated_at": datetime.utcnow()
                    }
                }
            )
        
        return {
            "session_id": session_id,
            "payment_status": status_response.payment_status,
            "status": status_response.status,
            "amount": status_response.amount_total / 100,  # Convert from cents
            "currency": status_response.currency
        }
        
    except Exception as e:
        logger.error(f"Error checking donation status: {e}")
        raise HTTPException(status_code=500, detail="Failed to check payment status")

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    try:
        body = await request.body()
        stripe_signature = request.headers.get("Stripe-Signature")
        
        if not stripe_signature:
            raise HTTPException(status_code=400, detail="Missing Stripe signature")
        
        # Initialize Stripe checkout for webhook handling
        stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, stripe_signature)
        
        # Update transaction based on webhook event
        if webhook_response.event_type == "checkout.session.completed":
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {
                    "$set": {
                        "payment_status": webhook_response.payment_status,
                        "status": "completed",
                        "updated_at": datetime.utcnow()
                    }
                }
            )
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")

@api_router.get("/spiritual-teaching", response_model=SpiritualTeachingResponse)
async def get_spiritual_teaching(target_date: Optional[str] = None):
    """Get AI-generated spiritual teaching. If no date provided, uses today."""
    try:
        parsed_date = None
        if target_date:
            try:
                parsed_date = datetime.strptime(target_date, "%Y-%m-%d").date()
            except ValueError:
                parsed_date = None
                
        teaching = await ai_wisdom_service.generate_spiritual_teaching(parsed_date)
        teaching["date"] = (parsed_date or date.today()).strftime("%Y-%m-%d")
        return SpiritualTeachingResponse(**teaching)
    except Exception as e:
        logger.error(f"Error getting spiritual teaching: {e}")
        # Return fallback teaching
        return SpiritualTeachingResponse(
            title="The Power of Divine Grace",
            principle="Grace flows from infinite love beyond human concepts of deserving",
            teaching="Grace is the ultimate expression of infinite goodness that transcends your ego's earning system. While your ego creates elaborate rules about worthiness, the source of all blessings operates beyond such limitations.",
            application="When you catch yourself saying 'I don't deserve this blessing,' consciously choose to receive with gratitude, recognizing grace as a gift from infinite love.",
            reflection="Grace doesn't require your perfection - it flows from infinite perfection.",
            date=(parsed_date or date.today()).strftime("%Y-%m-%d")
        )

# Include the router in the main app
app.include_router(api_router)

# Include journal routes
journal_router = create_journal_router(db)
app.include_router(journal_router, prefix="/api")

# Include notification routes
notification_router = create_notification_router(db)
app.include_router(notification_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
