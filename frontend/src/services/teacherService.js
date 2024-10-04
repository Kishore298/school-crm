import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teachers';

const teacherService = {
  getTeachers: async (page, sortBy = 'name', order = 'asc', search = '') => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`);
      return response;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },
  
  getTeacherById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher by ID:', error);
      throw error; 
    }
  },

  editTeacher: async (id, teacherData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, teacherData);
      return response.data;
    } catch (error) {
      console.error('Error editing teacher:', error);
      throw error;
    }
  },

  deleteTeacher: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
  },

  addTeacher: async (teacherData) => {
    try {
      const response = await axios.post(`${API_URL}`, teacherData);
      return response.data;
    } catch (error) {
      console.error('Error adding teacher:', error);
      throw error;
    }
  },
  
};

export default teacherService;




