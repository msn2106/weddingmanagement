import { Request, Response } from 'express';
import { GuestService } from '../services/guestService';
import { EventService } from '../services/eventService';
import { BudgetService } from '../services/budgetService';

const guestService = new GuestService();
const eventService = new EventService();
const budgetService = new BudgetService();

// Guest Controllers
export const guestController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const guests = await guestService.getAllGuests();
            res.json({ success: true, data: guests });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const guest = await guestService.getGuestById(req.params.id);
            res.json({ success: true, data: guest });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const guest = await guestService.createGuest(req.body);
            res.status(201).json({ success: true, data: guest });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const guest = await guestService.updateGuest(req.params.id, req.body);
            res.json({ success: true, data: guest });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const result = await guestService.deleteGuest(req.params.id);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    updateRSVP: async (req: Request, res: Response) => {
        try {
            const guest = await guestService.updateRSVP(req.params.id, req.body.status);
            res.json({ success: true, data: guest });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    getStats: async (req: Request, res: Response) => {
        try {
            const stats = await guestService.getGuestStats();
            res.json({ success: true, data: stats });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
};

// Event Controllers
export const eventController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const events = await eventService.getAllEvents();
            res.json({ success: true, data: events });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const event = await eventService.getEventById(req.params.id);
            res.json({ success: true, data: event });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const event = await eventService.createEvent(req.body);
            res.status(201).json({ success: true, data: event });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const event = await eventService.updateEvent(req.params.id, req.body);
            res.json({ success: true, data: event });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const result = await eventService.deleteEvent(req.params.id);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    getStats: async (req: Request, res: Response) => {
        try {
            const stats = await eventService.getEventStats();
            res.json({ success: true, data: stats });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
};

// Budget Controllers
export const budgetController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const budgets = await budgetService.getAllBudgets();
            res.json({ success: true, data: budgets });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const budget = await budgetService.getBudgetById(req.params.id);
            res.json({ success: true, data: budget });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const budget = await budgetService.createBudget(req.body);
            res.status(201).json({ success: true, data: budget });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const budget = await budgetService.updateBudget(req.params.id, req.body);
            res.json({ success: true, data: budget });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const result = await budgetService.deleteBudget(req.params.id);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    getStats: async (req: Request, res: Response) => {
        try {
            const stats = await budgetService.getBudgetStats(req.params.id);
            res.json({ success: true, data: stats });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    addExpense: async (req: Request, res: Response) => {
        try {
            const expense = await budgetService.addExpense(req.params.id, req.body);
            res.status(201).json({ success: true, data: expense });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    updateExpense: async (req: Request, res: Response) => {
        try {
            const expense = await budgetService.updateExpense(req.params.expenseId, req.body);
            res.json({ success: true, data: expense });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    deleteExpense: async (req: Request, res: Response) => {
        try {
            const result = await budgetService.deleteExpense(req.params.expenseId);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    getAllExpenses: async (req: Request, res: Response) => {
        try {
            const budgetId = req.query.budgetId as string;
            const expenses = await budgetService.getAllExpenses(budgetId);
            res.json({ success: true, data: expenses });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
};

// Dashboard Controller
export const dashboardController = {
    getStats: async (req: Request, res: Response) => {
        try {
            const [guestStats, eventStats] = await Promise.all([
                guestService.getGuestStats(),
                eventService.getEventStats(),
            ]);

            const budgets = await budgetService.getAllBudgets();
            const totalBudget = budgets.reduce((sum, b) => sum + Number(b.totalBudget), 0);
            const totalSpent = budgets.reduce((sum, b) => sum + Number(b.totalSpent), 0);

            res.json({
                success: true,
                data: {
                    guests: guestStats,
                    events: eventStats,
                    budget: {
                        total: totalBudget,
                        spent: totalSpent,
                        remaining: totalBudget - totalSpent,
                        utilizationPercentage: (totalSpent / totalBudget) * 100,
                    },
                },
            });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
};