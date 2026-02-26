import { useState, useEffect } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const data = await mockApi.getStudentMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('Error:', error);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Study Materials</h1>
      
      <div className="grid gap-4">
        {materials.map((material) => (
          <div key={material.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{material.title}</h3>
                <p className="text-sm text-gray-600">{material.subjects?.name}</p>
                <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {material.file_type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(material.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <a
                href={material.file_url}
                download
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materials;