import React, { useState } from 'react';
import classService from '../services/classService';

const AddClass = () => {
  const [classData, setClassData] = useState({
    className: '',
    year: '',
    teacher: '',
    students: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await classService.addClass(classData);
      alert('Class added successfully');
      setClassData({
        className: '',
        year: '',
        teacher: '',
        students: [],
      });
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-pink-300">
    <div className="bg-white p-8 shadow-lg rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Add a New Class <i className="fa-solid fa-school text-3xl text-blue-600 mb-2"></i>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="className" className="w-1/3 text-gray-700">Class Name:</label>
          <input
            id="className"
            type="text"
            name="className"
            value={classData.className}
            onChange={handleChange}
            placeholder="Class Name"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="year" className="w-1/3 text-gray-700">Year:</label>
          <input
            id="year"
            type="number"
            name="year"
            value={classData.year}
            onChange={handleChange}
            placeholder="Year"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="teacher" className="w-1/3 text-gray-700">Teacher ID:</label>
          <input
            id="teacher"
            type="text"
            name="teacher"
            value={classData.teacher}
            onChange={handleChange}
            placeholder="Teacher ID"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="students" className="w-1/3 text-gray-700">Student IDs:</label>
          <input
            id="students"
            type="text"
            name="students"
            value={classData.students}
            onChange={handleChange}
            placeholder="Student IDs (comma-separated)"
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-200">
          Add Class
        </button>
      </form>
    </div>
  </div>  
  );
};

export default AddClass;
