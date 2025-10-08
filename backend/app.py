from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse  # Move this up
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from datetime import datetime, timedelta
import logging
from bson import ObjectId

# Import local modules
from config import config
from models import (
    BlogPostCreate, BlogPostUpdate, BlogPostResponse, 
    ContactForm, AdminLogin, Token, BlogPostDB
)
from auth import authenticate_admin, create_access_token, get_current_admin


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="BioLabMate API",
    description="Backend API for BioLabMate website",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for database
mongodb_client: AsyncIOMotorClient = None
database = None

@app.on_event("startup")
async def startup_db_client():
    """Initialize MongoDB connection"""
    global mongodb_client, database
    try:
        mongodb_client = AsyncIOMotorClient(config.MONGODB_URI)
        database = mongodb_client[config.DATABASE_NAME]
        logger.info("Connected to MongoDB Atlas")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection"""
    global mongodb_client
    if mongodb_client:
        mongodb_client.close()
        logger.info("Disconnected from MongoDB")

# Helper function to convert ObjectId to string - ADD SOCIAL MEDIA SUPPORT
def blog_helper(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "description": blog["description"],
        "date": blog["date"],
        "picture": blog.get("picture"),
        "twitter_link": blog.get("twitter_link"),      # ✅ ADD this
        "linkedin_link": blog.get("linkedin_link"),    # ✅ ADD this
        "created_at": blog["created_at"].isoformat()
    }

# ============================================================================
# AUTHENTICATION ROUTES
# ============================================================================

@app.post("/api/admin/login", response_model=Token)
async def admin_login(admin_data: AdminLogin):
    """Admin login endpoint"""
    if not authenticate_admin(admin_data.username, admin_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin_data.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# ============================================================================
# BLOG ROUTES
# ============================================================================

@app.get("/api/blogs", response_model=List[BlogPostResponse])
async def get_all_blogs():
    """Get all blog posts"""
    try:
        blogs = []
        async for blog in database.blogs.find().sort("created_at", -1):
            blogs.append(blog_helper(blog))
        return blogs
    except Exception as e:
        logger.error(f"Error fetching blogs: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch blogs")

@app.get("/api/blogs/{blog_id}", response_model=BlogPostResponse)
async def get_blog_by_id(blog_id: str):
    """Get a specific blog post by ID"""
    try:
        if not ObjectId.is_valid(blog_id):
            raise HTTPException(status_code=400, detail="Invalid blog ID")
        
        blog = await database.blogs.find_one({"_id": ObjectId(blog_id)})
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        return blog_helper(blog)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog {blog_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog")

@app.post("/api/admin/blogs", response_model=BlogPostResponse)
async def create_blog(blog_data: BlogPostCreate, admin: str = Depends(get_current_admin)):
    """Create a new blog post (Admin only)"""
    try:
        blog_dict = blog_data.dict()
        blog_dict["date"] = datetime.now().strftime("%Y-%m-%d")
        blog_dict["created_at"] = datetime.now()
        
        result = await database.blogs.insert_one(blog_dict)
        new_blog = await database.blogs.find_one({"_id": result.inserted_id})
        
        return blog_helper(new_blog)
    except Exception as e:
        logger.error(f"Error creating blog: {e}")
        raise HTTPException(status_code=500, detail="Failed to create blog")

@app.put("/api/admin/blogs/{blog_id}", response_model=BlogPostResponse)
async def update_blog(blog_id: str, blog_data: BlogPostUpdate, admin: str = Depends(get_current_admin)):
    """Update a blog post (Admin only)"""
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

@app.delete("/api/admin/blogs/{blog_id}")
async def delete_blog(blog_id: str, admin: str = Depends(get_current_admin)):
    """Delete a blog post (Admin only)"""
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

# ============================================================================
# CONTACT FORM ROUTES (NO EMAIL - DATABASE ONLY)
# ============================================================================

@app.post("/api/contact")
async def submit_contact_form(contact_data: ContactForm):
    """Submit contact form - save to database only"""
    try:
        logger.info(f"📧 Contact from: {contact_data.name} <{contact_data.email}>")
        logger.info(f"Message preview: {contact_data.message[:100]}...")
        
        # Save to MongoDB
        contact_dict = contact_data.dict()
        contact_dict["submitted_at"] = datetime.now()
        
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

# ============================================================================
# ADMIN REDIRECT ROUTES
# ============================================================================

@app.get("/admin")
async def admin_redirect():
    return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

@app.get("/blog/admin")  
async def blog_admin_redirect():
    return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

@app.get("/admin/login")
async def admin_login_page_redirect():
    return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# ============================================================================
# HEALTH CHECK
# ============================================================================

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "BioLabMate API is running", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host=config.API_HOST,
        port=config.API_PORT,
        reload=config.DEBUG
    )


























# from fastapi import FastAPI, HTTPException, Depends, status
# from fastapi.middleware.cors import CORSMiddleware
# # from fastapi.security import HTTPBearer
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
# # from email_service import send_contact_email

# # Configure logging
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

# # Helper function to convert ObjectId to string
# def blog_helper(blog) -> dict:
#     return {
#         "id": str(blog["_id"]),
#         "title": blog["title"],
#         "description": blog["description"],
#         "date": blog["date"],
#         "picture": blog.get("picture"),
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

# # # ============================================================================
# # # CONTACT FORM ROUTES
# # # ============================================================================

# # @app.post("/api/contact")
# # async def submit_contact_form(contact_data: ContactForm):
# #     """Submit contact form and send email"""
# #     try:
# #         # Send email to admin
# #         await send_contact_email(
# #             name=contact_data.name,
# #             email=contact_data.email,
# #             message=contact_data.message
# #         )
        
# #         # Optionally store in database for record keeping
# #         contact_dict = contact_data.dict()
# #         contact_dict["submitted_at"] = datetime.now()
# #         await database.contacts.insert_one(contact_dict)
        
# #         return {"message": "Contact form submitted successfully"}
# #     except Exception as e:
# #         logger.error(f"Error processing contact form: {e}")
# #         raise HTTPException(status_code=500, detail="Failed to submit contact form")

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



# from fastapi.responses import RedirectResponse

# @app.get("/admin")
# async def admin_redirect():
#     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# @app.get("/blog/admin")  
# async def blog_admin_redirect():
#     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)

# @app.get("/admin/login")
# async def admin_login_page_redirect():
#     return RedirectResponse(url="http://localhost:8080/blog/admin", status_code=302)



# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app:app",
#         host=config.API_HOST,
#         port=config.API_PORT,
#         reload=config.DEBUG
#     )

