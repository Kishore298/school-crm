import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentService from '../services/studentService';

const StudentDetail = () => {
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetail = async () => {
      setLoading(true);
      console.log('Fetching student with ID:', id);
      try {
        const response = await studentService.getStudentById(id);
        console.log('Student response:', response);
        if (response) {
          setStudentDetail(response);
        } else {
          setError('Student not found.');
        }
      } catch (error) {
        console.error('Error fetching student detail:', error);
        setError('Failed to fetch student details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!studentDetail) return <div>No student details available.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">{studentDetail.name}</h1>
      <p className="text-gray-700"><strong className="text-indigo-600">Email:</strong> {studentDetail.email}</p>
      <p className="text-gray-700"><strong className="text-green-600">Contact:</strong> {studentDetail.contact}</p>
      <p className="text-gray-700"><strong className="text-yellow-600">DOB:</strong> {new Date(studentDetail.dob).toLocaleDateString()}</p>
      <p className="text-gray-700"><strong className="text-purple-600">Gender:</strong> {studentDetail.gender}</p>
      <p className="text-gray-700"><strong className="text-pink-600">Role:</strong> {studentDetail.role}</p>
      <p className="text-gray-700"><strong className="text-red-600">Fees Structure:</strong></p>
      <ul className="list-disc pl-5 text-gray-700">
        <li><strong className="text-indigo-600">Total Fees:</strong> {studentDetail.feesStructure.totalFees}</li>
        <li><strong className="text-green-600">Fees Paid:</strong> {studentDetail.feesPaid}</li>
        <li><strong className="text-yellow-600">Remaining Fees:</strong> {studentDetail.remainingFees}</li>
        <li><strong className="text-purple-600">Due Date:</strong> {new Date(studentDetail.feesStructure.dueDate).toLocaleDateString()}</li>
      </ul>
    </div>
  </div>
  
  );
};

export default StudentDetail;

