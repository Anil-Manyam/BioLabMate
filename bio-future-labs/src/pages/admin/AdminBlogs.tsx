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
//   const [newBlog, setNewBlog] = useState({ 
//     title: '', 
//     description: '', 
//     picture: '',
//     twitter_link: 'https://x.com/biolabmate',
//     linkedin_link: 'https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca'
//   });
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
//         setNewBlog({ 
//           title: '', 
//           description: '', 
//           picture: '',
//           twitter_link: 'https://x.com/biolabmate',
//           linkedin_link: 'https://www.linkedin.com/company/biolabmate/?originalSubdomain=ca'
//         });
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
//           picture: editingBlog.picture,
//           twitter_link: editingBlog.twitter_link,
//           linkedin_link: editingBlog.linkedin_link
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
//               <CardTitle className="text-center">🧪 BioLabMate Admin Login</CardTitle>
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
      
//       <div className="pt-24 pb-8">
//         <div className="container mx-auto px-4">
//           {/* Header with Navigation */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold">🧪 Blog Admin Panel</h1>
//               <p className="text-gray-600">Manage your blog posts • MongoDB Atlas</p>
//             </div>
            
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
//                   <h3 className="text-2xl font-bold text-green-600">✅</h3>
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
//                   <Input
//                     placeholder="Twitter Link"
//                     value={newBlog.twitter_link}
//                     onChange={(e) => setNewBlog({...newBlog, twitter_link: e.target.value})}
//                   />
//                   <Input
//                     placeholder="LinkedIn Link"
//                     value={newBlog.linkedin_link}
//                     onChange={(e) => setNewBlog({...newBlog, linkedin_link: e.target.value})}
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
//                   <Input
//                     placeholder="Twitter Link"
//                     value={editingBlog.twitter_link || ''}
//                     onChange={(e) => setEditingBlog({...editingBlog, twitter_link: e.target.value})}
//                   />
//                   <Input
//                     placeholder="LinkedIn Link"
//                     value={editingBlog.linkedin_link || ''}
//                     onChange={(e) => setEditingBlog({...editingBlog, linkedin_link: e.target.value})}
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






// // // export default BlogAdmin;
// // import React, { useState, useEffect } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { useToast } from '@/hooks/use-toast';
// // import { Eye, Trash2, Plus, LogOut, Edit, ArrowLeft, Home } from 'lucide-react';
// // import Navigation from '@/components/Navigation';
// // import Footer from '@/components/Footer';

// // const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// // const BlogAdmin = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [token, setToken] = useState('');
// //   const [blogs, setBlogs] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [loginData, setLoginData] = useState({ username: '', password: '' });
// //   const [isCreating, setIsCreating] = useState(false);
// //   const [editingBlog, setEditingBlog] = useState(null);
// //   const [newBlog, setNewBlog] = useState({ title: '', description: '', picture: '' });
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     const savedToken = localStorage.getItem('adminToken');
// //     if (savedToken) {
// //       setToken(savedToken);
// //       setIsLoggedIn(true);
// //       fetchBlogs(savedToken);
// //     }
// //   }, []);

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     try {
// //       const response = await fetch(`${API_BASE}/admin/login`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(loginData),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setToken(data.access_token);
// //         setIsLoggedIn(true);
// //         localStorage.setItem('adminToken', data.access_token);
// //         fetchBlogs(data.access_token);
// //         toast({ title: 'Login successful!', description: 'Welcome to the admin panel.' });
// //       } else {
// //         toast({ title: 'Login failed', description: 'Invalid credentials.', variant: 'destructive' });
// //       }
// //     } catch (error) {
// //       toast({ title: 'Error', description: 'Failed to connect to server.', variant: 'destructive' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchBlogs = async (authToken: string) => {
// //     try {
// //       const response = await fetch(`${API_BASE}/blogs`);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setBlogs(data);
// //       }
// //     } catch (error) {
// //       toast({ title: 'Error', description: 'Failed to fetch blogs.', variant: 'destructive' });
// //     }
// //   };

// //   const handleCreateBlog = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const response = await fetch(`${API_BASE}/admin/blogs`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(newBlog),
// //       });

// //       if (response.ok) {
// //         toast({ title: 'Success', description: 'Blog created and saved to MongoDB!' });
// //         setNewBlog({ title: '', description: '', picture: '' });
// //         setIsCreating(false);
// //         fetchBlogs(token);
// //       } else {
// //         toast({ title: 'Error', description: 'Failed to create blog.', variant: 'destructive' });
// //       }
// //     } catch (error) {
// //       toast({ title: 'Error', description: 'Failed to create blog.', variant: 'destructive' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUpdateBlog = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!editingBlog) return;
    
// //     setLoading(true);

// //     try {
// //       const response = await fetch(`${API_BASE}/admin/blogs/${editingBlog.id}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify({
// //           title: editingBlog.title,
// //           description: editingBlog.description,
// //           picture: editingBlog.picture
// //         }),
// //       });

// //       if (response.ok) {
// //         toast({ title: 'Success', description: 'Blog updated in MongoDB!' });
// //         setEditingBlog(null);
// //         fetchBlogs(token);
// //       } else {
// //         toast({ title: 'Error', description: 'Failed to update blog.', variant: 'destructive' });
// //       }
// //     } catch (error) {
// //       toast({ title: 'Error', description: 'Failed to update blog.', variant: 'destructive' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteBlog = async (blogId: string) => {
// //     if (!confirm('Are you sure you want to delete this blog post?')) return;

// //     try {
// //       const response = await fetch(`${API_BASE}/admin/blogs/${blogId}`, {
// //         method: 'DELETE',
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });

