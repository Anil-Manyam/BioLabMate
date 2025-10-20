// // oldest
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













// // original before text - with out symbol changes 

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










// // code just before adding catogeries on blog cards

// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Calendar, ArrowRight, Twitter, Linkedin } from 'lucide-react';

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
//         setDisplayedBlogs(blogs.slice(0, blogsPerPage));
//         setCurrentPage(1);
//         console.log('Blogs loaded from MongoDB:', blogs.length);
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
//       console.log(`Loaded ${moreBlogsToShow.length} more blogs.`);
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

//               {selectedPost.picture && (
//                 <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
//                   <img
//                     src={selectedPost.picture}
//                     alt={selectedPost.title}
//                     className="w-full h-64 sm:h-80 lg:h-96 object-cover"
//                   />
//                 </div>
//               )}

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

//                 {/* --- Updated Social Share Section --- */}
//                 <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-500">Share this article:</span>

//                     {selectedPost.twitter_link && (
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-full"
//                         onClick={() => window.open(selectedPost.twitter_link, '_blank')}
//                       >
//                         <Twitter className="w-5 h-5" />
//                       </Button>
//                     )}

//                     {selectedPost.linkedin_link && (
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 rounded-full"
//                         onClick={() => window.open(selectedPost.linkedin_link, '_blank')}
//                       >
//                         <Linkedin className="w-5 h-5" />
//                       </Button>
//                     )}

//                     {!selectedPost.twitter_link && !selectedPost.linkedin_link && (
//                       <>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-full"
//                           onClick={() => window.open('https://x.com/biolabmate', '_blank')}
//                         >
//                           <Twitter className="w-5 h-5" />
//                         </Button>

//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 rounded-full"
//                           onClick={() => window.open('https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca', '_blank')}
//                         >
//                           <Linkedin className="w-5 h-5" />
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
//         <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Our Blogs
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Insights, innovations, and stories from the forefront of sustainable laboratory solutions
//             </p>
//           </div>
//         </section>

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
//                       {post.picture && (
//                         <div className="relative overflow-hidden aspect-[4/3]">
//                           <img
//                             src={post.picture}
//                             alt={post.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                           <div className="absolute top-4 left-4">
//                             <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
//                               Blog
//                             </span>
//                           </div>
//                         </div>
//                       )}

//                       <div className="p-6">
//                         <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                           <Calendar size={14} />
//                           <span>{formatDate(post.date)}</span>
//                         </div>

//                         <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
//                           {post.title}
//                         </h3>

//                         <p
//                           className="text-gray-600 mb-6 leading-relaxed overflow-hidden"
//                           style={{
//                             display: '-webkit-box',
//                             WebkitLineClamp: 3,
//                             WebkitBoxOrient: 'vertical'
//                           }}
//                         >
//                           {post.description}
//                         </p>

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









// // Blog.tsx - Complete replacement with category filtering 

// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Calendar, ArrowLeft, Twitter, Linkedin, ChevronRight } from 'lucide-react';

// interface BlogPost {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
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
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [categories, setCategories] = useState<string[]>([]);
//   const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  
//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

//   useEffect(() => {
//     loadBlogPosts();
//     loadCategories();
//   }, []);

//   // FIXED: Load categories dynamically from API
//   const loadCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/api/blogs/categories`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Loaded categories:', data.categories); // Debug log
//         setCategories(['All', ...data.categories]); // Add "All" at the beginning
//       }
//     } catch (error) {
//       console.error('Error loading categories:', error);
//       setCategories(['All']); // Fallback to just "All"
//     }
//   };

//   // FIXED: Reload categories after loading blogs to catch new ones
//   const loadBlogPosts = async (category?: string) => {
//     try {
//       setLoading(true);
//       const url = category && category !== "All" 
//         ? `${API_BASE}/api/blogs?category=${encodeURIComponent(category)}`
//         : `${API_BASE}/api/blogs`;
      
//       const response = await fetch(url);
//       if (response.ok) {
//         const blogs = await response.json();
//         setBlogPosts(blogs);
//         setDisplayedBlogs(blogs);
//         console.log('Blogs loaded:', blogs.length);
        
