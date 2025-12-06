import { Plus } from 'lucide-react';
import { getStatusBadge } from '@/constants/getStatusBadge';
import { useBudgetWithExpenses } from '@/hooks/useWedding';

const Budget = () => {
  const { budgets, expenses, loading } = useBudgetWithExpenses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Budget & Expenses</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      {/* Budget Overview */}
      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center text-gray-500">Loading budget...</div>
        </div>
      ) : budgets.length > 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Budget Overview</h3>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (Number(budget.totalSpent) / Number(budget.totalBudget)) * 100;
              return (
                <div key={budget.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{budget.name}</span>
                    <span className="text-sm text-gray-600">
                      ₹{Number(budget.totalSpent).toLocaleString()} / ₹
                      {Number(budget.totalBudget).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${percentage > 90
                          ? 'bg-red-500'
                          : percentage > 70
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{percentage.toFixed(1)}% used</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center text-gray-500">No budget found</div>
        </div>
      )}

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Loading expenses...
                </td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    {expense.vendor && <p className="text-sm text-gray-600">{expense.vendor}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expense.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ₹{Number(expense.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(expense.paymentStatus)}`}
                    >
                      {expense.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;