// //       if (response.ok) {
// //         toast({ title: 'Success', description: 'Blog deleted from MongoDB!' });
// //         fetchBlogs(token);
// //       } else {
// //         toast({ title: 'Error', description: 'Failed to delete blog.', variant: 'destructive' });
// //       }
// //     } catch (error) {
// //       toast({ title: 'Error', description: 'Failed to delete blog.', variant: 'destructive' });
// //     }
// //   };

// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     setToken('');
// //     localStorage.removeItem('adminToken');
// //     toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
// //   };

// //   const goToBlogs = () => {
// //     window.open('http://localhost:8080/blog', '_blank');
// //   };

// //   const goToHomePage = () => {
// //     window.open('http://localhost:8080', '_blank');
// //   };

// //   if (!isLoggedIn) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
// //         <Navigation />
// //         <div className="flex items-center justify-center min-h-screen">
// //           <Card className="w-full max-w-md">
// //             <CardHeader>
// //               <CardTitle className="text-center"> BioLabMate Admin Login</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <form onSubmit={handleLogin} className="space-y-4">
// //                 <Input
// //                   type="text"
// //                   placeholder="Username"
// //                   value={loginData.username}
// //                   onChange={(e) => setLoginData({...loginData, username: e.target.value})}
// //                   required
// //                 />
// //                 <Input
// //                   type="password"
// //                   placeholder="Password"
// //                   value={loginData.password}
// //                   onChange={(e) => setLoginData({...loginData, password: e.target.value})}
// //                   required
// //                 />
// //                 <Button type="submit" className="w-full" disabled={loading}>
// //                   {loading ? 'Logging in...' : 'Login to Admin Panel'}
// //                 </Button>
// //               </form>
// //             </CardContent>
// //           </Card>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
// //       <Navigation />
      
// //       {/* Fixed spacing to start content below navigation */}
// //       <div className="pt-24 pb-8">
// //         <div className="container mx-auto px-4">
// //           {/* Header with Navigation */}
// //           <div className="flex justify-between items-center mb-6">
// //             <div>
// //               <h1 className="text-3xl font-bold">🧪 Blog Admin Panel</h1>
// //               <p className="text-gray-600">Manage your blog posts • MongoDB Atlas</p>
// //             </div>
            
// //             {/* Navigation Buttons */}
// //             <div className="flex space-x-2">
// //               <Button onClick={goToHomePage} variant="outline" className="bg-white">
// //                 <Home className="w-4 h-4 mr-2" />
// //                 Home
// //               </Button>
// //               <Button onClick={goToBlogs} variant="outline" className="bg-white">
// //                 <ArrowLeft className="w-4 h-4 mr-2" />
// //                 Back to Blogs
// //               </Button>
// //               <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
// //                 <Plus className="w-4 h-4 mr-2" />
// //                 Add New Blog
// //               </Button>
// //               <Button onClick={handleLogout} variant="outline">
// //                 <LogOut className="w-4 h-4 mr-2" />
// //                 Logout
// //               </Button>
// //             </div>
// //           </div>

// //           {/* Stats */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //             <Card>
// //               <CardContent className="p-4">
// //                 <div className="text-center">
// //                   <h3 className="text-2xl font-bold text-blue-600">{blogs.length}</h3>
// //                   <p className="text-gray-600">Total Blogs</p>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardContent className="p-4">
// //                 <div className="text-center">
// //                   <h3 className="text-2xl font-bold text-green-600">✅</h3>
// //                   <p className="text-gray-600">MongoDB Connected</p>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardContent className="p-4">
// //                 <div className="text-center">
// //                   <h3 className="text-2xl font-bold text-purple-600">Live</h3>
// //                   <p className="text-gray-600">System Status</p>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Create New Blog Form */}
// //           {isCreating && (
// //             <Card className="mb-6">
// //               <CardHeader>
// //                 <CardTitle className="text-green-600">📝 Create New Blog Post</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleCreateBlog} className="space-y-4">
// //                   <Input
// //                     placeholder="Blog Title"
// //                     value={newBlog.title}
// //                     onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
// //                     required
// //                   />
// //                   <Input
// //                     placeholder="Image URL (optional)"
// //                     value={newBlog.picture}
// //                     onChange={(e) => setNewBlog({...newBlog, picture: e.target.value})}
// //                   />
// //                   <Textarea
// //                     placeholder="Blog Content"
// //                     value={newBlog.description}
// //                     onChange={(e) => setNewBlog({...newBlog, description: e.target.value})}
// //                     rows={10}
// //                     required
// //                   />
// //                   <div className="flex space-x-2">
// //                     <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
// //                       {loading ? 'Creating...' : 'Create & Save to MongoDB'}
// //                     </Button>
// //                     <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
// //                       Cancel
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </CardContent>
// //             </Card>
// //           )}