//         // FIXED: Reload categories after loading blogs to get any new categories
//         await loadCategories();
//       } else {
//         console.error('Failed to fetch blogs from API');
//         setBlogPosts([]);
//         setDisplayedBlogs([]);
//       }
//     } catch (error) {
//       console.error('Error loading blogs:', error);
//       setBlogPosts([]);
//       setDisplayedBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     loadBlogPosts(category);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const handleBlogClick = (post: BlogPost) => {
//     setSelectedPost(post);
//     const recent = blogPosts
//       .filter(blog => blog.id !== post.id)
//       .slice(0, 4);
//     setRecentBlogs(recent);
//   };

//   // Single Blog View
//   if (selectedPost) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navigation />
        
//         <div className="pt-20 pb-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Back Button - FIXED: Added data-cursor="clickable" */}
//             <button
//               onClick={() => setSelectedPost(null)}
//               data-cursor="clickable"
//               className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               <span className="cursor-pointer">Back to Blogs</span>
//             </button>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//               {/* Main Content - 3 columns */}
//               <div className="lg:col-span-3">
//                 <Card className="overflow-hidden shadow-xl">
//                   {selectedPost.picture && (
//                     <div className="w-full h-80 overflow-hidden">
//                       <img
//                         src={selectedPost.picture}
//                         alt={selectedPost.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}

//                   <CardContent className="p-8">
//                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {formatDate(selectedPost.date)}
//                       </div>
//                       {/* FIXED: Added data-cursor="clickable" */}
//                       <span 
//                         className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium cursor-pointer"
//                         data-cursor="clickable"
//                       >
//                         {selectedPost.category}
//                       </span>
//                     </div>

//                     <h1 className="text-4xl font-bold text-gray-900 mb-6">
//                       {selectedPost.title}
//                     </h1>

//                     <div className="prose max-w-none mb-8">
//                       {selectedPost.description.split('\n\n').map((paragraph, index) => (
//                         <p key={index} className="text-gray-700 leading-relaxed mb-4">
//                           {paragraph}
//                         </p>
//                       ))}
//                     </div>

//                     {/* Social Share */}
//                     <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
//                       <span className="text-sm text-gray-600 font-medium">Share this article:</span>
//                       {selectedPost.twitter_link && (
//                         <a
//                           href={selectedPost.twitter_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           data-cursor="clickable"
//                           className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
//                         >
//                           <Twitter className="w-5 h-5" />
//                         </a>
//                       )}
//                       {selectedPost.linkedin_link && (
//                         <a
//                           href={selectedPost.linkedin_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           data-cursor="clickable"
//                           className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                         >
//                           <Linkedin className="w-5 h-5" />
//                         </a>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Sidebar - 1 column */}
//               <div className="lg:col-span-1">
//                 <div className="sticky top-24">
//                   <Card className="p-6 shadow-lg">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
//                     <div className="space-y-4">
//                       {recentBlogs.map((blog) => (
//                         <div
//                           key={blog.id}
//                           onClick={() => handleBlogClick(blog)}
//                           data-cursor="clickable"
//                           className="cursor-pointer group"
//                         >
//                           {/* FIXED: Added data-cursor="clickable" to title */}
//                           <h4 
//                             className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1 line-clamp-2 cursor-pointer"
//                             data-cursor="clickable"
//                           >
//                             {blog.title}
//                           </h4>
//                           <div className="flex items-center gap-2 text-xs text-gray-500">
//                             {/* FIXED: Added data-cursor="clickable" to category */}
//                             <span 
//                               className="px-2 py-0.5 bg-gray-100 rounded cursor-pointer"
//                               data-cursor="clickable"
//                             >
//                               {blog.category}
//                             </span>
//                             <span>•</span>
//                             <span>{formatDate(blog.date)}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     );
//   }

//   // Blog List View
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <div className="pt-20 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Hero Section */}
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Blogs</h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Insights, innovations, and stories from the forefront of sustainable laboratory solutions
//             </p>
//           </div>

//           {/* Category Filter - FIXED: Added data-cursor="clickable" */}
//           <div className="flex flex-wrap justify-center gap-3 mb-12">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleCategoryChange(category)}
//                 data-cursor="clickable"
//                 className={`px-6 py-2 rounded-full font-medium transition-all cursor-pointer ${
//                   selectedCategory === category
//                     ? 'bg-primary text-white shadow-lg'
//                     : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Featured Blog Section */}
//           {!loading && displayedBlogs.length > 0 && (
//             <div className="mb-16">
//               <Card 
//                 className="overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-500"
//                 onClick={() => handleBlogClick(displayedBlogs[0])}
//                 data-cursor="clickable"
//               >
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
//                   {displayedBlogs[0].picture && (
//                     <div className="h-80 lg:h-auto overflow-hidden">
//                       <img
//                         src={displayedBlogs[0].picture}
//                         alt={displayedBlogs[0].title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />
//                     </div>
//                   )}
                  
