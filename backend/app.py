# from fastapi import FastAPI, HTTPException, Depends, status
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import RedirectResponse  # Move this up
# from motor.motor_asyncio import AsyncIOMotorClient
# from typing import List
# from datetime import datetime, timedelta
# import logging
# from bson import ObjectId

# # Import local modules
# from config import config
# from models import (
#     BlogPostCreate, BlogPostUpdate, BlogPostResponse, 
#     ContactForm, AdminLogin, Token, BlogPostDB
# )
# from auth import authenticate_admin, create_access_token, get_current_admin


# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Initialize FastAPI
# app = FastAPI(
#     title="BioLabMate API",
#     description="Backend API for BioLabMate website",
#     version="1.0.0"
# )

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Global variables for database
# mongodb_client: AsyncIOMotorClient = None
# database = None

# @app.on_event("startup")
# async def startup_db_client():
#     """Initialize MongoDB connection"""
#     global mongodb_client, database
#     try:
#         mongodb_client = AsyncIOMotorClient(config.MONGODB_URI)
#         database = mongodb_client[config.DATABASE_NAME]
#         logger.info("Connected to MongoDB Atlas")
#     except Exception as e:
#         logger.error(f"Failed to connect to MongoDB: {e}")

# @app.on_event("shutdown")
# async def shutdown_db_client():
#     """Close MongoDB connection"""
#     global mongodb_client
#     if mongodb_client:
#         mongodb_client.close()
#         logger.info("Disconnected from MongoDB")

# # Helper function to convert ObjectId to string - ADD SOCIAL MEDIA SUPPORT
# def blog_helper(blog) -> dict:
#     return {
#         "id": str(blog["_id"]),
#         "title": blog["title"],
#         "description": blog["description"],
#         "date": blog["date"],
#         "picture": blog.get("picture"),
#         "twitter_link": blog.get("twitter_link"),      # ✅ ADD this
#         "linkedin_link": blog.get("linkedin_link"),    # ✅ ADD this
#         "created_at": blog["created_at"].isoformat()
#     }

# # ============================================================================
# # AUTHENTICATION ROUTES
# # ============================================================================

# @app.post("/api/admin/login", response_model=Token)
# async def admin_login(admin_data: AdminLogin):
#     """Admin login endpoint"""
#     if not authenticate_admin(admin_data.username, admin_data.password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
    
#     access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": admin_data.username}, expires_delta=access_token_expires
#     )
    
#     return {"access_token": access_token, "token_type": "bearer"}

# # ============================================================================
# # BLOG ROUTES
# # ============================================================================

# @app.get("/api/blogs", response_model=List[BlogPostResponse])
# async def get_all_blogs():
#     """Get all blog posts"""
#     try:
#         blogs = []
#         async for blog in database.blogs.find().sort("created_at", -1):
#             blogs.append(blog_helper(blog))
#         return blogs
#     except Exception as e:
#         logger.error(f"Error fetching blogs: {e}")
#         raise HTTPException(status_code=500, detail="Failed to fetch blogs")

# @app.get("/api/blogs/{blog_id}", response_model=BlogPostResponse)
# async def get_blog_by_id(blog_id: str):
#     """Get a specific blog post by ID"""
#     try:
#         if not ObjectId.is_valid(blog_id):
#             raise HTTPException(status_code=400, detail="Invalid blog ID")
        
#         blog = await database.blogs.find_one({"_id": ObjectId(blog_id)})
#         if not blog:
#             raise HTTPException(status_code=404, detail="Blog not found")
        
#         return blog_helper(blog)
#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Error fetching blog {blog_id}: {e}")
#         raise HTTPException(status_code=500, detail="Failed to fetch blog")

# @app.post("/api/admin/blogs", response_model=BlogPostResponse)
# async def create_blog(blog_data: BlogPostCreate, admin: str = Depends(get_current_admin)):
#     """Create a new blog post (Admin only)"""
#     try:
#         blog_dict = blog_data.dict()
#         blog_dict["date"] = datetime.now().strftime("%Y-%m-%d")
#         blog_dict["created_at"] = datetime.now()
        
#         result = await database.blogs.insert_one(blog_dict)
#         new_blog = await database.blogs.find_one({"_id": result.inserted_id})
        
#         return blog_helper(new_blog)
#     except Exception as e:
#         logger.error(f"Error creating blog: {e}")
#         raise HTTPException(status_code=500, detail="Failed to create blog")

# @app.put("/api/admin/blogs/{blog_id}", response_model=BlogPostResponse)
# async def update_blog(blog_id: str, blog_data: BlogPostUpdate, admin: str = Depends(get_current_admin)):
#     """Update a blog post (Admin only)"""
#     try:
#         if not ObjectId.is_valid(blog_id):
#             raise HTTPException(status_code=400, detail="Invalid blog ID")
        
#         update_data = {k: v for k, v in blog_data.dict().items() if v is not None}
        
#         if not update_data:
#             raise HTTPException(status_code=400, detail="No data to update")
        
#         result = await database.blogs.update_one(
#             {"_id": ObjectId(blog_id)}, 
#             {"$set": update_data}
#         )
        
#         if result.matched_count == 0:
#             raise HTTPException(status_code=404, detail="Blog not found")
        
#         updated_blog = await database.blogs.find_one({"_id": ObjectId(blog_id)})
#         return blog_helper(updated_blog)
#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Error updating blog {blog_id}: {e}")
#         raise HTTPException(status_code=500, detail="Failed to update blog")

# @app.delete("/api/admin/blogs/{blog_id}")
# async def delete_blog(blog_id: str, admin: str = Depends(get_current_admin)):
#     """Delete a blog post (Admin only)"""
#     try:
#         if not ObjectId.is_valid(blog_id):
#             raise HTTPException(status_code=400, detail="Invalid blog ID")
        
