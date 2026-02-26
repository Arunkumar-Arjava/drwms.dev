import { BarChart3, Clock, BookOpen, Users, Download, Calendar } from 'lucide-react';

function Workload() {
  const workloadData = {
    totalHours: 18,
    theoryHours: 12,
    labHours: 6,
    totalSubjects: 5,
    totalStudents: 212
  };

  const weeklySchedule = [
    { day: 'Monday', slots: [
      { time: '9:00-10:00', subject: 'Data Structures', type: 'Theory', room: 'Room 101' },
      { time: '2:00-4:00', subject: 'DS Lab', type: 'Lab', room: 'Lab 1' }
    ]},
    { day: 'Tuesday', slots: [
      { time: '10:00-11:00', subject: 'DBMS', type: 'Theory', room: 'Room 102' },
      { time: '11:00-12:00', subject: 'Software Engg', type: 'Theory', room: 'Room 102' }
    ]},
    { day: 'Wednesday', slots: [
      { time: '9:00-10:00', subject: 'Data Structures', type: 'Theory', room: 'Room 101' },
      { time: '3:00-5:00', subject: 'DBMS Lab', type: 'Lab', room: 'Lab 2' }
    ]},
    { day: 'Thursday', slots: [
      { time: '10:00-11:00', subject: 'DBMS', type: 'Theory', room: 'Room 102' },
      { time: '11:00-12:00', subject: 'Software Engg', type: 'Theory', room: 'Room 102' }
    ]},
    { day: 'Friday', slots: [
      { time: '9:00-10:00', subject: 'Data Structures', type: 'Theory', room: 'Room 101' },
      { time: '2:00-4:00', subject: 'SE Lab', type: 'Lab', room: 'Lab 3' }
    ]}
  ];

  const subjectWorkload = [
    { subject: 'Data Structures', code: 'CS301', theory: 3, lab: 2, total: 5, students: 45 },
    { subject: 'DBMS', code: 'CS401', theory: 3, lab: 2, total: 5, students: 42 },
    { subject: 'Software Engineering', code: 'CS501', theory: 3, lab: 2, total: 5, students: 38 },
    { subject: 'Computer Networks', code: 'CS601', theory: 3, lab: 0, total: 3, students: 35 },
    { subject: 'Web Development', code: 'CS602', theory: 0, lab: 0, total: 0, students: 52 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Workload Report</h1>
            <p className="text-gray-600">View your teaching hours and subject distribution</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{workloadData.totalHours}</p>
              <p className="text-sm text-gray-500">Total Hours</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{workloadData.theoryHours}</p>
              <p className="text-sm text-gray-500">Theory Hours</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{workloadData.labHours}</p>
              <p className="text-sm text-gray-500">Lab Hours</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{workloadData.totalSubjects}</p>
              <p className="text-sm text-gray-500">Subjects</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{workloadData.totalStudents}</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Workload */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Subject-wise Workload</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Theory Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lab Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load Factor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjectWorkload.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{subject.subject}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.theory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.lab}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{subject.total}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{subject.students}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(subject.total / 8) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Weekly Schedule</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {weeklySchedule.map((day, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <h3 className="font-medium text-gray-900">{day.day}</h3>
                </div>
                <div className="space-y-2">
                  {day.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500">{slot.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          slot.type === 'Theory' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {slot.type}
                        </span>
                      </div>
                      <div className="font-medium text-gray-900">{slot.subject}</div>
                      <div className="text-gray-500">{slot.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Workload Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hours Distribution</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Theory Classes</span>
                <span className="text-sm font-medium">{workloadData.theoryHours} hrs (67%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lab Sessions</span>
                <span className="text-sm font-medium">{workloadData.labHours} hrs (33%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Workload Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Load</span>
                <span className="text-sm font-medium text-green-600">18 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Recommended Load</span>
                <span className="text-sm font-medium text-gray-600">16-20 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workload;