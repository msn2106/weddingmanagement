import { Calendar, Clock, Plus, Users } from 'lucide-react';

const Event = ({ events }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">No events found</div>
        ) : (
          events.map((event: any) => (
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
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
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
  );
};

export default Event;
