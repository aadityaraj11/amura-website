
// API configuration and endpoints
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function for making API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('adminToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  // Admin login
  login: async (credentials: { username: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Verify admin token
  verifyToken: async () => {
    return apiRequest('/auth/verify');
  },

  // Logout
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};

// User/Student APIs
export const userAPI = {
  // Register new student
  register: async (userData: {
    name: string;
    usn: string;
    email: string;
    department: string;
    year: string;
  }) => {
    return apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Get all users (admin only)
  getAllUsers: async (page = 1, limit = 10) => {
    return apiRequest(`/users?page=${page}&limit=${limit}`);
  },

  // Get user by USN
  getUserByUSN: async (usn: string) => {
    return apiRequest(`/users/${usn}`);
  },

  // Update user
  updateUser: async (userId: string, userData: any) => {
    return apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  deleteUser: async (userId: string) => {
    return apiRequest(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Event APIs
export const eventAPI = {
  // Get all events
  getAllEvents: async (type?: 'upcoming' | 'past') => {
    const query = type ? `?type=${type}` : '';
    return apiRequest(`/events${query}`);
  },

  // Get event by ID
  getEventById: async (eventId: string) => {
    return apiRequest(`/events/${eventId}`);
  },

  // Create new event (admin only)
  createEvent: async (eventData: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    type: string;
    difficulty: string;
    image?: string;
  }) => {
    return apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  // Update event (admin only)
  updateEvent: async (eventId: string, eventData: any) => {
    return apiRequest(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  // Delete event (admin only)
  deleteEvent: async (eventId: string) => {
    return apiRequest(`/events/${eventId}`, {
      method: 'DELETE',
    });
  },
};

// Registration APIs
export const registrationAPI = {
  // Register for event
  registerForEvent: async (registrationData: {
    eventId: string;
    userId: string;
    usn: string;
  }) => {
    return apiRequest('/registrations', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  },

  // Get all registrations (admin only)
  getAllRegistrations: async (eventId?: string) => {
    const query = eventId ? `?eventId=${eventId}` : '';
    return apiRequest(`/registrations${query}`);
  },

  // Get user registrations
  getUserRegistrations: async (usn: string) => {
    return apiRequest(`/registrations/user/${usn}`);
  },

  // Update registration status (admin only)
  updateRegistrationStatus: async (registrationId: string, status: 'registered' | 'attended' | 'cancelled') => {
    return apiRequest(`/registrations/${registrationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Mark attendance (admin only)
  markAttendance: async (registrationId: string, attended: boolean) => {
    return apiRequest(`/registrations/${registrationId}/attendance`, {
      method: 'PUT',
      body: JSON.stringify({ attended }),
    });
  },
};

// Certificate APIs
export const certificateAPI = {
  // Get user certificates
  getUserCertificates: async (usn: string) => {
    return apiRequest(`/certificates/user/${usn}`);
  },

  // Issue certificate (admin only)
  issueCertificate: async (certificateData: {
    userId: string;
    eventId: string;
    usn: string;
    eventName: string;
    completionDate: string;
  }) => {
    return apiRequest('/certificates', {
      method: 'POST',
      body: JSON.stringify(certificateData),
    });
  },

  // Get all certificates (admin only)
  getAllCertificates: async () => {
    return apiRequest('/certificates');
  },

  // Download certificate
  downloadCertificate: async (certificateId: string) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/certificates/${certificateId}/download`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to download certificate');
    }
    
    return response.blob();
  },

  // Update certificate status (admin only)
  updateCertificateStatus: async (certificateId: string, status: 'processing' | 'available' | 'revoked') => {
    return apiRequest(`/certificates/${certificateId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Dashboard/Analytics APIs
export const dashboardAPI = {
  // Get dashboard statistics (admin only)
  getStats: async () => {
    return apiRequest('/dashboard/stats');
  },

  // Get analytics data (admin only)
  getAnalytics: async (period: 'week' | 'month' | 'year' = 'month') => {
    return apiRequest(`/dashboard/analytics?period=${period}`);
  },

  // Export data (admin only)
  exportData: async (type: 'users' | 'events' | 'registrations' | 'certificates') => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/dashboard/export/${type}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to export data');
    }
    
    return response.blob();
  },
};

// File upload API
export const uploadAPI = {
  // Upload event image
  uploadEventImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/upload/event-image`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    return response.json();
  },

  // Upload certificate template
  uploadCertificateTemplate: async (file: File) => {
    const formData = new FormData();
    formData.append('template', file);
    
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/upload/certificate-template`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload template');
    }
    
    return response.json();
  },
};

// Contact/Support APIs
export const supportAPI = {
  // Send contact message
  sendMessage: async (messageData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return apiRequest('/support/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  // Get all messages (admin only)
  getAllMessages: async () => {
    return apiRequest('/support/messages');
  },

  // Mark message as read (admin only)
  markMessageAsRead: async (messageId: string) => {
    return apiRequest(`/support/messages/${messageId}/read`, {
      method: 'PUT',
    });
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  event: eventAPI,
  registration: registrationAPI,
  certificate: certificateAPI,
  dashboard: dashboardAPI,
  upload: uploadAPI,
  support: supportAPI,
};
