import { useState, useEffect } from 'react';
import { Users, BookOpen, FileText, Calendar, Plus } from 'lucide-react';

function DeptAdminDashboard() {
  const [stats, setStats] = useState({});
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    is_urgent: false,
    target_audience: 'all'
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/department/analytics', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createNotice = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/department/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(noticeForm)
      });
      setShowNoticeForm(false);
      setNoticeForm({ title: '', content: '', is_urgent: false, target_audience: 'all' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const statCards = [
    { title: 'Total Students', value: stats.total_students || 0, icon: Users, color: 'bg-blue-500' },
    { title: 'Faculty Members', value: stats.total_faculty || 0, icon: Users, color: 'bg-green-500' },
    { title: 'Subjects', value: stats.total_subjects || 0, icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Study Materials', value: stats.total_materials || 0, icon: FileText, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Department Dashboard</h1>
        <button
          onClick={() => setShowNoticeForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Create Notice
        </button>
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

      {/* Notice Form */}
      {showNoticeForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Create Notice</h2>
          <form onSubmit={createNotice} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})}
                className="w-full border rounded px-3 py-2"
                rows="4"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={noticeForm.is_urgent}
                  onChange={(e) => setNoticeForm({...noticeForm, is_urgent: e.target.checked})}
                  className="mr-2"
                />
                Urgent
              </label>
              <select
                value={noticeForm.target_audience}
                onChange={(e) => setNoticeForm({...noticeForm, target_audience: e.target.value})}
                className="border rounded px-3 py-2"
              >
                <option value="all">All</option>
                <option value="students">Students</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Create Notice
              </button>
              <button
                type="button"
                onClick={() => setShowNoticeForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student Distribution */}
      {stats.student_distribution && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Student Distribution by Semester</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.student_distribution).map(([semester, count]) => (
              <div key={semester} className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-blue-600">{count}</div>
                <div className="text-sm text-gray-600">Semester {semester}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DeptAdminDashboard;