// //           {/* Edit Blog Form */}
// //           {editingBlog && (
// //             <Card className="mb-6">
// //               <CardHeader>
// //                 <CardTitle className="text-orange-600">✏️ Edit Blog Post</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleUpdateBlog} className="space-y-4">
// //                   <Input
// //                     placeholder="Blog Title"
// //                     value={editingBlog.title}
// //                     onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
// //                     required
// //                   />
// //                   <Input
// //                     placeholder="Image URL (optional)"
// //                     value={editingBlog.picture || ''}
// //                     onChange={(e) => setEditingBlog({...editingBlog, picture: e.target.value})}
// //                   />
// //                   <Textarea
// //                     placeholder="Blog Content"
// //                     value={editingBlog.description}
// //                     onChange={(e) => setEditingBlog({...editingBlog, description: e.target.value})}
// //                     rows={10}
// //                     required
// //                   />
// //                   <div className="flex space-x-2">
// //                     <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
// //                       {loading ? 'Updating...' : 'Update in MongoDB'}
// //                     </Button>
// //                     <Button type="button" variant="outline" onClick={() => setEditingBlog(null)}>
// //                       Cancel
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </CardContent>
// //             </Card>
// //           )}

// //           {/* Blogs List */}
// //           <div className="grid gap-4">
// //             {blogs.map((blog: any) => (
// //               <Card key={blog.id}>
// //                 <CardContent className="p-6">
// //                   <div className="flex justify-between items-start">
// //                     <div className="flex-1">
// //                       <div className="flex items-center gap-2 mb-2">
// //                         <h3 className="text-xl font-semibold">{blog.title}</h3>
// //                         <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">MongoDB</span>
// //                       </div>
// //                       <p className="text-gray-600 mb-2">
// //                         {blog.description.length > 150
// //                           ? `${blog.description.substring(0, 150)}...`
// //                           : blog.description
// //                         }
// //                       </p>
// //                       <p className="text-sm text-gray-500">Created: {new Date(blog.created_at).toLocaleDateString()}</p>
// //                     </div>
// //                     <div className="flex space-x-2 ml-4">
// //                       <Button 
// //                         size="sm" 
// //                         variant="outline"
// //                         onClick={() => setEditingBlog(blog)}
// //                         className="bg-orange-50 hover:bg-orange-100"
// //                       >
// //                         <Edit className="w-4 h-4" />
// //                       </Button>
// //                       <Button 
// //                         size="sm" 
// //                         variant="destructive"
// //                         onClick={() => handleDeleteBlog(blog.id)}
// //                       >
// //                         <Trash2 className="w-4 h-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>

// //           {blogs.length === 0 && (
// //             <Card>
// //               <CardContent className="text-center py-8">
// //                 <p className="text-gray-500">No blog posts found. Create your first blog post!</p>
// //               </CardContent>
// //             </Card>
// //           )}
// //         </div>
// //       </div>
      
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default BlogAdmin;

















// AdminBlogs.tsx - Enhanced blog management component (replaces BlogAdmin.tsx)
import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  FileText, 
  Image, 
  ExternalLink,
  Search,
  Filter,
  Eye,
  Twitter,
  Linkedin
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
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
    
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingBlog 
        ? `${import.meta.env.VITE_API_BASE_URL}/admin/blogs/${editingBlog.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/admin/blogs`;
      
      const method = editingBlog ? 'PUT' : 'POST';
      
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-2 text-gray-600">Create and manage your blog content</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Blog Post</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Blog Image */}
            {blog.picture && (
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.picture}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    {blog.author_name && (
                      <div className="flex items-center">
                        <span>by {blog.author_name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description Preview */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {blog.description}
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-2 mb-4">
                {blog.twitter_link && (
                  <a
                    href={blog.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200"
                    title="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
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
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
                
                <a
                  href={`/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search' : 'Get started by creating your first blog post'}
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
          >
            Create Blog Post
          </button>
        </div>
      )}

      {/* Blog Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Use \n\n for paragraph breaks in your content
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <div className="mt-2">
                      <img
                        src={formData.picture}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    {editingBlog ? 'Update' : 'Publish'} Blog Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;