# from pydantic import BaseModel, EmailStr
# from typing import Optional
# from datetime import datetime
# from bson import ObjectId

# class PyObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate

#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid objectid")
#         return ObjectId(v)

#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         field_schema.update(type="string")

# # Blog Post Models
# class BlogPostCreate(BaseModel):
#     title: str
#     description: str
#     picture: Optional[str] = None

# class BlogPostUpdate(BaseModel):
#     title: Optional[str] = None
#     description: Optional[str] = None
#     picture: Optional[str] = None

# class BlogPostResponse(BaseModel):
#     id: str
#     title: str
#     description: str
#     date: str
#     picture: Optional[str] = None
#     created_at: str

#     class Config:
#         populate_by_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}

# # Contact Form Models
# class ContactForm(BaseModel):
#     name: str
#     email: EmailStr
#     message: str

# # Admin Authentication Models
# class AdminLogin(BaseModel):
#     username: str
#     password: str

# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     username: Optional[str] = None

# # Database Models (for MongoDB documents)
# class BlogPostDB(BaseModel):
#     title: str
#     description: str
#     picture: Optional[str] = None
#     date: str
#     created_at: datetime

#     class Config:
#         populate_by_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}





# # Enhanced Models for Unified Admin Panel
# from pydantic import BaseModel, EmailStr, Field
# from typing import Optional, List, Literal
# from datetime import datetime
# from bson import ObjectId
# from enum import Enum

# class PyObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate
    
#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid objectid")
#         return ObjectId(v)
    
#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         field_schema.update(type="string")

# # User Roles Enum
# class UserRole(str, Enum):
#     ADMIN = "admin"
#     USER = "user"
#     SUPER_ADMIN = "super_admin"

# # =============================================================================
# # BLOG MODELS (Existing + Enhanced)
# # =============================================================================
# class BlogPostCreate(BaseModel):
#     title: str = Field(..., min_length=1, max_length=200)
#     description: str = Field(..., min_length=1)
#     picture: Optional[str] = None
#     twitter_link: Optional[str] = None
#     linkedin_link: Optional[str] = None

# class BlogPostUpdate(BaseModel):
#     title: Optional[str] = Field(None, min_length=1, max_length=200)
#     description: Optional[str] = Field(None, min_length=1)
#     picture: Optional[str] = None
#     twitter_link: Optional[str] = None
#     linkedin_link: Optional[str] = None

# class BlogPostResponse(BaseModel):
#     id: str
#     title: str
#     description: str
#     date: str
#     picture: Optional[str] = None
#     twitter_link: Optional[str] = None
#     linkedin_link: Optional[str] = None
#     created_at: str
#     author_id: Optional[str] = None
#     author_name: Optional[str] = None

# # =============================================================================
# # TEAM MEMBER MODELS
# # =============================================================================
# class TeamMemberCreate(BaseModel):
#     name: str = Field(..., min_length=1, max_length=100)
#     position: str = Field(..., min_length=1, max_length=100)
#     bio: str = Field(..., min_length=1)
#     email: Optional[EmailStr] = None
#     phone: Optional[str] = None
#     linkedin_url: Optional[str] = None
#     twitter_url: Optional[str] = None
#     image_url: Optional[str] = None
#     skills: Optional[List[str]] = []
#     department: Optional[str] = None
#     join_date: Optional[str] = None
#     is_active: bool = True

# class TeamMemberUpdate(BaseModel):
#     name: Optional[str] = Field(None, min_length=1, max_length=100)
#     position: Optional[str] = Field(None, min_length=1, max_length=100)
#     bio: Optional[str] = Field(None, min_length=1)
#     email: Optional[EmailStr] = None
#     phone: Optional[str] = None
#     linkedin_url: Optional[str] = None
#     twitter_url: Optional[str] = None
#     image_url: Optional[str] = None
#     skills: Optional[List[str]] = None
#     department: Optional[str] = None
#     join_date: Optional[str] = None
#     is_active: Optional[bool] = None

# class TeamMemberResponse(BaseModel):
#     id: str
#     name: str
#     position: str
#     bio: str
#     email: Optional[str] = None
#     phone: Optional[str] = None
#     linkedin_url: Optional[str] = None
#     twitter_url: Optional[str] = None
#     image_url: Optional[str] = None
#     skills: List[str] = []
#     department: Optional[str] = None
#     join_date: Optional[str] = None
#     is_active: bool = True
#     created_at: str
#     updated_at: Optional[str] = None

# # =============================================================================
# # USER MANAGEMENT MODELS
# # =============================================================================
# class UserCreate(BaseModel):
#     username: str = Field(..., min_length=3, max_length=50)
#     email: EmailStr
#     password: str = Field(..., min_length=6)
#     full_name: str = Field(..., min_length=1, max_length=100)
#     role: UserRole = UserRole.USER
#     is_active: bool = True

