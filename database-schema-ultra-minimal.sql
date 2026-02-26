-- DRWMS Ultra-Minimized Database Schema - 10 Tables
-- Database: PostgreSQL (Supabase)

-- 1. Departments (merged academic_calendar)
CREATE TABLE departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    hod_id UUID,
    academic_events JSONB, -- Store calendar events
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Profiles (merged sessions, workload, notices)
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
    session_token VARCHAR(255),
    session_expires_at TIMESTAMP,
    workload_data JSONB, -- Store faculty workload by year/semester
    posted_notices JSONB, -- Store notices posted by user
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE departments ADD CONSTRAINT fk_departments_hod 
    FOREIGN KEY (hod_id) REFERENCES profiles(id);

-- 3. Subjects (merged faculty assignments, lab schedules, project topics)
CREATE TABLE subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    semester INTEGER NOT NULL,
    credits INTEGER NOT NULL,
    department_id UUID REFERENCES departments(id) NOT NULL,
    faculty_assignments JSONB, -- Store faculty-subject mappings
    lab_schedules JSONB, -- Store lab timing and batches
    project_topics JSONB, -- Store available project topics
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Students (merged enrollments, marks)
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) NOT NULL,
    admission_year INTEGER NOT NULL,
    current_semester INTEGER NOT NULL,
    section VARCHAR(5),
    cgpa DECIMAL(3,2),
    subject_enrollments JSONB, -- Store enrolled subjects by year/semester
    internal_marks JSONB, -- Store all marks by subject/test type
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Files (merged all file types and study materials)
CREATE TABLE files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    checksum VARCHAR(64),
    metadata JSONB, -- Store subject_id, category, permissions, etc.
    uploaded_by UUID REFERENCES profiles(id) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Academic_data (merged marks, schedules, calendar)
CREATE TABLE academic_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    data_type VARCHAR(50) NOT NULL, -- 'marks', 'schedule', 'event', 'deadline'
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER,
    department_id UUID REFERENCES departments(id),
    subject_id UUID REFERENCES subjects(id),
    student_id UUID REFERENCES students(id),
    faculty_id UUID REFERENCES profiles(id),
    data_content JSONB NOT NULL, -- Store actual data
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 7. Communications (merged notices, announcements)
CREATE TABLE communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    comm_type VARCHAR(50) NOT NULL, -- 'notice', 'announcement', 'circular'
    department_id UUID REFERENCES departments(id),
    posted_by UUID REFERENCES profiles(id) NOT NULL,
    target_audience JSONB, -- Store audience details
    is_urgent BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. Reports (merged all report types and backups)
CREATE TABLE reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- 'workload', 'marks', 'naac', 'nba', 'backup'
    parameters JSONB,
    file_path VARCHAR(500),
    file_size BIGINT,
    generated_by UUID REFERENCES profiles(id) NOT NULL,
    scope_data JSONB, -- Store department, year, semester info
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- 9. System_config (merged settings and configurations)
CREATE TABLE system_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    config_type VARCHAR(50) NOT NULL, -- 'setting', 'permission', 'rule'
    config_key VARCHAR(100) NOT NULL,
    config_value JSONB NOT NULL,
    description TEXT,
    is_editable BOOLEAN DEFAULT true,
    updated_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(config_type, config_key)
);

-- 10. Activity_logs (merged audit logs and all tracking)
CREATE TABLE activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- 'login', 'upload', 'marks_entry', 'report_gen'
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(50),
    target_id UUID,
    activity_data JSONB, -- Store old/new values, metadata
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Essential Indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_department ON profiles(department_id);
CREATE INDEX idx_students_profile ON students(profile_id);
CREATE INDEX idx_files_uploaded_by ON files(uploaded_by);
CREATE INDEX idx_academic_data_type ON academic_data(data_type);
CREATE INDEX idx_academic_data_student ON academic_data(student_id);
CREATE INDEX idx_communications_department ON communications(department_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_files_checksum ON files(checksum);

-- Default System Configuration
INSERT INTO system_config (config_type, config_key, config_value, description) VALUES
('setting', 'max_file_size_mb', '"10"', 'Maximum file upload size in MB'),
('setting', 'session_timeout_minutes', '"30"', 'Session timeout in minutes'),
('setting', 'max_login_attempts', '"3"', 'Maximum failed login attempts'),
('setting', 'marks_entry_deadline_days', '"7"', 'Default deadline for marks entry');

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can manage own files" ON files
    FOR ALL USING (uploaded_by = auth.uid());

CREATE POLICY "Students can view own academic data" ON academic_data
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE profile_id = auth.uid()));

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