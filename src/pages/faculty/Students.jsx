import { Users, Search, Filter, Eye, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const subjects = [
    { id: 1, name: 'Data Structures and Algorithms', code: 'CS301' },
    { id: 2, name: 'Database Management Systems', code: 'CS401' },
    { id: 3, name: 'Software Engineering', code: 'CS501' }
  ];

  const students = [
    {
      id: 1,
      name: 'John Smith',
      rollNo: 'CS2021001',
      email: 'john.smith@college.edu',
      phone: '+1 (555) 123-4567',
      semester: 6,
      subjects: ['CS301', 'CS401', 'CS501'],
      attendance: 85,
      avgMarks: 78
    },
    {
      id: 2,
      name: 'Emily Johnson',
      rollNo: 'CS2021002',
      email: 'emily.johnson@college.edu',
      phone: '+1 (555) 234-5678',
      semester: 6,
      subjects: ['CS301', 'CS401'],
      attendance: 92,
      avgMarks: 85
    },
    {
      id: 3,
      name: 'Michael Brown',
      rollNo: 'CS2021003',
      email: 'michael.brown@college.edu',
      phone: '+1 (555) 345-6789',
      semester: 6,
      subjects: ['CS301', 'CS501'],
      attendance: 78,
      avgMarks: 72
    },
    {
      id: 4,
      name: 'Sarah Davis',
      rollNo: 'CS2021004',
      email: 'sarah.davis@college.edu',
      phone: '+1 (555) 456-7890',
      semester: 6,
      subjects: ['CS401', 'CS501'],
      attendance: 88,
      avgMarks: 81
    },
    {
      id: 5,
      name: 'David Wilson',
      rollNo: 'CS2021005',
      email: 'david.wilson@college.edu',
      phone: '+1 (555) 567-8901',
      semester: 6,
      subjects: ['CS301', 'CS401', 'CS501'],
      attendance: 95,
      avgMarks: 89
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || student.subjects.includes(selectedSubject);
    const matchesSemester = !selectedSemester || student.semester.toString() === selectedSemester;
    
    return matchesSearch && matchesSubject && matchesSemester;
  });

  const getAttendanceColor = (attendance) => {
    if (attendance >= 85) return 'text-green-600 bg-green-100';
    if (attendance >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMarksColor = (marks) => {
    if (marks >= 80) return 'text-green-600';
    if (marks >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Students</h1>
        <p className="text-gray-600">View and manage student information for your subjects</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.code}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Semesters</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>

          <div className="flex items-center text-sm text-gray-500">
            <Filter className="h-4 w-4 mr-2" />
            {filteredStudents.length} students found
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Student List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subjects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Marks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs">{student.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs">{student.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getMarksColor(student.avgMarks)}`}>
                      {student.avgMarks}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(filteredStudents.reduce((acc, student) => acc + student.attendance, 0) / filteredStudents.length)}%
              </p>
              <p className="text-sm text-gray-500">Avg Attendance</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(filteredStudents.reduce((acc, student) => acc + student.avgMarks, 0) / filteredStudents.length)}%
              </p>
              <p className="text-sm text-gray-500">Avg Marks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;