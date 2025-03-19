import { createContext, useContext, useState, useEffect } from 'react';
import { updateIntercomUser } from '../utils/intercom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Update Intercom with existing user data
      updateIntercomUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Update Intercom when user logs in
    updateIntercomUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Update Intercom when user logs out
    updateIntercomUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 