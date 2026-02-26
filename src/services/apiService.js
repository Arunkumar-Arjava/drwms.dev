const API_BASE_URL = '/api/v1';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Student APIs
  async getStudentMaterials(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/students/materials${query ? `?${query}` : ''}`);
  }

  async getStudentMarks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/students/marks${query ? `?${query}` : ''}`);
  }

  async getStudentProfile() {
    return this.request('/students/profile');
  }

  // Faculty APIs
  async getFacultySubjects() {
    return this.request('/faculty/subjects');
  }

  async uploadMaterial(data) {
    return this.request('/faculty/materials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async enterMarks(data) {
    return this.request('/faculty/marks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getStudentsForSubject(subjectId) {
    return this.request(`/faculty/students/${subjectId}`);
  }

  // Department Admin APIs
  async getDepartmentStats() {
    return this.request('/dept/analytics');
  }

  async createNotice(data) {
    return this.request('/dept/notices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async lockMarks(data) {
    return this.request('/dept/marks/lock', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export default new ApiService();