# class UserUpdate(BaseModel):
#     username: Optional[str] = Field(None, min_length=3, max_length=50)
#     email: Optional[EmailStr] = None
#     password: Optional[str] = Field(None, min_length=6)
#     full_name: Optional[str] = Field(None, min_length=1, max_length=100)
#     role: Optional[UserRole] = None
#     is_active: Optional[bool] = None

# class UserResponse(BaseModel):
#     id: str
#     username: str
#     email: str
#     full_name: str
#     role: UserRole
#     is_active: bool
#     created_at: str
#     last_login: Optional[str] = None

# class UserLogin(BaseModel):
#     username: str
#     password: str

# # =============================================================================
# # JOURNEY MILESTONE MODELS
# # =============================================================================
# class MilestoneCreate(BaseModel):
#     title: str = Field(..., min_length=1, max_length=200)
#     description: str = Field(..., min_length=1)
#     date: str = Field(..., description="Date in YYYY-MM-DD format")
#     category: str = Field(..., min_length=1, max_length=50)
#     image_url: Optional[str] = None
#     achievements: Optional[List[str]] = []
#     is_major: bool = False
#     order_index: Optional[int] = 0

# class MilestoneUpdate(BaseModel):
#     title: Optional[str] = Field(None, min_length=1, max_length=200)
#     description: Optional[str] = Field(None, min_length=1)
#     date: Optional[str] = Field(None, description="Date in YYYY-MM-DD format")
#     category: Optional[str] = Field(None, min_length=1, max_length=50)
#     image_url: Optional[str] = None
#     achievements: Optional[List[str]] = None
#     is_major: Optional[bool] = None
#     order_index: Optional[int] = None

# class MilestoneResponse(BaseModel):
#     id: str
#     title: str
#     description: str
#     date: str
#     category: str
#     image_url: Optional[str] = None
#     achievements: List[str] = []
#     is_major: bool = False
#     order_index: int = 0
#     created_at: str
#     updated_at: Optional[str] = None

# # =============================================================================
# # CONTACT FORM MODELS (Enhanced)
# # =============================================================================
# class ContactForm(BaseModel):
#     name: str = Field(..., min_length=1, max_length=100)
#     email: EmailStr
#     subject: Optional[str] = Field(None, max_length=200)
#     message: str = Field(..., min_length=1)
#     phone: Optional[str] = None

# class ContactResponse(BaseModel):
#     id: str
#     name: str
#     email: str
#     subject: Optional[str] = None
#     message: str
#     phone: Optional[str] = None
#     submitted_at: str
#     is_read: bool = False
#     replied_at: Optional[str] = None

# # =============================================================================
# # ADMIN AUTHENTICATION MODELS (Enhanced)
# # =============================================================================
# class AdminLogin(BaseModel):
#     username: str
#     password: str

# class Token(BaseModel):
#     access_token: str
#     token_type: str
#     expires_in: int
#     user_info: dict

# class TokenData(BaseModel):
#     username: Optional[str] = None
#     user_id: Optional[str] = None
#     role: Optional[UserRole] = None

# # =============================================================================
# # DASHBOARD STATS MODELS
# # =============================================================================
# class DashboardStats(BaseModel):
#     total_blogs: int
#     total_team_members: int
#     total_users: int
#     total_milestones: int
#     total_contacts: int
#     unread_contacts: int
#     recent_activities: List[dict] = []

# # =============================================================================
# # DATABASE MODELS (for MongoDB documents)
# # =============================================================================
# class BlogPostDB(BaseModel):
#     title: str
#     description: str
#     picture: Optional[str] = None
#     twitter_link: Optional[str] = None
#     linkedin_link: Optional[str] = None
#     date: str
#     created_at: datetime
#     author_id: Optional[str] = None
#     author_name: Optional[str] = None

# class TeamMemberDB(BaseModel):
#     name: str
#     position: str
#     bio: str
#     email: Optional[str] = None
#     phone: Optional[str] = None
#     linkedin_url: Optional[str] = None
#     twitter_url: Optional[str] = None
#     image_url: Optional[str] = None
#     skills: List[str] = []
#     department: Optional[str] = None
#     join_date: Optional[str] = None
#     is_active: bool = True
#     created_at: datetime
#     updated_at: Optional[datetime] = None

# class UserDB(BaseModel):
#     username: str
#     email: str
#     password_hash: str
#     full_name: str
#     role: UserRole
#     is_active: bool = True
#     created_at: datetime
#     last_login: Optional[datetime] = None

# class MilestoneDB(BaseModel):
#     title: str
#     description: str
#     date: str
#     category: str
#     image_url: Optional[str] = None
#     achievements: List[str] = []
#     is_major: bool = False
#     order_index: int = 0
#     created_at: datetime
#     updated_at: Optional[datetime] = None

# class ContactDB(BaseModel):
#     name: str
#     email: str
#     subject: Optional[str] = None
#     message: str
#     phone: Optional[str] = None
#     submitted_at: datetime
#     is_read: bool = False
#     replied_at: Optional[datetime] = None

