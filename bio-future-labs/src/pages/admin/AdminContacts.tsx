// // AdminContacts.tsx - Contact form submissions management
// import React, { useEffect, useState } from "react";
// import { 
//   Mail, 
//   MailOpen, 
//   Phone, 
//   Calendar, 
//   MessageSquare, 
//   User, 
//   Trash2,
//   Search,
//   Filter,
//   Check,
//   Reply,
//   ExternalLink,
//   Eye,
//   EyeOff
// } from "lucide-react";

// interface Contact {
//   id: string;
//   name: string;
//   email: string;
//   subject?: string;
//   message: string;
//   phone?: string;
//   submitted_at: string;
//   is_read: boolean;
//   replied_at?: string;
// }

// const AdminContacts: React.FC = () => {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/contacts`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch contacts');
//       }

//       const data = await response.json();
//       setContacts(data);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkAsRead = async (id: string) => {
//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/contacts/${id}/mark-read`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to mark as read');
//       }

//       await fetchContacts();
//     } catch (error) {
//       console.error('Error marking as read:', error);
//       alert('Failed to mark as read');
//     }
//   };

//   const handleMarkAsReplied = async (id: string) => {
//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/contacts/${id}/reply`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to mark as replied');
//       }

//       await fetchContacts();
//     } catch (error) {
//       console.error('Error marking as replied:', error);
//       alert('Failed to mark as replied');
//     }
//   };

//   const handleDelete = async (id: string, name: string) => {
//     if (!confirm(`Are you sure you want to delete the message from "${name}"? This action cannot be undone.`)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/contacts/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete contact');
//       }

//       await fetchContacts();
//       if (selectedContact?.id === id) {
//         setShowModal(false);
//         setSelectedContact(null);
//       }
//     } catch (error) {
//       console.error('Error deleting contact:', error);
//       alert('Failed to delete contact');
//     }
//   };

//   const handleBulkMarkRead = async () => {
//     if (!confirm('Mark all contacts as read?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/contacts/mark-all-read`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to mark all as read');
//       }

//       await fetchContacts();
//     } catch (error) {
//       console.error('Error marking all as read:', error);
//       alert('Failed to mark all as read');
//     }
//   };

//   const openContactModal = async (contact: Contact) => {
//     setSelectedContact(contact);
//     setShowModal(true);
    
//     // Mark as read if not already read
//     if (!contact.is_read) {
//       await handleMarkAsRead(contact.id);
//     }
//   };

//   const getStatusBadge = (contact: Contact) => {
//     if (contact.replied_at) {
//       return (
//         <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
//           Replied
//         </span>
//       );
//     } else if (contact.is_read) {
//       return (
//         <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
//           Read
//         </span>
//       );
//     } else {
//       return (
//         <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
//           New
//         </span>
//       );
//     }
//   };

//   const filteredContacts = contacts.filter(contact => {
//     const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (contact.subject && contact.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesStatus = !statusFilter || 
//                          (statusFilter === 'unread' && !contact.is_read) ||
//                          (statusFilter === 'read' && contact.is_read && !contact.replied_at) ||
//                          (statusFilter === 'replied' && contact.replied_at);
    
//     return matchesSearch && matchesStatus;
//   }).sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());

//   const unreadCount = contacts.filter(c => !c.is_read).length;

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
//           <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
//           <p className="mt-2 text-gray-600">
//             Manage contact form submissions and customer inquiries
//             {unreadCount > 0 && (
//               <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-sm rounded-full">
//                 {unreadCount} unread
//               </span>
//             )}
//           </p>
//         </div>
//         {unreadCount > 0 && (
//           <button
//             onClick={handleBulkMarkRead}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//           >
//             <Check className="h-5 w-5" />
//             <span>Mark All Read</span>
//           </button>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-64">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search contacts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             >
//               <option value="">All Status</option>
//               <option value="unread">Unread</option>
//               <option value="read">Read</option>
//               <option value="replied">Replied</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Contacts List */}
//       <div className="space-y-4">
//         {filteredContacts.map((contact) => (
//           <div 
//             key={contact.id} 
//             className={`bg-white rounded-lg shadow-sm border-l-4 overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${
//               !contact.is_read 
//                 ? 'border-l-yellow-400 bg-yellow-50/30' 
//                 : contact.replied_at 
//                   ? 'border-l-green-400' 
//                   : 'border-l-blue-400'
//             }`}
//             onClick={() => openContactModal(contact)}
//           >
//             <div className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start space-x-4 flex-1">
//                   {/* Avatar */}
//                   <div className="flex-shrink-0">
//                     <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
//                       <span className="text-white font-medium text-sm">
//                         {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
//                       {getStatusBadge(contact)}
//                       {!contact.is_read && (
//                         <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <Mail className="h-4 w-4 mr-1" />
//                         <span>{contact.email}</span>
//                       </div>
//                       {contact.phone && (
//                         <div className="flex items-center">
//                           <Phone className="h-4 w-4 mr-1" />
//                           <span>{contact.phone}</span>
//                         </div>
//                       )}
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         <span>
//                           {new Date(contact.submitted_at).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </span>
//                       </div>
//                     </div>

