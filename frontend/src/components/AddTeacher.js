import React, { useState } from 'react';
import teacherService from '../services/teacherService';

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    contact: '',
    salary: 0,
    assignedClass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await teacherService.addTeacher(teacher);
      alert('Teacher added successfully');
      setTeacher({
        name: '',
        email: '',
        gender: '',
        dob: '',
        contact: '',
        salary: 0,
        assignedClass: '',
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
  <div className="bg-white p-8 shadow-lg rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105">
    <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
      Add a New Teacher <i className="fa-solid fa-chalkboard-teacher text-3xl text-blue-600 mb-2"></i>
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="teacherName" className="w-1/3 text-gray-700">Name:</label>
        <input
          id="teacherName"
          type="text"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="teacherEmail" className="w-1/3 text-gray-700">Email:</label>
        <input
          id="teacherEmail"
          type="email"
          name="email"
          value={teacher.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="teacherGender" className="w-1/3 text-gray-700">Gender:</label>
        <input
          id="teacherGender"
          type="text"
          name="gender"
          value={teacher.gender}
          onChange={handleChange}
          placeholder="Gender"
          required
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="teacherDob" className="w-1/3 text-gray-700">DOB:</label>
        <input
          id="teacherDob"
          type="date"
          name="dob"
          value={teacher.dob}
          onChange={handleChange}
          required
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="teacherContact" className="w-1/3 text-gray-700">Contact:</label>
        <input
          id="teacherContact"
          type="text"
          name="contact"
          value={teacher.contact}
          onChange={handleChange}
          placeholder="Contact"
          required
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="salary" className="w-1/3 text-gray-700">Salary:</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={teacher.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="assignedClass" className="w-1/3 text-gray-700">Assigned Class:</label>
        <input
          id="assignedClass"
          type="text"
          name="assignedClass"
          value={teacher.assignedClass}
          onChange={handleChange}
          placeholder="Assigned Class"
          className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-200">
        Add Teacher
      </button>
    </form>
  </div>
</div> 
  );
};

export default AddTeacher;
