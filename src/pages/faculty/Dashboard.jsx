import { useAuth } from '../../context/AuthContext';
import { BookOpen, Upload, FileText, BarChart3, Users, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

function FacultyDashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'My Subjects',
      description: 'View assigned subjects',
      icon: BookOpen,
      href: '/subjects',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Upload Materials',
      description: 'Add study materials',
      icon: Upload,
      href: '/upload',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Enter Marks',
      description: 'Update internal marks',
      icon: FileText,
      href: '/marks',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'View Students',
      description: 'Manage student data',
      icon: Users,
      href: '/students',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Workload Report',
      description: 'Check teaching hours',
      icon: BarChart3,
      href: '/workload',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, Prof. {user?.full_name}!</CardTitle>
          <CardDescription>
            Manage your subjects, upload materials, and track student progress.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">120</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">25</p>
                <p className="text-sm text-muted-foreground">Materials</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">18</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className={`p-2 rounded-lg ${action.bgColor} w-fit`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-1">{action.title}</CardTitle>
              <CardDescription className="text-sm mb-3">
                {action.description}
              </CardDescription>
              <Button variant="ghost" size="sm" className="p-0 h-auto font-medium" asChild>
                <a href={action.href}>Access →</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>Important tasks that require your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Internal marks deadline approaching
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Due in 3 days - Database Management</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-xs">
                Urgent
              </Badge>
            </div>
            
            <div className="flex items-start justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Upload className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Upload lab manual for next week
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Data Structures Lab</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Pending
              </Badge>
            </div>
            
            <div className="flex items-start justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Attendance updated successfully
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">All subjects for this week</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                Completed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FacultyDashboard;