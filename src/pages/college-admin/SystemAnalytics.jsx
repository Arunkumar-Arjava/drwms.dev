import { BarChart3, TrendingUp, Users, BookOpen, Activity, Download, Calendar, Server, Cpu, HardDrive, Wifi, Shield } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function SystemAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const analyticsData = {
    overview: {
      totalUsers: 1247,
      activeUsers: 1089,
      totalDepartments: 5,
      totalCourses: 45,
      systemUptime: 99.8,
      storageUsed: 78.5
    },
    userActivity: {
      week: [120, 135, 98, 156, 142, 178, 165],
      month: [850, 920, 780, 1050, 980, 1120, 1089],
      year: [3200, 3450, 2980, 3780, 3650, 4120, 3890]
    },
    departmentStats: [
      { name: 'Computer Science', users: 425, courses: 15, activity: 92, growth: '+12%' },
      { name: 'Electronics', users: 320, courses: 12, activity: 88, growth: '+8%' },
      { name: 'Mechanical', users: 280, courses: 10, activity: 85, growth: '+5%' },
      { name: 'Civil', users: 222, courses: 8, activity: 79, growth: '+3%' }
    ],
    systemHealth: {
      cpu: 45,
      memory: 62,
      storage: 78,
      network: 23
    }
  };

  const getActivityData = () => {
    return analyticsData.userActivity[selectedPeriod] || analyticsData.userActivity.month;
  };

  const getHealthStatus = (value) => {
    if (value > 80) return { color: 'destructive', status: 'Critical' };
    if (value > 60) return { color: 'warning', status: 'Warning' };
    return { color: 'success', status: 'Good' };
  };

  const statCards = [
    {
      title: 'Total Users',
      value: analyticsData.overview.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: analyticsData.overview.activeUsers.toLocaleString(),
      icon: Activity,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Departments',
      value: analyticsData.overview.totalDepartments,
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '0%',
      changeType: 'neutral'
    },
    {
      title: 'Total Courses',
      value: analyticsData.overview.totalCourses,
      icon: BookOpen,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'System Uptime',
      value: `${analyticsData.overview.systemUptime}%`,
      icon: Shield,
      color: 'bg-emerald-500',
      change: '+0.2%',
      changeType: 'positive'
    },
    {
      title: 'Storage Used',
      value: `${analyticsData.overview.storageUsed}%`,
      icon: HardDrive,
      color: 'bg-indigo-500',
      change: '+5%',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">System Analytics</CardTitle>
              <CardDescription className="text-lg mt-2">
                Comprehensive system performance and usage analytics dashboard
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : stat.changeType === 'negative' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                User Activity Trends
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {selectedPeriod === 'week' ? 'Daily' : selectedPeriod === 'month' ? 'Weekly' : 'Monthly'} Activity
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 p-4">
              <div className="h-full flex items-end justify-between gap-3 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-4">
                {getActivityData().map((value, index) => {
                  const maxValue = Math.max(...getActivityData());
                  const height = Math.max((value / maxValue) * 240, 8);
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        {value.toLocaleString()} users
                      </div>
                      
                      {/* Bar */}
                      <div className="relative w-full max-w-12 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-lg shadow-sm hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
                          style={{ height: `${height}px` }}
                        >
                          {/* Shine effect */}
                          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-t-lg"></div>
                        </div>
                        
                        {/* Value label on top of bar */}
                        <div className="absolute -top-6 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {value > 1000 ? `${(value/1000).toFixed(1)}k` : value}
                        </div>
                      </div>
                      
                      {/* X-axis label */}
                      <div className="mt-3 text-center">
                        <span className="text-xs font-medium text-gray-600">
                          {selectedPeriod === 'week' ? `Day ${index + 1}` : 
                           selectedPeriod === 'month' ? `Week ${index + 1}` : 
                           `Month ${index + 1}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Y-axis labels */}
              <div className="flex justify-between items-center mt-4 px-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded"></div>
                    <span>Active Users</span>
                  </div>
                  <div className="text-xs">
                    Peak: {Math.max(...getActivityData()).toLocaleString()}
                  </div>
                  <div className="text-xs">
                    Avg: {Math.round(getActivityData().reduce((a, b) => a + b, 0) / getActivityData().length).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: 'CPU Usage', value: analyticsData.systemHealth.cpu, icon: Cpu },
              { name: 'Memory', value: analyticsData.systemHealth.memory, icon: Server },
              { name: 'Storage', value: analyticsData.systemHealth.storage, icon: HardDrive },
              { name: 'Network', value: analyticsData.systemHealth.network, icon: Wifi }
            ].map((item, index) => {
              const Icon = item.icon;
              const health = getHealthStatus(item.value);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.value}%</span>
                      <Badge variant={health.color === 'success' ? 'default' : health.color === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                        {health.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Department Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Overview</CardTitle>
          <CardDescription>
            Detailed statistics and performance metrics for each department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Courses</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Activity Score</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Growth</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.departmentStats.map((dept, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{dept.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">{dept.users.toLocaleString()}</td>
                    <td className="py-4 px-4 font-medium">{dept.courses}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                            style={{ width: `${dept.activity}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{dept.activity}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {dept.growth}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={dept.activity > 85 ? 'default' : 'secondary'}>
                        {dept.activity > 85 ? 'Excellent' : 'Good'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div> 
  );
}



export default SystemAnalytics;