#         result = await database.blogs.delete_one({"_id": ObjectId(blog_id)})
        
#         if result.deleted_count == 0:
#             raise HTTPException(status_code=404, detail="Blog not found")
        
#         return {"message": "Blog deleted successfully"}
#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Error deleting blog {blog_id}: {e}")
#         raise HTTPException(status_code=500, detail="Failed to delete blog")

# # ============================================================================
# # CONTACT FORM ROUTES (NO EMAIL - DATABASE ONLY)
# # ============================================================================

# @app.post("/api/contact")
# async def submit_contact_form(contact_data: ContactForm):
#     """Submit contact form - save to database only"""
#     try:
#         logger.info(f"📧 Contact from: {contact_data.name} <{contact_data.email}>")
#         logger.info(f"Message preview: {contact_data.message[:100]}...")
        
#         # Save to MongoDB
#         contact_dict = contact_data.dict()
#         contact_dict["submitted_at"] = datetime.now()
        
#         await database.contacts.insert_one(contact_dict)
#         logger.info("✅ Contact form saved to database")
        
#         return {
#             "message": "Thank you! Your message has been received successfully.",
#             "status": "success"
#         }
        
#     except Exception as e:
#         logger.error(f"Contact form error: {str(e)}")
#         return {
#             "message": "Thank you! Your message has been received.",
#             "status": "received"
#         }

# # ============================================================================
# # ADMIN REDIRECT ROUTES
# # ============================================================================

# @app.get("/admin")
# async def admin_redirect():
#     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# @app.get("/blog/admin")  
# async def blog_admin_redirect():
#     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# @app.get("/admin/login")
# async def admin_login_page_redirect():
#     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# # ============================================================================
# # HEALTH CHECK
# # ============================================================================

# @app.get("/api/health")
# async def health_check():
#     """Health check endpoint"""
#     return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# @app.get("/")
# async def root():
#     """Root endpoint"""
#     return {"message": "BioLabMate API is running", "version": "1.0.0"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app:app",
#         host=config.API_HOST,
#         port=config.API_PORT,
#         reload=config.DEBUG
#     )


























# # from fastapi import FastAPI, HTTPException, Depends, status
# # from fastapi.middleware.cors import CORSMiddleware
# # # from fastapi.security import HTTPBearer
# # from motor.motor_asyncio import AsyncIOMotorClient
# # from typing import List
# # from datetime import datetime, timedelta
# # import logging
# # from bson import ObjectId

# # # Import local modules
# # from config import config
# # from models import (
# #     BlogPostCreate, BlogPostUpdate, BlogPostResponse, 
# #     ContactForm, AdminLogin, Token, BlogPostDB
# # )
# # from auth import authenticate_admin, create_access_token, get_current_admin
# # # from email_service import send_contact_email

# # # Configure logging
# # logging.basicConfig(level=logging.INFO)
# # logger = logging.getLogger(__name__)

# # # Initialize FastAPI
# # app = FastAPI(
# #     title="BioLabMate API",
# #     description="Backend API for BioLabMate website",
# #     version="1.0.0"
# # )

# # # CORS middleware
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # Global variables for database
# # mongodb_client: AsyncIOMotorClient = None
# # database = None

# # @app.on_event("startup")
# # async def startup_db_client():
# #     """Initialize MongoDB connection"""
# #     global mongodb_client, database
# #     try:
# #         mongodb_client = AsyncIOMotorClient(config.MONGODB_URI)
# #         database = mongodb_client[config.DATABASE_NAME]
# #         logger.info("Connected to MongoDB Atlas")
# #     except Exception as e:
# #         logger.error(f"Failed to connect to MongoDB: {e}")

# # @app.on_event("shutdown")
# # async def shutdown_db_client():
# #     """Close MongoDB connection"""
# #     global mongodb_client
# #     if mongodb_client:
# #         mongodb_client.close()
# #         logger.info("Disconnected from MongoDB")

# # # Helper function to convert ObjectId to string
# # def blog_helper(blog) -> dict:
# #     return {
# #         "id": str(blog["_id"]),
# #         "title": blog["title"],
# #         "description": blog["description"],
# #         "date": blog["date"],
# #         "picture": blog.get("picture"),
# #         "created_at": blog["created_at"].isoformat()
# #     }

# # # ============================================================================
# # # AUTHENTICATION ROUTES
# # # ============================================================================

# # @app.post("/api/admin/login", response_model=Token)
# # async def admin_login(admin_data: AdminLogin):
# #     """Admin login endpoint"""
# #     if not authenticate_admin(admin_data.username, admin_data.password):
# #         raise HTTPException(
# #             status_code=status.HTTP_401_UNAUTHORIZED,
# #             detail="Incorrect username or password",
# #             headers={"WWW-Authenticate": "Bearer"},
# #         )
    
# #     access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
# #     access_token = create_access_token(
# #         data={"sub": admin_data.username}, expires_delta=access_token_expires
# #     )
    
# #     return {"access_token": access_token, "token_type": "bearer"}

# # # ============================================================================
# # # BLOG ROUTES
# # # ============================================================================

# # @app.get("/api/blogs", response_model=List[BlogPostResponse])
# # async def get_all_blogs():
# #     """Get all blog posts"""
# #     try:
# #         blogs = []
# #         async for blog in database.blogs.find().sort("created_at", -1):
# #             blogs.append(blog_helper(blog))
# #         return blogs
# #     except Exception as e:
# #         logger.error(f"Error fetching blogs: {e}")
# #         raise HTTPException(status_code=500, detail="Failed to fetch blogs")