#     class Config:
#         populate_by_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}










# Updated models.py - Add category field to blog models
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Literal
from datetime import datetime
from bson import ObjectId
from enum import Enum

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

# User Roles Enum
class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    SUPER_ADMIN = "super_admin"

# ==============================================================================
# BLOG MODELS - FIXED WITH CATEGORY FIELD
# ==============================================================================

class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    category: str = Field(default="Pollution", min_length=1, max_length=50)  #   ADDED
    picture: Optional[str] = None
    twitter_link: Optional[str] = None
    linkedin_link: Optional[str] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1)
    category: Optional[str] = Field(None, min_length=1, max_length=50)  #   ADDED
    picture: Optional[str] = None
    twitter_link: Optional[str] = None
    linkedin_link: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str  #   ADDED
    date: str
    picture: Optional[str] = None
    twitter_link: Optional[str] = None
    linkedin_link: Optional[str] = None
    created_at: str
    author_id: Optional[str] = None
    author_name: Optional[str] = None

# ==============================================================================
# TEAM MEMBER MODELS
# ==============================================================================

class TeamMemberCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    position: str = Field(..., min_length=1, max_length=100)
    bio: str = Field(..., min_length=1)
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    image_url: Optional[str] = None
    skills: Optional[List[str]] = []
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: bool = True

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    position: Optional[str] = Field(None, min_length=1, max_length=100)
    bio: Optional[str] = Field(None, min_length=1)
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    image_url: Optional[str] = None
    skills: Optional[List[str]] = None
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: Optional[bool] = None

class TeamMemberResponse(BaseModel):
    id: str
    name: str
    position: str
    bio: str
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    image_url: Optional[str] = None
    skills: List[str] = []
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: bool = True
    created_at: str
    updated_at: Optional[str] = None

# ==============================================================================
# USER MANAGEMENT MODELS
# ==============================================================================

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=1, max_length=100)
    role: UserRole = UserRole.USER
    is_active: bool = True

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=6)
    full_name: Optional[str] = Field(None, min_length=1, max_length=100)
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    full_name: str
    role: UserRole
    is_active: bool
    created_at: str
    last_login: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

# ==============================================================================
# JOURNEY MILESTONE MODELS
# ==============================================================================

class MilestoneCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    category: str = Field(..., min_length=1, max_length=50)
    image_url: Optional[str] = None
    achievements: Optional[List[str]] = []
    is_major: bool = False
    order_index: Optional[int] = 0

class MilestoneUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1)
    date: Optional[str] = Field(None, description="Date in YYYY-MM-DD format")
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    image_url: Optional[str] = None
    achievements: Optional[List[str]] = None
    is_major: Optional[bool] = None
    order_index: Optional[int] = None

class MilestoneResponse(BaseModel):
    id: str
    title: str
    description: str
    date: str
    category: str
    image_url: Optional[str] = None
    achievements: List[str] = []
    is_major: bool = False
    order_index: int = 0
    created_at: str
    updated_at: Optional[str] = None

# ==============================================================================
# CONTACT FORM MODELS
# ==============================================================================

class ContactForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=1)
    phone: Optional[str] = None

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    phone: Optional[str] = None
    submitted_at: str
    is_read: bool = False
    replied_at: Optional[str] = None

# ==============================================================================
# ADMIN AUTHENTICATION MODELS
# ==============================================================================

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    user_info: dict

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[str] = None
    role: Optional[UserRole] = None

# ==============================================================================
# DASHBOARD STATS MODELS
# ==============================================================================

class DashboardStats(BaseModel):
    total_blogs: int
    total_team_members: int
    total_users: int
    total_milestones: int
    total_contacts: int
    unread_contacts: int
    recent_activities: List[dict] = []

# ==============================================================================
# DATABASE MODELS (for MongoDB documents)
# ==============================================================================

class BlogPostDB(BaseModel):
    title: str
    description: str
    category: str = "Pollution"  #   ADDED
    picture: Optional[str] = None
    twitter_link: Optional[str] = None
    linkedin_link: Optional[str] = None
    date: str
    created_at: datetime
    author_id: Optional[str] = None
    author_name: Optional[str] = None

class TeamMemberDB(BaseModel):
    name: str
    position: str
    bio: str
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    image_url: Optional[str] = None
    skills: List[str] = []
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: bool = True
    created_at: datetime
    updated_at: Optional[datetime] = None

class UserDB(BaseModel):
    username: str
    email: str
    password_hash: str
    full_name: str
    role: UserRole
    is_active: bool = True
    created_at: datetime
    last_login: Optional[datetime] = None

class MilestoneDB(BaseModel):
    title: str
    description: str
    date: str
    category: str
    image_url: Optional[str] = None
    achievements: List[str] = []
    is_major: bool = False
    order_index: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None

class ContactDB(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    phone: Optional[str] = None
    submitted_at: datetime
    is_read: bool = False
    replied_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
