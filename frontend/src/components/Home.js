import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mx-auto p-4 text-center mt-[150px]">
            <h2 className="text-4xl font-bold mb-4">Welcome to the School Management System</h2>
            <i className="fa-solid fa-school text-8xl mb-4 text-blue-600"></i>
            <p className="text-lg mb-4">Manage students, teachers, and classes efficiently.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/students" className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out">
                    <i className="fa-solid fa-user-graduate text-6xl text-blue-500 mb-2"></i>
                    <h3 className="text-xl font-semibold mb-2">Manage Students</h3>
                    <p>View and manage student information.</p>
                </Link>
                <Link to="/teachers" className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out">
                    <i className="fa-solid fa-chalkboard-teacher text-6xl text-blue-500 mb-2"></i>
                    <h3 className="text-xl font-semibold mb-2">Manage Teachers</h3>
                    <p>View and manage teacher information.</p>
                </Link>
                <Link to="/classes" className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out">
                    <i className="fa-solid fa-book text-6xl text-blue-500 mb-2"></i>
                    <h3 className="text-xl font-semibold mb-2">Manage Classes</h3>
                    <p>View and manage class information.</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;

  