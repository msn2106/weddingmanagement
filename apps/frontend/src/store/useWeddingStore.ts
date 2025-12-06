import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Guest, Event, Budget, Expense, DashboardStats, RSVPStatus } from '@/types';
import { dashboardAPI, guestAPI, eventAPI, budgetAPI, expenseAPI } from '@/lib/api';

interface WeddingState {
  // State
  guests: Guest[];
  events: Event[];
  budgets: Budget[];
  expenses: Expense[];
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchDashboardStats: () => Promise<void>;
  fetchGuests: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchBudgets: () => Promise<void>;
  fetchExpenses: () => Promise<void>;
  fetchAllData: () => Promise<void>;

  // Guest Actions
  createGuest: (guestData: Partial<Guest>) => Promise<void>;
  updateGuest: (id: string, guestData: Partial<Guest>) => Promise<void>;
  deleteGuest: (id: string) => Promise<void>;
  updateGuestRSVP: (id: string, status: RSVPStatus) => Promise<void>;

  // Event Actions
  createEvent: (eventData: Partial<Event>) => Promise<void>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // Budget Actions
  createBudget: (budgetData: Partial<Budget>) => Promise<void>;
  updateBudget: (id: string, budgetData: Partial<Budget>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;

  // Expense Actions
  createExpense: (budgetId: string, expenseData: Partial<Expense>) => Promise<void>;
  updateExpense: (id: string, expenseData: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;

  // Utility Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useWeddingStore = create<WeddingState>()(
  devtools(
    (set, get) => ({
      // Initial State
      guests: [],
      events: [],
      budgets: [],
      expenses: [],
      dashboardStats: null,
      loading: false,
      error: null,

      // Fetch Dashboard Stats
      fetchDashboardStats: async () => {
        try {
          set({ loading: true, error: null });
          const { data } = await dashboardAPI.getStats();
          set({ dashboardStats: data.data, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch dashboard stats', loading: false });
          console.error('Error fetching dashboard stats:', error);
        }
      },

      // Fetch Guests
      fetchGuests: async () => {
        try {
          set({ loading: true, error: null });
          const { data } = await guestAPI.getAll();
          set({ guests: data.data, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch guests', loading: false });
          console.error('Error fetching guests:', error);
        }
      },

      // Fetch Events
      fetchEvents: async () => {
        try {
          set({ loading: true, error: null });
          const { data } = await eventAPI.getAll();
          set({ events: data.data, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch events', loading: false });
          console.error('Error fetching events:', error);
        }
      },

      // Fetch Budgets
      fetchBudgets: async () => {
        try {
          set({ loading: true, error: null });
          const { data } = await budgetAPI.getAll();
          set({ budgets: data.data, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch budgets', loading: false });
          console.error('Error fetching budgets:', error);
        }
      },

      // Fetch Expenses
      fetchExpenses: async () => {
        try {
          set({ loading: true, error: null });
          const { data } = await expenseAPI.getAll();
          set({ expenses: data.data, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch expenses', loading: false });
          console.error('Error fetching expenses:', error);
        }
      },

      // Fetch All Data
      fetchAllData: async () => {
        set({ loading: true, error: null });
        try {
          await Promise.all([
            get().fetchDashboardStats(),
            get().fetchGuests(),
            get().fetchEvents(),
            get().fetchBudgets(),
            get().fetchExpenses(),
          ]);
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch data', loading: false });
        }
      },

      // Create Guest
      createGuest: async (guestData: Partial<Guest>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await guestAPI.create(guestData);
          set((state) => ({
            guests: [...state.guests, data.data],
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to create guest', loading: false });
          throw error;
        }
      },

      // Update Guest
      updateGuest: async (id: string, guestData: Partial<Guest>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await guestAPI.update(id, guestData);
          set((state) => ({
            guests: state.guests.map((g) => (g.id === id ? data.data : g)),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to update guest', loading: false });
          throw error;
        }
      },

      // Delete Guest
      deleteGuest: async (id: string) => {
        try {
          set({ loading: true, error: null });
          await guestAPI.delete(id);
          set((state) => ({
            guests: state.guests.filter((g) => g.id !== id),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete guest', loading: false });
          throw error;
        }
      },

      // Update Guest RSVP
      updateGuestRSVP: async (id: string, status: RSVPStatus) => {
        try {
          set({ loading: true, error: null });
          const { data } = await guestAPI.updateRSVP(id, status);
          set((state) => ({
            guests: state.guests.map((g) => (g.id === id ? data.data : g)),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to update RSVP', loading: false });
          throw error;
        }
      },

      // Create Event
      createEvent: async (eventData: Partial<Event>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await eventAPI.create(eventData);
          set((state) => ({
            events: [...state.events, data.data],
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to create event', loading: false });
          throw error;
        }
      },

      // Update Event
      updateEvent: async (id: string, eventData: Partial<Event>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await eventAPI.update(id, eventData);
          set((state) => ({
            events: state.events.map((e) => (e.id === id ? data.data : e)),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to update event', loading: false });
          throw error;
        }
      },

      // Delete Event
      deleteEvent: async (id: string) => {
        try {
          set({ loading: true, error: null });
          await eventAPI.delete(id);
          set((state) => ({
            events: state.events.filter((e) => e.id !== id),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete event', loading: false });
          throw error;
        }
      },

      // Create Budget
      createBudget: async (budgetData: Partial<Budget>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await budgetAPI.create(budgetData);
          set((state) => ({
            budgets: [...state.budgets, data.data],
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to create budget', loading: false });
          throw error;
        }
      },

      // Update Budget
      updateBudget: async (id: string, budgetData: Partial<Budget>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await budgetAPI.update(id, budgetData);
          set((state) => ({
            budgets: state.budgets.map((b) => (b.id === id ? data.data : b)),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to update budget', loading: false });
          throw error;
        }
      },

      // Delete Budget
      deleteBudget: async (id: string) => {
        try {
          set({ loading: true, error: null });
          await budgetAPI.delete(id);
          set((state) => ({
            budgets: state.budgets.filter((b) => b.id !== id),
            loading: false,
          }));
          await get().fetchDashboardStats();
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete budget', loading: false });
          throw error;
        }
      },

      // Create Expense
      createExpense: async (budgetId: string, expenseData: Partial<Expense>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await expenseAPI.create(budgetId, expenseData);
          set((state) => ({
            expenses: [...state.expenses, data.data],
            loading: false,
          }));
          await Promise.all([get().fetchBudgets(), get().fetchDashboardStats()]);
        } catch (error: any) {
          set({ error: error.message || 'Failed to create expense', loading: false });
          throw error;
        }
      },

      // Update Expense
      updateExpense: async (id: string, expenseData: Partial<Expense>) => {
        try {
          set({ loading: true, error: null });
          const { data } = await expenseAPI.update(id, expenseData);
          set((state) => ({
            expenses: state.expenses.map((e) => (e.id === id ? data.data : e)),
            loading: false,
          }));
          await Promise.all([get().fetchBudgets(), get().fetchDashboardStats()]);
        } catch (error: any) {
          set({ error: error.message || 'Failed to update expense', loading: false });
          throw error;
        }
      },

      // Delete Expense
      deleteExpense: async (id: string) => {
        try {
          set({ loading: true, error: null });
          await expenseAPI.delete(id);
          set((state) => ({
            expenses: state.expenses.filter((e) => e.id !== id),
            loading: false,
          }));
          await Promise.all([get().fetchBudgets(), get().fetchDashboardStats()]);
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete expense', loading: false });
          throw error;
        }
      },

      // Utility Actions
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    { name: 'wedding-store' },
  ),
);
