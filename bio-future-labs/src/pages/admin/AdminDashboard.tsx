import React, { useEffect, useState } from "react";
import { 
  FileText, 
  Users, 
  UserCog, 
  MapPin, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  Activity,
  Package  
} from "lucide-react";

interface DashboardStats {
  total_blogs: number;
  total_team_members: number;
  total_users: number;
  total_milestones: number;
  total_contacts: number;
  total_products: number;  
  unread_contacts: number;
  recent_activities: Array<{
    type: string;
    action: string;
    title: string;
    date: string;
    author: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={fetchDashboardStats}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: "Blog Posts",
      value: stats?.total_blogs || 0,
      icon: FileText,
      color: "bg-blue-500",
      href: "/admin/blogs"
    },
    {
      title: "Team Members", 
      value: stats?.total_team_members || 0,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/team"
    },
    {
      title: "System Users",
      value: stats?.total_users || 0,
      icon: UserCog,
      color: "bg-purple-500",
      href: "/admin/users"
    },
    // ✅ ADDED: Products stat card
    {
      title: "Products",
      value: stats?.total_products || 0,
      icon: Package,
      color: "bg-cyan-500",
      href: "/admin/products"
    },
    {
      title: "Journey Milestones",
      value: stats?.total_milestones || 0,
      icon: MapPin,
      color: "bg-orange-500",
      href: "/admin/milestones"
    },
    {
      title: "Contact Messages",
      value: stats?.total_contacts || 0,
      icon: MessageSquare,
      color: "bg-red-500",
      href: "/admin/contacts",
      badge: stats?.unread_contacts ? `${stats.unread_contacts} unread` : undefined
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog': return FileText;
      case 'team_member': return Users;
      case 'contact': return MessageSquare;
      case 'milestone': return MapPin;
      case 'product': return Package;  
      default: return Activity;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your BioLabMate admin panel. Here's what's happening.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = stat.href}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    {stat.badge && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        {stat.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            </div>
          </div>
          <div className="p-6">
            {stats?.recent_activities && stats.recent_activities.length > 0 ? (
              <div className="space-y-4">
                {stats.recent_activities.map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <ActivityIcon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.title}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.action} by {activity.author} • {formatDate(activity.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent activities</p>
            )}
          </div>
        </div>

      
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/admin/blogs'}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Create New Blog Post</p>
                    <p className="text-sm text-gray-500">Add a new blog article</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => window.location.href = '/admin/team'}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Add Team Member</p>
                    <p className="text-sm text-gray-500">Add a new team member profile</p>
                  </div>
                </div>
              </button>

            
              <button 
                onClick={() => window.location.href = '/admin/products'}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-cyan-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Add New Product</p>
                    <p className="text-sm text-gray-500">Add a product to catalog</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => window.location.href = '/admin/milestones'}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Add Journey Milestone</p>
                    <p className="text-sm text-gray-500">Document a new milestone</p>
                  </div>
                </div>
              </button>

              {stats?.unread_contacts && stats.unread_contacts > 0 && (
                <button 
                  onClick={() => window.location.href = '/admin/contacts'}
                  className="w-full text-left p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Review New Messages</p>
                      <p className="text-sm text-red-600">
                        {stats.unread_contacts} unread contact message{stats.unread_contacts > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Version</p>
            <p className="font-medium">BioLabMate Admin v2.0</p>
          </div>
          <div>
            <p className="text-gray-600">Last Updated</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="font-medium text-green-600">All Systems Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
