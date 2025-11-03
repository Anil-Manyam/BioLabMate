// // AdminLayout.tsx - Main admin panel layout with navigation
// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   FileText, 
//   Users, 
//   UserCog, 
//   MapPin, 
//   MessageSquare, 
//   LogOut,
//   Menu,
//   X
// } from "lucide-react";

// interface User {
//   username: string;
//   full_name: string;
//   role: string;
//   email: string;
// }

// const AdminLayout: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     checkAuthentication();
//   }, []);

//   const checkAuthentication = () => {
//     const token = localStorage.getItem('admin_token');
//     const userData = localStorage.getItem('admin_user');
    
//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         handleLogout();
//       }
//     } else {
//       navigate('/admin/login');
//     }
//     setLoading(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('admin_token');
//     localStorage.removeItem('admin_user');
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate('/admin/login');
//   };

//   const navigation = [
//     { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
//     { name: 'Blogs', href: '/admin/blogs', icon: FileText },
//     { name: 'Team Members', href: '/admin/team', icon: Users },
//     { name: 'Users', href: '/admin/users', icon: UserCog, adminOnly: true },
//     { name: 'Journey', href: '/admin/milestones', icon: MapPin },
//     { name: 'Contacts', href: '/admin/contacts', icon: MessageSquare },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
//         <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
//           <div className="flex items-center">
//             <img 
//               src="/src/assets/Logo.jpg" 
//               alt="BioLabMate" 
//               className="h-8 w-auto"
//             />
//             <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
//           </div>
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="lg:hidden"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <nav className="mt-8">
//           <div className="px-4 space-y-2">
//             {navigation.map((item) => {
//               // Hide admin-only items for non-super admins
//               if (item.adminOnly && user?.role !== 'super_admin') {
//                 return null;
//               }

//               const isActive = location.pathname === item.href || (item.href === '/admin/dashboard' && location.pathname === '/admin');
//               const Icon = item.icon;
              
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-primary text-white'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <Icon className="mr-3 h-5 w-5" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>

//         {/* User info at bottom */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
//                 <span className="text-white text-sm font-medium">
//                   {user?.username?.[0]?.toUpperCase()}
//                 </span>
//               </div>
//             </div>
//             <div className="ml-3 flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {user?.full_name || user?.username}
//               </p>
//               <p className="text-xs text-gray-500 capitalize">
//                 {user?.role?.replace('_', ' ')}
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="ml-2 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500"
//               title="Logout"
//             >
//               <LogOut className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
//         {/* Top header */}
//         <header className="bg-white shadow-sm border-b border-gray-200">
//           <div className="flex items-center justify-between h-16 px-6">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="lg:hidden mr-4"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 BioLabMate Admin Panel
//               </h1>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="text-sm text-gray-500">
//                 Welcome back, {user?.full_name || user?.username}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminLayout;








// // AdminLayout.tsx - Admin layout with auto-logout functionality and reload logout
// import React, { useEffect, useState } from 'react';
// import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Users,
//   Calendar,
//   Mail,
//   FileText,
//   LogOut,
//   Menu,
//   X,
//   AlertCircle,
// } from 'lucide-react';
// import { useAutoLogout } from '@/hooks/useAutoLogout';

// const AdminLayout: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showWarning, setShowWarning] = useState(false);

//   // // 1) Force logout on full page reload while in admin area
//   // useEffect(() => {
//   //   // A simple guard: if a token exists when AdminLayout mounts, clear it and redirect.
//   //   // This treats a fresh mount (e.g., hard reload) as a condition to require re-login.
//   //   if (localStorage.getItem('admin_token')) {
//   //     localStorage.removeItem('admin_token');
//   //     navigate('/admin/login', { replace: true, state: { message: 'Logged out due to page reload.' } });
//   //   }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   // 2) Auto-logout after 15 minutes of inactivity.
//   // Warning stays visible until user activity occurs (no auto-hide timeout).
//   useAutoLogout({
//     timeoutMinutes: 15,
//     warningMinutes: 2,
//     onWarning: () => {
//       setShowWarning(true); // keep shown until movement
//     },
//     onLogout: () => {
//       console.log('Admin logged out due to inactivity');
//     },
//   });

//   // Hide warning banner on any user activity
//   useEffect(() => {
//     const clearWarningOnActivity = () => setShowWarning(false);
//     const events = ['mousedown','mousemove','keypress','scroll','touchstart','click'];
//     events.forEach(ev => document.addEventListener(ev, clearWarningOnActivity));
//     return () => {
//       events.forEach(ev => document.removeEventListener(ev, clearWarningOnActivity));
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('admin_token');
//     navigate('/admin/login');
//   };

