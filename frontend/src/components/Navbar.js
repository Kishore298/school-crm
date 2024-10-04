import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">School Management</h1>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <ul className={`flex-col md:flex md:flex-row md:space-x-4 space-y-2 md:space-y-0 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/classes" className="hover:underline">Classes</Link>
          </li>
          <li>
            <Link to="/teachers" className="hover:underline">Teachers</Link>
          </li>
          <li>
            <Link to="/students" className="hover:underline">Students</Link>
          </li>
          <li>
            <Link to="/analytics" className="hover:underline">Analytics</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center hover:underline">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



