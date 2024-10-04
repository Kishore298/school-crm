import React, { createContext, useContext, useState, useEffect } from 'react'; 
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(JSON.parse(localStorage.getItem('user')));
          setToken(storedToken);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userData, userToken) => {
    console.log('User logging in:', userData);
    setIsAuthenticated(true);
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    console.log('Logging out...'); 
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('user'); 
    localStorage.removeItem('token'); 
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};







