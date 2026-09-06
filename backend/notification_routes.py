from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

class NotificationPreferences(BaseModel):
    id: str
    user_email: Optional[EmailStr] = None
    daily_gratitude_reminder: bool = True
    daily_blessing_reminder: bool = True
    weekly_review_reminder: bool = True
    reminder_time: str = "09:00"  # HH:MM format
    timezone: str = "America/New_York"
    created_at: datetime
    updated_at: datetime

class NotificationPreferencesCreate(BaseModel):
    user_email: Optional[EmailStr] = None
    daily_gratitude_reminder: bool = True
    daily_blessing_reminder: bool = True
    weekly_review_reminder: bool = True
    reminder_time: str = "09:00"
    timezone: str = "America/New_York"

class NotificationPreferencesUpdate(BaseModel):
    user_email: Optional[EmailStr] = None
    daily_gratitude_reminder: Optional[bool] = None
    daily_blessing_reminder: Optional[bool] = None
    weekly_review_reminder: Optional[bool] = None
    reminder_time: Optional[str] = None
    timezone: Optional[str] = None

def create_notification_router(db: AsyncIOMotorDatabase) -> APIRouter:
    router = APIRouter(prefix="/notifications", tags=["notifications"])

    @router.post("/preferences", response_model=NotificationPreferences)
    async def create_preferences(prefs: NotificationPreferencesCreate):
        now = datetime.utcnow()
        new_prefs = NotificationPreferences(
            id=str(uuid.uuid4()),
            **prefs.dict(),
            created_at=now,
            updated_at=now
        )
        await db.notification_preferences.insert_one(new_prefs.dict())
        return new_prefs

    @router.get("/preferences/{pref_id}", response_model=NotificationPreferences)
    async def get_preferences(pref_id: str):
        prefs = await db.notification_preferences.find_one({"id": pref_id}, {"_id": 0})
        if not prefs:
            raise HTTPException(status_code=404, detail="Preferences not found")
        return NotificationPreferences(**prefs)

    @router.get("/preferences", response_model=List[NotificationPreferences])
    async def get_all_preferences():
        prefs_list = await db.notification_preferences.find({}, {"_id": 0}).to_list(100)
        return [NotificationPreferences(**p) for p in prefs_list]

    @router.patch("/preferences/{pref_id}", response_model=NotificationPreferences)
    async def update_preferences(pref_id: str, update: NotificationPreferencesUpdate):
        update_data = {k: v for k, v in update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.notification_preferences.find_one_and_update(
            {"id": pref_id},
            {"$set": update_data},
            return_document=True
        )
        if not result:
            raise HTTPException(status_code=404, detail="Preferences not found")
        result.pop("_id", None)
        return NotificationPreferences(**result)

    return router