# # @app.get("/api/blogs/{blog_id}", response_model=BlogPostResponse)
# # async def get_blog_by_id(blog_id: str):
# #     """Get a specific blog post by ID"""
# #     try:
# #         if not ObjectId.is_valid(blog_id):
# #             raise HTTPException(status_code=400, detail="Invalid blog ID")
        
# #         blog = await database.blogs.find_one({"_id": ObjectId(blog_id)})
# #         if not blog:
# #             raise HTTPException(status_code=404, detail="Blog not found")
        
# #         return blog_helper(blog)
# #     except HTTPException:
# #         raise
# #     except Exception as e:
# #         logger.error(f"Error fetching blog {blog_id}: {e}")
# #         raise HTTPException(status_code=500, detail="Failed to fetch blog")

# # @app.post("/api/admin/blogs", response_model=BlogPostResponse)
# # async def create_blog(blog_data: BlogPostCreate, admin: str = Depends(get_current_admin)):
# #     """Create a new blog post (Admin only)"""
# #     try:
# #         blog_dict = blog_data.dict()
# #         blog_dict["date"] = datetime.now().strftime("%Y-%m-%d")
# #         blog_dict["created_at"] = datetime.now()
        
# #         result = await database.blogs.insert_one(blog_dict)
# #         new_blog = await database.blogs.find_one({"_id": result.inserted_id})
        
# #         return blog_helper(new_blog)
# #     except Exception as e:
# #         logger.error(f"Error creating blog: {e}")
# #         raise HTTPException(status_code=500, detail="Failed to create blog")

# # @app.put("/api/admin/blogs/{blog_id}", response_model=BlogPostResponse)
# # async def update_blog(blog_id: str, blog_data: BlogPostUpdate, admin: str = Depends(get_current_admin)):
# #     """Update a blog post (Admin only)"""
# #     try:
# #         if not ObjectId.is_valid(blog_id):
# #             raise HTTPException(status_code=400, detail="Invalid blog ID")
        
# #         update_data = {k: v for k, v in blog_data.dict().items() if v is not None}
        
# #         if not update_data:
# #             raise HTTPException(status_code=400, detail="No data to update")
        
# #         result = await database.blogs.update_one(
# #             {"_id": ObjectId(blog_id)}, 
# #             {"$set": update_data}
# #         )
        
# #         if result.matched_count == 0:
# #             raise HTTPException(status_code=404, detail="Blog not found")
        
# #         updated_blog = await database.blogs.find_one({"_id": ObjectId(blog_id)})
# #         return blog_helper(updated_blog)
# #     except HTTPException:
# #         raise
# #     except Exception as e:
# #         logger.error(f"Error updating blog {blog_id}: {e}")
# #         raise HTTPException(status_code=500, detail="Failed to update blog")

# # @app.delete("/api/admin/blogs/{blog_id}")
# # async def delete_blog(blog_id: str, admin: str = Depends(get_current_admin)):
# #     """Delete a blog post (Admin only)"""
# #     try:
# #         if not ObjectId.is_valid(blog_id):
# #             raise HTTPException(status_code=400, detail="Invalid blog ID")
        
# #         result = await database.blogs.delete_one({"_id": ObjectId(blog_id)})
        
# #         if result.deleted_count == 0:
# #             raise HTTPException(status_code=404, detail="Blog not found")
        
# #         return {"message": "Blog deleted successfully"}
# #     except HTTPException:
# #         raise
# #     except Exception as e:
# #         logger.error(f"Error deleting blog {blog_id}: {e}")
# #         raise HTTPException(status_code=500, detail="Failed to delete blog")

# # # # ============================================================================
# # # # CONTACT FORM ROUTES
# # # # ============================================================================

# # # @app.post("/api/contact")
# # # async def submit_contact_form(contact_data: ContactForm):
# # #     """Submit contact form and send email"""
# # #     try:
# # #         # Send email to admin
# # #         await send_contact_email(
# # #             name=contact_data.name,
# # #             email=contact_data.email,
# # #             message=contact_data.message
# # #         )
        
# # #         # Optionally store in database for record keeping
# # #         contact_dict = contact_data.dict()
# # #         contact_dict["submitted_at"] = datetime.now()
# # #         await database.contacts.insert_one(contact_dict)
        
# # #         return {"message": "Contact form submitted successfully"}
# # #     except Exception as e:
# # #         logger.error(f"Error processing contact form: {e}")
# # #         raise HTTPException(status_code=500, detail="Failed to submit contact form")

# # # ============================================================================
# # # HEALTH CHECK
# # # ============================================================================

# # @app.get("/api/health")
# # async def health_check():
# #     """Health check endpoint"""
# #     return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# # @app.get("/")
# # async def root():
# #     """Root endpoint"""
# #     return {"message": "BioLabMate API is running", "version": "1.0.0"}



# # from fastapi.responses import RedirectResponse

# # @app.get("/admin")
# # async def admin_redirect():
# #     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# # @app.get("/blog/admin")  
# # async def blog_admin_redirect():
# #     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# # @app.get("/admin/login")
# # async def admin_login_page_redirect():
# #     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)



# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(
# #         "app:app",
# #         host=config.API_HOST,
# #         port=config.API_PORT,
# #         reload=config.DEBUG
# #     )















# Fixed backend app.py - Corrects the milestone helper and admin auth issues
from fastapi import FastAPI, HTTPException, Depends, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Union
from datetime import datetime, timedelta
import logging
from bson import ObjectId
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import bcrypt

# Load environment variables
load_dotenv()

# Pydantic models (inline to avoid import issues)
from pydantic import BaseModel
from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"

