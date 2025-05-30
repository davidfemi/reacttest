import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { initializeUsers, authenticateUser, resetUsers, checkUserExists, addNapoleonUser } from '../../utils/users';
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

  // Function to reset users in localStorage
  const handleResetUsers = () => {
    resetUsers();
    // Debug: Show the current users in localStorage
    const currentUsers = JSON.parse(localStorage.getItem('seededUsers'));
    console.log('Current users in localStorage:', currentUsers);
    setError('Users reset successfully. You can now login with any sample account.');
  };

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
      console.log('Login attempt with:', credentials);

      // Debug: Show the current users in localStorage before authentication
      const currentUsers = JSON.parse(localStorage.getItem('seededUsers'));
      console.log('Current users before auth:', currentUsers);

      const user = authenticateUser(credentials.email, credentials.password);
      console.log('Authentication result:', user);

      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (credentials) => {
    setCredentials(credentials);
  };

  // Function to directly login with Napoleon Orwell
  const handleDirectLogin = () => {
    // First try to reset users
    resetUsers();

    // Then directly add Napoleon user to ensure it's there
    addNapoleonUser();

    // Attempt login
    const email = 'testing@user1.com';
    const password = 'password789';

    console.log('Direct login attempt with:', { email, password });

    // Check if our user exists in localStorage
    const userExists = checkUserExists(email);
    console.log(`User ${email} exists in localStorage:`, userExists);

    // Debug: Show the current users in localStorage
    const currentUsers = JSON.parse(localStorage.getItem('seededUsers'));
    console.log('Current users in localStorage:', currentUsers);

    // Find our user in the current users
    const ourUser = currentUsers.find(u => u.email === email);
    console.log('Our user in localStorage:', ourUser);

    // Try to authenticate
    const user = authenticateUser(email, password);
    console.log('Direct authentication result:', user);

    if (user) {
      login(user);
      navigate('/');
    } else {
      // If authentication failed, try one more approach
      // Create a user object directly and log in with it
      const directUser = {
        name: 'Napoleon Orwell',
        email: 'testing@user1.com',
        role: 'user',
        user_id: '09090',
        number_of_dogs: 2,
        website: 'https://reacttest-kappa-two.vercel.app',
        dash: 'https://reacttest-kappa-two.vercel.app'
      };

      console.log('Attempting direct login with user object:', directUser);
      login(directUser);
      navigate('/');
    }
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
            <li onClick={() => handleDemoLogin({ email: 'testing@user1.com', password: 'password789' })}>
              Email: testing@user1.com<br/>Password: password789
            </li>
          </ul>
          <div className="buttonGroup">
            <button
              type="button"
              className="resetButton"
              onClick={handleResetUsers}
            >
              Reset Users
            </button>
            <button
              type="button"
              className="directLoginButton"
              onClick={handleDirectLogin}
            >
              Direct Login as Napoleon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;