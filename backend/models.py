from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Gratitude Model
class GratitudeEntry(BaseModel):
    id: str
    date: str
    content: str
    template: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GratitudeCreate(BaseModel):
    content: str
    template: str

# Blessing Model
class BlessingEntry(BaseModel):
    id: str
    category: str
    person: str
    blessing: str
    date: str
    template: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BlessingCreate(BaseModel):
    category: str
    person: str
    blessing: str
    template: str

# Manifesting Model
class ManifestingEntry(BaseModel):
    id: str
    category: str
    desire: str
    date: str
    template: str
    manifested: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ManifestingCreate(BaseModel):
    category: str
    desire: str
    template: str

class ManifestingUpdate(BaseModel):
    manifested: bool

# Surrender Model
class SurrenderEntry(BaseModel):
    id: str
    situation: str
    date: str
    template: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SurrenderCreate(BaseModel):
    situation: str
    template: str

# Banishing Model
class BanishingEntry(BaseModel):
    id: str
    negative: str
    date: str
    template: str
    banished: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BanishingCreate(BaseModel):
    negative: str
    template: str

class BanishingUpdate(BaseModel):
    banished: bool

# Forgiveness Model
class ForgivenessEntry(BaseModel):
    id: str
    person: str
    situation: str
    feelings: str
    date: str
    template: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ForgivenessCreate(BaseModel):
    person: str
    situation: str
    feelings: str
    template: str

# Kindness Model
class KindnessEntry(BaseModel):
    id: str
    recipient: str
    action: str
    date: str
    template: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class KindnessCreate(BaseModel):
    recipient: str
    action: str
    template: str