//                   <div className="p-8 lg:p-12 flex flex-col justify-center">
//                     <div className="flex items-center gap-3 mb-4">
//                       {/* FIXED: Added data-cursor="clickable" */}
//                       <span 
//                         className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium cursor-pointer"
//                         data-cursor="clickable"
//                       >
//                         {displayedBlogs[0].category}
//                       </span>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {formatDate(displayedBlogs[0].date)}
//                       </div>
//                     </div>
                    
//                     {/* FIXED: Added data-cursor="clickable" to title */}
//                     <h2 
//                       className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors cursor-pointer"
//                       data-cursor="clickable"
//                     >
//                       {displayedBlogs[0].title}
//                     </h2>
                    
//                     <p className="text-gray-600 mb-6 line-clamp-3">
//                       {displayedBlogs[0].description}
//                     </p>
                    
//                     {/* FIXED: Added data-cursor="clickable" */}
//                     <div 
//                       className="flex items-center text-primary font-medium group-hover:gap-3 transition-all cursor-pointer"
//                       data-cursor="clickable"
//                     >
//                       Read More 
//                       <ChevronRight className="w-5 h-5 ml-1" />
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <Card key={i} className="overflow-hidden">
//                   <div className="h-48 bg-gray-200 animate-pulse"></div>
//                   <CardContent className="p-6">
//                     <div className="h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
//                     <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
//                     <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}

//           {/* Blog Grid */}
//           {!loading && displayedBlogs.length > 1 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {displayedBlogs.slice(1).map((post) => (
//                 <Card
//                   key={post.id}
//                   className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
//                   onClick={() => handleBlogClick(post)}
//                   data-cursor="clickable"
//                 >
//                   {post.picture && (
//                     <div className="relative h-48 overflow-hidden">
//                       <img
//                         src={post.picture}
//                         alt={post.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />
//                       <div className="absolute top-4 left-4">
//                         {/* FIXED: Added data-cursor="clickable" */}
//                         <span 
//                           className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-medium shadow-lg cursor-pointer"
//                           data-cursor="clickable"
//                         >
//                           {post.category}
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   <CardContent className="p-6">
//                     <div className="flex items-center text-sm text-gray-500 mb-3">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {formatDate(post.date)}
//                     </div>

//                     {/* FIXED: Added data-cursor="clickable" to title */}
//                     <h3 
//                       className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
//                       data-cursor="clickable"
//                     >
//                       {post.title}
//                     </h3>

//                     <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
//                       {post.description}
//                     </p>

//                     {/* FIXED: Added data-cursor="clickable" */}
//                     <div 
//                       className="flex items-center text-primary font-medium group-hover:gap-2 transition-all cursor-pointer"
//                       data-cursor="clickable"
//                     >
//                       Read More 
//                       <ChevronRight className="w-4 h-4 ml-1" />
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && displayedBlogs.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">📝</div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">No blog posts found</h3>
//               <p className="text-gray-600">
//                 {selectedCategory !== "All" 
//                   ? `No blogs in the "${selectedCategory}" category yet.`
//                   : 'Blogs will appear here once they are added via the admin panel.'
//                 }
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Blog;







// // Blog.tsx - Complete replacement with category filtering moved to bottom + page nation
// import { useState, useEffect } from 'react';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import { Calendar, ArrowLeft, Twitter, Linkedin, ChevronRight, ChevronLeft } from 'lucide-react';

// interface BlogPost {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
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
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [categories, setCategories] = useState<string[]>([]);
//   const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  
//   // NEW: Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 6;
  
//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

