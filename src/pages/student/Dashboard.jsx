import { useAuth } from '../../context/AuthContext';
import { BookOpen, FileText, Calendar, Bell, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

function StudentDashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Study Materials',
      description: 'Access notes, PPTs, and PDFs',
      icon: BookOpen,
      href: '/materials',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: '24 files'
    },
    {
      title: 'Internal Marks',
      description: 'View your test scores',
      icon: TrendingUp,
      href: '/marks',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: '85% avg'
    },
    {
      title: 'Lab Schedule',
      description: 'Check your lab timings',
      icon: Calendar,
      href: '/schedule',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: '3 labs'
    },
    {
      title: 'Notices',
      description: 'Department announcements',
      icon: Bell,
      href: '/notices',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      count: '5 new'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, {user?.full_name}!</CardTitle>
          <CardDescription>
            Access your study materials, check marks, and stay updated with department notices.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {action.count}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-1">{action.title}</CardTitle>
              <CardDescription className="text-sm">
                {action.description}
              </CardDescription>
              <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto font-medium" asChild>
                <a href={action.href}>View details →</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Stay updated with your latest academic activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  New study material uploaded for Data Structures
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    PDF
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Internal marks updated for Database Management
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    92/100
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    1 day ago
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50">
              <div className="bg-orange-100 p-2 rounded-full">
                <Bell className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  New department notice: Mid-term exam schedule
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Important
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    2 days ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentDashboard;