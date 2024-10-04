import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classService from '../services/classService';

const ClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState({ students: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassDetail = async () => {
      setLoading(true);
      console.log('Fetching class with ID:', id);
      try {
        const response = await classService.getClassById(id);
        console.log('Class response:', response);
        if (response && response._id) {
          setClassDetail({
            ...response,
            students: response.students || [],
          });
        } else {
          setError('Class not found.');
        }
      } catch (error) {
        console.error('Error fetching class detail:', error);
        setError('Failed to fetch class details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!classDetail) return <div>No class details available.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
    <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">{classDetail.className}</h1>
    <p className="text-gray-700"><strong className="text-indigo-600">Year:</strong> {classDetail.year}</p>
    <p className="text-gray-700"><strong className="text-green-600">Teacher:</strong> {classDetail.teacher ? classDetail.teacher.name : 'Not assigned'}</p>
    <p className="text-gray-700"><strong className="text-red-600">Students:</strong></p>
    {classDetail.students && classDetail.students.length > 0 ? (
      <ul className="list-disc pl-5">
        {classDetail.students.map((student) => (
          <li key={student._id} className="text-gray-700">{student.name}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-700">No students assigned.</p>
    )}
  </div>
</div>
  );
};

export default ClassDetail;

