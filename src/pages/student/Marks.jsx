import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const data = await mockApi.getStudentMarks();
      setMarks(data);
    } catch (error) {
      console.error('Error:', error);
      setMarks([]);
    } finally {
      setLoading(false);
    }
  };

  const groupedMarks = marks.reduce((acc, mark) => {
    const key = mark.subjects?.name || 'Unknown Subject';
    if (!acc[key]) acc[key] = [];
    acc[key].push(mark);
    return acc;
  }, {});

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Internal Marks</h1>
      
      {Object.entries(groupedMarks).map(([subject, subjectMarks]) => (
        <div key={subject} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {subject}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjectMarks.map((mark) => (
                <div key={mark.id} className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 uppercase">
                    {mark.test_type.replace('_', ' ')}
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {mark.marks}/{mark.max_marks}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {((mark.marks / mark.max_marks) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Marks;