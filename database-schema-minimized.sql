-- DRWMS Minimized Database Schema - 15 Tables
-- Database: PostgreSQL (Supabase)

-- 1. Departments
CREATE TABLE departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    hod_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Profiles (merged user_sessions into this)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'faculty', 'dept_admin', 'college_admin')),
    department_id UUID REFERENCES departments(id),
    student_id VARCHAR(20) UNIQUE,
    employee_id VARCHAR(20) UNIQUE,
    phone VARCHAR(15),
    is_active BOOLEAN DEFAULT true,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP,
    last_login TIMESTAMP,
    session_token VARCHAR(255),
    session_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE departments ADD CONSTRAINT fk_departments_hod 
    FOREIGN KEY (hod_id) REFERENCES profiles(id);

-- 3. Subjects
CREATE TABLE subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    semester INTEGER NOT NULL,
    credits INTEGER NOT NULL,
    department_id UUID REFERENCES departments(id) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Faculty Subjects (merged faculty_workload calculation here)
CREATE TABLE faculty_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    section VARCHAR(5),
    theory_hours INTEGER DEFAULT 0,
    lab_hours INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(faculty_id, subject_id, academic_year, semester, section)
);

-- 5. Students (merged student_enrollments logic)
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) NOT NULL,
    admission_year INTEGER NOT NULL,
    current_semester INTEGER NOT NULL,
    section VARCHAR(5),
    cgpa DECIMAL(3,2),
    enrolled_subjects JSONB, -- Store subject enrollments as JSON
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Files (merged file_uploads and study_materials)
CREATE TABLE files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    checksum VARCHAR(64),
    subject_id UUID REFERENCES subjects(id),
    uploaded_by UUID REFERENCES profiles(id) NOT NULL,
    file_category VARCHAR(50) NOT NULL, -- 'study_material', 'assignment', 'report', 'profile_pic'
    is_active BOOLEAN DEFAULT true,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 7. Internal Marks (merged marks_lock_status)
CREATE TABLE internal_marks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    test_type VARCHAR(50) NOT NULL,
    marks INTEGER NOT NULL,
    max_marks INTEGER NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    is_locked BOOLEAN DEFAULT false,
    lock_deadline TIMESTAMP,
    entered_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, subject_id, test_type, academic_year, semester)
);

-- 8. Lab Schedules (merged lab_batches as JSON)
CREATE TABLE lab_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    batch_name VARCHAR(50) NOT NULL,
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    lab_room VARCHAR(50),
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    student_batches JSONB, -- Store student assignments as JSON array
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Notices
CREATE TABLE notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    department_id UUID REFERENCES departments(id),
    posted_by UUID REFERENCES profiles(id) NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    target_audience VARCHAR(50) DEFAULT 'all',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 10. Project Topics
CREATE TABLE project_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technology_stack TEXT,
    difficulty_level VARCHAR(20) DEFAULT 'medium',
    department_id UUID REFERENCES departments(id) NOT NULL,
    faculty_guide_id UUID REFERENCES profiles(id),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 11. Academic Calendar
CREATE TABLE academic_calendar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    department_id UUID REFERENCES departments(id),
    academic_year VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 12. Reports (merged backup_logs functionality)
CREATE TABLE reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- 'workload', 'marks', 'naac', 'nba', 'backup'
    parameters JSONB,
    file_path VARCHAR(500),
    file_size BIGINT,
    generated_by UUID REFERENCES profiles(id) NOT NULL,
    department_id UUID REFERENCES departments(id),
    academic_year VARCHAR(10),
    semester INTEGER,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- 13. System Settings
CREATE TABLE system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    is_editable BOOLEAN DEFAULT true,
    updated_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 14. Audit Logs
CREATE TABLE audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 15. Faculty Workload (calculated view as table)
CREATE TABLE faculty_workload (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    total_theory_hours INTEGER DEFAULT 0,
    total_lab_hours INTEGER DEFAULT 0,
    total_hours INTEGER DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(faculty_id, academic_year, semester)
);

-- Indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_department ON profiles(department_id);
CREATE INDEX idx_files_subject ON files(subject_id);
CREATE INDEX idx_internal_marks_student ON internal_marks(student_id);
CREATE INDEX idx_faculty_subjects_faculty ON faculty_subjects(faculty_id);
CREATE INDEX idx_notices_department ON notices(department_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_files_checksum ON files(checksum);

-- Default Settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('max_file_size_mb', '10', 'Maximum file upload size in MB'),
('session_timeout_minutes', '30', 'Session timeout in minutes'),
('max_login_attempts', '3', 'Maximum failed login attempts'),
('marks_entry_deadline_days', '7', 'Default deadline for marks entry');

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can view study materials" ON files
    FOR SELECT USING (file_category = 'study_material');

CREATE POLICY "Faculty can manage their files" ON files
    FOR ALL USING (uploaded_by = auth.uid());

-- Auto-update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_internal_marks_updated_at BEFORE UPDATE ON internal_marks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();