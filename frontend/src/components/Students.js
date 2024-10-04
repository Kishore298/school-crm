import React, { useEffect, useState, useCallback } from 'react'; 
import { Link } from 'react-router-dom';
import studentService from '../services/studentService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await studentService.getStudents(page, sortBy, order, search,limit);
      console.log(response.data);
      setStudents(response.data.students);
      setTotalStudents(response.data.total);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }, [page, sortBy, order, search,limit]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const totalPages = Math.ceil(totalStudents / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); 
    }
  };

 
  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split(',');
    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(1); 
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.updateStudent(currentStudent._id, currentStudent);
      setIsEditing(false);
      setCurrentStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold  mb-4 text-center text-blue-600">List of Students  <i className="fa-solid fa-user-graduate text-3xl text-blue-600 mb-2"></i></h1>
      <div className="flex justify-center gap-[100px]">
      <Link to="/add-student" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Student</Link>
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex flex-col items-center justify-center space-y-4"
          style={{ width: '400px', margin: '0 auto' }}
        >
         <div className="flex flex-col">
  <label className="mb-1 font-semibold">Student Name:</label>
  <input
    type="text"
    value={currentStudent.name || ''}
    onChange={(e) =>
      setCurrentStudent({ ...currentStudent, name: e.target.value })
    }
    className="border border-gray-300 rounded p-2 "
    style={{ width: '300px' }}
    placeholder="Student Name"
  />
</div>

<div className="flex flex-col">
  <label className="mb-1 font-semibold">Date of Birth:</label>
  <input
    type="date"
    value={currentStudent.dob || ''}
    onChange={(e) =>
      setCurrentStudent({ ...currentStudent, dob: e.target.value })
    }
    className="border border-gray-300 rounded p-2 "
    style={{ width: '300px' }}
  />
</div>

<div className="flex flex-col">
  <label className="mb-1 font-semibold">Gender:</label>
  <select
    value={currentStudent.gender || ''}
    onChange={(e) =>
      setCurrentStudent({ ...currentStudent, gender: e.target.value })
    }
    className="border border-gray-300 rounded p-2"
    style={{ width: '300px' }}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Email:</label>
            <input
              type="email"
              value={currentStudent.email || ''}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, email: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Contact Number:</label>
            <input
              type="text"
              value={currentStudent.contact || ''}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, contact: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Contact Number"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Total Fees:</label>
            <input
              type="number"
              value={currentStudent.totalFees || ''}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, totalFees: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Total Fees"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Fees Paid:</label>
            <input
              type="number"
              value={currentStudent.feesPaid || ''}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, feesPaid: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Fees Paid"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Remaining Fees:</label>
            <input
              type="number"
              value={currentStudent.remainingFees || ''}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, remainingFees: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Remaining Fees"
            />
          </div>

          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black rounded p-2"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Students"
              value={search}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <select onChange={handleSortChange} className="border border-gray-300 rounded p-2 mb-4">
            <option value="name,asc">Sort by Name (A-Z)</option>
            <option value="name,desc">Sort by Name (Z-A)</option>
          </select>
          <select onChange={handleLimitChange} className="border border-gray-300 rounded p-2 mb-4">
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
          <div className="space-y-2">
            {students.map((student) => (
              <div key={student._id} className="border p-4 rounded">
                <Link to={`/students/${student._id}`} className="text-blue-500 hover:underline">
                  {student.name}
                </Link>
                <span className="text-blue-500"> (ID: {student._id})</span>
                <button onClick={() => handleEdit(student)} className="text-red-500 ml-2">Edit</button>
                <button onClick={() => handleDelete(student._id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="border rounded p-2"
            >
              Previous
            </button>
            <span>
              Page {totalStudents > 0 ? page : 0} of {totalPages > 0 ? totalPages : 1}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="border rounded p-2"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Students;



