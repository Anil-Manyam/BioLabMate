import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Twitter, Linkedin } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  picture: string | null;
  created_at: string;
  twitter_link?: string;
  linkedin_link?: string;
}

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/blogs`);

      if (response.ok) {
        const blogs = await response.json();
        setBlogPosts(blogs);
        setDisplayedBlogs(blogs.slice(0, blogsPerPage));
        setCurrentPage(1);
        console.log('Blogs loaded from MongoDB:', blogs.length);
      } else {
        console.error('Failed to fetch blogs from API');
        setBlogPosts([]);
        setDisplayedBlogs([]);
      }
    } catch (error) {
      console.error('Error loading blogs from API:', error);
      setBlogPosts([]);
      setDisplayedBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreBlogs = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * blogsPerPage;
    const endIndex = nextPage * blogsPerPage;

    const moreBlogsToShow = blogPosts.slice(startIndex, endIndex);

    if (moreBlogsToShow.length > 0) {
      setDisplayedBlogs([...displayedBlogs, ...moreBlogsToShow]);
      setCurrentPage(nextPage);
      console.log(`Loaded ${moreBlogsToShow.length} more blogs.`);
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

              {selectedPost.picture && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedPost.picture}
                    alt={selectedPost.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                </div>
              )}

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
                  <p className="text-lg leading-8 whitespace-pre-wrap">{selectedPost.description}</p>
                </div>

                {/* --- Updated Social Share Section --- */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Share this article:</span>

                    {selectedPost.twitter_link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-full"
                        onClick={() => window.open(selectedPost.twitter_link, '_blank')}
                      >
                        <Twitter className="w-5 h-5" />
                      </Button>
                    )}

                    {selectedPost.linkedin_link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 rounded-full"
                        onClick={() => window.open(selectedPost.linkedin_link, '_blank')}
                      >
                        <Linkedin className="w-5 h-5" />
                      </Button>
                    )}

                    {!selectedPost.twitter_link && !selectedPost.linkedin_link && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-full"
                          onClick={() => window.open('https://x.com/biolabmate', '_blank')}
                        >
                          <Twitter className="w-5 h-5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 rounded-full"
                          onClick={() => window.open('https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca', '_blank')}
                        >
                          <Linkedin className="w-5 h-5" />
                        </Button>
                      </>
                    )}
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
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Blogs
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Insights, innovations, and stories from the forefront of sustainable laboratory solutions
            </p>
          </div>
        </section>

        {loading && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBlogs.map((post) => (
                  <Card
                    key={post.id}
                    className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden cursor-pointer transform hover:-translate-y-2"
                    onClick={() => setSelectedPost(post)}
                  >
                    <CardContent className="p-0">
                      {post.picture && (
                        <div className="relative overflow-hidden aspect-[4/3]">
                          <img
                            src={post.picture}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
                              Blog
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Calendar size={14} />
                          <span>{formatDate(post.date)}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {post.title}
                        </h3>

                        <p
                          className="text-gray-600 mb-6 leading-relaxed overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {post.description}
                        </p>

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

              {displayedBlogs.length < blogPosts.length && (
                <div className="text-center mt-16">
                  <Button
                    onClick={loadMoreBlogs}
                    size="lg"
                    className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  >
                    Load More Articles ({blogPosts.length - displayedBlogs.length} remaining)
                  </Button>
                </div>
              )}

              {displayedBlogs.length >= blogPosts.length && blogPosts.length > blogsPerPage && (
                <div className="text-center mt-16">
                  <p className="text-gray-600 mb-4">🎉 You've seen all {blogPosts.length} articles!</p>
                  <Button
                    onClick={() => {
                      setDisplayedBlogs(blogPosts.slice(0, blogsPerPage));
                      setCurrentPage(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    variant="outline"
                    className="hover:bg-blue-50"
                  >
                    Back to Top
                  </Button>
                </div>
              )}

              {displayedBlogs.length === 0 && !loading && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">No blog posts found</h3>
                  <p className="text-gray-600 mb-6">Blogs will appear here once they are added via the admin panel.</p>
                  <Button
                    onClick={() => window.open('http://localhost:8080/blog/admin', '_blank')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Go to Admin Panel
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;





// // original before text - symbol changes 

// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Calendar, ArrowRight } from 'lucide-react';

// interface BlogPost {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   picture: string | null;
//   created_at: string;
//   twitter_link?: string;
//   linkedin_link?: string;
// }

// const Blog = () => {
//   const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [blogsPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);

//   // API Base URL from environment variables
//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

//   useEffect(() => {
//     loadBlogPosts();
//   }, []);

//   const loadBlogPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE}/blogs`);
      
//       if (response.ok) {
//         const blogs = await response.json();
//         setBlogPosts(blogs);
        
