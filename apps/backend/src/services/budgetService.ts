import { AppDataSource } from '../config/database';
import { Budget } from '../entities/Budget';
import { Expense, ExpenseCategory, PaymentStatus } from '../entities/Expense';

export class BudgetService {
    private budgetRepository = AppDataSource.getRepository(Budget);
    private expenseRepository = AppDataSource.getRepository(Expense);

    async getAllBudgets() {
        return await this.budgetRepository.find({
            relations: ['expenses'],
            order: { createdAt: 'DESC' },
        });
    }

    async getBudgetById(id: string) {
        const budget = await this.budgetRepository.findOne({
            where: { id },
            relations: ['expenses'],
        });

        if (!budget) {
            throw new Error('Budget not found');
        }

        return budget;
    }

    async createBudget(budgetData: Partial<Budget>) {
        const budget = this.budgetRepository.create(budgetData);
        return await this.budgetRepository.save(budget);
    }

    async updateBudget(id: string, budgetData: Partial<Budget>) {
        const budget = await this.getBudgetById(id);
        Object.assign(budget, budgetData);
        return await this.budgetRepository.save(budget);
    }

    async deleteBudget(id: string) {
        const budget = await this.getBudgetById(id);
        await this.budgetRepository.remove(budget);
        return { message: 'Budget deleted successfully' };
    }

    async addExpense(budgetId: string, expenseData: Partial<Expense>) {
        const budget = await this.getBudgetById(budgetId);

        const expense = this.expenseRepository.create({
            ...expenseData,
            budget,
        });

        const savedExpense = await this.expenseRepository.save(expense);

        // Update budget total spent
        await this.recalculateBudget(budgetId);

        return savedExpense;
    }

    async updateExpense(expenseId: string, expenseData: Partial<Expense>) {
        const expense = await this.expenseRepository.findOne({
            where: { id: expenseId },
            relations: ['budget'],
        });

        if (!expense) {
            throw new Error('Expense not found');
        }

        Object.assign(expense, expenseData);
        const updated = await this.expenseRepository.save(expense);

        // Recalculate budget
        await this.recalculateBudget(expense.budget.id);

        return updated;
    }

    async deleteExpense(expenseId: string) {
        const expense = await this.expenseRepository.findOne({
            where: { id: expenseId },
            relations: ['budget'],
        });

        if (!expense) {
            throw new Error('Expense not found');
        }

        const budgetId = expense.budget.id;
        await this.expenseRepository.remove(expense);

        // Recalculate budget
        await this.recalculateBudget(budgetId);

        return { message: 'Expense deleted successfully' };
    }

    async recalculateBudget(budgetId: string) {
        const budget = await this.getBudgetById(budgetId);

        const totalSpent = budget.expenses.reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
        );

        budget.totalSpent = totalSpent;
        await this.budgetRepository.save(budget);

        return budget;
    }

    async getBudgetStats(budgetId: string) {
        const budget = await this.getBudgetById(budgetId);

        const categoryBreakdown = await this.expenseRepository
            .createQueryBuilder('expense')
            .where('expense.budget_id = :budgetId', { budgetId })
            .select('expense.category', 'category')
            .addSelect('SUM(expense.amount)', 'total')
            .groupBy('expense.category')
            .getRawMany();

        const paymentStatusBreakdown = await this.expenseRepository
            .createQueryBuilder('expense')
            .where('expense.budget_id = :budgetId', { budgetId })
            .select('expense.paymentStatus', 'status')
            .addSelect('SUM(expense.amount)', 'total')
            .addSelect('COUNT(*)', 'count')
            .groupBy('expense.paymentStatus')
            .getRawMany();

        return {
            budget,
            categoryBreakdown,
            paymentStatusBreakdown,
            budgetUtilization: (Number(budget.totalSpent) / Number(budget.totalBudget)) * 100,
            remaining: Number(budget.totalBudget) - Number(budget.totalSpent),
        };
    }

    async getAllExpenses(budgetId?: string) {
        if (budgetId) {
            return await this.expenseRepository.find({
                where: { budget: { id: budgetId } },
                relations: ['budget'],
                order: { date: 'DESC' },
            });
        }

        return await this.expenseRepository.find({
            relations: ['budget'],
            order: { date: 'DESC' },
        });
    }
}