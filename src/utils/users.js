// Sample users data
const sampleUsers = [
  {
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'John Doe',
    role: 'user',
    website: 'https://reacttest-kappa-two.vercel.app'
  },
  {
    email: 'jane@example.com',
    password: 'password456',
    name: 'Jane Smith',
    role: 'user',
    website: 'reacttest-kappa-two.vercel.app'
  },
  {
    email: 'admin@staybook.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  }
];

// Initialize users in localStorage if they don't exist
export const initializeUsers = () => {
  const existingUsers = localStorage.getItem('seededUsers');
  if (!existingUsers) {
    localStorage.setItem('seededUsers', JSON.stringify(sampleUsers));
  }
};

// Get all users
export const getUsers = () => {
  const users = localStorage.getItem('seededUsers');
  return users ? JSON.parse(users) : [];
};

// Authenticate user
export const authenticateUser = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // Don't send password back to client
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Add new user
export const addUser = (userData) => {
  const users = getUsers();
  const userExists = users.some(u => u.email === userData.email);
  
  if (userExists) {
    throw new Error('User already exists');
  }

  const newUser = {
    ...userData,
    role: 'user' // Default role for new users
  };

  users.push(newUser);
  localStorage.setItem('seededUsers', JSON.stringify(users));
  
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}; 
