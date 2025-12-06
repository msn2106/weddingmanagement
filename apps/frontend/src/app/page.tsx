'use client';

import { useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Check } from 'lucide-react';
import { getStatusBadge } from '@/constants/getStatusBadge';
import Budget from '@/components/Budget';
import Event from '@/components/Event';
import Guest from '@/components/Guest';
import { useInitializeWedding, useDashboard, useGuests, useEvents } from '@/hooks/useWedding';

type Tab = 'dashboard' | 'guests' | 'events' | 'budget';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // Initialize all data on mount
  const { loading: initLoading } = useInitializeWedding();

  // Get data from store via hooks
  const { dashboardStats } = useDashboard();
  const { guests } = useGuests();
  const { events } = useEvents();

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
        {initLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">Loading wedding data...</div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && !initLoading && (
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
                          ((dashboardStats.guests.rsvpCounts.find(
                            (r) => r.status === 'attending'
                          )?.count || 0) /
                            dashboardStats.guests.totalGuests) *
                          100
                        )
                        : 0}
                      %
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(guest.rsvpStatus)}`}
                      >
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
        {activeTab === 'guests' && <Guest />}

        {/* Events Tab */}
        {activeTab === 'events' && <Event />}

        {/* Budget Tab */}
        {activeTab === 'budget' && <Budget />}
      </main>
    </div>
  );
}