import { useState, useEffect } from 'react';
import { Users, Save } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

function Marks() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await mockApi.getFacultySubjects();
      setSubjects(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMarkChange = (studentId, testType, value) => {
    setMarks(prev => ({
      ...prev,
      [`${studentId}-${testType}`]: value
    }));
  };

  const submitMarks = async (studentId, testType) => {
    const markValue = marks[`${studentId}-${testType}`];
    if (!markValue) return;

    try {
      await fetch('/api/v1/faculty/marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          student_id: studentId,
          subject_id: selectedSubject,
          test_type: testType,
          marks: parseInt(markValue),
          max_marks: 100,
          academic_year: '2024-25',
          semester: 1
        })
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enter Internal Marks</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Choose a subject</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.subject_id}>
                {sub.subjects?.name} - {sub.subjects?.code}
              </option>
            ))}
          </select>
        </div>

        {selectedSubject && students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Student</th>
                  <th className="border p-2">Test 1</th>
                  <th className="border p-2">Test 2</th>
                  <th className="border p-2">Assignment</th>
                  <th className="border p-2">Lab</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td className="border p-2">
                      <div>
                        <div className="font-medium">{student.profiles?.full_name}</div>
                        <div className="text-sm text-gray-500">{student.profiles?.student_id}</div>
                      </div>
                    </td>
                    {['test1', 'test2', 'assignment', 'lab'].map(testType => (
                      <td key={testType} className="border p-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={marks[`${student.id}-${testType}`] || ''}
                            onChange={(e) => handleMarkChange(student.id, testType, e.target.value)}
                            className="w-16 border rounded px-2 py-1 text-center"
                          />
                          <button
                            onClick={() => submitMarks(student.id, testType)}
                            className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Marks;