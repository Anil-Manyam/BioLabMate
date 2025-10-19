# import asyncio
# from motor.motor_asyncio import AsyncIOMotorClient
# from datetime import datetime
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# async def transfer_blogs_to_mongodb():
#     """Transfer all existing blog data from frontend to MongoDB Atlas"""
    
#     # Connect to MongoDB
#     client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
#     database = client[os.getenv("DATABASE_NAME", "biolabmate")]
    
#     # All your existing blog data from frontend
#     all_blogs = [
#         {
#             "title": "From Nuisance to Natural Resource: Mexico Declares Sargassum a National Fishing Asset",
#             "description": "Mexico has taken a landmark step in marine resource management by officially designating sargassum—the free-floating seaweed that frequently inundates Caribbean shores—as a national fishing resource. As of August 7, 2025, the updated National Fisheries Charter allows for the harvesting of sargassum on the high seas, providing a new avenue to manage this persistent environmental challenge before it reaches beaches.\n\nOften seen as a disruption to tourism in the Riviera Maya, this initiative reimagines the seaweed as a valuable commodity. The revised policy aims to intercept as much as 945,000 tonnes of dried sargassum annually, harnessing it as raw material for sustainable industries such as animal feed, organic fertilizers, biofuels, bioplastics, water treatment agents, textiles, and even construction materials.\n\nIn Quintana Roo, research is already underway to transform sargassum into biofuel—an important stride toward a circular marine economy. The Riviera Maya Hotel Association has called this categorization a turning point, noting it legitimizes sargassum as a resource and opens doors for investment, green jobs, and commercial processing under a clearer regulatory framework.\n\nBeyond Mexico's borders, this move aligns with broader regional efforts, including a proposed joint initiative with the Dominican Republic to tackle sargassum collectively. With warmer oceans fueling record-breaking blooms, Mexico's reclassification is both timely and strategic. By transforming a recurring coastal scourge into a resource, the country is pioneering a model for sustainable fisheries, marine stewardship, and economic resilience.",
#             "date": "2025-08-12",
#             "picture": "https://mexiconewsdaily.com/wp-content/uploads/2025/08/1040133_Buque-Interoceanico-Natans_impreso.jpg",
#             "created_at": datetime(2024, 1, 15, 10, 0, 0)
#         },
#         {
#             "title": "Rethinking Lab Practices: Tackling Plastic Waste with Sustainable Solutions",
#             "description": "Laboratory plastic waste is piling up at an alarming rate. Every year, billions of single-use pipette tips, tubes, and plates end up in landfills and oceans, creating a mounting environmental crisis. While these items are essential for sterile and precise research, their convenience comes at a heavy ecological cost.\n\nSustainable alternatives do exist, but adoption across research institutions has been slow. Many laboratories are hesitant to change established practices due to concerns about performance, sterility, and regulatory compliance. However, advancements in material science have introduced biodegradable and compostable labware that can meet scientific standards while reducing environmental impact.\n\nSimple steps can also make a big difference. Replacing disposable plastics with reusable glassware for certain applications, adopting bulk purchasing programs for sustainable materials, and implementing recycling initiatives are proving effective in reducing waste. Leading institutions have already shown that integrating these practices does not compromise research quality—instead, it strengthens their commitment to responsible science.\n\nThe challenge is not just technological but also cultural. Shifting laboratory habits requires awareness, training, and support for researchers so they can confidently transition to greener practices. Encouraging collaboration between scientists, manufacturers, and policymakers is key to accelerating adoption and driving innovation in sustainable lab materials.\n\nBy rethinking laboratory practices, the scientific community has an opportunity to significantly reduce plastic pollution while setting an example for other industries. With collective effort, laboratories worldwide can transform from major contributors of plastic waste into leaders of sustainable innovation.",
#             "date": "2025-09-08",
#             "picture": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
#             "created_at": datetime(2024, 1, 10, 10, 0, 0)
#         },
#         {
#             "title": "UN Sounds Alarm on Global Plastic Pollution Crisis",
#             "description": "Every year, the world produces over 400 million tonnes of plastic, with half designed for single use and only 10% being recycled. Between 19 and 23 million tonnes of plastic waste leak into aquatic ecosystems annually, and without urgent action, this figure could rise by 50% by 2040.\n\nPlastic pollution now contaminates every corner of the planet, threatening ecosystems, wildlife, and human health. Microplastics have been found in food, water, and air, with the average person estimated to ingest over 50,000 plastic particles each year, and far more through inhalation.\n\nIf the climate crisis remains unaddressed, with plastic pollution as a major contributor, air pollution levels exceeding safe thresholds could rise by 50% within a decade. Meanwhile, plastic pollution in marine and freshwater environments may triple by 2040, making global action increasingly urgent.\n\nTo rally momentum, the UN Environment Programme (UNEP) is leading the 52nd annual World Environment Day on 5 June, hosted this year by Jeju, Republic of Korea, under the theme #BeatPlasticPollution. The day unites governments, businesses, communities, and individuals to protect the planet and advance progress toward Sustainable Development Goals, particularly climate action and sustainable consumption.\n\nA major focus of World Environment Day is the push for a global treaty to end plastic pollution. Countries are negotiating an international, legally binding agreement, with calls from UN Secretary-General António Guterres and UNEP Executive Director Inger Andersen for an ambitious, just, and rapid implementation that addresses the full lifecycle of plastics. The day serves as a catalyst for action, drawing attention to the upcoming UN Environment Assembly, where nations hope to finalize concrete steps to curb plastic pollution and tackle the broader climate emergency.",
#             "date": "2025-06-04",
#             "picture": "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/06-06-23_Freshwater_lakes_rivers_Pawan_Prasad.jpg/image1170x530cropped.jpg",
#             "created_at": datetime(2025, 6, 4, 10, 0, 0)
#         },
#         {
#             "title": "Cultivating Baby Seaweed: The Early Stages of Ocean Farming",
#             "description": "Baby seaweed is carefully cultivated in controlled tanks before being deployed into open waters. At this early growth stage, small pieces of seaweed are attached to substrates such as twine or small rocks, allowing them to establish roots and develop a strong foundation for future growth.\n\nThese early cultivation efforts are crucial for sustainable seaweed farming, as they ensure higher survival rates once the seaweed is transferred to natural marine environments. By nurturing the seaweed in a protected setting, farmers can monitor growth conditions, optimize nutrient supply, and minimize the impact of environmental stressors.\n\nThis process not only supports the development of healthy seaweed for use in food, biofuel, and biodegradable materials but also contributes to ocean restoration efforts. Cultivated seaweed can help absorb excess carbon dioxide, provide habitats for marine life, and reduce coastal erosion, demonstrating the environmental benefits of ocean farming technology.\n\nThrough careful observation and management of these early growth stages, researchers and ocean farmers are pioneering methods that balance productivity with ecological sustainability, ensuring that the future of seaweed farming supports both human needs and ocean health.",
#             "date": "2025-04-21",
#             "picture": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
#             "created_at": datetime(2025, 8, 25, 10, 0, 0)
#         },
#         {
#             "title": "The Hidden Toll: How Plastic Pollution Threatens Wildlife",
#             "description": "Plastic pollution is taking a devastating toll on wildlife around the globe. At least 550 species are affected by entanglement in or ingestion of plastic debris, ranging from seabirds and turtles to fish and marine mammals. The impact on biodiversity is severe, disrupting ecosystems and threatening the balance of marine and terrestrial habitats.\n\nBirds, in particular, are highly vulnerable. Many seabirds mistake floating plastics for food, leading to ingestion that can cause injury, starvation, and death. Entanglement in discarded fishing nets, plastic rings, and other debris can immobilize birds and marine animals, often with fatal consequences.\n\nThe broader ecological effects are equally concerning. Plastic debris damages ecosystems, reduces fishery yields, and introduces toxic substances into the food chain, ultimately affecting human health. Addressing this crisis requires coordinated global action, from reducing plastic production and improving waste management to encouraging public awareness and sustainable alternatives.\n\nThrough initiatives that highlight the plight of affected wildlife and promote responsible consumption, communities and governments can work together to mitigate plastic pollution. Protecting birds and other vulnerable species from the dangers of plastic debris is not just an environmental imperative—it is a crucial step toward preserving the health and resilience of our planet.",
#             "date": "2024-09-22",
#             "picture": "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800",
#             "created_at": datetime(2025, 8, 25, 10, 0, 0)
#         },
#         {
#             "title": "BioLabMate Showcases Seaweed Innovations in Portugal",
#             "description": "BioLabMate was thrilled to be selected among five Canadian startups by the Embassy of Canada to Portugal and Maze Impact, highlighting our commitment to sustainable innovation and ocean-based technologies.\n\nWe were also privileged to participate in the Proof of Concept - Made in Portugal Program, hosted by BBioAlliance. During this program, we had the opportunity to showcase our in-house seaweed-based biopellets to leading biocomposites companies, demonstrating the potential of marine resources to drive sustainable material solutions.\n\nThis experience not only allowed us to present our innovations on an international stage but also fostered valuable collaborations with other startups, industry leaders, and sustainability advocates. By sharing our work, we aim to accelerate the adoption of eco-friendly materials, contribute to the circular economy, and highlight the role of seaweed-based technologies in reducing environmental impact.\n\nParticipating in these programs reinforces BioLabMate's mission to lead in sustainable bioproduct development, and we look forward to leveraging the insights, connections, and opportunities gained to further advance our impact both in Canada and globally.",
#             "date": "2024-11-23",
#             "picture": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
#             "created_at": datetime(2025, 8, 25, 10, 0, 0)
#         }
#     ]
    
