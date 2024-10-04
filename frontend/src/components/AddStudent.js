import React, { useState } from 'react';
import studentService from '../services/studentService';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',
    assignedClass: '',
    totalFees: 0,
    dueDate: '',
    feesPaid: 0,
    remainingFees: 0,
    contact: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.addStudent(student);
      alert('Student added successfully');
      setStudent({
        name: '',
        email: '',
        password: '',
        role: 'Student',
        assignedClass: '',
        totalFees: '',
        dueDate: '',
        feesPaid: '',
        remainingFees: '',
        contact: '',
        dob: '',
        gender: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
    <div className="bg-white p-8 shadow-lg rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Add a New Student <i className="fa-solid fa-user-graduate text-3xl text-blue-600 mb-2"></i>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="studentName" className="w-1/3 text-gray-700">Name:</label>
          <input
            id="studentName"
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="email" className="w-1/3 text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
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
            value={student.assignedClass}
            onChange={handleChange}
            placeholder="Assigned Class"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="totalFees" className="w-1/3 text-gray-700">Total Fees:</label>
          <input
            id="totalFees"
            type="number"
            name="totalFees"
            value={student.totalFees}
            onChange={handleChange}
            placeholder="Total Fees"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="dueDate" className="w-1/3 text-gray-700">Due Date:</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={student.dueDate}
            onChange={handleChange}
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="feesPaid" className="w-1/3 text-gray-700">Fees Paid:</label>
          <input
            id="feesPaid"
            type="number"
            name="feesPaid"
            value={student.feesPaid}
            onChange={handleChange}
            placeholder="Fees Paid"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="remainingFees" className="w-1/3 text-gray-700">Remaining Fees:</label>
          <input
            id="remainingFees"
            type="number"
            name="remainingFees"
            value={student.remainingFees}
            onChange={handleChange}
            placeholder="Remaining Fees"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center w-1/2">
            <label htmlFor="dob" className="w-1/3 text-gray-700">DOB:</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              required
              className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="flex items-center w-1/2">
            <label htmlFor="gender" className="w-1/3 text-gray-700">Gender:</label>
            <input
              id="gender"
              type="text"
              name="gender"
              value={student.gender}
              onChange={handleChange}
              placeholder="Gender"
              required
              className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="contact" className="w-1/3 text-gray-700">Contact:</label>
          <input
            id="contact"
            type="text"
            name="contact"
            value={student.contact}
            onChange={handleChange}
            placeholder="Contact"
            required
            className="border p-2 rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-200">
          Add Student
        </button>
      </form>
    </div>
  </div>   
  );
};

export default AddStudent;
