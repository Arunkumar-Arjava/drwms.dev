import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';


// Pages
import Login from './pages/Login';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentMaterials from './pages/student/Materials';
import StudentMarks from './pages/student/Marks';
import StudentSchedule from './pages/student/Schedule';
import StudentNotices from './pages/student/Notices';
import StudentProfile from './pages/student/Profile';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyMaterials from './pages/faculty/Materials';
import FacultyMarks from './pages/faculty/Marks';
import FacultySubjects from './pages/faculty/Subjects';
import FacultyUpload from './pages/faculty/Upload';
import FacultyStudents from './pages/faculty/Students';
import FacultyWorkload from './pages/faculty/Workload';

// Department Admin Pages
import DeptAdminDashboard from './pages/dept-admin/Dashboard';
import DeptFacultyManagement from './pages/dept-admin/FacultyManagement';
import DeptStudentManagement from './pages/dept-admin/StudentManagement';
import DeptReports from './pages/dept-admin/Reports';

// College Admin Pages
import CollegeAdminDashboard from './pages/college-admin/Dashboard';
import CollegeDepartmentManagement from './pages/college-admin/DepartmentManagement';
import CollegeUserManagement from './pages/college-admin/UserManagement';
import CollegeSystemAnalytics from './pages/college-admin/SystemAnalytics';
import CollegeAdminSettings from './pages/college-admin/Settings';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getDashboardComponent = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'dept_admin':
        return <DeptAdminDashboard />;
      case 'college_admin':
        return <CollegeAdminDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={getDashboardComponent()} />
        
        {/* Student Routes */}
        <Route path="materials" element={<ProtectedRoute requiredRole="student"><StudentMaterials /></ProtectedRoute>} />
        <Route path="marks" element={<ProtectedRoute requiredRole="student"><StudentMarks /></ProtectedRoute>} />
        <Route path="schedule" element={<ProtectedRoute requiredRole="student"><StudentSchedule /></ProtectedRoute>} />
        <Route path="notices" element={<ProtectedRoute requiredRole="student"><StudentNotices /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute requiredRole="student"><StudentProfile /></ProtectedRoute>} />
        
        {/* Faculty Routes */}
        <Route path="subjects" element={<ProtectedRoute requiredRole="faculty"><FacultySubjects /></ProtectedRoute>} />
        <Route path="upload" element={<ProtectedRoute requiredRole="faculty"><FacultyUpload /></ProtectedRoute>} />
        <Route path="faculty/materials" element={<ProtectedRoute requiredRole="faculty"><FacultyMaterials /></ProtectedRoute>} />
        <Route path="faculty/marks" element={<ProtectedRoute requiredRole="faculty"><FacultyMarks /></ProtectedRoute>} />
        <Route path="students" element={<ProtectedRoute requiredRole="faculty"><FacultyStudents /></ProtectedRoute>} />
        <Route path="workload" element={<ProtectedRoute requiredRole="faculty"><FacultyWorkload /></ProtectedRoute>} />
        
        {/* Department Admin Routes */}
        <Route path="faculty-management" element={<ProtectedRoute requiredRole="dept_admin"><DeptFacultyManagement /></ProtectedRoute>} />
        <Route path="student-management" element={<ProtectedRoute requiredRole="dept_admin"><DeptStudentManagement /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute requiredRole="dept_admin"><DeptReports /></ProtectedRoute>} />
        
        {/* College Admin Routes */}
        <Route path="department-management" element={<ProtectedRoute requiredRole="college_admin"><CollegeDepartmentManagement /></ProtectedRoute>} />
        <Route path="user-management" element={<ProtectedRoute requiredRole="college_admin"><CollegeUserManagement /></ProtectedRoute>} />
        <Route path="system-analytics" element={<ProtectedRoute requiredRole="college_admin"><CollegeSystemAnalytics /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute requiredRole="college_admin"><CollegeAdminSettings /></ProtectedRoute>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;