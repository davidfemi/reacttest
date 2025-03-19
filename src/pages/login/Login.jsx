import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { initializeUsers, authenticateUser } from '../../utils/users';
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    // Initialize sample users when component mounts
    initializeUsers();
  }, []);

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setError(''); // Clear error when user types
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateForm = () => {
    if (!credentials.email) {
      setError('Email is required');
      return false;
    }
    if (!credentials.password) {
      setError('Password is required');
      return false;
    }
    if (!credentials.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const user = authenticateUser(credentials.email, credentials.password);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (credentials) => {
    setCredentials(credentials);
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="formGroup">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button 
            type="submit" 
            className="loginButton"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="registerLink">
          Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
        </div>
        <div className="sampleCredentials">
          <p>Sample credentials:</p>
          <ul>
            <li onClick={() => handleDemoLogin({ email: 'john@example.com', password: 'password123' })}>
              Email: john@example.com<br/>Password: password123
            </li>
            <li onClick={() => handleDemoLogin({ email: 'admin@staybook.com', password: 'admin123' })}>
              Email: admin@staybook.com<br/>Password: admin123
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login; 