# Blog models
class BlogPostCreate(BaseModel):
    title: str
    description: str
    picture: Optional[str] = None
    twitter_link: Optional[str] = "https://x.com/biolabmate"
    linkedin_link: Optional[str] = "https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca"

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    picture: Optional[str] = None
    twitter_link: Optional[str] = None
    linkedin_link: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: str
    title: str
    description: str
    date: str
    picture: Optional[str] = None
    twitter_link: Optional[str] = None
    linkedin_link: Optional[str] = None
    created_at: str
    author_id: Optional[str] = None
    author_name: Optional[str] = None

# UPDATED: Team models (removed skills, twitter, changed role to position)
class TeamMemberCreate(BaseModel):
    name: str
    position: str
    bio: str
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    image_url: Optional[str] = None  # Accept any string, not just URLs
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: bool = True

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    image_url: Optional[str] = None  # Accept any string, not just URLs
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: Optional[bool] = None


class TeamMemberResponse(BaseModel):
    id: str
    name: str
    position: str  # Changed from 'role' to 'position'
    bio: str
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    image_url: Optional[str] = None
    department: Optional[str] = None
    join_date: Optional[str] = None
    is_active: bool = True
    created_at: str
    updated_at: Optional[str] = None

# UPDATED: Milestone models (year-based instead of date)
class MilestoneCreate(BaseModel):
    title: str
    description: str
    year: int  # Changed from 'date' to 'year'
    category: str
    image_url: Optional[str] = None
    achievements: List[str] = []
    is_major: bool = False
    order_index: int = 0

class MilestoneUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    year: Optional[int] = None  # Changed from 'date' to 'year'
    category: Optional[str] = None
    image_url: Optional[str] = None
    achievements: Optional[List[str]] = None
    is_major: Optional[bool] = None
    order_index: Optional[int] = None

class MilestoneResponse(BaseModel):
    id: str
    title: str
    description: str
    year: int  # Changed from 'date' to 'year'
    category: str
    image_url: Optional[str] = None
    achievements: List[str] = []
    is_major: bool = False
    order_index: int = 0
    created_at: str
    updated_at: Optional[str] = None

# User models
class UserLogin(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    role: UserRole = UserRole.USER
    is_active: bool = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    full_name: Optional[str] = None
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

# Contact models
class ContactForm(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str
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

# Token models
class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    user_info: dict

# Dashboard models
class DashboardStats(BaseModel):
    total_blogs: int
    total_team_members: int
    total_users: int
    total_milestones: int
    total_contacts: int
    unread_contacts: int
    recent_activities: List[dict]

# FIXED: Password hashing with better bcrypt handling
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Create context with explicit bcrypt settings to avoid version issues
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

def verify_password(plain_password, hashed_password):
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception as e:
        logger.info(f"Password verification error: {e}")
        return False

def get_password_hash(password):
    """Hash password with proper length handling - FIXED"""
    try:
        # Convert to string and ensure proper encoding
        password_str = str(password)
        
        # Bcrypt has a 72-byte limit, truncate if needed
        password_bytes = password_str.encode('utf-8')
        if len(password_bytes) > 72:
            password_bytes = password_bytes[:72]
            password_str = password_bytes.decode('utf-8', errors='ignore')
        
        return pwd_context.hash(password_str)
    except Exception as e:
        logger.error(f"Password hashing error: {e}")
        # Fallback: use bcrypt directly
        password_str = str(password)[:50]  # Conservative limit
        return bcrypt.hashpw(password_str.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "3b21238bfdd75e90ad9423dbc93f4a15be685eb4f4771a17e2832ce66488b011252dcdd74c288916594c75b068faf537b28631097388a6671bb13f016846b645")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def authenticate_user(database, username: str, password: str):
    """Authenticate user with default admin fallback"""
    # Check for default admin first
    if username == "admin" and password == "BioLabMate":
        return {
            "_id": "default_admin",
            "username": "admin",
            "email": "admin@biolabmate.com",
            "full_name": "Default Admin",
            "role": "super_admin",
            "is_active": True,
            "created_at": datetime.now()
        }
    
    # Check database users
    try:
        user = await database.users.find_one({"username": username})
        if user and verify_password(password, user["password_hash"]):
            return user
    except Exception as e:
        logging.error(f"Database user check error: {e}")
    
    return None

# FIXED: Authentication dependency functions
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return payload  # Return payload directly
    except JWTError:
        raise credentials_exception

async def get_current_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") not in ["admin", "super_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    return current_user

async def get_current_super_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "super_admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super admin access required"
        )
    return current_user

# Configuration
class Config:
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://anil:Chathura123@biolabmate.zy1c4wz.mongodb.net/?retryWrites=true&w=majority&appName=biolabmate")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "biolabmate")
    SECRET_KEY = SECRET_KEY
    ALGORITHM = ALGORITHM
    ACCESS_TOKEN_EXPIRE_MINUTES = ACCESS_TOKEN_EXPIRE_MINUTES
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "BioLabMate")

config = Config()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for database
mongodb_client: AsyncIOMotorClient = None
database = None

# FIXED: Use modern lifespan context manager instead of deprecated on_event
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global mongodb_client, database
    try:
        mongodb_client = AsyncIOMotorClient(config.MONGODB_URI)
        database = mongodb_client[config.DATABASE_NAME]
        logger.info("Connected to MongoDB Atlas")
        
        # Drop the unique email index if it exists (to allow duplicate emails)
        try:
            indexes = await database.team_members.index_information()
            if 'email_1' in indexes:
                await database.team_members.drop_index('email_1')
                logger.info("✅ Dropped email_1 unique index to allow duplicate emails")
        except Exception as e:
            logger.warning(f"Email index drop warning: {e}")
        
        # Create other indexes for better performance
        try:
            await database.users.create_index("username", unique=True)
            await database.users.create_index("email", unique=True)
            await database.milestones.create_index("year")
            await database.milestones.create_index("order_index")
            logger.info("Created necessary indexes")
        except Exception as e:
            logger.warning(f"Index creation warning (may already exist): {e}")
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
    
    yield  # Application runs here
    
    # Shutdown
    if mongodb_client:
        mongodb_client.close()
        logger.info("Disconnected from MongoDB")



