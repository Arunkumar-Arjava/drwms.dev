# 📜 Application Rules & Policies
## Department Resource & Workflow Management System

---

## 🔐 1. Access Control Rules
- All users must log in to access the system.
- Role-Based Access Control (RBAC) must be strictly followed.
- Users are allowed to access only the pages related to their role.
- Unauthorized users must not be able to access pages via direct URLs.

---

## 🎨 2. Frontend Development Rules (UI Standards)
- The frontend must be developed using **React.js**.
- **shadcn/ui** must be used as the primary UI component library.
- UI must be clean, consistent, and responsive across devices.
- Pre-built shadcn/ui components (Button, Table, Dialog, Form, Card, etc.) must be used.
- Custom CSS should be minimal and only used when required.
- Accessibility and usability should be considered during UI design.

---

## 👨‍🎓 3. Student Rules
- Students are not allowed to upload study materials.
- Internal marks are view-only for students.
- Department notices and circulars are read-only.
- Project topics and resources are available for view and download only.
- Students can update only limited personal profile information.

---

## 👨‍🏫 4. Faculty Rules
- Faculty members can upload materials only for their assigned subjects.
- Internal marks must be entered within the given deadline.
- Faculty members are not allowed to edit data of other faculty members.
- Uploaded files must be in approved formats such as PDF or PPT.
- Faculty workload is calculated automatically by the system.

---

## 🏢 5. Department Admin (HOD) Rules
- Department Admins can verify and approve faculty and student data.
- Faculty workload reports can be generated and reviewed.
- Department Admins can lock or unlock internal marks before final submission.
- Academic calendars can be managed at the department level.
- Department-level reports can be generated for accreditation purposes.

---

## 🏫 6. College Admin Rules
- College Admins have access to all departments.
- College Admins can manage users and roles across departments.
- Reports can be exported in PDF or Excel format.
- College Admins have full access to system configuration and analytics.

---

## 📁 7. Data & File Handling Rules
- File upload size must be limited (example: maximum 10MB).
- Duplicate file uploads should be automatically detected and rejected.
- Sensitive academic and personal data must be securely stored.
- Deleted records must follow a soft-delete mechanism to allow recovery.

---

## 🔄 8. Workflow Rules
- Once internal marks are locked, faculty members cannot edit them.
- All critical system actions must be recorded in an audit log.
- Each update must store timestamp and user information for tracking.
- Generated reports must include date and user reference details.

---

## 🛡️ 9. Security Rules
- User passwords must be encrypted before storage.
- Sessions should automatically expire after a period of inactivity.
- Multiple failed login attempts should temporarily block the account.
- Data backup and restore access should be restricted to administrators only.

---

## 🎓 10. Academic & Compliance Rules
- The system must support NAAC and NBA documentation requirements.
- Academic data tampering is strictly prohibited.
- Data privacy, integrity, and confidentiality must be maintained.
- The application should follow institutional IT and data policies.

---

## ✅ Conclusion
This rule set ensures that the Department Resource & Workflow Management System is secure, scalable, and suitable for real-time academic usage within a college environment.
