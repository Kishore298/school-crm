import React, { useEffect, useState, useCallback } from 'react'; 
import { Link } from 'react-router-dom';
import classService from '../services/classService';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('className');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [totalClasses, setTotalClasses] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const fetchClasses = useCallback(async () => {
    try {
      const response = await classService.getClasses(page, sortBy, order, search);
      setClasses(response.data.classes);
      setTotalClasses(response.data.totalClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }, [page, sortBy, order, search]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalClasses / limit)) {
      setPage(newPage);
    }
  };

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split(',');
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1); 
  };

  const handleEdit = (classItem) => {
    setCurrentClass(classItem);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await classService.updateClass(currentClass._id, currentClass);
      setIsEditing(false);
      setCurrentClass(null);
      fetchClasses();
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await classService.deleteClass(id);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">List of Classes  <i className="fa-solid fa-school text-3xl mb-4 text-blue-600"></i></h1>
     <div className="flex justify-center gap-[100px]">
     <Link to="/add-class" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-3">Add Class</Link>
    </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex flex-col items-center justify-center space-y-4"
          style={{ width: '400px', margin: '0 auto' }}
        >
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Class Name:</label>
            <input
              type="text"
              value={currentClass.name || ''}
              onChange={(e) =>
                setCurrentClass({ ...currentClass, name: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Class Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Year:</label>
            <input
              type="number"
              value={currentClass.year || ''}
              onChange={(e) =>
                setCurrentClass({ ...currentClass, year: e.target.value })
              }
              className="border border-gray-300 rounded p-2"
              style={{ width: '300px' }}
              placeholder="Year"
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
              placeholder="Search Classes"
              value={search}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <select onChange={handleSortChange} className="border border-gray-300 rounded p-2 mb-4">
            <option value="className,asc">Sort by Name (A-Z)</option>
            <option value="className,desc">Sort by Name (Z-A)</option>
          </select>
          <select onChange={handleLimitChange} className="border border-gray-300 rounded p-2 mb-4">
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
          <div className="space-y-2">
  {classes.map((classItem) => (
    <div key={classItem._id} className="border p-4 rounded">
      <Link to={`/classes/${classItem._id}`} className="text-blue-500 hover:underline">
        {classItem.className} 
      </Link>
      <span className="text-blue-500"> (ID: {classItem._id})</span>
      <button onClick={() => handleEdit(classItem)} className="text-red-500 ml-2">Edit</button>
      <button onClick={() => handleDelete(classItem._id)} className="text-red-500 ml-2">Delete</button>
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
    Page {page} of {isNaN(Math.ceil(totalClasses / limit)) ? 1 : Math.ceil(totalClasses / limit)}
  </span>
  <button
    onClick={() => handlePageChange(page + 1)}
    disabled={page * limit >= totalClasses}
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

export default Classes;




