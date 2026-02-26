import { useState, useEffect } from 'react';
import { Users, Building, BookOpen, FileText, Plus, Download } from 'lucide-react';

function CollegeAdminDashboard() {
  const [stats, setStats] = useState({});
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchDepartments();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/admin/departments', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users?limit=10', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const exportReport = async (type) => {
    try {
      const response = await fetch(`/api/admin/reports/export?type=${type}&format=csv`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_report.csv`;
      a.click();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const statCards = [
    { title: 'Total Users', value: stats.total_users || 0, icon: Users, color: 'bg-blue-500' },
    { title: 'Departments', value: stats.total_departments || 0, icon: Building, color: 'bg-green-500' },
    { title: 'Subjects', value: stats.total_subjects || 0, icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Study Materials', value: stats.total_materials || 0, icon: FileText, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">College Administration</h1>
        <div className="flex gap-2">
          <button
            onClick={() => exportReport('users')}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export Users
          </button>
          <button
            onClick={() => setShowUserForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Distribution */}
      {stats.role_distribution && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">User Distribution by Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.role_distribution).map(([role, count]) => (
              <div key={role} className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-blue-600">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{role.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Departments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Departments</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="border rounded-lg p-4">
                <h3 className="font-medium">{dept.name}</h3>
                <p className="text-sm text-gray-600">Code: {dept.code}</p>
                <p className="text-xs text-gray-500">
                  HOD: {dept.profiles?.full_name || 'Not assigned'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.departments?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CollegeAdminDashboard;