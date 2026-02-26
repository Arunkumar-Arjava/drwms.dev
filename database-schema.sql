-- Department Resource & Workflow Management System Database Schema
-- Database: PostgreSQL (Supabase)

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Departments table (must be created first for foreign key references)
CREATE TABLE departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    hod_id UUID, -- Will be updated after profiles table
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'faculty', 'dept_admin', 'college_admin')),
    department_id UUID REFERENCES departments(id),
    student_id VARCHAR(20) UNIQUE, -- For students
    employee_id VARCHAR(20) UNIQUE, -- For faculty/admin
    phone VARCHAR(15),
    address TEXT,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    is_active BOOLEAN DEFAULT true,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP,
    last_login TIMESTAMP,
    password_changed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add foreign key constraint for HOD after profiles table is created
ALTER TABLE departments ADD CONSTRAINT fk_departments_hod 
    FOREIGN KEY (hod_id) REFERENCES profiles(id);

-- User sessions table for session management
CREATE TABLE user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subjects table
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

-- Faculty-Subject assignments
CREATE TABLE faculty_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    section VARCHAR(5),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(faculty_id, subject_id, academic_year, semester, section)
);

-- File uploads table for tracking all file operations
CREATE TABLE file_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    mime_type VARCHAR(100),
    checksum VARCHAR(64), -- For duplicate detection
    uploaded_by UUID REFERENCES profiles(id) NOT NULL,
    upload_purpose VARCHAR(50) NOT NULL, -- 'study_material', 'assignment', 'profile_pic'
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP,
    deleted_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Study materials table
CREATE TABLE study_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_upload_id UUID REFERENCES file_uploads(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    uploaded_by UUID REFERENCES profiles(id) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Students table (additional student-specific info)
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) NOT NULL,
    admission_year INTEGER NOT NULL,
    current_semester INTEGER NOT NULL,
    section VARCHAR(5),
    cgpa DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Student enrollments table
CREATE TABLE student_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    enrollment_date TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(student_id, subject_id, academic_year, semester)
);

-- Marks lock status table
CREATE TABLE marks_lock_status (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    test_type VARCHAR(50) NOT NULL,
    is_locked BOOLEAN DEFAULT false,
    locked_by UUID REFERENCES profiles(id),
    locked_at TIMESTAMP,
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(subject_id, academic_year, semester, test_type)
);

-- Internal marks table
CREATE TABLE internal_marks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    test_type VARCHAR(50) NOT NULL, -- 'test1', 'test2', 'assignment', 'lab'
    marks INTEGER NOT NULL,
    max_marks INTEGER NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    is_locked BOOLEAN DEFAULT false,
    entered_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, subject_id, test_type, academic_year, semester)
);

-- Lab schedules table
CREATE TABLE lab_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    batch_name VARCHAR(50) NOT NULL,
    day_of_week INTEGER NOT NULL, -- 1=Monday, 7=Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    lab_room VARCHAR(50),
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Lab batches (student assignments)
CREATE TABLE lab_batches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    schedule_id UUID REFERENCES lab_schedules(id) NOT NULL,
    student_id UUID REFERENCES students(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(schedule_id, student_id)
);

-- Notices table
CREATE TABLE notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    department_id UUID REFERENCES departments(id),
    posted_by UUID REFERENCES profiles(id) NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    target_audience VARCHAR(50) DEFAULT 'all', -- 'students', 'faculty', 'all'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Project topics table
CREATE TABLE project_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technology_stack TEXT,
    difficulty_level VARCHAR(20) DEFAULT 'medium', -- 'easy', 'medium', 'hard'
    department_id UUID REFERENCES departments(id) NOT NULL,
    faculty_guide_id UUID REFERENCES profiles(id),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Academic calendar table
CREATE TABLE academic_calendar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'exam', 'holiday', 'event', 'deadline'
    department_id UUID REFERENCES departments(id),
    academic_year VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Faculty workload table (auto-calculated)
CREATE TABLE faculty_workload (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    faculty_id UUID REFERENCES profiles(id) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester INTEGER NOT NULL,
    theory_hours INTEGER DEFAULT 0,
    lab_hours INTEGER DEFAULT 0,
    total_hours INTEGER DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(faculty_id, academic_year, semester)
);