//         // Show only first 6 blogs initially
//         setDisplayedBlogs(blogs.slice(0, blogsPerPage));
//         setCurrentPage(1);
        
//         console.log('Blogs loaded from MongoDB:', blogs.length);
//         console.log('Displaying first 6 blogs');
//       } else {
//         console.error('Failed to fetch blogs from API');
//         setBlogPosts([]);
//         setDisplayedBlogs([]);
//       }
//     } catch (error) {
//       console.error('Error loading blogs from API:', error);
//       setBlogPosts([]);
//       setDisplayedBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreBlogs = () => {
//     const nextPage = currentPage + 1;
//     const startIndex = currentPage * blogsPerPage;
//     const endIndex = nextPage * blogsPerPage;
    
//     const moreBlogsToShow = blogPosts.slice(startIndex, endIndex);
    
//     if (moreBlogsToShow.length > 0) {
//       setDisplayedBlogs([...displayedBlogs, ...moreBlogsToShow]);
//       setCurrentPage(nextPage);
//       console.log(`Loaded ${moreBlogsToShow.length} more blogs. Now showing ${displayedBlogs.length + moreBlogsToShow.length} total.`);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (selectedPost) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//         <Navigation />
        
//         <div className="pt-16">
//           <article className="py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//               <Button 
//                 variant="outline" 
//                 onClick={() => setSelectedPost(null)}
//                 className="mb-8 hover:bg-white hover:shadow-md transition-all duration-300"
//               >
//                 ← Back to Blog
//               </Button>
              
//               {/* Featured Image */}
//               {selectedPost.picture && (
//                 <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
//                   <img 
//                     src={selectedPost.picture} 
//                     alt={selectedPost.title}
//                     className="w-full h-64 sm:h-80 lg:h-96 object-cover"
//                   />
//                 </div>
//               )}
              
//               {/* Article Content */}
//               <div className="bg-white rounded-xl p-8 shadow-lg">
//                 <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
//                   <div className="flex items-center gap-2">
//                     <Calendar size={16} />
//                     <span>{formatDate(selectedPost.date)}</span>
//                   </div>
//                   <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
//                     Blog Post
//                   </span>
//                 </div>
                
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//                   {selectedPost.title}
//                 </h1>
                
//                 <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//                   <p className="text-lg leading-8 whitespace-pre-wrap">{selectedPost.description}</p>
//                 </div>
                
//                 {/* Share and Navigation */}
//                 <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-500">Share this article:</span>
//                     {selectedPost.twitter_link && (
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300"
//                         onClick={() => window.open(selectedPost.twitter_link, '_blank')}
//                       >
//                         Twitter
//                       </Button>
//                     )}
//                     {selectedPost.linkedin_link && (
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300"
//                         onClick={() => window.open(selectedPost.linkedin_link, '_blank')}
//                       >
//                         LinkedIn
//                       </Button>
//                     )}
//                     {/* Fallback buttons if no social links exist */}
//                     {!selectedPost.twitter_link && !selectedPost.linkedin_link && (
//                       <>
//                         <Button 
//                           variant="ghost" 
//                           size="sm" 
//                           className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300"
//                           onClick={() => window.open('https://x.com/biolabmate', '_blank')}
//                         >
//                           Twitter
//                         </Button>
//                         <Button 
//                           variant="ghost" 
//                           size="sm" 
//                           className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300"
//                           onClick={() => window.open('https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca', '_blank')}
//                         >
//                           LinkedIn
//                         </Button>
//                       </>
//                     )}
//                   </div>
                  
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setSelectedPost(null)}
//                     className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
//                   >
//                     ← Back to Blog
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </article>
//         </div>
        
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       <div className="pt-16">
//         {/* Hero Section */}
//         <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Our Blog
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Insights, innovations, and stories from the forefront of sustainable laboratory solutions
//             </p>
//           </div>
//         </section>

//         {/* Loading State */}
//         {loading && (
//           <section className="py-20 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                   <Card key={i} className="animate-pulse">
//                     <CardContent className="p-0">
//                       <div className="h-48 bg-gray-200 rounded-t-lg"></div>
//                       <div className="p-6">
//                         <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
//                         <div className="h-6 bg-gray-200 rounded mb-3"></div>
//                         <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-4 bg-gray-200 rounded mb-4"></div>
//                         <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Blog Posts */}
//         {!loading && (
//           <section className="py-20 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {displayedBlogs.map((post) => (
//                   <Card 
//                     key={post.id}
//                     className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden cursor-pointer transform hover:-translate-y-2"
//                     onClick={() => setSelectedPost(post)}
//                   >
//                     <CardContent className="p-0">
//                       {/* Featured Image */}
//                       {post.picture && (
//                         <div className="relative overflow-hidden aspect-[4/3]">
//                           <img 
//                             src={post.picture} 
//                             alt={post.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
//                           {/* Category Badge */}
//                           <div className="absolute top-4 left-4">
//                             <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
//                               Blog
//                             </span>
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Content */}
//                       <div className="p-6">
//                         {/* Date */}
//                         <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                           <Calendar size={14} />
//                           <span>{formatDate(post.date)}</span>
//                         </div>
                        
