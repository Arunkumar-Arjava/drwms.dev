import { useAuth } from '../../context/AuthContext';
import { Users, BookOpen, FileText, BarChart3, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

function DeptAdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Faculty Members', value: '15', icon: Users, color: 'bg-blue-100 text-blue-600', change: '+1' },
    { name: 'Students', value: '240', icon: Users, color: 'bg-green-100 text-green-600', change: '+8' },
    { name: 'Active Courses', value: '12', icon: BookOpen, color: 'bg-purple-100 text-purple-600', change: '+2' },
    { name: 'Pending Reports', value: '3', icon: FileText, color: 'bg-orange-100 text-orange-600', change: '-1' }
  ];

  const pendingTasks = [
    { task: 'Review faculty workload reports', priority: 'high', due: 'Today' },
    { task: 'Approve internal marks submission', priority: 'medium', due: '2 days' },
    { task: 'Generate semester report', priority: 'low', due: '1 week' }
  ];

  const recentUpdates = [
    { update: 'New study materials uploaded', course: 'Data Structures', time: '2 hours ago' },
    { update: 'Internal marks submitted', course: 'Database Systems', time: '4 hours ago' },
    { update: 'Faculty attendance updated', course: 'Software Engineering', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Department Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome, {user?.full_name}! Manage your department operations.
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
        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Pending Tasks</h2>
          </div>
          <div className="p-6 space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100' :
                    task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    {task.priority === 'high' ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                     <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Updates</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{update.update}</p>
                  <p className="text-xs text-gray-500">{update.course} • {update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeptAdminDashboard;