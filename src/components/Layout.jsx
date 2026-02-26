import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Calendar,
  Bell,
  Folder,
  Upload,
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';

function Layout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const navigation = {
    student: [
      { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
      { name: 'Study Materials', href: '/materials', icon: FileText },
      { name: 'Internal Marks', href: '/marks', icon: FileText },
      { name: 'Lab Schedule', href: '/schedule', icon: FileText },
      { name: 'Notices', href: '/notices', icon: FileText },
      { name: 'Profile', href: '/profile', icon: Users },
    ],
    faculty: [
      { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
      { name: 'My Subjects', href: '/subjects', icon: BookOpen },
      { name: 'Upload Materials', href: '/upload', icon: FileText },
      { name: 'Enter Marks', href: '/faculty/marks', icon: FileText },
      { name: 'View Students', href: '/students', icon: Users },
      { name: 'Workload Report', href: '/workload', icon: FileText },
    ],
    dept_admin: [
      { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
      { name: 'Faculty Management', href: '/faculty-management', icon: Users },
      { name: 'Student Management', href: '/student-management', icon: Users },
      { name: 'Reports', href: '/reports', icon: FileText },
    ],
    college_admin: [
      { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
      { name: 'Department Management', href: '/department-management', icon: BookOpen },
      { name: 'User Management', href: '/user-management', icon: Users },
      { name: 'System Analytics', href: '/system-analytics', icon: FileText },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  };

  const userNavigation = navigation[user?.role] || [];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">DRWMS</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {userNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t flex-shrink-0">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                {user?.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.full_name}</p>
              <Badge variant="secondary" className="text-xs mt-1">
                {user?.role?.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowLogoutModal(true)}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-foreground">
                Department Resource & Workflow Management System
              </h2>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout confirmation modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to login again to access the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => { logout(); setShowLogoutModal(false); }}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Layout;