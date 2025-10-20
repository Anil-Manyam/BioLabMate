# import asyncio
# from motor.motor_asyncio import AsyncIOMotorClient
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# async def add_social_links_to_blogs():
#     """Add Twitter and LinkedIn links to all existing blogs"""
    
#     # Connect to MongoDB
#     client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
#     database = client[os.getenv("DATABASE_NAME", "biolabmate")]
    
#     try:
#         print("🔄 Connecting to MongoDB Atlas...")
#         await client.admin.command('ping')
#         print("  Connected to MongoDB Atlas!")
        
#         # Update all existing blogs to add social media links
#         result = await database.blogs.update_many(
#             {},  # Update all blogs
#             {"$set": {
#                 "twitter_link": "https://x.com/biolabmate",
#                 "linkedin_link": "https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca"
#             }}
#         )
        
#         print(f"  Updated {result.modified_count} blogs with social media links!")
        
#         # Verify the update
#         sample_blog = await database.blogs.find_one()
#         if sample_blog and 'twitter_link' in sample_blog:
#             print(f"📝 Sample blog now has:")
#             print(f"   Twitter: {sample_blog.get('twitter_link')}")
#             print(f"   LinkedIn: {sample_blog.get('linkedin_link')}")
        
#     except Exception as e:
#         print(f" Error updating blogs: {e}")
#     finally:
#         client.close()

# if __name__ == "__main__":
#     asyncio.run(add_social_links_to_blogs())