//   useEffect(() => {
//     loadBlogPosts();
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/api/blogs/categories`);
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(['All', ...data.categories]);
//       }
//     } catch (error) {
//       console.error('Error loading categories:', error);
//       setCategories(['All']);
//     }
//   };

//   const loadBlogPosts = async (category?: string) => {
//     try {
//       setLoading(true);
//       const url = category && category !== "All" 
//         ? `${API_BASE}/api/blogs?category=${encodeURIComponent(category)}`
//         : `${API_BASE}/api/blogs`;
      
//       const response = await fetch(url);
//       if (response.ok) {
//         const blogs = await response.json();
//         setBlogPosts(blogs);
//         setDisplayedBlogs(blogs);
//         setCurrentPage(1); // Reset to page 1 when loading new data
//         await loadCategories();
//       } else {
//         console.error('Failed to fetch blogs from API');
//         setBlogPosts([]);
//         setDisplayedBlogs([]);
//       }
//     } catch (error) {
//       console.error('Error loading blogs:', error);
//       setBlogPosts([]);
//       setDisplayedBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setSelectedPost(null);
//     setCurrentPage(1); // Reset to page 1 when changing category
//     loadBlogPosts(category);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const handleBlogClick = (post: BlogPost) => {
//     setSelectedPost(post);
//     const recent = blogPosts
//       .filter(blog => blog.id !== post.id)
//       .slice(0, 4);
//     setRecentBlogs(recent);
//   };

//   // NEW: Pagination calculations
//   const totalPages = Math.ceil(displayedBlogs.length / blogsPerPage);
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = displayedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   // NEW: Pagination handlers
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     // Scroll to grid section
//     const gridSection = document.getElementById('blog-grid');
//     if (gridSection) {
//       gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       handlePageChange(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1);
//     }
//   };

//   // NEW: Generate page numbers to display
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const maxPagesToShow = 5;

//     if (totalPages <= maxPagesToShow) {
//       // Show all pages if total is less than max
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);

//       if (currentPage > 3) {
//         pages.push('...');
//       }

//       // Show pages around current page
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push('...');
//       }

//       // Always show last page
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   // Single Blog View
//   if (selectedPost) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navigation />
        
//         <div className="pt-20 pb-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Back Button */}
//             <button
//               onClick={() => setSelectedPost(null)}
//               data-cursor="clickable"
//               className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               <span className="cursor-pointer">Back to Blogs</span>
//             </button>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//               {/* Main Content */}
//               <div className="lg:col-span-3">
//                 <Card className="overflow-hidden shadow-xl">
//                   {selectedPost.picture && (
//                     <div className="w-full h-80 overflow-hidden">
//                       <img
//                         src={selectedPost.picture}
//                         alt={selectedPost.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}

//                   <CardContent className="p-8">
//                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {formatDate(selectedPost.date)}
//                       </div>
//                       <span 
//                         className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors"
//                         data-cursor="clickable"
//                         onClick={() => handleCategoryChange(selectedPost.category)}
//                       >
//                         {selectedPost.category}
//                       </span>
//                     </div>

//                     <h1 className="text-4xl font-bold text-gray-900 mb-6">
//                       {selectedPost.title}
//                     </h1>

//                     <div className="prose max-w-none mb-8">
//                       {selectedPost.description.split('\n\n').map((paragraph, index) => (
//                         <p key={index} className="text-gray-700 leading-relaxed mb-4">
//                           {paragraph}
//                         </p>
//                       ))}
//                     </div>

//                     {/* Social Share */}
//                     <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
//                       <span className="text-sm text-gray-600 font-medium">Share this article:</span>
//                       {selectedPost.twitter_link && (
//                         <a
//                           href={selectedPost.twitter_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           data-cursor="clickable"
//                           className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
//                         >
//                           <Twitter className="w-5 h-5" />
//                         </a>
//                       )}
//                       {selectedPost.linkedin_link && (
//                         <a
//                           href={selectedPost.linkedin_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           data-cursor="clickable"
//                           className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                         >
//                           <Linkedin className="w-5 h-5" />
//                         </a>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Sidebar - Recent Posts */}
//               <div className="lg:col-span-1">
//                 <div className="sticky top-24">
//                   <Card className="p-6 shadow-lg">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
//                     <div className="space-y-4">
//                       {recentBlogs.map((blog) => (
//                         <div
//                           key={blog.id}
//                           onClick={() => handleBlogClick(blog)}
//                           data-cursor="clickable"
//                           className="cursor-pointer group"
//                         >
//                           <h4 
//                             className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1 line-clamp-2 cursor-pointer"
//                             data-cursor="clickable"
//                           >
//                             {blog.title}
//                           </h4>
//                           <div className="flex items-center gap-2 text-xs text-gray-500">
//                             <span 
//                               className="px-2 py-0.5 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors"
//                               data-cursor="clickable"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleCategoryChange(blog.category);
//                               }}
//                             >
//                               {blog.category}
//                             </span>
//                             <span>•</span>
//                             <span>{formatDate(blog.date)}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     );
//   }

//   // Blog List View
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <div className="pt-20 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Hero Section */}
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Blogs</h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Insights, innovations, and stories from the forefront of sustainable laboratory solutions
//             </p>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="flex items-center justify-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//             </div>
//           )}

//           {/* Main Content - Featured Blog + Recent Posts Side by Side */}
//           {!loading && displayedBlogs.length > 0 && (
//             <>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//                 {/* Featured Blog - 2 columns */}
//                 <div className="lg:col-span-2">
//                   <Card 
//                     className="overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
//                     onClick={() => handleBlogClick(displayedBlogs[0])}
//                     data-cursor="clickable"
//                   >
//                     {displayedBlogs[0].picture && (
//                       <div className="h-96 overflow-hidden">
//                         <img
//                           src={displayedBlogs[0].picture}
//                           alt={displayedBlogs[0].title}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                         />
//                       </div>
//                     )}
                    
//                     <div className="p-8">
//                       {/* Category and Date in small font */}
//                       <div className="flex items-center gap-3 mb-3">
//                         <span 
//                           className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium cursor-pointer hover:bg-primary/90 transition-colors"
//                           data-cursor="clickable"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleCategoryChange(displayedBlogs[0].category);
//                           }}
//                         >
//                           {displayedBlogs[0].category}
//                         </span>
//                         <div className="flex items-center text-xs text-gray-500">
//                           <Calendar className="w-3 h-3 mr-1" />
//                           {formatDate(displayedBlogs[0].date)}
//                         </div>
//                       </div>
                      
//                       {/* Title below image */}
//                       <h2 
//                         className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors cursor-pointer"
//                         data-cursor="clickable"
//                       >
//                         {displayedBlogs[0].title}
//                       </h2>
                      
//                       <p className="text-gray-600 mb-6 line-clamp-3">
//                         {displayedBlogs[0].description}
//                       </p>
                      
//                       <div 
//                         className="flex items-center text-primary font-medium group-hover:gap-3 transition-all cursor-pointer"
//                         data-cursor="clickable"
//                       >
//                         Read More 
//                         <ChevronRight className="w-5 h-5 ml-1" />
//                       </div>
//                     </div>
//                   </Card>
//                 </div>

//                 {/* Recent Posts - 1 column */}
//                 <div className="lg:col-span-1">
//                   <Card className="p-6 shadow-lg h-full">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h3>
//                     <div className="space-y-6">
//                       {displayedBlogs.slice(1, 5).map((blog) => (
//                         <div
//                           key={blog.id}
//                           onClick={() => handleBlogClick(blog)}
//                           data-cursor="clickable"
//                           className="cursor-pointer group pb-6 border-b border-gray-200 last:border-0 last:pb-0"
//                         >
//                           <h4 
//                             className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2 cursor-pointer"
//                             data-cursor="clickable"
//                           >
//                             {blog.title}
//                           </h4>
//                           <div className="flex items-center gap-2 text-xs text-gray-500">
//                             <span 
//                               className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors"
//                               data-cursor="clickable"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleCategoryChange(blog.category);
//                               }}
//                             >
//                               {blog.category}
//                             </span>
//                             <span>•</span>
//                             <span>{formatDate(blog.date)}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Card>
//                 </div>
//               </div>

//               {/* Category Filter - Below Featured Blog */}
//               <div className="flex flex-wrap justify-center gap-3 mb-12">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => handleCategoryChange(category)}
//                     data-cursor="clickable"
//                     className={`px-6 py-2.5 rounded-full font-medium transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg ${
//                       selectedCategory === category
//                         ? 'bg-primary text-white shadow-lg'
//                         : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Blog Grid with Pagination - ID for scroll target */}
//               <div id="blog-grid">
//                 <div className="flex items-center justify-between mb-8">
//                   <h2 className="text-3xl font-bold text-gray-900">
//                     {selectedCategory === "All" 
//                       ? "All Blog Posts" 
//                       : `${selectedCategory} Blog Posts`}
//                   </h2>
//                   <p className="text-gray-600">
//                     Page {currentPage} of {totalPages} • {displayedBlogs.length} total blogs
//                   </p>
//                 </div>

//                 {/* Blog Grid - Shows 6 blogs per page */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {currentBlogs.map((post) => (
//                     <Card
//                       key={post.id}
//                       className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
//                       onClick={() => handleBlogClick(post)}
//                       data-cursor="clickable"
//                     >
//                       {post.picture && (
//                         <div className="relative h-48 overflow-hidden">
//                           <img
//                             src={post.picture}
//                             alt={post.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                           />
//                           <div className="absolute top-4 left-4">
//                             <span 
//                               className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-medium shadow-lg cursor-pointer hover:bg-white transition-colors"
//                               data-cursor="clickable"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleCategoryChange(post.category);
//                               }}
//                             >
//                               {post.category}
//                             </span>
//                           </div>
//                         </div>
//                       )}

//                       <CardContent className="p-6">
//                         <div className="flex items-center text-sm text-gray-500 mb-3">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {formatDate(post.date)}
//                         </div>

//                         <h3 
//                           className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
//                           data-cursor="clickable"
//                         >
//                           {post.title}
//                         </h3>

//                         <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
//                           {post.description}
//                         </p>

//                         <div 
//                           className="flex items-center text-primary font-medium group-hover:gap-2 transition-all cursor-pointer"
//                           data-cursor="clickable"
//                         >
//                           Read More 
//                           <ChevronRight className="w-4 h-4 ml-1" />
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>

//                 {/* Pagination Controls */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-center gap-2 mt-12">
//                     {/* Previous Button */}
//                     <button
//                       onClick={handlePrevPage}
//                       disabled={currentPage === 1}
//                       data-cursor="clickable"
//                       className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
//                         currentPage === 1
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                           : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
//                       }`}
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                       Previous
//                     </button>

//                     {/* Page Numbers */}
//                     <div className="flex items-center gap-2">
//                       {getPageNumbers().map((page, index) => (
//                         page === '...' ? (
//                           <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
//                             ...
//                           </span>
//                         ) : (
//                           <button
//                             key={page}
//                             onClick={() => handlePageChange(page as number)}
//                             data-cursor="clickable"
//                             className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
//                               currentPage === page
//                                 ? 'bg-primary text-white shadow-lg'
//                                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         )
//                       ))}
//                     </div>

//                     {/* Next Button */}
//                     <button
//                       onClick={handleNextPage}
//                       disabled={currentPage === totalPages}
//                       data-cursor="clickable"
//                       className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
//                         currentPage === totalPages
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                           : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
//                       }`}
//                     >
//                       Next
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Empty State */}
//           {!loading && displayedBlogs.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">📝</div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">No blog posts found</h3>
//               <p className="text-gray-600">
//                 {selectedCategory !== "All"
//                   ? `No blogs in the "${selectedCategory}" category yet.`
//                   : 'Blogs will appear here once they are added via the admin panel.'
//                 }
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Blog;











 // Blog.tsx - Complete replacement with category filtering moved to bottom + page nation + removal of rececent blogs

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowLeft, Twitter, Linkedin, ChevronRight, ChevronLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    loadBlogPosts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/blogs/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(['All', ...data.categories]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories(['All']);
    }
  };

  const loadBlogPosts = async (category?: string) => {
    try {
      setLoading(true);
      const url = category && category !== "All" 
        ? `${API_BASE}/api/blogs?category=${encodeURIComponent(category)}`
        : `${API_BASE}/api/blogs`;
      
      const response = await fetch(url);
      if (response.ok) {
        const blogs = await response.json();
        setBlogPosts(blogs);
        setDisplayedBlogs(blogs);
        setCurrentPage(1);
        await loadCategories();
      } else {
        console.error('Failed to fetch blogs from API');
        setBlogPosts([]);
        setDisplayedBlogs([]);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogPosts([]);
      setDisplayedBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedPost(null);
    setCurrentPage(1);
    loadBlogPosts(category);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBlogClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Pagination calculations
  const totalPages = Math.ceil(displayedBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = displayedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const gridSection = document.getElementById('blog-grid');
    if (gridSection) {
      gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // Single Blog View - REMOVED RECENT POSTS SIDEBAR
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={() => setSelectedPost(null)}
              data-cursor="clickable"
              className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="cursor-pointer">Back to Blogs</span>
            </button>

            {/* Full Width Blog Content - No Sidebar */}
            <Card className="overflow-hidden shadow-xl">
              {selectedPost.picture && (
                <div className="w-full h-96 overflow-hidden">
                  <img
                    src={selectedPost.picture}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardContent className="p-12">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedPost.date)}
                  </div>
                  <span 
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                    data-cursor="clickable"
                    onClick={() => handleCategoryChange(selectedPost.category)}
                  >
                    {selectedPost.category}
                  </span>
                </div>

                <h1 className="text-5xl font-bold text-gray-900 mb-8">
                  {selectedPost.title}
                </h1>

                <div className="prose prose-lg max-w-none mb-8">
                  {selectedPost.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Social Share */}
                <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                  <span className="text-sm text-gray-600 font-medium">Share this article:</span>
                  {selectedPost.twitter_link && (
                    <a
                      href={selectedPost.twitter_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="clickable"
                      className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {selectedPost.linkedin_link && (
                    <a
                      href={selectedPost.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="clickable"
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Blog List View
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Blogs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, innovations, and stories from the forefront of sustainable laboratory solutions
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Main Content - Featured Blog + Recent Posts Side by Side */}
          {!loading && displayedBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Featured Blog - 2 columns */}
                <div className="lg:col-span-2">
                  <Card 
                    className="overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
                    onClick={() => handleBlogClick(displayedBlogs[0])}
                    data-cursor="clickable"
                  >
                    {displayedBlogs[0].picture && (
                      <div className="h-96 overflow-hidden">
                        <img
                          src={displayedBlogs[0].picture}
                          alt={displayedBlogs[0].title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span 
                          className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium cursor-pointer hover:bg-primary/90 transition-colors"
                          data-cursor="clickable"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryChange(displayedBlogs[0].category);
                          }}
                        >
                          {displayedBlogs[0].category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(displayedBlogs[0].date)}
                        </div>
                      </div>
                      
                      <h2 
                        className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors cursor-pointer"
                        data-cursor="clickable"
                      >
                        {displayedBlogs[0].title}
                      </h2>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {displayedBlogs[0].description}
                      </p>
                      
                      <div 
                        className="flex items-center text-primary font-medium group-hover:gap-3 transition-all cursor-pointer"
                        data-cursor="clickable"
                      >
                        Read More 
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Recent Posts - 1 column */}
                <div className="lg:col-span-1">
                  <Card className="p-6 shadow-lg h-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h3>
                    <div className="space-y-6">
                      {displayedBlogs.slice(1, 5).map((blog) => (
                        <div
                          key={blog.id}
                          onClick={() => handleBlogClick(blog)}
                          data-cursor="clickable"
                          className="cursor-pointer group pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                        >
                          <h4 
                            className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2 cursor-pointer"
                            data-cursor="clickable"
                          >
                            {blog.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span 
                              className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                              data-cursor="clickable"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryChange(blog.category);
                              }}
                            >
                              {blog.category}
                            </span>
                            <span>•</span>
                            <span>{formatDate(blog.date)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Category Filter - Below Featured Blog */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    data-cursor="clickable"
                    className={`px-6 py-2.5 rounded-full font-medium transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Blog Grid with Pagination */}
              <div id="blog-grid">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === "All" 
                      ? "All Blog Posts" 
                      : `${selectedCategory} Blog Posts`}
                  </h2>
                  <p className="text-gray-600">
                    Page {currentPage} of {totalPages} • {displayedBlogs.length} total blogs
                  </p>
                </div>

                {/* Blog Grid - Shows 6 blogs per page */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentBlogs.map((post) => (
                    <Card
                      key={post.id}
                      className="group bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                      onClick={() => handleBlogClick(post)}
                      data-cursor="clickable"
                    >
                      {post.picture && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.picture}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <span 
                              className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-medium shadow-lg cursor-pointer hover:bg-white transition-colors"
                              data-cursor="clickable"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryChange(post.category);
                              }}
                            >
                              {post.category}
                            </span>
                          </div>
                        </div>
                      )}

                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.date)}
                        </div>

                        <h3 
                          className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
                          data-cursor="clickable"
                        >
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {post.description}
                        </p>

                        <div 
                          className="flex items-center text-primary font-medium group-hover:gap-2 transition-all cursor-pointer"
                          data-cursor="clickable"
                        >
                          Read More 
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      data-cursor="clickable"
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page as number)}
                            data-cursor="clickable"
                            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                              currentPage === page
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      data-cursor="clickable"
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && displayedBlogs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600">
                {selectedCategory !== "All"
                  ? `No blogs in the "${selectedCategory}" category yet.`
                  : 'Blogs will appear here once they are added via the admin panel.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;


