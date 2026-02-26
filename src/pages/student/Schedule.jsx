import { Calendar, Clock, MapPin } from 'lucide-react';

function Schedule() {
  const schedule = [
    { day: 'Monday', time: '9:00-11:00', subject: 'Data Structures Lab', room: 'Lab 1', faculty: 'Dr. Smith' },
    { day: 'Tuesday', time: '2:00-4:00', subject: 'Database Lab', room: 'Lab 2', faculty: 'Prof. Johnson' },
    { day: 'Wednesday', time: '10:00-12:00', subject: 'Web Development Lab', room: 'Lab 3', faculty: 'Dr. Brown' },
    { day: 'Thursday', time: '1:00-3:00', subject: 'Network Lab', room: 'Lab 1', faculty: 'Prof. Davis' },
    { day: 'Friday', time: '11:00-1:00', subject: 'Software Engineering Lab', room: 'Lab 2', faculty: 'Dr. Wilson' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lab Schedule</h1>
        <p className="text-gray-600">Your weekly lab schedule and timings</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Weekly Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{item.day}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.room}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Schedule;