import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Eye, Trash2, Plus, LogOut, Edit, ArrowLeft, Home } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const BlogAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({ 
    title: '', 
    description: '', 
    picture: '',
    twitter_link: 'https://x.com/biolabmate',
    linkedin_link: 'https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca'
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchBlogs(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', data.access_token);
        fetchBlogs(data.access_token);
        toast({ title: 'Login successful!', description: 'Welcome to the admin panel.' });
      } else {
        toast({ title: 'Login failed', description: 'Invalid credentials.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to connect to server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async (authToken: string) => {
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch blogs.', variant: 'destructive' });
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/admin/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Blog created and saved to MongoDB!' });
        setNewBlog({ 
          title: '', 
          description: '', 
          picture: '',
          twitter_link: 'https://x.com/biolabmate',
          linkedin_link: 'https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca'
        });
        setIsCreating(false);
        fetchBlogs(token);
      } else {
        toast({ title: 'Error', description: 'Failed to create blog.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create blog.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/admin/blogs/${editingBlog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editingBlog.title,
          description: editingBlog.description,
          picture: editingBlog.picture,
          twitter_link: editingBlog.twitter_link,
          linkedin_link: editingBlog.linkedin_link
        }),
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Blog updated in MongoDB!' });
        setEditingBlog(null);
        fetchBlogs(token);
      } else {
        toast({ title: 'Error', description: 'Failed to update blog.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update blog.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`${API_BASE}/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Blog deleted from MongoDB!' });
        fetchBlogs(token);
      } else {
        toast({ title: 'Error', description: 'Failed to delete blog.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete blog.', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    localStorage.removeItem('adminToken');
    toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
  };

  const goToBlogs = () => {
    window.open('http://localhost:8080/blog', '_blank');
  };

  const goToHomePage = () => {
    window.open('http://localhost:8080', '_blank');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">🧪 BioLabMate Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login to Admin Panel'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header with Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">🧪 Blog Admin Panel</h1>
              <p className="text-gray-600">Manage your blog posts • MongoDB Atlas</p>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={goToHomePage} variant="outline" className="bg-white">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button onClick={goToBlogs} variant="outline" className="bg-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Blog
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">{blogs.length}</h3>
                  <p className="text-gray-600">Total Blogs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600"> </h3>
                  <p className="text-gray-600">MongoDB Connected</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600">Live</h3>
                  <p className="text-gray-600">System Status</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create New Blog Form */}
          {isCreating && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-green-600">📝 Create New Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateBlog} className="space-y-4">
                  <Input
                    placeholder="Blog Title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={newBlog.picture}
                    onChange={(e) => setNewBlog({...newBlog, picture: e.target.value})}
                  />
                  <Input
                    placeholder="Twitter Link"
                    value={newBlog.twitter_link}
                    onChange={(e) => setNewBlog({...newBlog, twitter_link: e.target.value})}
                  />
                  <Input
                    placeholder="LinkedIn Link"
                    value={newBlog.linkedin_link}
                    onChange={(e) => setNewBlog({...newBlog, linkedin_link: e.target.value})}
                  />
                  <Textarea
                    placeholder="Blog Content"
                    value={newBlog.description}
                    onChange={(e) => setNewBlog({...newBlog, description: e.target.value})}
                    rows={10}
                    required
                  />
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                      {loading ? 'Creating...' : 'Create & Save to MongoDB'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Edit Blog Form */}
          {editingBlog && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-orange-600">✏️ Edit Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateBlog} className="space-y-4">
                  <Input
                    placeholder="Blog Title"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={editingBlog.picture || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, picture: e.target.value})}
                  />
                  <Input
                    placeholder="Twitter Link"
                    value={editingBlog.twitter_link || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, twitter_link: e.target.value})}
                  />
                  <Input
                    placeholder="LinkedIn Link"
                    value={editingBlog.linkedin_link || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, linkedin_link: e.target.value})}
                  />
                  <Textarea
                    placeholder="Blog Content"
                    value={editingBlog.description}
                    onChange={(e) => setEditingBlog({...editingBlog, description: e.target.value})}
                    rows={10}
                    required
                  />
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
                      {loading ? 'Updating...' : 'Update in MongoDB'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditingBlog(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Blogs List */}
          <div className="grid gap-4">
            {blogs.map((blog: any) => (
              <Card key={blog.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">MongoDB</span>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {blog.description.length > 150
                          ? `${blog.description.substring(0, 150)}...`
                          : blog.description
                        }
                      </p>
                      <p className="text-sm text-gray-500">Created: {new Date(blog.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingBlog(blog)}
                        className="bg-orange-50 hover:bg-orange-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {blogs.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No blog posts found. Create your first blog post!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogAdmin;






// // export default BlogAdmin;
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/hooks/use-toast';
// import { Eye, Trash2, Plus, LogOut, Edit, ArrowLeft, Home } from 'lucide-react';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';

// const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// const BlogAdmin = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState('');
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loginData, setLoginData] = useState({ username: '', password: '' });
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [newBlog, setNewBlog] = useState({ title: '', description: '', picture: '' });
//   const { toast } = useToast();

//   useEffect(() => {
//     const savedToken = localStorage.getItem('adminToken');
//     if (savedToken) {
//       setToken(savedToken);
//       setIsLoggedIn(true);
//       fetchBlogs(savedToken);
//     }
//   }, []);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await fetch(`${API_BASE}/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setToken(data.access_token);
//         setIsLoggedIn(true);
//         localStorage.setItem('adminToken', data.access_token);
//         fetchBlogs(data.access_token);
//         toast({ title: 'Login successful!', description: 'Welcome to the admin panel.' });
//       } else {
//         toast({ title: 'Login failed', description: 'Invalid credentials.', variant: 'destructive' });
//       }
//     } catch (error) {
//       toast({ title: 'Error', description: 'Failed to connect to server.', variant: 'destructive' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBlogs = async (authToken: string) => {
//     try {
//       const response = await fetch(`${API_BASE}/blogs`);
//       if (response.ok) {
//         const data = await response.json();
//         setBlogs(data);
//       }
//     } catch (error) {
//       toast({ title: 'Error', description: 'Failed to fetch blogs.', variant: 'destructive' });
//     }
//   };

//   const handleCreateBlog = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_BASE}/admin/blogs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(newBlog),
//       });

//       if (response.ok) {
//         toast({ title: 'Success', description: 'Blog created and saved to MongoDB!' });
//         setNewBlog({ title: '', description: '', picture: '' });
//         setIsCreating(false);
//         fetchBlogs(token);
//       } else {
//         toast({ title: 'Error', description: 'Failed to create blog.', variant: 'destructive' });
//       }
//     } catch (error) {
//       toast({ title: 'Error', description: 'Failed to create blog.', variant: 'destructive' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateBlog = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingBlog) return;
    
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_BASE}/admin/blogs/${editingBlog.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           title: editingBlog.title,
//           description: editingBlog.description,
//           picture: editingBlog.picture
//         }),
//       });

//       if (response.ok) {
//         toast({ title: 'Success', description: 'Blog updated in MongoDB!' });
//         setEditingBlog(null);
//         fetchBlogs(token);
//       } else {
//         toast({ title: 'Error', description: 'Failed to update blog.', variant: 'destructive' });
//       }
//     } catch (error) {
//       toast({ title: 'Error', description: 'Failed to update blog.', variant: 'destructive' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteBlog = async (blogId: string) => {
//     if (!confirm('Are you sure you want to delete this blog post?')) return;

//     try {
//       const response = await fetch(`${API_BASE}/admin/blogs/${blogId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         toast({ title: 'Success', description: 'Blog deleted from MongoDB!' });
//         fetchBlogs(token);
//       } else {
//         toast({ title: 'Error', description: 'Failed to delete blog.', variant: 'destructive' });
//       }
//     } catch (error) {
//       toast({ title: 'Error', description: 'Failed to delete blog.', variant: 'destructive' });
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setToken('');
//     localStorage.removeItem('adminToken');
//     toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
//   };

//   const goToBlogs = () => {
//     window.open('http://localhost:8080/blog', '_blank');
//   };

//   const goToHomePage = () => {
//     window.open('http://localhost:8080', '_blank');
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
//         <Navigation />
//         <div className="flex items-center justify-center min-h-screen">
//           <Card className="w-full max-w-md">
//             <CardHeader>
//               <CardTitle className="text-center"> BioLabMate Admin Login</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <Input
//                   type="text"
//                   placeholder="Username"
//                   value={loginData.username}
//                   onChange={(e) => setLoginData({...loginData, username: e.target.value})}
//                   required
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Password"
//                   value={loginData.password}
//                   onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//                   required
//                 />
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? 'Logging in...' : 'Login to Admin Panel'}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
//       <Navigation />
      
//       {/* Fixed spacing to start content below navigation */}
//       <div className="pt-24 pb-8">
//         <div className="container mx-auto px-4">
//           {/* Header with Navigation */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold">🧪 Blog Admin Panel</h1>
//               <p className="text-gray-600">Manage your blog posts • MongoDB Atlas</p>
//             </div>
            
//             {/* Navigation Buttons */}
//             <div className="flex space-x-2">
//               <Button onClick={goToHomePage} variant="outline" className="bg-white">
//                 <Home className="w-4 h-4 mr-2" />
//                 Home
//               </Button>
//               <Button onClick={goToBlogs} variant="outline" className="bg-white">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Blogs
//               </Button>
//               <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Blog
//               </Button>
//               <Button onClick={handleLogout} variant="outline">
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <h3 className="text-2xl font-bold text-blue-600">{blogs.length}</h3>
//                   <p className="text-gray-600">Total Blogs</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <h3 className="text-2xl font-bold text-green-600"> </h3>
//                   <p className="text-gray-600">MongoDB Connected</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-4">
//                 <div className="text-center">
//                   <h3 className="text-2xl font-bold text-purple-600">Live</h3>
//                   <p className="text-gray-600">System Status</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Create New Blog Form */}
//           {isCreating && (
//             <Card className="mb-6">
//               <CardHeader>
//                 <CardTitle className="text-green-600">📝 Create New Blog Post</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleCreateBlog} className="space-y-4">
//                   <Input
//                     placeholder="Blog Title"
//                     value={newBlog.title}
//                     onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
//                     required
//                   />
//                   <Input
//                     placeholder="Image URL (optional)"
//                     value={newBlog.picture}
//                     onChange={(e) => setNewBlog({...newBlog, picture: e.target.value})}
//                   />
//                   <Textarea
//                     placeholder="Blog Content"
//                     value={newBlog.description}
//                     onChange={(e) => setNewBlog({...newBlog, description: e.target.value})}
//                     rows={10}
//                     required
//                   />
//                   <div className="flex space-x-2">
//                     <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
//                       {loading ? 'Creating...' : 'Create & Save to MongoDB'}
//                     </Button>
//                     <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
//                       Cancel
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           )}

//           {/* Edit Blog Form */}
//           {editingBlog && (
//             <Card className="mb-6">
//               <CardHeader>
//                 <CardTitle className="text-orange-600">✏️ Edit Blog Post</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleUpdateBlog} className="space-y-4">
//                   <Input
//                     placeholder="Blog Title"
//                     value={editingBlog.title}
//                     onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
//                     required
//                   />
//                   <Input
//                     placeholder="Image URL (optional)"
//                     value={editingBlog.picture || ''}
//                     onChange={(e) => setEditingBlog({...editingBlog, picture: e.target.value})}
//                   />
//                   <Textarea
//                     placeholder="Blog Content"
//                     value={editingBlog.description}
//                     onChange={(e) => setEditingBlog({...editingBlog, description: e.target.value})}
//                     rows={10}
//                     required
//                   />
//                   <div className="flex space-x-2">
//                     <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
//                       {loading ? 'Updating...' : 'Update in MongoDB'}
//                     </Button>
//                     <Button type="button" variant="outline" onClick={() => setEditingBlog(null)}>
//                       Cancel
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           )}

//           {/* Blogs List */}
//           <div className="grid gap-4">
//             {blogs.map((blog: any) => (
//               <Card key={blog.id}>
//                 <CardContent className="p-6">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <h3 className="text-xl font-semibold">{blog.title}</h3>
//                         <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">MongoDB</span>
//                       </div>
//                       <p className="text-gray-600 mb-2">
//                         {blog.description.length > 150
//                           ? `${blog.description.substring(0, 150)}...`
//                           : blog.description
//                         }
//                       </p>
//                       <p className="text-sm text-gray-500">Created: {new Date(blog.created_at).toLocaleDateString()}</p>
//                     </div>
//                     <div className="flex space-x-2 ml-4">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => setEditingBlog(blog)}
//                         className="bg-orange-50 hover:bg-orange-100"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="destructive"
//                         onClick={() => handleDeleteBlog(blog.id)}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {blogs.length === 0 && (
//             <Card>
//               <CardContent className="text-center py-8">
//                 <p className="text-gray-500">No blog posts found. Create your first blog post!</p>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default BlogAdmin;