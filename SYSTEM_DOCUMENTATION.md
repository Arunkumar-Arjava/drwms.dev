# Department Resource & Workflow Management System (DRWMS)

## 🏗️ System Architecture

### Overview
DRWMS is a full-stack web application designed to digitalize and centralize academic and administrative activities for college departments.

### Technology Stack
- **Frontend**: React.js 19 + shadcn/ui + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

### Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React.js      │    │   Node.js       │    │   Supabase      │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (Port 5173)   │    │   (Port 5000)   │    │   + Storage     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📊 Database Schema

### Core Tables
1. **profiles** - User information extending Supabase auth
2. **departments** - Department details
3. **subjects** - Course subjects
4. **students** - Student-specific data
5. **faculty_subjects** - Faculty-subject assignments
6. **study_materials** - Uploaded files and resources
7. **internal_marks** - Student assessment scores
8. **lab_schedules** - Laboratory timetables
9. **notices** - Department announcements
10. **project_topics** - Final year project repository
11. **academic_calendar** - Important dates and events
12. **faculty_workload** - Teaching hour calculations
13. **audit_logs** - System activity tracking

### Key Relationships
- Users belong to departments
- Faculty are assigned to subjects
- Students have marks for subjects
- Materials are linked to subjects
- All actions are logged for audit

## 🔐 Authentication & Authorization

### Role-Based Access Control (RBAC)
- **Student**: View-only access to materials, marks, notices
- **Faculty**: Upload materials, enter marks, manage assigned subjects
- **Department Admin (HOD)**: Manage department data, generate reports
- **College Admin**: System-wide access, user management

### Security Features
- JWT token authentication
- Row-level security (RLS) in database
- Role-based route protection
- Session management
- Password encryption
- File upload validation

## 🎯 Module-wise Features

### Student Module
- ✅ View/download study materials by subject
- ✅ Check internal marks and grades
- ✅ View lab schedules and batches
- ✅ Read department notices
- ✅ Browse project topics repository
- ✅ Limited profile updates

### Faculty Module
- ✅ View assigned subjects and classes
- ✅ Upload study materials (PDF, PPT, DOC)
- ✅ Enter and update internal marks
- ✅ Manage lab batches
- ✅ View teaching workload reports
- ✅ Access student lists for subjects

### Department Admin (HOD) Module
- ✅ Manage subjects and syllabus
- ✅ View faculty workload reports
- ✅ Generate student strength reports
- ✅ Lock/unlock internal marks
- ✅ Manage academic calendar
- ✅ NAAC/NBA documentation support

### College Admin Module
- ✅ Manage multiple departments
- ✅ Create and manage user accounts
- ✅ View system-wide analytics
- ✅ Export reports (PDF/Excel)
- ✅ System configuration access

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Frontend Setup
```bash
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Database Setup
1. Create Supabase project
2. Run the SQL schema from `database-schema.sql`
3. Configure RLS policies
4. Set up storage buckets

## 📁 Project Structure

```
DRWMS/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   └── utils/
├── database-schema.sql
├── api-design.md
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - User logout

### Student APIs
- `GET /api/v1/students/materials` - Get study materials
- `GET /api/v1/students/marks` - Get internal marks
- `GET /api/v1/students/schedule` - Get lab schedule
- `GET /api/v1/students/notices` - Get notices
- `GET /api/v1/students/projects` - Get project topics

### Faculty APIs
- `GET /api/v1/faculty/subjects` - Get assigned subjects
- `POST /api/v1/faculty/materials` - Upload materials
- `POST /api/v1/faculty/marks` - Enter marks
- `GET /api/v1/faculty/workload` - Get workload

### Admin APIs
- `GET /api/v1/admin/users` - Manage users
- `GET /api/v1/admin/analytics` - System analytics
- `GET /api/v1/admin/reports/export` - Export reports

## 🛡️ Security Considerations

### Data Protection
- All sensitive data encrypted
- HTTPS enforcement
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Access Control
- JWT token expiration
- Role-based permissions
- Department-level data isolation
- Audit logging for all actions

### File Security
- File type validation
- Size limitations (10MB)
- Virus scanning (recommended)
- Secure file storage

## 📈 Performance Optimization

### Database
- Proper indexing on frequently queried columns
- Connection pooling
- Query optimization
- Caching strategies

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization

### Backend
- Response compression
- Rate limiting
- Caching headers
- Error handling

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
# Configure environment variables
# Deploy to Railway or Render
```

### Database (Supabase)
- Production database setup
- Backup configuration
- Performance monitoring

## 📊 Monitoring & Analytics

### System Metrics
- User activity tracking
- Performance monitoring
- Error logging
- Usage analytics

### Reports
- Faculty workload reports
- Student performance analytics
- Department statistics
- NAAC/NBA compliance data

## 🔄 Maintenance

### Regular Tasks
- Database backups
- Security updates
- Performance monitoring
- User feedback collection

### Scaling Considerations
- Horizontal scaling for backend
- CDN for static assets
- Database read replicas
- Load balancing

## 📝 Future Enhancements

### Phase 2 Features
- Mobile app development
- Advanced analytics dashboard
- Integration with LMS
- Automated report generation
- Email notifications
- Real-time chat support

### Technical Improvements
- Microservices architecture
- GraphQL API
- Advanced caching
- Machine learning insights

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For technical support or questions:
- Email: support@drwms.edu
- Documentation: [docs.drwms.edu]
- Issues: GitHub Issues

---

**DRWMS** - Empowering Educational Excellence Through Digital Transformation