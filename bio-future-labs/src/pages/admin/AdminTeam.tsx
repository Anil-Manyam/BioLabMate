// // AdminTeam.tsx - Team member management component
// import React, { useEffect, useState } from "react";
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Mail, 
//   Phone, 
//   Linkedin, 
//   Twitter, 
//   MapPin,
//   Users,
//   Search,
//   Filter
// } from "lucide-react";

// interface TeamMember {
//   id: string;
//   name: string;
//   position: string;
//   bio: string;
//   email?: string;
//   phone?: string;
//   linkedin_url?: string;
//   twitter_url?: string;
//   image_url?: string;
//   skills: string[];
//   department?: string;
//   join_date?: string;
//   is_active: boolean;
//   created_at: string;
//   updated_at?: string;
// }

// interface TeamMemberForm {
//   name: string;
//   position: string;
//   bio: string;
//   email: string;
//   phone: string;
//   linkedin_url: string;
//   twitter_url: string;
//   image_url: string;
//   skills: string[];
//   department: string;
//   join_date: string;
//   is_active: boolean;
// }

// const AdminTeam: React.FC = () => {
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("");
//   const [showInactive, setShowInactive] = useState(false);
//   const [formData, setFormData] = useState<TeamMemberForm>({
//     name: "",
//     position: "",
//     bio: "",
//     email: "",
//     phone: "",
//     linkedin_url: "",
//     twitter_url: "",
//     image_url: "",
//     skills: [],
//     department: "",
//     join_date: "",
//     is_active: true
//   });

//   useEffect(() => {
//     fetchTeamMembers();
//   }, [showInactive]);

//   const fetchTeamMembers = async () => {
//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/team?include_inactive=${showInactive}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch team members');
//       }

//       const data = await response.json();
//       setTeamMembers(data);
//     } catch (error) {
//       console.error('Error fetching team members:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('admin_token');
//       const url = editingMember 
//         ? `${import.meta.env.VITE_API_BASE_URL}/admin/team/${editingMember.id}`
//         : `${import.meta.env.VITE_API_BASE_URL}/admin/team`;
      
//       const method = editingMember ? 'PUT' : 'POST';
      
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
//         throw new Error(error.detail || 'Failed to save team member');
//       }

//       await fetchTeamMembers();
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       console.error('Error saving team member:', error);
//       alert(error instanceof Error ? error.message : 'Failed to save team member');
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this team member?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/team/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete team member');
//       }

//       await fetchTeamMembers();
//     } catch (error) {
//       console.error('Error deleting team member:', error);
//       alert('Failed to delete team member');
//     }
//   };

//   const handleEdit = (member: TeamMember) => {
//     setEditingMember(member);
//     setFormData({
//       name: member.name,
//       position: member.position,
//       bio: member.bio,
//       email: member.email || "",
//       phone: member.phone || "",
//       linkedin_url: member.linkedin_url || "",
//       twitter_url: member.twitter_url || "",
//       image_url: member.image_url || "",
//       skills: member.skills,
//       department: member.department || "",
//       join_date: member.join_date || "",
//       is_active: member.is_active
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       position: "",
//       bio: "",
//       email: "",
//       phone: "",
//       linkedin_url: "",
//       twitter_url: "",
//       image_url: "",
//       skills: [],
//       department: "",
//       join_date: "",
//       is_active: true
//     });
//     setEditingMember(null);
//   };

//   const handleSkillsChange = (value: string) => {
//     const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
//     setFormData({ ...formData, skills });
//   };

//   const filteredMembers = teamMembers.filter(member => {
//     const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          member.position.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment = !departmentFilter || member.department === departmentFilter;
//     return matchesSearch && matchesDepartment;
//   });

