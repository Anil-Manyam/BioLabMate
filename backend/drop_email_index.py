# drop_email_index.py
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

MONGODB_URI = "mongodb+srv://anil:Chathura123@biolabmate.zy1c4wz.mongodb.net/?retryWrites=true&w=majority&appName=biolabmate"
DATABASE_NAME = "biolabmate"

async def drop_email_index():
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    
    try:
        # Get all indexes
        indexes = await db.team_members.index_information()
        print("Current indexes:", indexes.keys())
        
        # Drop the email unique index
        if 'email_1' in indexes:
            await db.team_members.drop_index('email_1')
            print("  Dropped email_1 unique index")
        else:
            print("⚠️ email_1 index not found")
        
        # Verify
        indexes_after = await db.team_members.index_information()
        print("Remaining indexes:", indexes_after.keys())
        
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(drop_email_index())
