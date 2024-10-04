import axios from 'axios';

const API_URL = 'https://school-crm-kxq5.onrender.com/api/classes';

const classService = {
  getClasses: async (page, sortBy = 'className', order = 'asc', search = '') => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`);
      return response;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error; 
    }
  },
  
  getClassAnalytics: async (classId) => { 
    try {
      const response = await axios.get(`${API_URL}/${classId}/analytics`);
      return response;
    } catch (error) {
      console.error('Error fetching class analytics:', error);
      throw error;
    }
  },
  getClassById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Class not found');
    } catch (error) {
      console.error('Error fetching class by ID:', error);
      throw error;
    }
  },
  

  editClass: async (id, classData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, classData);
      return response.data;
    } catch (error) {
      console.error('Error editing class:', error);
      throw error;
    }
  },

  deleteClass: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  },
  
  addClass: async (classData) => {
    try {
      const response = await axios.post(`${API_URL}`, classData);
      return response.data;
    } catch (error) {
      console.error('Error adding class:', error);
      throw error;
    }
  },
  
};

export default classService;



