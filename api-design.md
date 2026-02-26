# DRWMS API Design

## Base URL: `https://api.drwms.edu/v1`

## Authentication
- **Type**: JWT Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Roles**: `student`, `faculty`, `dept_admin`, `college_admin`

---

## 🔐 Authentication Endpoints

### POST /auth/login
```json
{
  "email": "user@college.edu",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@college.edu",
    "role": "student",
    "department_id": "uuid"
  }
}
```

### POST /auth/logout
### GET /auth/me

---

## 👨🎓 Student Module APIs

### GET /students/materials/:subjectId
- Get study materials for a subject
- **Access**: Students (own subjects only)

### GET /students/marks
- Get internal marks for logged-in student
- **Query**: `?semester=5&academic_year=2024-25`

### GET /students/schedule
- Get lab schedules for student

### GET /students/notices
- Get department notices

### GET /students/projects
- Get available project topics

---

## 👨🏫 Faculty Module APIs

### GET /faculty/subjects
- Get assigned subjects for faculty

### POST /faculty/materials
```json
{
  "title": "Chapter 1 - Introduction",
  "description": "Basic concepts",
  "subject_id": "uuid",
  "file": "multipart/form-data"
}
```

### PUT /faculty/materials/:id
### DELETE /faculty/materials/:id

### GET /faculty/students/:subjectId
- Get students enrolled in subject

### POST /faculty/marks
```json
{
  "student_id": "uuid",
  "subject_id": "uuid",
  "test_type": "test1",
  "marks": 85,
  "max_marks": 100
}
```

### PUT /faculty/marks/:id
### GET /faculty/workload
- Get calculated workload

---

## 🏢 Department Admin (HOD) APIs

### GET /dept/faculty
- Get all faculty in department

### GET /dept/students
- Get all students in department

### POST /dept/subjects
```json
{
  "name": "Data Structures",
  "code": "CS301",
  "semester": 3,
  "credits": 4
}
```

### GET /dept/workload-report
- Faculty workload reports

### POST /dept/calendar
```json
{
  "title": "Mid-term Exams",
  "event_date": "2024-03-15",
  "event_type": "exam"
}
```

### PUT /dept/marks/lock
- Lock/unlock internal marks

---

## 🏫 College Admin APIs

### GET /admin/departments
### POST /admin/departments

### GET /admin/users
### POST /admin/users
### PUT /admin/users/:id

### GET /admin/analytics
- Overall system analytics

### GET /admin/reports/export
- **Query**: `?format=pdf&type=workload&department=cs`

---

## 📁 File Management APIs

### POST /files/upload
- **Content-Type**: `multipart/form-data`
- **Max Size**: 10MB
- **Allowed**: PDF, PPT, PPTX, DOC, DOCX

### GET /files/:id
- Download file (with access control)

### DELETE /files/:id

---

## 📊 Reports APIs

### GET /reports/faculty-workload
### GET /reports/student-performance
### GET /reports/department-summary
### GET /reports/naac-data

---

## Error Responses

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Access denied for this resource",
    "details": "Students cannot access faculty data"
  }
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error