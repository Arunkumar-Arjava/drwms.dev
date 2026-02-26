import { Folder, Download, Eye, Search } from 'lucide-react';
import { useState } from 'react';

function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website with React and Node.js',
      description: 'Build a full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
      category: 'Web Development',
      difficulty: 'Medium',
      resources: ['React.js', 'Node.js', 'MongoDB', 'Stripe API'],
      guide: 'Dr. Smith'
    },
    {
      id: 2,
      title: 'Machine Learning Based Stock Price Prediction',
      description: 'Develop a system to predict stock prices using historical data and machine learning algorithms.',
      category: 'Machine Learning',
      difficulty: 'Hard',
      resources: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
      guide: 'Prof. Johnson'
    },
    {
      id: 3,
      title: 'Mobile App for Campus Management',
      description: 'Create a mobile application for managing campus activities, attendance, and notifications.',
      category: 'Mobile Development',
      difficulty: 'Medium',
      resources: ['React Native', 'Firebase', 'Node.js'],
      guide: 'Dr. Brown'
    },
    {
      id: 4,
      title: 'Blockchain-based Voting System',
      description: 'Design a secure voting system using blockchain technology to ensure transparency and security.',
      category: 'Blockchain',
      difficulty: 'Hard',
      resources: ['Solidity', 'Web3.js', 'Ethereum', 'React'],
      guide: 'Prof. Davis'
    },
    {
      id: 5,
      title: 'IoT Home Automation System',
      description: 'Build an IoT-based home automation system with sensor integration and mobile control.',
      category: 'IoT',
      difficulty: 'Medium',
      resources: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT'],
      guide: 'Dr. Wilson'
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Topics</h1>
        <p className="text-gray-600">Browse and download final year project topics and resources</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by title or category..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Folder className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.resources.map((resource, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Guide: {project.guide}
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button className="flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;