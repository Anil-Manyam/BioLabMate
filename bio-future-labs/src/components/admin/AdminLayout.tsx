import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/assets/Logo3.jpg';
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
  Package,  
} from 'lucide-react';
import { useAutoLogout } from '@/hooks/useAutoLogout';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  useAutoLogout({
    timeoutMinutes: 15,
    warningMinutes: 2,
    onWarning: () => {
      setShowWarning(true); 
    },
    onLogout: () => {
      console.log('Admin logged out due to inactivity');
    },
  });

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
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/team', icon: Users, label: 'Team Members' },
    { path: '/admin/milestones', icon: Calendar, label: 'Journey' },
    { path: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { path: '/admin/products', icon: Package, label: 'Products' },  
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

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 bg-gray-900 border-r border-gray-800`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="flex items-center gap-1">
                <img src={Logo} alt="Company Logo" className="h-9 w-auto" />
              </div>
              <span className="text-white font-bold text-xl">BIOLABMATE</span>
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