//                     {contact.subject && (
//                       <h4 className="font-medium text-gray-900 mb-2">
//                         Subject: {contact.subject}
//                       </h4>
//                     )}

//                     <p className="text-gray-700 line-clamp-2">{contact.message}</p>

//                     {contact.replied_at && (
//                       <div className="mt-3 flex items-center text-sm text-green-600">
//                         <Reply className="h-4 w-4 mr-1" />
//                         <span>
//                           Replied on {new Date(contact.replied_at).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-2">
//                   {!contact.is_read && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleMarkAsRead(contact.id);
//                       }}
//                       className="p-2 text-gray-400 hover:text-blue-600"
//                       title="Mark as read"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </button>
//                   )}
                  
//                   {contact.is_read && !contact.replied_at && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleMarkAsReplied(contact.id);
//                       }}
//                       className="p-2 text-gray-400 hover:text-green-600"
//                       title="Mark as replied"
//                     >
//                       <Reply className="h-4 w-4" />
//                     </button>
//                   )}
                  
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(contact.id, contact.name);
//                     }}
//                     className="p-2 text-gray-400 hover:text-red-600"
//                     title="Delete"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredContacts.length === 0 && (
//         <div className="text-center py-12">
//           <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
//           <p className="text-gray-600">
//             {searchTerm || statusFilter ? 'Try adjusting your filters' : 'No contact messages yet'}
//           </p>
//         </div>
//       )}

//       {/* Contact Detail Modal */}
//       {showModal && selectedContact && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
//             <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold">Contact Message</h2>
//                 <div className="flex items-center space-x-2">
//                   {getStatusBadge(selectedContact)}
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
              
