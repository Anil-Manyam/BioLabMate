// // AdminMilestones.tsx - Journey milestone management component
// import React, { useEffect, useState } from "react";
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Calendar, 
//   MapPin, 
//   Star,
//   Image,
//   Search,
//   Filter,
//   ArrowUp,
//   ArrowDown
// } from "lucide-react";

// interface Milestone {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   category: string;
//   image_url?: string;
//   achievements: string[];
//   is_major: boolean;
//   order_index: number;
//   created_at: string;
//   updated_at?: string;
// }

// interface MilestoneForm {
//   title: string;
//   description: string;
//   date: string;
//   category: string;
//   image_url: string;
//   achievements: string[];
//   is_major: boolean;
//   order_index: number;
// }

// const AdminMilestones: React.FC = () => {
//   const [milestones, setMilestones] = useState<Milestone[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [formData, setFormData] = useState<MilestoneForm>({
//     title: "",
//     description: "",
//     date: "",
//     category: "",
//     image_url: "",
//     achievements: [],
//     is_major: false,
//     order_index: 0
//   });

//   useEffect(() => {
//     fetchMilestones();
//   }, []);

//   const fetchMilestones = async () => {
//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/milestones`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch milestones');
//       }

//       const data = await response.json();
//       setMilestones(data);
//     } catch (error) {
//       console.error('Error fetching milestones:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('admin_token');
//       const url = editingMilestone 
//         ? `${import.meta.env.VITE_API_BASE_URL}/admin/milestones/${editingMilestone.id}`
//         : `${import.meta.env.VITE_API_BASE_URL}/admin/milestones`;
      
//       const method = editingMilestone ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.detail || 'Failed to save milestone');
//       }

//       await fetchMilestones();
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       console.error('Error saving milestone:', error);
//       alert(error instanceof Error ? error.message : 'Failed to save milestone');
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this milestone?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/milestones/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete milestone');
//       }

//       await fetchMilestones();
//     } catch (error) {
//       console.error('Error deleting milestone:', error);
//       alert('Failed to delete milestone');
//     }
//   };

//   const handleEdit = (milestone: Milestone) => {
//     setEditingMilestone(milestone);
//     setFormData({
//       title: milestone.title,
//       description: milestone.description,
//       date: milestone.date,
//       category: milestone.category,
//       image_url: milestone.image_url || "",
//       achievements: milestone.achievements,
//       is_major: milestone.is_major,
//       order_index: milestone.order_index
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       date: "",
//       category: "",
//       image_url: "",
//       achievements: [],
//       is_major: false,
//       order_index: milestones.length + 1
//     });
//     setEditingMilestone(null);
//   };

//   const handleAchievementsChange = (value: string) => {
//     const achievements = value.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement);
//     setFormData({ ...formData, achievements });
//   };

//   const handleReorder = async (milestoneId: string, direction: 'up' | 'down') => {
//     const milestone = milestones.find(m => m.id === milestoneId);
//     if (!milestone) return;

//     const newOrder = direction === 'up' ? milestone.order_index - 1 : milestone.order_index + 1;
//     if (newOrder < 1 || newOrder > milestones.length) return;

//     try {
//       const token = localStorage.getItem('admin_token');
//       await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/milestones/${milestoneId}/reorder?new_order=${newOrder}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       await fetchMilestones();
//     } catch (error) {
//       console.error('Error reordering milestone:', error);
//     }
//   };

//   const filteredMilestones = milestones.filter(milestone => {
//     const matchesSearch = milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          milestone.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !categoryFilter || milestone.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   }).sort((a, b) => a.order_index - b.order_index);

//   const categories = [...new Set(milestones.map(milestone => milestone.category).filter(Boolean))];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Journey Milestones</h1>
//           <p className="mt-2 text-gray-600">Manage your company's journey and achievements</p>
//         </div>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2"
//         >
//           <Plus className="h-5 w-5" />
//           <span>Add Milestone</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-64">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search milestones..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             >
//               <option value="">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Milestones Timeline */}
//       <div className="space-y-6">
//         {filteredMilestones.map((milestone, index) => (
//           <div key={milestone.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start space-x-4 flex-1">
//                   {/* Order indicator */}
//                   <div className="flex flex-col items-center space-y-1">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                       milestone.is_major ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
//                     }`}>
//                       {milestone.order_index}
//                     </div>
//                     {milestone.is_major && (
//                       <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                     )}
//                   </div>