//                         {/* Title */}
//                         <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
//                           {post.title}
//                         </h3>
                        
//                         {/* Excerpt */}
//                         <p className="text-gray-600 mb-6 leading-relaxed overflow-hidden" style={{ 
//                           display: '-webkit-box',
//                           WebkitLineClamp: 3,
//                           WebkitBoxOrient: 'vertical'
//                         }}>
//                           {post.description}
//                         </p>
                        
//                         {/* Read More Button */}
//                         <div className="flex items-center justify-between">
//                           <Button 
//                             variant="ghost" 
//                             className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent font-medium group/btn"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedPost(post);
//                             }}
//                           >
//                             Read More
//                             <ArrowRight 
//                               size={16} 
//                               className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" 
//                             />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
              
//               {/* Load More Button */}
//               {displayedBlogs.length < blogPosts.length && (
//                 <div className="text-center mt-16">
//                   <Button 
//                     onClick={loadMoreBlogs}
//                     size="lg"
//                     className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
//                   >
//                     Load More Articles ({blogPosts.length - displayedBlogs.length} remaining)
//                   </Button>
//                 </div>
//               )}

//               {/* Show when all blogs are loaded */}
//               {displayedBlogs.length >= blogPosts.length && blogPosts.length > blogsPerPage && (
//                 <div className="text-center mt-16">
//                   <p className="text-gray-600 mb-4">🎉 You've seen all {blogPosts.length} articles!</p>
//                   <Button 
//                     onClick={() => {
//                       setDisplayedBlogs(blogPosts.slice(0, blogsPerPage));
//                       setCurrentPage(1);
//                       window.scrollTo({ top: 0, behavior: 'smooth' });
//                     }}
//                     variant="outline"
//                     className="hover:bg-blue-50"
//                   >
//                     Back to Top
//                   </Button>
//                 </div>
//               )}

//               {/* Empty State */}
//               {displayedBlogs.length === 0 && !loading && (
//                 <div className="text-center py-16">
//                   <div className="text-6xl mb-4">📝</div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-4">No blog posts found</h3>
//                   <p className="text-gray-600 mb-6">Blogs will appear here once they are added via the admin panel.</p>
//                   <Button 
//                     onClick={() => window.open('http://localhost:8080/blog/admin', '_blank')}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     Go to Admin Panel
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Blog;









// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Calendar, ArrowRight } from 'lucide-react';

// interface BlogPost {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   picture: string | null;
//   created_at: string;
// }

// const Blog = () => {
//   const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [blogsPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);

//   // API Base URL from environment variables
//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

//   useEffect(() => {
//     loadBlogPosts();
//   }, []);

//   const loadBlogPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE}/blogs`);
      
//       if (response.ok) {
//         const blogs = await response.json();
//         setBlogPosts(blogs);
        
//         // Show only first 6 blogs initially
//         setDisplayedBlogs(blogs.slice(0, blogsPerPage));
//         setCurrentPage(1);
        
//         console.log('Blogs loaded from MongoDB:', blogs.length);
//         console.log('Displaying first 6 blogs');
//       } else {
//         console.error('Failed to fetch blogs from API');
//         setBlogPosts([]);
//         setDisplayedBlogs([]);
//       }
//     } catch (error) {
//       console.error('Error loading blogs from API:', error);
//       setBlogPosts([]);
//       setDisplayedBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreBlogs = () => {
//     const nextPage = currentPage + 1;
//     const startIndex = currentPage * blogsPerPage;
//     const endIndex = nextPage * blogsPerPage;
    
//     const moreBlogsToShow = blogPosts.slice(startIndex, endIndex);
    
//     if (moreBlogsToShow.length > 0) {
//       setDisplayedBlogs([...displayedBlogs, ...moreBlogsToShow]);
//       setCurrentPage(nextPage);
//       console.log(`Loaded ${moreBlogsToShow.length} more blogs. Now showing ${displayedBlogs.length + moreBlogsToShow.length} total.`);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (selectedPost) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//         <Navigation />
        
//         <div className="pt-16">
//           <article className="py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//               <Button 
//                 variant="outline" 
//                 onClick={() => setSelectedPost(null)}
//                 className="mb-8 hover:bg-white hover:shadow-md transition-all duration-300"
//               >
//                 ← Back to Blog
//               </Button>
              
//               {/* Featured Image */}
//               {selectedPost.picture && (
//                 <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
//                   <img 
//                     src={selectedPost.picture} 
//                     alt={selectedPost.title}
//                     className="w-full h-64 sm:h-80 lg:h-96 object-cover"
//                   />
//                 </div>
//               )}
              
