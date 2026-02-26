import { useAuth } from '../../context/AuthContext';
import { Building2, Users, BookOpen, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

function CollegeAdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Departments', value: '5', icon: Building2, color: 'bg-blue-100 text-blue-600', change: '+2%' },
    { name: 'Total Users', value: '1,247', icon: Users, color: 'bg-green-100 text-green-600', change: '+12%' },
    { name: 'Active Courses', value: '45', icon: BookOpen, color: 'bg-purple-100 text-purple-600', change: '+5%' },
    { name: 'System Uptime', value: '99.8%', icon: Activity, color: 'bg-orange-100 text-orange-600', change: '+0.1%' }
  ];

  const alerts = [
    { type: 'warning', message: 'Storage usage at 78%', time: '2 hours ago' },
    { type: 'success', message: 'Backup completed successfully', time: '4 hours ago' },
    { type: 'info', message: 'New department added', time: '1 day ago' }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'John Doe', time: '5 min ago' },
    { action: 'Report generated', user: 'Dr. Smith', time: '15 min ago' },
    { action: 'System backup', user: 'System', time: '1 hour ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          College Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome, {user?.full_name}! Manage the entire college system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.name}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">System Alerts</h2>
          </div>
          <div className="p-6 space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {alert.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-yellow-600" /> :
                   alert.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                   <Activity className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeAdminDashboard;