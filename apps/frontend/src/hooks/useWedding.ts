import { useWeddingStore } from '@/store/useWeddingStore';
import { useEffect } from 'react';

/**
 * Hook to fetch and manage guests
 */
export const useGuests = () => {
  const guests = useWeddingStore((state) => state.guests);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);
  const fetchGuests = useWeddingStore((state) => state.fetchGuests);
  const createGuest = useWeddingStore((state) => state.createGuest);
  const updateGuest = useWeddingStore((state) => state.updateGuest);
  const deleteGuest = useWeddingStore((state) => state.deleteGuest);
  const updateGuestRSVP = useWeddingStore((state) => state.updateGuestRSVP);

  return {
    guests,
    loading,
    error,
    fetchGuests,
    createGuest,
    updateGuest,
    deleteGuest,
    updateGuestRSVP,
  };
};

/**
 * Hook to fetch and manage events
 */
export const useEvents = () => {
  const events = useWeddingStore((state) => state.events);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);
  const fetchEvents = useWeddingStore((state) => state.fetchEvents);
  const createEvent = useWeddingStore((state) => state.createEvent);
  const updateEvent = useWeddingStore((state) => state.updateEvent);
  const deleteEvent = useWeddingStore((state) => state.deleteEvent);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

/**
 * Hook to fetch and manage budgets
 */
export const useBudgets = () => {
  const budgets = useWeddingStore((state) => state.budgets);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);
  const fetchBudgets = useWeddingStore((state) => state.fetchBudgets);
  const createBudget = useWeddingStore((state) => state.createBudget);
  const updateBudget = useWeddingStore((state) => state.updateBudget);
  const deleteBudget = useWeddingStore((state) => state.deleteBudget);

  return {
    budgets,
    loading,
    error,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
  };
};

/**
 * Hook to fetch and manage expenses
 */
export const useExpenses = () => {
  const expenses = useWeddingStore((state) => state.expenses);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);
  const fetchExpenses = useWeddingStore((state) => state.fetchExpenses);
  const createExpense = useWeddingStore((state) => state.createExpense);
  const updateExpense = useWeddingStore((state) => state.updateExpense);
  const deleteExpense = useWeddingStore((state) => state.deleteExpense);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};

/**
 * Hook to fetch and manage dashboard stats
 */
export const useDashboard = () => {
  const dashboardStats = useWeddingStore((state) => state.dashboardStats);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);
  const fetchDashboardStats = useWeddingStore((state) => state.fetchDashboardStats);

  return {
    dashboardStats,
    loading,
    error,
    fetchDashboardStats,
  };
};

/**
 * Hook to initialize all wedding data on mount
 */
export const useInitializeWedding = () => {
  const fetchAllData = useWeddingStore((state) => state.fetchAllData);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { loading, error };
};

/**
 * Hook for loading state
 */
export const useLoading = () => {
  return useWeddingStore((state) => state.loading);
};

/**
 * Hook for error state
 */
export const useError = () => {
  const error = useWeddingStore((state) => state.error);
  const clearError = useWeddingStore((state) => state.clearError);

  return { error, clearError };
};

/**
 * Combined hook for budget and expenses (often used together)
 */
export const useBudgetWithExpenses = () => {
  const budgets = useWeddingStore((state) => state.budgets);
  const expenses = useWeddingStore((state) => state.expenses);
  const loading = useWeddingStore((state) => state.loading);
  const error = useWeddingStore((state) => state.error);
  const fetchBudgets = useWeddingStore((state) => state.fetchBudgets);
  const fetchExpenses = useWeddingStore((state) => state.fetchExpenses);
  const createExpense = useWeddingStore((state) => state.createExpense);
  const updateExpense = useWeddingStore((state) => state.updateExpense);
  const deleteExpense = useWeddingStore((state) => state.deleteExpense);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, [fetchBudgets, fetchExpenses]);

  return {
    budgets,
    expenses,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};
