// Mock data for testing
const mockMaterials = [
  {
    id: '1',
    title: 'Data Structures Notes',
    description: 'Complete notes on arrays, linked lists, and trees',
    file_url: '#',
    file_name: 'ds_notes.pdf',
    file_type: 'PDF',
    created_at: '2024-01-15T10:00:00Z',
    subjects: { name: 'Data Structures', code: 'CS201' },
    profiles: { full_name: 'Dr. Smith' }
  },
  {
    id: '2',
    title: 'Database PPT',
    description: 'SQL queries and normalization',
    file_url: '#',
    file_name: 'db_ppt.pptx',
    file_type: 'PPT',
    created_at: '2024-01-14T09:00:00Z',
    subjects: { name: 'Database Management', code: 'CS301' },
    profiles: { full_name: 'Prof. Johnson' }
  }
];

const mockMarks = [
  {
    id: '1',
    marks: 85,
    max_marks: 100,
    test_type: 'test1',
    subjects: { name: 'Data Structures', code: 'CS201', credits: 4 },
    profiles: { full_name: 'Dr. Smith' }
  },
  {
    id: '2',
    marks: 78,
    max_marks: 100,
    test_type: 'test2',
    subjects: { name: 'Data Structures', code: 'CS201', credits: 4 },
    profiles: { full_name: 'Dr. Smith' }
  }
];

const mockSubjects = [
  {
    id: '1',
    subject_id: 'sub1',
    subjects: { name: 'Data Structures', code: 'CS201' }
  },
  {
    id: '2',
    subject_id: 'sub2',
    subjects: { name: 'Database Management', code: 'CS301' }
  }
];

// Mock API functions
export const mockApi = {
  getStudentMaterials: () => Promise.resolve(mockMaterials),
  getStudentMarks: () => Promise.resolve(mockMarks),
  getFacultySubjects: () => Promise.resolve(mockSubjects),
  uploadMaterial: (data) => Promise.resolve({ id: '3', ...data }),
  enterMarks: (data) => Promise.resolve({ id: '3', ...data })
};