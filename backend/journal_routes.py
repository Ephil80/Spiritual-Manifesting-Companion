from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from datetime import datetime
import uuid
from models import (
    GratitudeEntry, GratitudeCreate,
    BlessingEntry, BlessingCreate,
    ManifestingEntry, ManifestingCreate, ManifestingUpdate,
    SurrenderEntry, SurrenderCreate,
    BanishingEntry, BanishingCreate, BanishingUpdate,
    ForgivenessEntry, ForgivenessCreate,
    KindnessEntry, KindnessCreate
)

def create_journal_router(db: AsyncIOMotorDatabase) -> APIRouter:
    router = APIRouter(prefix="/journals", tags=["journals"])

    # ========== GRATITUDE ENDPOINTS ==========
    @router.post("/gratitude", response_model=GratitudeEntry)
    async def create_gratitude(entry: GratitudeCreate):
        new_entry = GratitudeEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            content=entry.content,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.gratitude.insert_one(new_entry.dict())
        return new_entry

    @router.get("/gratitude", response_model=List[GratitudeEntry])
    async def get_gratitude_entries():
        entries = await db.gratitude.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [GratitudeEntry(**entry) for entry in entries]

    @router.delete("/gratitude/{entry_id}")
    async def delete_gratitude(entry_id: str):
        result = await db.gratitude.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    # ========== BLESSING ENDPOINTS ==========
    @router.post("/blessings", response_model=BlessingEntry)
    async def create_blessing(entry: BlessingCreate):
        new_entry = BlessingEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            category=entry.category,
            person=entry.person,
            blessing=entry.blessing,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.blessings.insert_one(new_entry.dict())
        return new_entry

    @router.get("/blessings", response_model=List[BlessingEntry])
    async def get_blessing_entries():
        entries = await db.blessings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [BlessingEntry(**entry) for entry in entries]

    @router.delete("/blessings/{entry_id}")
    async def delete_blessing(entry_id: str):
        result = await db.blessings.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    # ========== MANIFESTING ENDPOINTS ==========
    @router.post("/manifesting", response_model=ManifestingEntry)
    async def create_manifesting(entry: ManifestingCreate):
        new_entry = ManifestingEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            category=entry.category,
            desire=entry.desire,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.manifesting.insert_one(new_entry.dict())
        return new_entry

    @router.get("/manifesting", response_model=List[ManifestingEntry])
    async def get_manifesting_entries():
        entries = await db.manifesting.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [ManifestingEntry(**entry) for entry in entries]

    @router.patch("/manifesting/{entry_id}", response_model=ManifestingEntry)
    async def update_manifesting(entry_id: str, update: ManifestingUpdate):
        result = await db.manifesting.find_one_and_update(
            {"id": entry_id},
            {"$set": {"manifested": update.manifested}},
            return_document=True
        )
        if not result:
            raise HTTPException(status_code=404, detail="Entry not found")
        result.pop("_id", None)
        return ManifestingEntry(**result)

    @router.delete("/manifesting/{entry_id}")
    async def delete_manifesting(entry_id: str):
        result = await db.manifesting.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    # ========== SURRENDER ENDPOINTS ==========
    @router.post("/surrender", response_model=SurrenderEntry)
    async def create_surrender(entry: SurrenderCreate):
        new_entry = SurrenderEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            situation=entry.situation,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.surrender.insert_one(new_entry.dict())
        return new_entry

    @router.get("/surrender", response_model=List[SurrenderEntry])
    async def get_surrender_entries():
        entries = await db.surrender.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [SurrenderEntry(**entry) for entry in entries]

    @router.delete("/surrender/{entry_id}")
    async def delete_surrender(entry_id: str):
        result = await db.surrender.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    # ========== BANISHING ENDPOINTS ==========
    @router.post("/banishing", response_model=BanishingEntry)
    async def create_banishing(entry: BanishingCreate):
        new_entry = BanishingEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            negative=entry.negative,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.banishing.insert_one(new_entry.dict())
        return new_entry

    @router.get("/banishing", response_model=List[BanishingEntry])
    async def get_banishing_entries():
        entries = await db.banishing.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [BanishingEntry(**entry) for entry in entries]

    @router.patch("/banishing/{entry_id}", response_model=BanishingEntry)
    async def update_banishing(entry_id: str, update: BanishingUpdate):
        result = await db.banishing.find_one_and_update(
            {"id": entry_id},
            {"$set": {"banished": update.banished}},
            return_document=True
        )
        if not result:
            raise HTTPException(status_code=404, detail="Entry not found")
        result.pop("_id", None)
        return BanishingEntry(**result)

    @router.delete("/banishing/{entry_id}")
    async def delete_banishing(entry_id: str):
        result = await db.banishing.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    # ========== FORGIVENESS ENDPOINTS ==========
    @router.post("/forgiveness", response_model=ForgivenessEntry)
    async def create_forgiveness(entry: ForgivenessCreate):
        new_entry = ForgivenessEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            person=entry.person,
            situation=entry.situation,
            feelings=entry.feelings,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.forgiveness.insert_one(new_entry.dict())
        return new_entry

    @router.get("/forgiveness", response_model=List[ForgivenessEntry])
    async def get_forgiveness_entries():
        entries = await db.forgiveness.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [ForgivenessEntry(**entry) for entry in entries]

    @router.delete("/forgiveness/{entry_id}")
    async def delete_forgiveness(entry_id: str):
        result = await db.forgiveness.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    # ========== KINDNESS ENDPOINTS ==========
    @router.post("/kindness", response_model=KindnessEntry)
    async def create_kindness(entry: KindnessCreate):
        new_entry = KindnessEntry(
            id=str(uuid.uuid4()),
            date=datetime.now().strftime("%Y-%m-%d"),
            recipient=entry.recipient,
            action=entry.action,
            template=entry.template,
            created_at=datetime.utcnow()
        )
        await db.kindness.insert_one(new_entry.dict())
        return new_entry

    @router.get("/kindness", response_model=List[KindnessEntry])
    async def get_kindness_entries():
        entries = await db.kindness.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return [KindnessEntry(**entry) for entry in entries]

    @router.delete("/kindness/{entry_id}")
    async def delete_kindness(entry_id: str):
        result = await db.kindness.delete_one({"id": entry_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entry not found")
        return {"message": "Entry deleted successfully"}

    return router