//                   {/* Image */}
//                   <div className="flex-shrink-0">
//                     {milestone.image_url ? (
//                       <img
//                         src={milestone.image_url}
//                         alt={milestone.title}
//                         className="w-16 h-16 rounded-lg object-cover"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
//                         <Image className="h-6 w-6 text-gray-400" />
//                       </div>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
//                       <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
//                         {milestone.category}
//                       </span>
//                       {milestone.is_major && (
//                         <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
//                           Major
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-2 mb-3">
//                       <Calendar className="h-4 w-4 text-gray-400" />
//                       <span className="text-sm text-gray-600">
//                         {new Date(milestone.date).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </span>
//                     </div>

//                     <p className="text-gray-700 mb-4">{milestone.description}</p>

//                     {milestone.achievements.length > 0 && (
//                       <div>
//                         <h4 className="text-sm font-medium text-gray-900 mb-2">Key Achievements:</h4>
//                         <ul className="list-disc list-inside space-y-1">
//                           {milestone.achievements.map((achievement, idx) => (
//                             <li key={idx} className="text-sm text-gray-600">{achievement}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col space-y-2 ml-4">
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => handleReorder(milestone.id, 'up')}
//                       disabled={milestone.order_index === 1}
//                       className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       title="Move up"
//                     >
//                       <ArrowUp className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => handleReorder(milestone.id, 'down')}
//                       disabled={milestone.order_index === milestones.length}
//                       className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       title="Move down"
//                     >
//                       <ArrowDown className="h-4 w-4" />
//                     </button>
//                   </div>
                  
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => handleEdit(milestone)}
//                       className="p-2 text-gray-400 hover:text-blue-600"
//                       title="Edit"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(milestone.id)}
//                       className="p-2 text-gray-400 hover:text-red-600"
//                       title="Delete"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredMilestones.length === 0 && (
//         <div className="text-center py-12">
//           <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones found</h3>
//           <p className="text-gray-600 mb-4">
//             {searchTerm || categoryFilter ? 'Try adjusting your filters' : 'Get started by adding your first milestone'}
//           </p>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
//           >
//             Add Milestone
//           </button>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
//             <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
//               <h2 className="text-xl font-bold mb-4">
//                 {editingMilestone ? 'Edit Milestone' : 'Add Milestone'}
//               </h2>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.title}
//                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Category *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                       placeholder="Foundation, Research, Product, etc."
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Description *
//                   </label>
//                   <textarea
//                     required
//                     rows={3}
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Date *
//                     </label>
//                     <input
//                       type="date"
//                       required
//                       value={formData.date}
//                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Order Index
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       value={formData.order_index || milestones.length + 1}
//                       onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Image URL
//                   </label>
//                   <input
//                     type="url"
//                     value={formData.image_url}
//                     onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="/src/assets/milestone.jpg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Key Achievements (one per line)
//                   </label>
//                   <textarea
//                     rows={4}
//                     value={formData.achievements.join('\n')}
//                     onChange={(e) => handleAchievementsChange(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="Company incorporation&#10;Initial team formation&#10;Vision and mission established"
//                   />
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="is_major"
//                     checked={formData.is_major}
//                     onChange={(e) => setFormData({ ...formData, is_major: e.target.checked })}
//                     className="rounded border-gray-300 text-primary focus:ring-primary"
//                   />
//                   <label htmlFor="is_major" className="ml-2 text-sm text-gray-700">
//                     Major milestone (will be highlighted)
//                   </label>
//                 </div>

//                 <div className="flex justify-end space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
//                   >
//                     {editingMilestone ? 'Update' : 'Create'} Milestone
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminMilestones;








// AdminMilestones-fixed.tsx - Milestone form with year input only

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Search, Star } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  image_url?: string;
  achievements: string[];
  is_major: boolean;
  order_index: number;
  created_at: string;
  updated_at?: string;
}

interface MilestoneFormData {
  title: string;
  description: string;
  year: number;
  category: string;
  image_url: string;
  achievements: string;
  is_major: boolean;
  order_index: number;
}