//   const navItems = [
//     { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
//     { path: '/admin/team', icon: Users, label: 'Team Members' },
//     { path: '/admin/milestones', icon: Calendar, label: 'Journey' },
//     { path: '/admin/blogs', icon: FileText, label: 'Blogs' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
//     { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
//   ];

//   const isActive = (path: string, exact = false) => {
//     if (exact) {
//       return location.pathname === path;
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Inactivity Warning Banner (persistent until activity) */}
//       {showWarning && (
//         <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-3 shadow-lg">
//           <div className="container mx-auto flex items-center justify-center space-x-2">
//             <AlertCircle className="w-5 h-5" />
//             <p className="font-medium">
//               ⚠️ You will be logged out in 2 minutes due to inactivity. Move your mouse or press a key to stay logged in.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0 bg-gray-900 border-r border-gray-800`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-800">
//             <Link to="/admin" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">B</span>
//               </div>
//               <span className="text-white font-bold text-xl">BioLabMate</span>
//             </Link>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="md:hidden text-gray-400 hover:text-white"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto py-4">
//             <div className="px-3 space-y-1">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const active = isActive(item.path, item.exact);
//                 return (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     onClick={() => setSidebarOpen(false)}
//                     className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                       active
//                         ? 'bg-blue-600 text-white'
//                         : 'text-gray-400 hover:text-white hover:bg-gray-800'
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* User Info & Logout */}
//           <div className="p-4 border-t border-gray-800">
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
//                   <span className="text-white font-medium">A</span>
//                 </div>
//                 <div>
//                   <p className="text-white font-medium text-sm">Admin</p>
//                   <p className="text-gray-400 text-xs">Super Admin</p>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Logout</span>
//             </button>
//             <p className="text-xs text-gray-500 mt-2 text-center">
//               Auto-logout after 15min inactivity
//             </p>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setSidebarOpen(true)}
//         className="fixed top-4 left-4 z-30 md:hidden bg-gray-900 text-white p-2 rounded-lg shadow-lg"
//       >
//         <Menu className="w-6 h-6" />
//       </button>

//       {/* Main Content */}
//       <main className="md:ml-64 min-h-screen">
//         <div className="p-4 md:p-8">
//           <Outlet />
//         </div>
//       </main>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminLayout;









// AdminLayout.tsx - Admin layout with auto-logout functionality and reload logout & UPDATED WITH PRODUCTS NAVIGATION

import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
  AlertCircle,
  Package,  // ✅ ADDED: Import Package icon for Products
} from 'lucide-react';
import { useAutoLogout } from '@/hooks/useAutoLogout';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // // 1) Force logout on full page reload while in admin area
  // useEffect(() => {
  //   // A simple guard: if a token exists when AdminLayout mounts, clear it and redirect.
  //   // This treats a fresh mount (e.g., hard reload) as a condition to require re-login.
  //   if (localStorage.getItem('admin_token')) {
  //     localStorage.removeItem('admin_token');
  //     navigate('/admin/login', { replace: true, state: { message: 'Logged out due to page reload.' } });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 2) Auto-logout after 15 minutes of inactivity.
  // Warning stays visible until user activity occurs (no auto-hide timeout).
  useAutoLogout({
    timeoutMinutes: 15,
    warningMinutes: 2,
    onWarning: () => {
      setShowWarning(true); // keep shown until movement
    },
    onLogout: () => {
      console.log('Admin logged out due to inactivity');
    },
  });

  // Hide warning banner on any user activity
  useEffect(() => {
    const clearWarningOnActivity = () => setShowWarning(false);
    const events = ['mousedown','mousemove','keypress','scroll','touchstart','click'];
    events.forEach(ev => document.addEventListener(ev, clearWarningOnActivity));
    return () => {
      events.forEach(ev => document.removeEventListener(ev, clearWarningOnActivity));
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  // ✅ UPDATED: Added Products to navigation items
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/team', icon: Users, label: 'Team Members' },
    { path: '/admin/milestones', icon: Calendar, label: 'Journey' },
    { path: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { path: '/admin/products', icon: Package, label: 'Products' },  // ✅ ADDED THIS LINE
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Inactivity Warning Banner (persistent until activity) */}
      {showWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-3 shadow-lg">
          <div className="container mx-auto flex items-center justify-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">
              ⚠️ You will be logged out in 2 minutes due to inactivity. Move your mouse or press a key to stay logged in.
            </p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 bg-gray-900 border-r border-gray-800`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-white font-bold text-xl">BioLabMate</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">A</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Admin</p>
                  <p className="text-gray-400 text-xs">Super Admin</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Auto-logout after 15min inactivity
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden bg-gray-900 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