-- Reports table for generated reports
CREATE TABLE reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- 'workload', 'marks', 'attendance', 'naac', 'nba'
    parameters JSONB, -- Store report parameters
    file_path VARCHAR(500),
    generated_by UUID REFERENCES profiles(id) NOT NULL,
    department_id UUID REFERENCES departments(id),
    academic_year VARCHAR(10),
    semester INTEGER,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- System settings table
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

-- Backup logs table
CREATE TABLE backup_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    backup_type VARCHAR(50) NOT NULL, -- 'full', 'incremental'
    file_path VARCHAR(500),
    file_size BIGINT,
    status VARCHAR(20) NOT NULL, -- 'success', 'failed', 'in_progress'
    initiated_by UUID REFERENCES profiles(id) NOT NULL,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT
);

-- Audit logs table
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

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_department ON profiles(department_id);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_study_materials_subject ON study_materials(subject_id);
CREATE INDEX idx_internal_marks_student ON internal_marks(student_id);
CREATE INDEX idx_internal_marks_subject ON internal_marks(subject_id);
CREATE INDEX idx_faculty_subjects_faculty ON faculty_subjects(faculty_id);
CREATE INDEX idx_notices_department ON notices(department_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
CREATE INDEX idx_file_uploads_checksum ON file_uploads(checksum);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_reports_type ON reports(report_type);
CREATE INDEX idx_student_enrollments_student ON student_enrollments(student_id);
CREATE INDEX idx_marks_lock_subject ON marks_lock_status(subject_id);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('max_file_size_mb', '10', 'Maximum file upload size in MB'),
('session_timeout_minutes', '30', 'Session timeout in minutes'),
('max_login_attempts', '3', 'Maximum failed login attempts before account lock'),
('account_lock_duration_minutes', '15', 'Account lock duration in minutes'),
('backup_retention_days', '30', 'Backup file retention period in days'),
('marks_entry_deadline_days', '7', 'Default deadline for marks entry in days');

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can view study materials of enrolled subjects" ON study_materials
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM student_enrollments se
            JOIN students s ON s.id = se.student_id
            WHERE s.profile_id = auth.uid() AND se.subject_id = study_materials.subject_id
        )
    );

CREATE POLICY "Faculty can manage their subject materials" ON study_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM faculty_subjects fs
            WHERE fs.faculty_id = auth.uid() AND fs.subject_id = study_materials.subject_id
        )
    );

CREATE POLICY "Students can view their own marks" ON internal_marks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.profile_id = auth.uid() AND s.id = internal_marks.student_id
        )
    );

CREATE POLICY "Faculty can manage marks for their subjects" ON internal_marks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM faculty_subjects fs
            WHERE fs.faculty_id = auth.uid() AND fs.subject_id = internal_marks.subject_id
        )
    );

-- Triggers for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON study_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_internal_marks_updated_at BEFORE UPDATE ON internal_marks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON notices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_topics_updated_at BEFORE UPDATE ON project_topics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate faculty workload
CREATE OR REPLACE FUNCTION calculate_faculty_workload(faculty_uuid UUID, acad_year VARCHAR, sem INTEGER)
RETURNS VOID AS $$
DECLARE
    theory_hrs INTEGER := 0;
    lab_hrs INTEGER := 0;
BEGIN
    -- Calculate theory hours (subjects * credits * hours per credit)
    SELECT COALESCE(SUM(s.credits * 4), 0) INTO theory_hrs
    FROM faculty_subjects fs
    JOIN subjects s ON s.id = fs.subject_id
    WHERE fs.faculty_id = faculty_uuid 
    AND fs.academic_year = acad_year 
    AND fs.semester = sem;
    
    -- Calculate lab hours
    SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (ls.end_time - ls.start_time))/3600), 0) INTO lab_hrs
    FROM lab_schedules ls
    WHERE ls.faculty_id = faculty_uuid 
    AND ls.academic_year = acad_year 
    AND ls.semester = sem;
    
    -- Insert or update workload
    INSERT INTO faculty_workload (faculty_id, academic_year, semester, theory_hours, lab_hours, total_hours)
    VALUES (faculty_uuid, acad_year, sem, theory_hrs, lab_hrs, theory_hrs + lab_hrs)
    ON CONFLICT (faculty_id, academic_year, semester)
    DO UPDATE SET 
        theory_hours = EXCLUDED.theory_hours,
        lab_hours = EXCLUDED.lab_hours,
        total_hours = EXCLUDED.total_hours,
        calculated_at = NOW();
END;
$$ LANGUAGE plpgsql;