//               {/* Article Content */}
//               <div className="bg-white rounded-xl p-8 shadow-lg">
//                 <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
//                   <div className="flex items-center gap-2">
//                     <Calendar size={16} />
//                     <span>{formatDate(selectedPost.date)}</span>
//                   </div>
//                   <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
//                     Blog Post
//                   </span>
//                 </div>
                
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//                   {selectedPost.title}
//                 </h1>
                
//                 <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//                   <p className="text-lg leading-8 whitespace-pre-wrap">{selectedPost.description}</p>
//                 </div>
                
//                 {/* Share and Navigation */}
//                 <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-500">Share this article:</span>
//                     <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
//                       Twitter
//                     </Button>
//                     <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
//                       LinkedIn
//                     </Button>
//                   </div>
                  
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setSelectedPost(null)}
//                     className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
//                   >
//                     ← Back to Blog
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </article>
//         </div>
        
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       <div className="pt-16">
//         {/* Hero Section */}
//         <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Our Blog
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Insights, innovations, and stories from the forefront of sustainable laboratory solutions
//             </p>
//           </div>
//         </section>

//         {/* Loading State */}
//         {loading && (
//           <section className="py-20 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                   <Card key={i} className="animate-pulse">
//                     <CardContent className="p-0">
//                       <div className="h-48 bg-gray-200 rounded-t-lg"></div>
//                       <div className="p-6">
//                         <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
//                         <div className="h-6 bg-gray-200 rounded mb-3"></div>
//                         <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-4 bg-gray-200 rounded mb-4"></div>
//                         <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Blog Posts */}
//         {!loading && (
//           <section className="py-20 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {displayedBlogs.map((post) => (
//                   <Card 
//                     key={post.id}
//                     className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden cursor-pointer transform hover:-translate-y-2"
//                     onClick={() => setSelectedPost(post)}
//                   >
//                     <CardContent className="p-0">
//                       {/* Featured Image */}
//                       {post.picture && (
//                         <div className="relative overflow-hidden aspect-[4/3]">
//                           <img 
//                             src={post.picture} 
//                             alt={post.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
//                           {/* Category Badge */}
//                           <div className="absolute top-4 left-4">
//                             <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
//                               Blog
//                             </span>
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Content */}
//                       <div className="p-6">
//                         {/* Date */}
//                         <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                           <Calendar size={14} />
//                           <span>{formatDate(post.date)}</span>
//                         </div>
                        
//                         {/* Title */}
//                         <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
//                           {post.title}
//                         </h3>
                        
//                         {/* Excerpt */}
//                         <p className="text-gray-600 mb-6 leading-relaxed overflow-hidden" style={{ 
//                           display: '-webkit-box',
//                           WebkitLineClamp: 3,
//                           WebkitBoxOrient: 'vertical'
//                         }}>
//                           {post.description}
//                         </p>
                        
//                         {/* Read More Button */}
//                         <div className="flex items-center justify-between">
//                           <Button 
//                             variant="ghost" 
//                             className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent font-medium group/btn"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedPost(post);
//                             }}
//                           >
//                             Read More
//                             <ArrowRight 
//                               size={16} 
//                               className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" 
//                             />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
              
//               {/* Load More Button */}
//               {displayedBlogs.length < blogPosts.length && (
//                 <div className="text-center mt-16">
//                   <Button 
//                     onClick={loadMoreBlogs}
//                     size="lg"
//                     className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
//                   >
//                     Load More Articles ({blogPosts.length - displayedBlogs.length} remaining)
//                   </Button>
//                 </div>
//               )}

//               {/* Show when all blogs are loaded */}
//               {displayedBlogs.length >= blogPosts.length && blogPosts.length > blogsPerPage && (
//                 <div className="text-center mt-16">
//                   <p className="text-gray-600 mb-4">🎉 You've seen all {blogPosts.length} articles!</p>
//                   <Button 
//                     onClick={() => {
//                       setDisplayedBlogs(blogPosts.slice(0, blogsPerPage));
//                       setCurrentPage(1);
//                       window.scrollTo({ top: 0, behavior: 'smooth' });
//                     }}
//                     variant="outline"
//                     className="hover:bg-blue-50"
//                   >
//                     Back to Top
//                   </Button>
//                 </div>
//               )}

//               {/* Empty State */}
//               {displayedBlogs.length === 0 && !loading && (
//                 <div className="text-center py-16">
//                   <div className="text-6xl mb-4">📝</div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-4">No blog posts found</h3>
//                   <p className="text-gray-600 mb-6">Blogs will appear here once they are added via the admin panel.</p>
//                   <Button 
//                     onClick={() => window.open('http://localhost:8080/blog/admin', '_blank')}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     Go to Admin Panel
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Blog;