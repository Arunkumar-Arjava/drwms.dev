import { useState, useEffect } from 'react';
import { Upload, Plus } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject_id: '',
    file_url: '',
    file_name: '',
    file_type: ''
  });

  useEffect(() => {
    fetchSubjects();
    fetchMaterials();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await mockApi.getFacultySubjects();
      setSubjects(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const data = await mockApi.getStudentMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mockApi.uploadMaterial(formData);
      setShowForm(false);
      setFormData({ title: '', description: '', subject_id: '', file_url: '', file_name: '', file_type: '' });
      fetchMaterials();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Study Materials</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Upload Material
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Upload Study Material</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                value={formData.subject_id}
                onChange={(e) => setFormData({...formData, subject_id: e.target.value})}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(sub => (
                  <option key={sub.id} value={sub.subject_id}>{sub.subjects?.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">File URL</label>
              <input
                type="url"
                value={formData.file_url}
                onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Upload
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {materials.map((material) => (
          <div key={material.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium">{material.title}</h3>
            <p className="text-sm text-gray-600">{material.subjects?.name}</p>
            <p className="text-xs text-gray-500 mt-1">{material.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materials;