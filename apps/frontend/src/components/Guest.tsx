import { getStatusBadge } from '@/constants/getStatusBadge';
import { Plus } from 'lucide-react';
import React from 'react';

const Guest = ({ guests }) => {
  return (
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                RSVP Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Events
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No guests found
                </td>
              </tr>
            ) : (
              guests.map((guest: any) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{guest.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guest.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guest.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(guest.rsvpStatus)}`}
                    >
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
  );
};

export default Guest;
