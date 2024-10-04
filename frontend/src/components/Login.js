import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    console.log('Form submitted with:', { email, password });
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://school-crm-kxq5.onrender.com/api/auth/login', { email, password });
      if (response.data && response.data.token) {
        login({ _id: response.data._id, name: response.data.name, email: response.data.email }, response.data.token);
        navigate('/home');
      } else {
        setError('Invalid response data'); 
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full transition-transform duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 flex items-center justify-center">
        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600 text-3xl" />
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
            required 
          />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
            required
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>} 
      </form>
      <div className="text-center mb-4 mt-4">
        <p className="bg-yellow-300 text-red-800 font-bold p-2 rounded-lg max-w-md mx-auto transition duration-200 transform hover:scale-105">
          Note: No registration form - 2 constant user admin. Admin email: admin1@example.com. Password: admin123.
        </p>
      </div>
    </div>
  </div>
  );
};
export default Login;





