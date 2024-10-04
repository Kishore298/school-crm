import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teacherService from '../services/teacherService';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacherDetail, setTeacherDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeacherDetail = async () => {
      setLoading(true);
      console.log('Fetching teacher with ID:', id);
      try {
        const response = await teacherService.getTeacherById(id);
        console.log('Teacher response:', response);
        setTeacherDetail(response);
      } catch (error) {
        console.error('Error fetching teacher detail:', error);
        setError('Failed to fetch teacher details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!teacherDetail) return <div>No teacher details available.</div>; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">{teacherDetail.name}</h1>
      <p className="text-gray-700"><strong className="text-indigo-600">Email:</strong> {teacherDetail.email}</p>
      <p className="text-gray-700"><strong className="text-green-600">Contact:</strong> {teacherDetail.contact}</p>
      <p className="text-gray-700"><strong className="text-yellow-600">DOB:</strong> {new Date(teacherDetail.dob).toLocaleDateString()}</p>
      <p className="text-gray-700"><strong className="text-purple-600">Gender:</strong> {teacherDetail.gender}</p>
      <p className="text-gray-700"><strong className="text-red-600">Salary:</strong> {teacherDetail.salary}</p>
      <p className="text-gray-700"><strong className="text-orange-600">Assigned Class:</strong> {teacherDetail.assignedClass ? teacherDetail.assignedClass.className : 'Not assigned'}</p>
    </div>
  </div>
  
  );
};

export default TeacherDetail;



