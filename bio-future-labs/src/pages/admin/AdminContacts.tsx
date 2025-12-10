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
      await handleMarkAsRead(id);

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