#     try:
#         print("🔄 Connecting to MongoDB Atlas...")
        
#         # Test connection first
#         await client.admin.command('ping')
#         print("✅ Connected to MongoDB Atlas successfully!")
        
#         # Clear existing blogs (optional - remove this line if you want to keep existing data)
#         existing_count = await database.blogs.count_documents({})
#         if existing_count > 0:
#             print(f"🗑️  Found {existing_count} existing blogs, clearing them...")
#             await database.blogs.delete_many({})
        
#         # Insert all blogs
#         print("📝 Inserting blog data...")
#         result = await database.blogs.insert_many(all_blogs)
#         print(f"✅ Successfully transferred {len(result.inserted_ids)} blogs to MongoDB Atlas!")
        
#         # Verify insertion
#         count = await database.blogs.count_documents({})
#         print(f"📊 Total blogs in MongoDB Atlas: {count}")
        
#         # Show first blog as example
#         first_blog = await database.blogs.find_one()
#         if first_blog:
#             print(f"📝 Sample blog: {first_blog['title']}")
        
#         print("\n🎉 Blog data transfer completed successfully!")
#         print("🔗 You can now test your API at: http://localhost:8000/api/blogs")
        
#     except Exception as e:
#         print(f" Error transferring blogs: {e}")
#         print(f"🔍 Please check your MongoDB Atlas connection and credentials")
#     finally:
#         client.close()

# if __name__ == "__main__":
#     asyncio.run(transfer_blogs_to_mongodb())