//   const departments = [...new Set(teamMembers.map(member => member.department).filter(Boolean))];

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
//           <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
//           <p className="mt-2 text-gray-600">Manage your team member profiles</p>
//         </div>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2"
//         >
//           <Plus className="h-5 w-5" />
//           <span>Add Team Member</span>
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
//                 placeholder="Search team members..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <select
//               value={departmentFilter}
//               onChange={(e) => setDepartmentFilter(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             >
//               <option value="">All Departments</option>
//               {departments.map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={showInactive}
//               onChange={(e) => setShowInactive(e.target.checked)}
//               className="rounded border-gray-300 text-primary focus:ring-primary"
//             />
//             <span className="text-sm text-gray-700">Show inactive</span>
//           </label>
//         </div>
//       </div>

//       {/* Team Members Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredMembers.map((member) => (
//           <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-6">
//               {/* Member Image */}
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="flex-shrink-0">
//                   {member.image_url ? (
//                     <img
//                       src={member.image_url}
//                       alt={member.name}
//                       className="h-12 w-12 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
//                       <span className="text-white font-medium text-lg">
//                         {member.name.split(' ').map(n => n[0]).join('')}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-lg font-semibold text-gray-900 truncate">{member.name}</h3>
//                   <p className="text-sm text-gray-600 truncate">{member.position}</p>
//                   {member.department && (
//                     <p className="text-xs text-gray-500">{member.department}</p>
//                   )}
//                 </div>
//                 {!member.is_active && (
//                   <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
//                     Inactive
//                   </span>
//                 )}
//               </div>

//               {/* Bio */}
//               <p className="text-sm text-gray-700 mb-4 line-clamp-3">{member.bio}</p>

//               {/* Skills */}
//               {member.skills.length > 0 && (
//                 <div className="mb-4">
//                   <div className="flex flex-wrap gap-1">
//                     {member.skills.slice(0, 3).map((skill, index) => (
//                       <span
//                         key={index}
//                         className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {member.skills.length > 3 && (
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
//                         +{member.skills.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Contact Info */}
//               <div className="space-y-2 mb-4">
//                 {member.email && (
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Mail className="h-4 w-4 mr-2" />
//                     <span className="truncate">{member.email}</span>
//                   </div>
//                 )}
//                 {member.phone && (
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Phone className="h-4 w-4 mr-2" />
//                     <span>{member.phone}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Social Links */}
//               <div className="flex space-x-2 mb-4">
//                 {member.linkedin_url && (
//                   <a
//                     href={member.linkedin_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
//                   >
//                     <Linkedin className="h-4 w-4" />
//                   </a>
//                 )}
//                 {member.twitter_url && (
//                   <a
//                     href={member.twitter_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200"
//                   >
//                     <Twitter className="h-4 w-4" />
//                   </a>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(member)}
//                   className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   <Edit className="h-4 w-4 mr-1" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(member.id)}
//                   className="flex items-center justify-center px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredMembers.length === 0 && (
//         <div className="text-center py-12">
//           <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
//           <p className="text-gray-600 mb-4">
//             {searchTerm || departmentFilter ? 'Try adjusting your filters' : 'Get started by adding your first team member'}
//           </p>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
//           >
//             Add Team Member
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
//                 {editingMember ? 'Edit Team Member' : 'Add Team Member'}
//               </h2>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Position *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.position}
//                       onChange={(e) => setFormData({ ...formData, position: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Bio *
//                   </label>
//                   <textarea
//                     required
//                     rows={3}
//                     value={formData.bio}
//                     onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Department
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.department}
//                       onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Join Date
//                     </label>
//                     <input
//                       type="date"
//                       value={formData.join_date}
//                       onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
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
//                     placeholder="/src/assets/team-member.jpg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Skills (comma-separated)
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.skills.join(', ')}
//                     onChange={(e) => handleSkillsChange(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="Leadership, Biotechnology, Research"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       LinkedIn URL
//                     </label>
//                     <input
//                       type="url"
//                       value={formData.linkedin_url}
//                       onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Twitter URL
//                     </label>
//                     <input
//                       type="url"
//                       value={formData.twitter_url}
//                       onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="is_active"
//                     checked={formData.is_active}
//                     onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
//                     className="rounded border-gray-300 text-primary focus:ring-primary"
//                   />
//                   <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
//                     Active team member
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
//                     {editingMember ? 'Update' : 'Create'} Team Member
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