//               {/* Contact Info */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
//                     <span className="text-white font-medium">
//                       {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h3>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <Mail className="h-4 w-4 mr-1" />
//                       <a 
//                         href={`mailto:${selectedContact.email}`}
//                         className="text-blue-600 hover:text-blue-700"
//                       >
//                         {selectedContact.email}
//                       </a>
//                       <ExternalLink className="h-3 w-3 ml-1" />
//                     </div>
//                     {selectedContact.phone && (
//                       <div className="flex items-center text-sm text-gray-600">
//                         <Phone className="h-4 w-4 mr-1" />
//                         <a 
//                           href={`tel:${selectedContact.phone}`}
//                           className="text-blue-600 hover:text-blue-700"
//                         >
//                           {selectedContact.phone}
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="text-sm text-gray-600 flex items-center">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   Submitted on {new Date(selectedContact.submitted_at).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </div>
//               </div>

//               {/* Subject */}
//               {selectedContact.subject && (
//                 <div className="mb-4">
//                   <h4 className="font-medium text-gray-900 mb-2">Subject:</h4>
//                   <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">{selectedContact.subject}</p>
//                 </div>
//               )}

//               {/* Message */}
//               <div className="mb-6">
//                 <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex justify-between items-center">
//                 <div className="flex space-x-2">
//                   <a
//                     href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your inquiry'}&body=Hi ${selectedContact.name},%0D%0A%0D%0A`}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//                   >
//                     <Mail className="h-4 w-4" />
//                     <span>Reply via Email</span>
//                     <ExternalLink className="h-3 w-3" />
//                   </a>
                  
//                   {!selectedContact.replied_at && (
//                     <button
//                       onClick={() => {
//                         handleMarkAsReplied(selectedContact.id);
//                         setShowModal(false);
//                       }}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
//                     >
//                       <Check className="h-4 w-4" />
//                       <span>Mark as Replied</span>
//                     </button>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => {
//                     handleDelete(selectedContact.id, selectedContact.name);
//                   }}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   <span>Delete</span>
//                 </button>
//               </div>

//               {selectedContact.replied_at && (
//                 <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                   <div className="flex items-center text-green-700">
//                     <Check className="h-4 w-4 mr-2" />
//                     <span className="text-sm">
//                       Marked as replied on {new Date(selectedContact.replied_at).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminContacts;












// AdminContacts-fixed.tsx - Fixed mark as read and replied functionality
import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, Search, Calendar, Clock } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  submitted_at: string;
  is_read: boolean;
  replied_at?: string;
}

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/contacts`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch contacts: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched contacts:', data);

      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error('Contacts data is not an array:', data);
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/contacts/${id}/mark-read`,
        {
          method: 'PUT',
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error('Failed to mark contact as read');
      }

      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, is_read: true } : contact
      ));

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, is_read: true });
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
      setError(error instanceof Error ? error.message : 'Failed to mark contact as read');
    }
  };

  const handleMarkAsReplied = async (id: string) => {
    try {
      // First mark as read
      await handleMarkAsRead(id);

      // Note: You'll need to add a backend endpoint for marking as replied
      // For now, we'll just mark as read and update the UI
      const now = new Date().toISOString();
      
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, is_read: true, replied_at: now } : contact
      ));

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, is_read: true, replied_at: now });
      }

      alert('Marked as replied! You can now compose your email response separately.');
    } catch (error) {
      console.error('Error marking contact as replied:', error);
      setError(error instanceof Error ? error.message : 'Failed to mark as replied');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/contacts/${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      setContacts(contacts.filter(contact => contact.id !== id));
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete contact');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.message && contact.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = !filterUnread || !contact.is_read;
    return matchesSearch && matchesFilter;
  });

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
            <Mail className="mr-2" />
            Contact Messages
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to contact form submissions
          </p>
        </div>
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
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="filterUnread"
            checked={filterUnread}
            onChange={(e) => setFilterUnread(e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="filterUnread" className="text-sm text-gray-700">
            Show unread only
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MailOpen className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => !c.is_read).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Replied</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.replied_at).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts List */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  } ${!contact.is_read ? 'border-l-4 border-l-blue-600' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {contact.is_read ? (
                        <MailOpen className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-600" />
                      )}
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    </div>
                    {contact.replied_at && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Replied
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                  {contact.subject && (
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {contact.subject}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 line-clamp-2">{contact.message}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(contact.submitted_at)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No contacts found
              </div>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow border p-6">
          {selectedContact ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedContact.name}
                </h2>
                <div className="flex items-center space-x-2">
                  {!selectedContact.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedContact.id)}
                      className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                      title="Mark as read"
                    >
                      Mark Read
                    </button>
                  )}
                  {!selectedContact.replied_at && (
                    <button
                      onClick={() => handleMarkAsReplied(selectedContact.id)}
                      className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                      title="Mark as replied"
                    >
                      Mark Replied
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>

                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">
                      <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                        {selectedContact.phone}
                      </a>
                    </p>
                  </div>
                )}

                {selectedContact.subject && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Subject</label>
                    <p className="text-gray-900">{selectedContact.subject}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedContact.message}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted</label>
                  <p className="text-gray-900">{formatDate(selectedContact.submitted_at)}</p>
                </div>

                {selectedContact.replied_at && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Replied</label>
                    <p className="text-gray-900">{formatDate(selectedContact.replied_at)}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500 block mb-2">Status</label>
                  <div className="flex items-center space-x-2">
                    {selectedContact.is_read ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        <MailOpen className="w-3 h-3 mr-1" />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        <Mail className="w-3 h-3 mr-1" />
                        Unread
                      </span>
                    )}
                    {selectedContact.replied_at && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        ✓ Replied
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your message'}`}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;