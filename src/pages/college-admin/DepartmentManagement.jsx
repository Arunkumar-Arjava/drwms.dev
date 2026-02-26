import { Building2, Users, BookOpen, Plus, Edit2, Eye, Search } from 'lucide-react';
import { useState } from 'react';

function DepartmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const departments = [
    {
      id: 1,
      name: 'Computer Science Engineering',
      code: 'CSE',
      hod: 'Dr. John Smith',
      faculty: 15,
      students: 240,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      established: 2010,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Electronics & Communication',
      code: 'ECE',
      hod: 'Prof. Emily Johnson',
      faculty: 12,
      students: 180,
      programs: ['B.Tech', 'M.Tech'],
      established: 2012,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      code: 'MECH',
      hod: 'Dr. Michael Brown',
      faculty: 18,
      students: 200,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      established: 2008,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'CIVIL',
      hod: 'Prof. Sarah Davis',
      faculty: 14,
      students: 160,
      programs: ['B.Tech', 'M.Tech'],
      established: 2009,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Information Technology',
      code: 'IT',
      hod: 'Dr. David Wilson',
      faculty: 10,
      students: 120,
      programs: ['B.Tech', 'M.Tech'],
      established: 2015,
      status: 'Active'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Department Management</h1>
            <p className="text-gray-600">Manage all college departments and their information</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            {filteredDepartments.length} departments
          </div>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              <p className="text-sm text-gray-500">Total Departments</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {departments.reduce((acc, dept) => acc + dept.faculty, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Faculty</p>
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
                {departments.reduce((acc, dept) => acc + dept.students, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {departments.filter(dept => dept.status === 'Active').length}
              </p>
              <p className="text-sm text-gray-500">Active Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-500">Code: {department.code}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(department.status)}`}>
                  {department.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Head of Department:</span>
                  <span className="text-sm font-medium text-gray-900">{department.hod}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Faculty Members:</span>
                  <span className="text-sm font-medium text-gray-900">{department.faculty}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Students:</span>
                  <span className="text-sm font-medium text-gray-900">{department.students}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Established:</span>
                  <span className="text-sm font-medium text-gray-900">{department.established}</span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Programs:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {department.programs.map((program, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                <button className="flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Department</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter department name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter department code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter HOD name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter year"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentManagement;