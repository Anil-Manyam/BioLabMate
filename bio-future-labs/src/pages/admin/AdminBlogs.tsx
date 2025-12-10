import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Search,
  Eye,
  Twitter,
  Linkedin,
  Tag
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;  
  date: string;
  picture?: string;
  twitter_link?: string;
  linkedin_link?: string;
  created_at: string;
  author_id?: string;
  author_name?: string;
}


interface BlogForm {
  title: string;
  description: string;
  category: string; 
  picture: string;
  twitter_link: string;
  linkedin_link: string;
}

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    description: "",
    category: "Pollution", 
    picture: "",
    twitter_link: "https://x.com/biolabmate",
    linkedin_link: "https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca"
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.category || formData.category.trim() === "") {
      setError("Category is required");
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const url = editingBlog
        ? `${import.meta.env.VITE_API_BASE_URL}/admin/blogs/${editingBlog.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/admin/blogs`;

      const method = editingBlog ? 'PUT' : 'POST';

      console.log('Sending to backend:', formData); 

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),  
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save blog post');
      }

      const result = await response.json();
      console.log('Backend response:', result);

      await fetchBlogs();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      setError(error instanceof Error ? error.message : 'Failed to save blog post');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the blog post "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      await fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      category: blog.category || "Pollution",  
      picture: blog.picture || "",
      twitter_link: blog.twitter_link || "https://x.com/biolabmate",
      linkedin_link: blog.linkedin_link || "https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca"
    });
    setError("");
    setShowModal(true);
  };
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Pollution", 
      picture: "",
      twitter_link: "https://x.com/biolabmate",
      linkedin_link: "https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca"
    });
    setEditingBlog(null);
    setError("");
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <p className="text-gray-600 mt-2">Create and manage your blog content</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Post
        </button>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Blog Image */}
            {blog.picture && (
              <div className="h-48 overflow-hidden bg-gray-200">
                <img
                  src={blog.picture}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {/* Header with Category */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  {/* FIXED: Display category badge */}
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {blog.category || 'uncategorized'}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blog.date).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {blog.title}
                </h3>

                {blog.author_name && (
                  <p className="text-sm text-gray-500 mt-1">
                    by {blog.author_name}
                  </p>
                )}
              </div>

              {/* Description Preview */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {blog.description}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2 mb-4">
                {blog.twitter_link && (
                  <a
                    href={blog.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {blog.linkedin_link && (
                  <a
                    href={blog.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <a
                  href={`/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Live
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? 'Try adjusting your search'
                : 'Get started by creating your first blog post'}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter category (e.g., Pollution, innovation, sustainability)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be used to filter blogs on the blog page
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    required
                    rows={12}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Write your blog post content here..."
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tip: Use \n\n for paragraph breaks in your content
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.picture}
                    onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.picture && (
                    <img
                      src={formData.picture}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Link
                    </label>
                    <input
                      type="url"
                      value={formData.twitter_link}
                      onChange={(e) => setFormData({ ...formData, twitter_link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://x.com/biolabmate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Link
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin_link}
                      onChange={(e) => setFormData({ ...formData, linkedin_link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://www.linkedin.com/company/biolabmate"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingBlog ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