// export default AdminTeam;



// AdminTeam-fixed.tsx - Fixed admin team component with proper error handling
// AdminTeam.tsx - Complete fixed version with image path and duplicate email support
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Users, Search } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  image_url?: string;
  department?: string;
  join_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

interface TeamMemberFormData {
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  linkedin_url: string;
  image_url: string;
  department: string;
  join_date: string;
  is_active: boolean;
}

const AdminTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    position: '',
    bio: '',
    email: '',
    phone: '',
    linkedin_url: '',
    image_url: '',
    department: '',
    join_date: '',
    is_active: true
  });

  useEffect(() => {
    fetchTeamMembers();
  }, [includeInactive]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/team?include_inactive=${includeInactive}`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch team members: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched team members:', data);

      if (Array.isArray(data)) {
        setTeamMembers(data);
      } else {
        console.error('Team data is not an array:', data);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch team members');
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingMember 
        ? `${import.meta.env.VITE_API_BASE_URL}/admin/team/${editingMember.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/admin/team`;

      const method = editingMember ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save team member');
      }

      await fetchTeamMembers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving team member:', error);
      setError(error instanceof Error ? error.message : 'Failed to save team member');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      email: member.email || '',
      phone: member.phone || '',
      linkedin_url: member.linkedin_url || '',
      image_url: member.image_url || '',
      department: member.department || '',
      join_date: member.join_date || '',
      is_active: member.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/team/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }

      await fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete team member');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      bio: '',
      email: '',
      phone: '',
      linkedin_url: '',
      image_url: '',
      department: '',
      join_date: '',
      is_active: true
    });
    setError(null);
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.department && member.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <Users className="mr-2" />
            Team Members
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your team members and their information
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
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

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeInactive"
            checked={includeInactive}
            onChange={(e) => setIncludeInactive(e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="includeInactive" className="text-sm text-gray-700">
            Include inactive members
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.is_active).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <EyeOff className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => !m.is_active).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers && filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {member.image_url ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={member.image_url}
                              alt={member.name}
                              onError={(e) => {
                                // Fallback to initials if image fails
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextElementSibling) {
                                  e.currentTarget.nextElementSibling.classList.remove('hidden');
                                }
                              }}
                            />
                          ) : null}
                          <div className={`h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center ${member.image_url ? 'hidden' : ''}`}>
                            <span className="text-sm font-medium text-gray-700">
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.department || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {searchTerm ? 'No team members found matching your search.' : 'No team members found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Multiple members can share the same email
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                  <span className="text-xs text-gray-500 block mt-1">
                    Example: https://www.linkedin.com/in/username/
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://www.linkedin.com/in/username/"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                  <span className="text-xs text-gray-500 block mt-1">
                    Example: /images/team/photo.jpg or /src/assets/photo.jpg
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="/images/team/photo.jpg or /src/assets/photo.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  💡 Tip: Place images in <code className="bg-gray-100 px-1 rounded">public/images/team/</code> folder and use path <code className="bg-gray-100 px-1 rounded">/images/team/filename.jpg</code>
                </p>
                
                {/* Image Preview */}
                {formData.image_url && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const errorMsg = target.nextElementSibling as HTMLElement;
                        if (errorMsg) errorMsg.style.display = 'block';
                      }}
                    />
                    <p className="text-xs text-red-500 mt-1" style={{ display: 'none' }}>
                      ⚠️ Image preview failed. Check the path or URL.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    placeholder="e.g., Executive, Technology, Development"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <input
                    type="date"
                    value={formData.join_date}
                    onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                  Active member
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingMember ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;