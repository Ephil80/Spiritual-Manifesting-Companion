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


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