const AdminMilestones: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<MilestoneFormData>({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    category: '',
    image_url: '',
    achievements: '',
    is_major: false,
    order_index: 0
  });

  useEffect(() => {
    fetchMilestones();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/milestones`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch milestones: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched milestones:', data);

      if (Array.isArray(data)) {
        setMilestones(data);
      } else {
        console.error('Milestones data is not an array:', data);
        setMilestones([]);
      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch milestones');
      setMilestones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.year || formData.year < 2000 || formData.year > 2100) {
      setError('Please enter a valid year');
      return;
    }

    try {
      const url = editingMilestone 
        ? `${import.meta.env.VITE_API_BASE_URL}/admin/milestones/${editingMilestone.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/admin/milestones`;

      const method = editingMilestone ? 'PUT' : 'POST';

      // Convert achievements string to array
      const achievementsArray = formData.achievements
        .split('\n')
        .map(a => a.trim())
        .filter(a => a.length > 0);

      // Handle image URL or local asset path
      let imagePath = formData.image_url.trim();
      if (imagePath.startsWith('@/')) {
        try {
          const asset = new URL(imagePath.replace('@/', '/src/'), import.meta.url).href;
          imagePath = asset;
        } catch {
          console.warn('Invalid local asset path provided:', imagePath);
        }
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        year: parseInt(String(formData.year)),
        category: formData.category || 'General',
        image_url: imagePath || null,
        achievements: achievementsArray,
        is_major: formData.is_major,
        order_index: formData.order_index || 0
      };

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save milestone');
      }

      await fetchMilestones();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving milestone:', error);
      setError(error instanceof Error ? error.message : 'Failed to save milestone');
    }
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description,
      year: milestone.year,
      category: milestone.category || '',
      image_url: milestone.image_url || '',
      achievements: milestone.achievements?.join('\n') || '',
      is_major: milestone.is_major,
      order_index: milestone.order_index
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/milestones/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete milestone');
      }

      await fetchMilestones();
    } catch (error) {
      console.error('Error deleting milestone:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete milestone');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMilestone(null);
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      category: '',
      image_url: '',
      achievements: '',
      is_major: false,
      order_index: 0
    });
    setError(null);
  };

  const filteredMilestones = milestones.filter(milestone =>
    milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    milestone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    milestone.year.toString().includes(searchTerm)
  );

  // Group by year
  const groupedByYear = filteredMilestones.reduce((acc, milestone) => {
    if (!acc[milestone.year]) {
      acc[milestone.year] = [];
    }
    acc[milestone.year].push(milestone);
    return acc;
  }, {} as Record<number, Milestone[]>);

  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar className="mr-2" />
            Journey Milestones
          </h1>
          <p className="text-gray-600 mt-1">
            Manage company milestones and achievements
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search milestones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Milestones</p>
              <p className="text-2xl font-bold text-gray-900">{milestones.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Major Milestones</p>
              <p className="text-2xl font-bold text-gray-900">
                {milestones.filter(m => m.is_major).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Years Covered</p>
              <p className="text-2xl font-bold text-gray-900">{years.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones by Year */}
      <div className="space-y-8">
        {years.map(year => (
          <div key={year} className="bg-white rounded-lg shadow border overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
              <h2 className="text-xl font-bold">{year}</h2>
              <span className="text-sm">{groupedByYear[parseInt(year)].length} milestone(s)</span>
            </div>
            <div className="divide-y divide-gray-200">
              {groupedByYear[parseInt(year)].map((milestone) => (
                <div key={milestone.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {milestone.is_major && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                        <h3 className="text-lg font-bold text-gray-900">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-2">{milestone.description}</p>
                      {milestone.category && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {milestone.category}
                        </span>
                      )}
                      {milestone.achievements && milestone.achievements.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Key Achievements:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {milestone.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(milestone)}
                        className="text-blue-600 hover:text-blue-900 p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(milestone.id)}
                        className="text-red-600 hover:text-red-900 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {years.length === 0 && (
          <div className="bg-white rounded-lg shadow border p-8 text-center text-gray-500">
            No milestones found. Create your first milestone to get started!
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingMilestone ? 'Edit Milestone' : 'Add Milestone'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Foundation, Research, Product, etc."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="2000"
                    max="2100"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Order Index</label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL or Local Path</label>
                <input
                  type="text"
                  placeholder="https://example.com/img.jpg or @/assets/1.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements (one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="is_major"
                  type="checkbox"
                  checked={formData.is_major}
                  onChange={(e) => setFormData({ ...formData, is_major: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="is_major" className="ml-2 text-sm text-gray-700">
                  Mark as major milestone
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingMilestone ? 'Update Milestone' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMilestones;
