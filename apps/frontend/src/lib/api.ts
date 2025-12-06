import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// Guest API
export const guestAPI = {
  getAll: () => api.get('/guests'),
  getById: (id: string) => api.get(`/guests/${id}`),
  create: (data: any) => api.post('/guests', data),
  update: (id: string, data: any) => api.put(`/guests/${id}`, data),
  delete: (id: string) => api.delete(`/guests/${id}`),
  updateRSVP: (id: string, status: string) => api.patch(`/guests/${id}/rsvp`, { status }),
  getStats: () => api.get('/guests/stats'),
};

// Event API
export const eventAPI = {
  getAll: () => api.get('/events'),
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events', data),
  update: (id: string, data: any) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
  getStats: () => api.get('/events/stats'),
};

// Budget API
export const budgetAPI = {
  getAll: () => api.get('/budgets'),
  getById: (id: string) => api.get(`/budgets/${id}`),
  create: (data: any) => api.post('/budgets', data),
  update: (id: string, data: any) => api.put(`/budgets/${id}`, data),
  delete: (id: string) => api.delete(`/budgets/${id}`),
  getStats: (id: string) => api.get(`/budgets/${id}/stats`),
};

// Expense API
export const expenseAPI = {
  getAll: (budgetId?: string) => api.get('/expenses', { params: { budgetId } }),
  create: (budgetId: string, data: any) => api.post(`/budgets/${budgetId}/expenses`, data),
  update: (id: string, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
};
