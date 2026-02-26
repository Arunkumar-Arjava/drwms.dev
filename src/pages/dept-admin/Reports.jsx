import { FileText, Download, Calendar, BarChart3, Users, BookOpen, Filter } from 'lucide-react';
import { useState } from 'react';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedSemester, setSelectedSemester] = useState('');

  const reportTypes = [
    {
      id: 'student-performance',
      name: 'Student Performance Report',
      description: 'Academic performance and attendance analysis',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'faculty-workload',
      name: 'Faculty Workload Report',
      description: 'Teaching hours and subject distribution',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'attendance-summary',
      name: 'Attendance Summary',
      description: 'Student attendance across all subjects',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'marks-analysis',
      name: 'Marks Analysis Report',
      description: 'Internal marks and grade distribution',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'department-overview',
      name: 'Department Overview',
      description: 'Complete department statistics and metrics',
      icon: FileText,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'accreditation',
      name: 'Accreditation Report',
      description: 'NAAC/NBA compliance documentation',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Student Performance - Semester 6',
      type: 'Student Performance',
      generatedBy: 'Dr. Smith',
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Faculty Workload - January 2024',
      type: 'Faculty Workload',
      generatedBy: 'Prof. Johnson',
      date: '2024-01-14',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Attendance Summary - Q4 2023',
      type: 'Attendance',
      generatedBy: 'Dr. Brown',
      date: '2024-01-12',
      status: 'Processing'
    }
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) return;
    
    // Here you would typically call an API to generate the report
    console.log('Generating report:', {
      type: selectedReport,
      dateRange,
      semester: selectedSemester
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports for department analysis and accreditation</p>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select report type</option>
              {reportTypes.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={!selectedReport}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Available Report Types */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Report Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg ${report.color}`}>
                  <report.icon className="h-5 w-5" />
                </div>
                <h3 className="ml-3 font-medium text-gray-900">{report.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{report.description}</p>
              <button
                onClick={() => setSelectedReport(report.id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Select Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Filter className="h-4 w-4 mr-2" />
              {recentReports.length} reports
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.generatedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {report.status === 'Completed' && (
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-500">Reports Generated</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-sm text-gray-500">Downloads</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">Scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;