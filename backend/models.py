from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# Blog Post Models
class BlogPostCreate(BaseModel):
    title: str
    description: str
    picture: Optional[str] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    picture: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: str
    title: str
    description: str
    date: str
    picture: Optional[str] = None
    created_at: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Contact Form Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

# Admin Authentication Models
class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Database Models (for MongoDB documents)
class BlogPostDB(BaseModel):
    title: str
    description: str
    picture: Optional[str] = None
    date: str
    created_at: datetime

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}