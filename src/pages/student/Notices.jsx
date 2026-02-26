import { Bell, Calendar, Pin } from 'lucide-react';

function Notices() {
  const notices = [
    {
      id: 1,
      title: 'Mid-term Examination Schedule Released',
      content: 'The mid-term examination schedule for all subjects has been released. Please check your respective timetables.',
      date: '2024-01-15',
      priority: 'high',
      pinned: true
    },
    {
      id: 2,
      title: 'Library Hours Extended',
      content: 'Library hours have been extended till 10 PM during examination period.',
      date: '2024-01-14',
      priority: 'medium',
      pinned: false
    },
    {
      id: 3,
      title: 'Workshop on AI/ML',
      content: 'A workshop on Artificial Intelligence and Machine Learning will be conducted next week. Registration is mandatory.',
      date: '2024-01-12',
      priority: 'medium',
      pinned: true
    },
    {
      id: 4,
      title: 'Fee Payment Deadline',
      content: 'Last date for semester fee payment is January 20th, 2024. Late fee will be applicable after the deadline.',
      date: '2024-01-10',
      priority: 'high',
      pinned: false
    },
    {
      id: 5,
      title: 'Cultural Fest Registration',
      content: 'Registration for annual cultural fest is now open. Various competitions and events are available.',
      date: '2024-01-08',
      priority: 'low',
      pinned: false
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Department Notices</h1>
        <p className="text-gray-600">Stay updated with important announcements and circulars</p>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {notice.pinned && <Pin className="h-4 w-4 text-blue-600" />}
                    <h3 className="text-lg font-medium text-gray-900">{notice.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(notice.priority)}`}>
                      {notice.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{notice.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(notice.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <Bell className="h-5 w-5 text-gray-400 ml-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notices;