-- DRWMS Extreme Minimal Database Schema - 6 Tables
-- Database: PostgreSQL (Supabase)

-- 1. Organizations (departments + academic calendar + system config)
CREATE TABLE organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_type VARCHAR(20) NOT NULL DEFAULT 'department', -- 'college', 'department'
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    hod_id UUID,
    academic_calendar JSONB, -- All calendar events by year
    system_settings JSONB, -- All system configurations
    metadata JSONB, -- Additional org data
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Users (profiles + sessions + workload + communications)
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'faculty', 'dept_admin', 'college_admin')),
    organization_id UUID REFERENCES organizations(id),
    user_ids JSONB, -- student_id, employee_id, etc.
    contact_info JSONB, -- phone, address, etc.
    security_data JSONB, -- login attempts, session info, locks
    workload_data JSONB, -- faculty workload by year/semester
    communications JSONB, -- notices posted, announcements
    user_preferences JSONB, -- settings, permissions
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE organizations ADD CONSTRAINT fk_organizations_hod 
    FOREIGN KEY (hod_id) REFERENCES users(id);

-- 3. Academic_entities (subjects + students + faculty assignments + projects)
CREATE TABLE academic_entities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    entity_type VARCHAR(20) NOT NULL, -- 'subject', 'student', 'course'
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20),
    organization_id UUID REFERENCES organizations(id) NOT NULL,
    user_id UUID REFERENCES users(id), -- For students: profile link
    academic_info JSONB, -- semester, credits, admission_year, cgpa, etc.
    assignments JSONB, -- faculty assignments, enrollments, lab schedules
    project_data JSONB, -- project topics, assignments
    schedule_data JSONB, -- lab schedules, batches, timings
    marks_data JSONB, -- all internal marks by test type
    enrollment_data JSONB, -- subject enrollments by year/semester
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Resources (files + study materials + reports + backups)
CREATE TABLE resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_type VARCHAR(20) NOT NULL, -- 'file', 'report', 'backup'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_info JSONB, -- original_name, file_path, file_size, file_type, checksum
    content_data JSONB, -- study material info, report parameters, backup details
    access_control JSONB, -- permissions, subject_id, category, target audience
    uploaded_by UUID REFERENCES users(id) NOT NULL,
    related_entities JSONB, -- linked subjects, students, departments
    status_info JSONB, -- is_active, is_locked, completion status
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Activities (academic data + communications + events)
CREATE TABLE activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    activity_type VARCHAR(30) NOT NULL, -- 'marks_entry', 'notice', 'event', 'deadline', 'schedule'
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL, -- All activity data (marks, notice content, event details)
    participants JSONB, -- students, faculty, departments involved
    academic_context JSONB, -- year, semester, subject_id, test_type
    timing_info JSONB, -- event_date, deadline, schedule times
    status_data JSONB, -- is_locked, is_urgent, is_active, completion
    created_by UUID REFERENCES users(id) NOT NULL,
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. System_logs (audit logs + activity tracking + all system events)
CREATE TABLE system_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    log_type VARCHAR(30) NOT NULL, -- 'audit', 'login', 'upload', 'marks', 'report', 'backup'
    user_id UUID REFERENCES users(id) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_info JSONB, -- table_name, record_id, entity details
    change_data JSONB, -- old_values, new_values, parameters
    context_data JSONB, -- ip_address, user_agent, session info
    metadata JSONB, -- additional tracking data
    created_at TIMESTAMP DEFAULT NOW()
);

-- Essential Indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_academic_entities_type ON academic_entities(entity_type);
CREATE INDEX idx_academic_entities_user ON academic_entities(user_id);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_resources_uploaded_by ON resources(uploaded_by);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_created_by ON activities(created_by);
CREATE INDEX idx_system_logs_user ON system_logs(user_id);
CREATE INDEX idx_system_logs_type ON system_logs(log_type);
CREATE INDEX idx_system_logs_created ON system_logs(created_at);

-- JSONB Indexes for performance
CREATE INDEX idx_users_security_data ON users USING GIN (security_data);
CREATE INDEX idx_academic_entities_marks ON academic_entities USING GIN (marks_data);
CREATE INDEX idx_resources_file_info ON resources USING GIN (file_info);
CREATE INDEX idx_activities_content ON activities USING GIN (content);

-- Default System Configuration
INSERT INTO organizations (org_type, name, code, system_settings) VALUES
('college', 'Main College', 'MAIN', '{
    "max_file_size_mb": 10,
    "session_timeout_minutes": 30,
    "max_login_attempts": 3,
    "marks_entry_deadline_days": 7,
    "backup_retention_days": 30,
    "allowed_file_types": ["pdf", "ppt", "doc", "jpg", "png"]
}');

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Core RLS Policies
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can view own academic data" ON academic_entities
    FOR SELECT USING (
        entity_type = 'student' AND user_id = auth.uid() OR
        entity_type = 'subject' AND id IN (
            SELECT jsonb_array_elements_text((enrollment_data->>'enrolled_subjects')::jsonb)::uuid
            FROM academic_entities WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own resources" ON resources
    FOR ALL USING (uploaded_by = auth.uid());

CREATE POLICY "Users can view relevant activities" ON activities
    FOR SELECT USING (
        created_by = auth.uid() OR
        participants ? auth.uid()::text
    );

-- Auto-update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academic_entities_updated_at BEFORE UPDATE ON academic_entities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Helper functions for data extraction
CREATE OR REPLACE FUNCTION get_student_marks(student_uuid UUID, subject_uuid UUID)
RETURNS JSONB AS $$
BEGIN
    RETURN (
        SELECT marks_data->(subject_uuid::text)
        FROM academic_entities 
        WHERE entity_type = 'student' AND user_id = student_uuid
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_faculty_workload(faculty_uuid UUID, acad_year VARCHAR, sem INTEGER)
RETURNS INTEGER AS $$
DECLARE
    total_hours INTEGER := 0;
BEGIN
    SELECT COALESCE(
        SUM((assignments->>('theory_hours_' || acad_year || '_' || sem))::integer) +
        SUM((assignments->>('lab_hours_' || acad_year || '_' || sem))::integer), 0
    ) INTO total_hours
    FROM academic_entities 
    WHERE entity_type = 'subject' 
    AND assignments ? faculty_uuid::text;
    
    RETURN total_hours;
END;
$$ LANGUAGE plpgsql;