import { Router } from 'express';
import { guestController, eventController, budgetController, dashboardController } from '../controllers';

const router = Router();

// Dashboard Routes
router.get('/dashboard/stats', dashboardController.getStats);

// Guest Routes
router.get('/guests', guestController.getAll);
router.get('/guests/stats', guestController.getStats);
router.get('/guests/:id', guestController.getById);
router.post('/guests', guestController.create);
router.put('/guests/:id', guestController.update);
router.delete('/guests/:id', guestController.delete);
router.patch('/guests/:id/rsvp', guestController.updateRSVP);

// Event Routes
router.get('/events', eventController.getAll);
router.get('/events/stats', eventController.getStats);
router.get('/events/:id', eventController.getById);
router.post('/events', eventController.create);
router.put('/events/:id', eventController.update);
router.delete('/events/:id', eventController.delete);

// Budget Routes
router.get('/budgets', budgetController.getAll);
router.get('/budgets/:id', budgetController.getById);
router.get('/budgets/:id/stats', budgetController.getStats);
router.post('/budgets', budgetController.create);
router.put('/budgets/:id', budgetController.update);
router.delete('/budgets/:id', budgetController.delete);

// Expense Routes
router.get('/expenses', budgetController.getAllExpenses);
router.post('/budgets/:id/expenses', budgetController.addExpense);
router.put('/expenses/:expenseId', budgetController.updateExpense);
router.delete('/expenses/:expenseId', budgetController.deleteExpense);

export default router;