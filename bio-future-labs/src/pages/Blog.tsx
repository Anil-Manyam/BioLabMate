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

  const totalPages = Math.ceil(displayedBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = displayedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
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

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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