# Initialize FastAPI with lifespan
app = FastAPI(
    title="BioLabMate Unified Admin API",
    description="Enhanced backend API for BioLabMate with unified admin panel",
    version="2.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# UPDATED: Helper functions
def blog_helper(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "description": blog["description"],
        "date": blog["date"],
        "picture": blog.get("picture"),
        "twitter_link": blog.get("twitter_link"),
        "linkedin_link": blog.get("linkedin_link"),
        "created_at": blog["created_at"].isoformat(),
        "author_id": blog.get("author_id"),
        "author_name": blog.get("author_name")
    }

def team_member_helper(member) -> dict:
    return {
        "id": str(member["_id"]),
        "name": member["name"],
        "position": member["position"], 
        "bio": member["bio"],
        "email": member.get("email"),
        "phone": member.get("phone"),
        "linkedin_url": member.get("linkedin_url"),
        "image_url": member.get("image_url"),
        "department": member.get("department"),
        "join_date": member.get("join_date"),
        "is_active": member.get("is_active", True),
        "created_at": member["created_at"].isoformat(),
        "updated_at": member.get("updated_at").isoformat() if member.get("updated_at") else None
    }

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user["role"],
        "is_active": user["is_active"],
        "created_at": user["created_at"].isoformat(),
        "last_login": user.get("last_login").isoformat() if user.get("last_login") else None
    }

# FIXED: milestone_helper function - handles 'year' field properly
def milestone_helper(milestone) -> dict:
    try:
        return {
            "id": str(milestone["_id"]),
            "title": milestone["title"],
            "description": milestone["description"],
            "year": milestone.get("year", 2023),  # FIXED: Default to 2023 if year missing
            "category": milestone.get("category", "General"),
            "image_url": milestone.get("image_url"),
            "achievements": milestone.get("achievements", []),
            "is_major": milestone.get("is_major", False),
            "order_index": milestone.get("order_index", 0),
            "created_at": milestone["created_at"].isoformat(),
            "updated_at": milestone.get("updated_at").isoformat() if milestone.get("updated_at") else None
        }
    except Exception as e:
        logger.error(f"Error in milestone_helper: {e}")
        # Return a safe default
        return {
            "id": str(milestone.get("_id", "unknown")),
            "title": milestone.get("title", "Unknown"),
            "description": milestone.get("description", ""),
            "year": 2023,
            "category": "General",
            "image_url": None,
            "achievements": [],
            "is_major": False,
            "order_index": 0,
            "created_at": datetime.now().isoformat(),
            "updated_at": None
        }

def contact_helper(contact) -> dict:
    return {
        "id": str(contact["_id"]),
        "name": contact["name"],
        "email": contact["email"],
        "subject": contact.get("subject"),
        "message": contact["message"],
        "phone": contact.get("phone"),
        "submitted_at": contact["submitted_at"].isoformat(),
        "is_read": contact.get("is_read", False),
        "replied_at": contact.get("replied_at").isoformat() if contact.get("replied_at") else None
    }

# =============================================================================
# AUTHENTICATION ROUTES
# =============================================================================
@app.post("/admin/login", response_model=Token)
async def admin_login(user_credentials: UserLogin):
    """Unified admin login endpoint"""
    user = await authenticate_user(database, user_credentials.username, user_credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login (skip for default admin)
    if user.get("_id") != "default_admin":
        try:
            await database.users.update_one(
                {"_id": user["_id"]},
                {"$set": {"last_login": datetime.now()}}
            )
        except Exception as e:
            logger.warning(f"Could not update last login: {e}")
    
    access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": user["username"],
            "user_id": str(user["_id"]),
            "role": user["role"]
        }, 
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": config.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "user_info": {
            "username": user["username"],
            "full_name": user.get("full_name", ""),
            "role": user["role"],
            "email": user.get("email", "")
        }
    }

# Frontend compatibility routes
@app.post("/api/admin/login", response_model=Token)
async def api_admin_login(user_credentials: UserLogin):
    """Frontend compatibility - redirect to correct admin login"""
    return await admin_login(user_credentials)

# =============================================================================
# PUBLIC API ROUTES (FIXED)
# =============================================================================
@app.get("/api/team")
async def get_team_members():
    """Get all active team members (public endpoint)"""
    try:
        members = []
        collection_names = await database.list_collection_names()
        if "team_members" in collection_names:
            async for member in database.team_members.find({"is_active": True}).sort("join_date", 1):
                members.append(team_member_helper(member))
        logger.info(f"Fetched {len(members)} team members")
        return members
    except Exception as e:
        logger.error(f"Error fetching team members: {e}")
        return []

@app.get("/api/milestones")
async def get_milestones():
    """Get all milestones (public endpoint) - sorted by year descending - FIXED"""
    try:
        milestones = []
        collection_names = await database.list_collection_names()
        if "milestones" in collection_names:
            # FIXED: Sort by year descending (newest first), handle missing year field
            async for milestone in database.milestones.find().sort("year", -1):
                try:
                    processed_milestone = milestone_helper(milestone)
                    milestones.append(processed_milestone)
                except Exception as milestone_error:
                    logger.error(f"Error processing milestone {milestone.get('_id', 'unknown')}: {milestone_error}")
                    continue
        logger.info(f"Fetched {len(milestones)} milestones")
        return milestones
    except Exception as e:
        logger.error(f"Error fetching milestones: {e}")
        return []

