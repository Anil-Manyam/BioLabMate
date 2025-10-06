import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Blog_2 from '@/assets/Blog_2.jpg';
import Blog_4 from '@/assets/Blog_4.jpg';
import Blog_5 from '@/assets/Blog_5.jpg';
import Blog_6 from '@/assets/Blog_6.jpg';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  picture: string | null;
  created_at: string;
}

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy blog data for demonstration
  const dummyBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'From Nuisance to Natural Resource: Mexico Declares Sargassum a National Fishing Asset',
      description: 'Mexico has taken a landmark step in marine resource management by officially designating sargassum—the free-floating seaweed that frequently inundates Caribbean shores—as a national fishing resource. As of August 7, 2025, the updated National Fisheries Charter allows for the harvesting of sargassum on the high seas, providing a new avenue to manage this persistent environmental challenge before it reaches beaches.\n\nOften seen as a disruption to tourism in the Riviera Maya, this initiative reimagines the seaweed as a valuable commodity. The revised policy aims to intercept as much as 945,000 tonnes of dried sargassum annually, harnessing it as raw material for sustainable industries such as animal feed, organic fertilizers, biofuels, bioplastics, water treatment agents, textiles, and even construction materials.\n\nIn Quintana Roo, research is already underway to transform sargassum into biofuel—an important stride toward a circular marine economy. The Riviera Maya Hotel Association has called this categorization a turning point, noting it legitimizes sargassum as a resource and opens doors for investment, green jobs, and commercial processing under a clearer regulatory framework.\n\nBeyond Mexico’s borders, this move aligns with broader regional efforts, including a proposed joint initiative with the Dominican Republic to tackle sargassum collectively. With warmer oceans fueling record-breaking blooms, Mexico’s reclassification is both timely and strategic. By transforming a recurring coastal scourge into a resource, the country is pioneering a model for sustainable fisheries, marine stewardship, and economic resilience.',
      date: '2025-08-12',
      picture: 'https://mexiconewsdaily.com/wp-content/uploads/2025/08/1040133_Buque-Interoceanico-Natans_impreso.jpg',
      created_at: '2024-01-15T10:00:00Z'
    },
    
    
    {
      id: '2',
      title: 'Rethinking Lab Practices: Tackling Plastic Waste with Sustainable Solutions',
      description: 'Laboratory plastic waste is piling up at an alarming rate. Every year, billions of single-use pipette tips, tubes, and plates end up in landfills and oceans, creating a mounting environmental crisis. While these items are essential for sterile and precise research, their convenience comes at a heavy ecological cost.\n\nSustainable alternatives do exist, but adoption across research institutions has been slow. Many laboratories are hesitant to change established practices due to concerns about performance, sterility, and regulatory compliance. However, advancements in material science have introduced biodegradable and compostable labware that can meet scientific standards while reducing environmental impact.\n\nSimple steps can also make a big difference. Replacing disposable plastics with reusable glassware for certain applications, adopting bulk purchasing programs for sustainable materials, and implementing recycling initiatives are proving effective in reducing waste. Leading institutions have already shown that integrating these practices does not compromise research quality—instead, it strengthens their commitment to responsible science.\n\nThe challenge is not just technological but also cultural. Shifting laboratory habits requires awareness, training, and support for researchers so they can confidently transition to greener practices. Encouraging collaboration between scientists, manufacturers, and policymakers is key to accelerating adoption and driving innovation in sustainable lab materials.\n\nBy rethinking laboratory practices, the scientific community has an opportunity to significantly reduce plastic pollution while setting an example for other industries. With collective effort, laboratories worldwide can transform from major contributors of plastic waste into leaders of sustainable innovation.',
      date: '2025-09-08',
      picture: Blog_2,
      created_at: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'UN Sounds Alarm on Global Plastic Pollution Crisis',
      description: 'Every year, the world produces over 400 million tonnes of plastic, with half designed for single use and only 10% being recycled. Between 19 and 23 million tonnes of plastic waste leak into aquatic ecosystems annually, and without urgent action, this figure could rise by 50% by 2040.\n\nPlastic pollution now contaminates every corner of the planet, threatening ecosystems, wildlife, and human health. Microplastics have been found in food, water, and air, with the average person estimated to ingest over 50,000 plastic particles each year, and far more through inhalation.\n\nIf the climate crisis remains unaddressed, with plastic pollution as a major contributor, air pollution levels exceeding safe thresholds could rise by 50% within a decade. Meanwhile, plastic pollution in marine and freshwater environments may triple by 2040, making global action increasingly urgent.\n\nTo rally momentum, the UN Environment Programme (UNEP) is leading the 52nd annual World Environment Day on 5 June, hosted this year by Jeju, Republic of Korea, under the theme #BeatPlasticPollution. The day unites governments, businesses, communities, and individuals to protect the planet and advance progress toward Sustainable Development Goals, particularly climate action and sustainable consumption.\n\nA major focus of World Environment Day is the push for a global treaty to end plastic pollution. Countries are negotiating an international, legally binding agreement, with calls from UN Secretary-General António Guterres and UNEP Executive Director Inger Andersen for an ambitious, just, and rapid implementation that addresses the full lifecycle of plastics. The day serves as a catalyst for action, drawing attention to the upcoming UN Environment Assembly, where nations hope to finalize concrete steps to curb plastic pollution and tackle the broader climate emergency.',
      date: '2025-06-04',
      picture: 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/06-06-23_Freshwater_lakes_rivers_Pawan_Prasad.jpg/image1170x530cropped.jpg',
      created_at: '2025-06-04T10:00:00Z'
    },
    
    {
      id: '4',
      title: 'Cultivating Baby Seaweed: The Early Stages of Ocean Farming',
      description: 'Baby seaweed is carefully cultivated in controlled tanks before being deployed into open waters. At this early growth stage, small pieces of seaweed are attached to substrates such as twine or small rocks, allowing them to establish roots and develop a strong foundation for future growth.\n\nThese early cultivation efforts are crucial for sustainable seaweed farming, as they ensure higher survival rates once the seaweed is transferred to natural marine environments. By nurturing the seaweed in a protected setting, farmers can monitor growth conditions, optimize nutrient supply, and minimize the impact of environmental stressors.\n\nThis process not only supports the development of healthy seaweed for use in food, biofuel, and biodegradable materials but also contributes to ocean restoration efforts. Cultivated seaweed can help absorb excess carbon dioxide, provide habitats for marine life, and reduce coastal erosion, demonstrating the environmental benefits of ocean farming technology.\n\nThrough careful observation and management of these early growth stages, researchers and ocean farmers are pioneering methods that balance productivity with ecological sustainability, ensuring that the future of seaweed farming supports both human needs and ocean health.',
      date: '2025-04-21',
      picture: Blog_4, 
      created_at: '2025-08-25T10:00:00Z'
    },
    
    {
      id: '5',
      title: 'The Hidden Toll: How Plastic Pollution Threatens Wildlife',
      description: 'Plastic pollution is taking a devastating toll on wildlife around the globe. At least 550 species are affected by entanglement in or ingestion of plastic debris, ranging from seabirds and turtles to fish and marine mammals. The impact on biodiversity is severe, disrupting ecosystems and threatening the balance of marine and terrestrial habitats.\n\nBirds, in particular, are highly vulnerable. Many seabirds mistake floating plastics for food, leading to ingestion that can cause injury, starvation, and death. Entanglement in discarded fishing nets, plastic rings, and other debris can immobilize birds and marine animals, often with fatal consequences.\n\nThe broader ecological effects are equally concerning. Plastic debris damages ecosystems, reduces fishery yields, and introduces toxic substances into the food chain, ultimately affecting human health. Addressing this crisis requires coordinated global action, from reducing plastic production and improving waste management to encouraging public awareness and sustainable alternatives.\n\nThrough initiatives that highlight the plight of affected wildlife and promote responsible consumption, communities and governments can work together to mitigate plastic pollution. Protecting birds and other vulnerable species from the dangers of plastic debris is not just an environmental imperative—it is a crucial step toward preserving the health and resilience of our planet.',
      date: '2024-09-22',
      picture: Blog_5, 
      created_at: '2025-08-25T10:00:00Z'
    },
    
    {
      id: '6',
      title: 'BioLabMate Showcases Seaweed Innovations in Portugal',
      description: 'BioLabMate was thrilled to be selected among five Canadian startups by the Embassy of Canada to Portugal and Maze Impact, highlighting our commitment to sustainable innovation and ocean-based technologies.\n\nWe were also privileged to participate in the Proof of Concept - Made in Portugal Program, hosted by BBioAlliance. During this program, we had the opportunity to showcase our in-house seaweed-based biopellets to leading biocomposites companies, demonstrating the potential of marine resources to drive sustainable material solutions.\n\nThis experience not only allowed us to present our innovations on an international stage but also fostered valuable collaborations with other startups, industry leaders, and sustainability advocates. By sharing our work, we aim to accelerate the adoption of eco-friendly materials, contribute to the circular economy, and highlight the role of seaweed-based technologies in reducing environmental impact.\n\nParticipating in these programs reinforces BioLabMate’s mission to lead in sustainable bioproduct development, and we look forward to leveraging the insights, connections, and opportunities gained to further advance our impact both in Canada and globally.',
      date: '2024-11-23',
      picture: Blog_6, 
      created_at: '2025-08-25T10:00:00Z'
    },
    
  ];

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setBlogPosts(dummyBlogPosts);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        
        <div className="pt-16">
          <article className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedPost(null)}
                className="mb-8 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                ← Back to Blog
              </Button>
              
              {/* Featured Image */}
              {selectedPost.picture && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={selectedPost.picture} 
                    alt={selectedPost.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                </div>
              )}
              
              {/* Article Content */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(selectedPost.date)}</span>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                    Blog Post
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedPost.title}
                </h1>
                
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg leading-8">{selectedPost.description}</p>
                </div>
                
                {/* Share and Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Share this article:</span>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Twitter
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      LinkedIn
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPost(null)}
                    className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                  >
                    ← Back to Blog
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Insights, innovations, and stories from the forefront of sustainable laboratory solutions
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card 
                  key={post.id}
                  className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden cursor-pointer transform hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    {/* Featured Image */}
                    {post.picture && (
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img 
                          src={post.picture} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
                            Blog
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar size={14} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 mb-6 leading-relaxed overflow-hidden" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {post.description}
                      </p>
                      
                      {/* Read More Button */}
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent font-medium group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPost(post);
                          }}
                        >
                          Read More
                          <ArrowRight 
                            size={16} 
                            className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" 
                          />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-16">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;