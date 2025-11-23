'use client';

import { useState, useEffect } from 'react';
import { dashboardAPI, guestAPI, eventAPI, budgetAPI, expenseAPI } from '@/lib/api';
import {
    Users, Calendar, DollarSign, TrendingUp,
    Plus, Edit, Trash2, Check, X, Clock
} from 'lucide-react';

type Tab = 'dashboard' | 'guests' | 'events' | 'budget';

export default function Home() {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [dashboardStats, setDashboardStats] = useState<any>(null);
    const [guests, setGuests] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [budgets, setBudgets] = useState<any[]>([]);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch dashboard stats
    const fetchDashboardStats = async () => {
        try {
            const { data } = await dashboardAPI.getStats();
            setDashboardStats(data.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    // Fetch guests
    const fetchGuests = async () => {
        setLoading(true);
        try {
            const { data } = await guestAPI.getAll();
            setGuests(data.data);
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
        setLoading(false);
    };

    // Fetch events
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await eventAPI.getAll();
            setEvents(data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
        setLoading(false);
    };

    // Fetch budgets and expenses
    const fetchBudgets = async () => {
        setLoading(true);
        try {
            const [budgetsRes, expensesRes] = await Promise.all([
                budgetAPI.getAll(),
                expenseAPI.getAll(),
            ]);
            setBudgets(budgetsRes.data.data);
            setExpenses(expensesRes.data.data);
        } catch (error) {
            console.error('Error fetching budget data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardStats();
        fetchGuests();
        fetchEvents();
        fetchBudgets();
    }, []);

    const getStatusBadge = (status: string) => {
        const styles = {
            attending: 'bg-green-100 text-green-800',
            not_attending: 'bg-red-100 text-red-800',
            maybe: 'bg-yellow-100 text-yellow-800',
            pending: 'bg-gray-100 text-gray-800',
            paid: 'bg-green-100 text-green-800',
            advance_paid: 'bg-yellow-100 text-yellow-800',
        };
        return styles[status as keyof typeof styles] || styles.pending;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        🎉 Wedding Management System
                    </h1>
                    <p className="text-gray-600 mt-1">Your complete wedding planning solution</p>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-4 overflow-x-auto">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                            { id: 'guests', label: 'Guests & RSVP', icon: Users },
                            { id: 'events', label: 'Events', icon: Calendar },
                            { id: 'budget', label: 'Budget', icon: DollarSign },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as Tab)}
                                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${activeTab === tab.id
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium whitespace-nowrap">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Guests</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {dashboardStats?.guests?.totalGuests || 0}
                                        </p>
                                    </div>
                                    <Users className="text-purple-600" size={32} />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">RSVP Rate</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {dashboardStats?.guests?.totalGuests > 0
                                                ? Math.round(
                                                    ((dashboardStats.guests.rsvpCounts.find((r: any) => r.status === 'attending')?.count || 0) /
                                                        dashboardStats.guests.totalGuests) *
                                                    100
                                                )
                                                : 0}%
                                        </p>
                                    </div>
                                    <Check className="text-green-600" size={32} />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Budget Used</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            ₹{((dashboardStats?.budget?.spent || 0) / 100000).toFixed(1)}L
                                        </p>
                                    </div>
                                    <DollarSign className="text-orange-600" size={32} />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Events</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {dashboardStats?.events?.totalEvents || 0}
                                        </p>
                                    </div>
                                    <Calendar className="text-blue-600" size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-bold mb-4">Recent Guests</h3>
                                <div className="space-y-3">
                                    {guests.slice(0, 5).map((guest) => (
                                        <div key={guest.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{guest.name}</p>
                                                <p className="text-sm text-gray-600">{guest.category}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(guest.rsvpStatus)}`}>
                                                {guest.rsvpStatus}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
                                <div className="space-y-3">
                                    {events.slice(0, 5).map((event) => (
                                        <div key={event.id} className="flex items-center gap-3">
                                            <Calendar className="text-purple-600" size={20} />
                                            <div>
                                                <p className="font-medium">{event.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(event.date).toLocaleDateString()} at {event.startTime}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Guests Tab */}
                {activeTab === 'guests' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Guest Management</h2>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                                <Plus size={18} />
                                Add Guest
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RSVP Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : guests.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                No guests found
                                            </td>
                                        </tr>
                                    ) : (
                                        guests.map((guest) => (
                                            <tr key={guest.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-gray-900">{guest.name}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{guest.category}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{guest.phone}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(guest.rsvpStatus)}`}>
                                                        {guest.rsvpStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {guest.events?.length || 0} events
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Events Tab */}
                {activeTab === 'events' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                                <Plus size={18} />
                                Add Event
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {loading ? (
                                <div className="col-span-2 text-center py-12 text-gray-500">Loading...</div>
                            ) : events.length === 0 ? (
                                <div className="col-span-2 text-center py-12 text-gray-500">No events found</div>
                            ) : (
                                events.map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg shadow p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
                                                <p className="text-sm text-gray-600">{event.type}</p>
                                            </div>
                                            <span className="text-2xl">{event.type === 'wedding' ? '💍' : '🎊'}</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-gray-400" />
                                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-gray-400" />
                                                <span>{event.startTime} - {event.endTime}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users size={16} className="text-gray-400" />
                                                <span>{event.guests?.length || 0} guests invited</span>
                                            </div>
                                            <p className="text-gray-600 mt-3">{event.venue}</p>
                                            {event.dressCode && (
                                                <p className="text-sm text-purple-600">Dress Code: {event.dressCode}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Budget Tab */}
                {activeTab === 'budget' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Budget & Expenses</h2>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                                <Plus size={18} />
                                Add Expense
                            </button>
                        </div>

                        {/* Budget Overview */}
                        {budgets.length > 0 && (
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
                                                        ₹{Number(budget.totalSpent).toLocaleString()} / ₹{Number(budget.totalBudget).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className={`h-3 rounded-full ${percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
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
                        )}

                        {/* Expenses Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                Loading...
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
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(expense.paymentStatus)}`}>
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
                )}
            </main>
        </div>
    );
}