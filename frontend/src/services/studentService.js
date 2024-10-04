import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const studentService = {
  getStudents: async (page, sortBy = 'name', order = 'asc', search = '') => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`);
      return response;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  getStudentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      if (response.status !== 200) {
        throw new Error('Student not found');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching student by ID:', error);
      throw error;
    }
  },

  editStudent: async (id, studentData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, studentData);
      return response.data;
    } catch (error) {
      console.error('Error editing student:', error);
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
  
  addStudent: async (studentData) => {
    try {
      const response = await axios.post(`${API_URL}`, studentData);
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },
  // In studentService.js
 updateStudent : async (id,studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

};

export default studentService;