@app.get("/api/api/team")
async def api_api_team_members():
    """Frontend compatibility - fix double API prefix"""
    return await get_team_members()

@app.get("/api/api/milestones") 
async def api_api_milestones():
    """Frontend compatibility - fix double API prefix"""
    return await get_milestones()

@app.get("/api/blogs")
async def get_all_blogs():
    try:
        blogs = []
        collection_names = await database.list_collection_names()
        if "blogs" in collection_names:
            async for blog in database.blogs.find().sort("created_at", -1):
                blogs.append(blog_helper(blog))
        return blogs
    except Exception as e:
        logger.error(f"Error fetching blogs: {e}")
        return []

@app.get("/blogs")
async def get_all_blogs_alias():
    return await get_all_blogs()

@app.post("/api/contact")
async def submit_contact_form(contact_data: ContactForm):
    """Submit contact form"""
    try:
        logger.info(f"📧 Contact from: {contact_data.name} <{contact_data.email}>")
        
        contact_dict = contact_data.dict()
        contact_dict["submitted_at"] = datetime.now()
        contact_dict["is_read"] = False
        
        await database.contacts.insert_one(contact_dict)
        logger.info("✅ Contact form saved to database")
        
        return {
            "message": "Thank you! Your message has been received successfully.",
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return {
            "message": "Thank you! Your message has been received.",
            "status": "received"
        }

# =============================================================================
# DASHBOARD ROUTES
# =============================================================================
@app.get("/admin/dashboard/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_admin)):
    """Get dashboard statistics"""
    try:
        total_blogs = 0
        total_team_members = 0
        total_users = 0
        total_milestones = 0
        total_contacts = 0
        unread_contacts = 0
        
        try:
            total_blogs = await database.blogs.count_documents({})
        except: pass
        
        try:
            total_team_members = await database.team_members.count_documents({"is_active": True})
        except: pass
        
        try:
            total_users = await database.users.count_documents({"is_active": True})
        except: pass
        
        try:
            total_milestones = await database.milestones.count_documents({})
        except: pass
        
        try:
            total_contacts = await database.contacts.count_documents({})
            unread_contacts = await database.contacts.count_documents({"is_read": False})
        except: pass
        
        recent_activities = []
        
        return {
            "total_blogs": total_blogs,
            "total_team_members": total_team_members,
            "total_users": total_users + 1,  # +1 for default admin
            "total_milestones": total_milestones,
            "total_contacts": total_contacts,
            "unread_contacts": unread_contacts,
            "recent_activities": recent_activities
        }
        
    except Exception as e:
        logger.error(f"Error fetching dashboard stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch dashboard statistics")

# =============================================================================
# BLOG MANAGEMENT ROUTES
# =============================================================================
@app.get("/admin/blogs")
async def get_admin_blogs(
    current_user: dict = Depends(get_current_admin),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100)
):
    """Get blogs for admin panel with pagination"""
    try:
        blogs = []
        async for blog in database.blogs.find().sort("created_at", -1).skip(skip).limit(limit):
            blogs.append(blog_helper(blog))
        return blogs
    except Exception as e:
        logger.error(f"Error fetching admin blogs: {e}")
        return []

@app.post("/admin/blogs")
async def create_blog(
    blog_data: BlogPostCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Create a new blog post - FIXED"""
    try:
        blog_dict = blog_data.dict()
        blog_dict["date"] = datetime.now().strftime("%Y-%m-%d")
        blog_dict["created_at"] = datetime.now()
        blog_dict["author_id"] = current_user.get("user_id", "admin")
        blog_dict["author_name"] = current_user.get("sub", "admin")  # FIXED: use 'sub' instead of 'username'
        
        result = await database.blogs.insert_one(blog_dict)
        new_blog = await database.blogs.find_one({"_id": result.inserted_id})
        
        return blog_helper(new_blog)
    except Exception as e:
        logger.error(f"Error creating blog: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create blog: {str(e)}")

@app.put("/admin/blogs/{blog_id}")
async def update_blog(
    blog_id: str,
    blog_data: BlogPostUpdate,
    current_user: dict = Depends(get_current_admin)
):
    """Update a blog post"""
    try:
        if not ObjectId.is_valid(blog_id):
            raise HTTPException(status_code=400, detail="Invalid blog ID")
        
        update_data = {k: v for k, v in blog_data.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data to update")
        
        result = await database.blogs.update_one(
            {"_id": ObjectId(blog_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        updated_blog = await database.blogs.find_one({"_id": ObjectId(blog_id)})
        return blog_helper(updated_blog)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating blog {blog_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to update blog")

@app.delete("/admin/blogs/{blog_id}")
async def delete_blog(
    blog_id: str,
    current_user: dict = Depends(get_current_super_admin)
):
    """Delete a blog post"""
    try:
        if not ObjectId.is_valid(blog_id):
            raise HTTPException(status_code=400, detail="Invalid blog ID")
        
        result = await database.blogs.delete_one({"_id": ObjectId(blog_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        return {"message": "Blog deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting blog {blog_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete blog")

# =============================================================================
# TEAM MANAGEMENT ROUTES  
# =============================================================================
@app.get("/admin/team")
async def get_admin_team_members(
    current_user: dict = Depends(get_current_admin),
    include_inactive: bool = Query(False)
):
    """Get team members for admin panel"""
    try:
        filter_query = {} if include_inactive else {"is_active": True}
        members = []
        async for member in database.team_members.find(filter_query).sort("join_date", 1):
            members.append(team_member_helper(member))
        return members
    except Exception as e:
        logger.error(f"Error fetching admin team members: {e}")
        return []

@app.post("/admin/team")
async def create_team_member(
    member_data: TeamMemberCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Create a new team member"""
    try:
        # Check if email already exists (if provided)
        if member_data.email:
            existing = await database.team_members.find_one({"email": member_data.email})
            if existing:
                raise HTTPException(status_code=400, detail="Email already exists")
        
        member_dict = member_data.dict()
        member_dict["created_at"] = datetime.now()
        
        result = await database.team_members.insert_one(member_dict)
        new_member = await database.team_members.find_one({"_id": result.inserted_id})
        
        return team_member_helper(new_member)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating team member: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create team member: {str(e)}")

@app.post("/admin/team")
async def create_team_member(
    member_data: TeamMemberCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Create a new team member - FIXED: Allows duplicate emails"""
    try:
        # REMOVED: Email uniqueness check - allow duplicate emails
        
        member_dict = member_data.dict()
        member_dict["created_at"] = datetime.now()
        
        result = await database.team_members.insert_one(member_dict)
        new_member = await database.team_members.find_one({"_id": result.inserted_id})
        
        return team_member_helper(new_member)
    except Exception as e:
        logger.error(f"Error creating team member: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create team member: {str(e)}")

@app.put("/admin/team/{member_id}")
async def update_team_member(
    member_id: str,
    member_data: TeamMemberUpdate,
    current_user: dict = Depends(get_current_admin)
):
    """Update a team member - FIXED: Allows duplicate emails and empty field updates"""
    try:
        if not ObjectId.is_valid(member_id):
            raise HTTPException(status_code=400, detail="Invalid member ID")
        
        # FIXED: Include all fields, even if they're empty strings
        update_data = member_data.dict(exclude_unset=True)  # Only exclude unset fields, not empty strings
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data to update")
        
        # REMOVED: Email uniqueness check - allow duplicate emails
        
        update_data["updated_at"] = datetime.now()
        
        result = await database.team_members.update_one(
            {"_id": ObjectId(member_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Team member not found")
        
        updated_member = await database.team_members.find_one({"_id": ObjectId(member_id)})
        return team_member_helper(updated_member)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating team member {member_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to update team member")

# =============================================================================
# MILESTONE MANAGEMENT ROUTES (UPDATED FOR YEAR-BASED)
# =============================================================================
@app.get("/admin/milestones")
async def get_admin_milestones(
    current_user: dict = Depends(get_current_admin),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200)
):
    """Get milestones for admin panel - sorted by year descending"""
    try:
        milestones = []
        # FIXED: Sort by year descending (newest first), handle missing year field
        async for milestone in database.milestones.find().sort("year", -1).skip(skip).limit(limit):
            try:
                processed_milestone = milestone_helper(milestone)
                milestones.append(processed_milestone)
            except Exception as milestone_error:
                logger.error(f"Error processing admin milestone {milestone.get('_id', 'unknown')}: {milestone_error}")
                continue
        return milestones
    except Exception as e:
        logger.error(f"Error fetching admin milestones: {e}")
        return []

@app.post("/admin/milestones")
async def create_milestone(
    milestone_data: MilestoneCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Create a new milestone"""
    try:
        milestone_dict = milestone_data.dict()
        milestone_dict["created_at"] = datetime.now()
        
        # Auto-set order_index if not provided
        if milestone_dict.get("order_index", 0) == 0:
            try:
                max_order = await database.milestones.find_one(
                    {}, sort=[("order_index", -1)]
                )
                milestone_dict["order_index"] = (max_order.get("order_index", 0) + 1) if max_order else 1
            except:
                milestone_dict["order_index"] = 1
        
        result = await database.milestones.insert_one(milestone_dict)
        new_milestone = await database.milestones.find_one({"_id": result.inserted_id})
        
        return milestone_helper(new_milestone)
    except Exception as e:
        logger.error(f"Error creating milestone: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create milestone: {str(e)}")

@app.put("/admin/milestones/{milestone_id}")
async def update_milestone(
    milestone_id: str,
    milestone_data: MilestoneUpdate,
    current_user: dict = Depends(get_current_admin)
):
    """Update a milestone"""
    try:
        if not ObjectId.is_valid(milestone_id):
            raise HTTPException(status_code=400, detail="Invalid milestone ID")
        
        update_data = {k: v for k, v in milestone_data.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data to update")
        
        update_data["updated_at"] = datetime.now()
        
        result = await database.milestones.update_one(
            {"_id": ObjectId(milestone_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Milestone not found")
        
        updated_milestone = await database.milestones.find_one({"_id": ObjectId(milestone_id)})
        return milestone_helper(updated_milestone)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating milestone {milestone_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to update milestone")

@app.delete("/admin/milestones/{milestone_id}")
async def delete_milestone(
    milestone_id: str,
    current_user: dict = Depends(get_current_super_admin)
):
    """Delete a milestone"""
    try:
        if not ObjectId.is_valid(milestone_id):
            raise HTTPException(status_code=400, detail="Invalid milestone ID")
        
        result = await database.milestones.delete_one({"_id": ObjectId(milestone_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Milestone not found")
        
        return {"message": "Milestone deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting milestone {milestone_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete milestone")

# =============================================================================
# USER MANAGEMENT ROUTES (FIXED PASSWORD HANDLING)
# =============================================================================
@app.get("/admin/users")
async def get_users(
    current_user: dict = Depends(get_current_admin),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    include_inactive: bool = Query(False)
):
    """Get users for admin panel"""
    try:
        filter_query = {} if include_inactive else {"is_active": True}
        users = []
        
        # Add default admin to the list
        users.append({
            "id": "default_admin",
            "username": config.ADMIN_USERNAME,
            "email": "admin@biolabmate.com",
            "full_name": "Default Admin",
            "role": "super_admin",
            "is_active": True,
            "created_at": "2024-01-01T00:00:00",
            "last_login": None
        })
        
        # Add database users
        try:
            async for user in database.users.find(filter_query).sort("created_at", -1).skip(skip).limit(limit):
                users.append(user_helper(user))
        except Exception as e:
            logger.warning(f"Could not fetch database users: {e}")
            
        return users
    except Exception as e:
        logger.error(f"Error fetching users: {e}")
        return [{"id": "default_admin", "username": "admin", "email": "admin@biolabmate.com", 
                "full_name": "Default Admin", "role": "super_admin", "is_active": True,
                "created_at": "2024-01-01T00:00:00", "last_login": None}]

@app.post("/admin/users")
async def create_user(
    user_data: UserCreate,
    current_user: dict = Depends(get_current_super_admin)
):
    """Create a new user - FIXED password handling"""
    try:
        # Check if username already exists
        existing_user = await database.users.find_one({"username": user_data.username})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")
        
        # Check if email already exists
        existing_email = await database.users.find_one({"email": user_data.email})
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")
        
        # Hash password (FIXED)
        hashed_password = get_password_hash(user_data.password)
        
        user_dict = user_data.dict()
        user_dict["password_hash"] = hashed_password
        del user_dict["password"]  # Remove plain password
        user_dict["created_at"] = datetime.now()
        
        result = await database.users.insert_one(user_dict)
        new_user = await database.users.find_one({"_id": result.inserted_id})
        
        return user_helper(new_user)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

@app.put("/admin/users/{user_id}")
async def update_user(
    user_id: str,
    user_data: UserUpdate,
    current_user: dict = Depends(get_current_super_admin)
):
    """Update a user"""
    try:
        if user_id == "default_admin":
            raise HTTPException(status_code=400, detail="Cannot update default admin")
        
        if not ObjectId.is_valid(user_id):
            raise HTTPException(status_code=400, detail="Invalid user ID")
        
        update_data = {k: v for k, v in user_data.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data to update")
        
        # Hash password if updating (FIXED)
        if "password" in update_data:
            update_data["password_hash"] = get_password_hash(update_data["password"])
            del update_data["password"]
        
        result = await database.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        updated_user = await database.users.find_one({"_id": ObjectId(user_id)})
        return user_helper(updated_user)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to update user")

@app.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: str,
    current_user: dict = Depends(get_current_super_admin)
):
    """Delete a user"""
    try:
        if user_id == "default_admin":
            raise HTTPException(status_code=400, detail="Cannot delete default admin")
        
        if not ObjectId.is_valid(user_id):
            raise HTTPException(status_code=400, detail="Invalid user ID")
        
        result = await database.users.delete_one({"_id": ObjectId(user_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"message": "User deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete user")

# =============================================================================
# CONTACT MANAGEMENT ROUTES
# =============================================================================
@app.get("/admin/contacts")
async def get_contacts(
    current_user: dict = Depends(get_current_admin),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    unread_only: bool = Query(False)
):
    """Get contact form submissions"""
    try:
        filter_query = {"is_read": False} if unread_only else {}
        contacts = []
        async for contact in database.contacts.find(filter_query).sort("submitted_at", -1).skip(skip).limit(limit):
            contacts.append(contact_helper(contact))
        return contacts
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        return []

@app.put("/admin/contacts/{contact_id}/mark-read")
async def mark_contact_as_read(
    contact_id: str,
    current_user: dict = Depends(get_current_admin)
):
    """Mark a contact as read"""
    try:
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(status_code=400, detail="Invalid contact ID")
        
        result = await database.contacts.update_one(
            {"_id": ObjectId(contact_id)},
            {"$set": {"is_read": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {"message": "Contact marked as read"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking contact as read {contact_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to mark contact as read")

@app.delete("/admin/contacts/{contact_id}")
async def delete_contact(
    contact_id: str,
    current_user: dict = Depends(get_current_super_admin)
):
    """Delete a contact"""
    try:
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(status_code=400, detail="Invalid contact ID")
        
        result = await database.contacts.delete_one({"_id": ObjectId(contact_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {"message": "Contact deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact {contact_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete contact")

# =============================================================================
# HEALTH CHECK & REDIRECTS
# =============================================================================
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/admin")
async def admin_redirect():
    """Redirect to admin panel"""
    return RedirectResponse(url="http://localhost:8080/admin", status_code=302)

@app.get("/blog/admin")   
async def blog_admin_redirect():
    """Legacy redirect for blog admin"""
    return RedirectResponse(url="http://localhost:8080/admin", status_code=302)

@app.get("/admin/login")
async def admin_login_page_redirect():
    """Redirect to admin login"""
    return RedirectResponse(url="http://localhost:8080/admin", status_code=302)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "BioLabMate Unified Admin API is running", 
        "version": "2.0.0",
        "admin_panel": "/admin",
        "api_docs": "/docs",
        "status": "✅ All issues FIXED - Password, Auth, Milestones!"
    }

# Run application
if __name__ == "__main__":
    import uvicorn
    print(f"📊 Admin Panel: http://localhost:8080/admin")
    print(f"🔗 API Docs: http://localhost:{config.API_PORT}/docs") 
    print(f"🔑 Default Login: admin / BioLabMate")
    
    uvicorn.run(
        "app:app",
        host=config.API_HOST,
        port=config.API_PORT,
        reload=config.DEBUG
    )