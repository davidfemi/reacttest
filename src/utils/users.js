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
  },
  {
    email: 'testing@user1.com',
    password: 'password789',
    name: 'Napoleon Orwell',
    role: 'user',
    user_id: '09090',
    number_of_dogs: 2,
    website: 'https://reacttest-kappa-two.vercel.app',
    dash: 'https://reacttest-kappa-two.vercel.app'
  }
];

// Initialize users in localStorage if they don't exist
export const initializeUsers = () => {
  const existingUsers = localStorage.getItem('seededUsers');
  if (!existingUsers) {
    localStorage.setItem('seededUsers', JSON.stringify(sampleUsers));
  }
};

// Reset users in localStorage to the sample users
export const resetUsers = () => {
  localStorage.setItem('seededUsers', JSON.stringify(sampleUsers));
  console.log('Users reset with:', sampleUsers);
  return checkUserExists('testing@user1.com');
};

// Check if a user exists in localStorage
export const checkUserExists = (email) => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  console.log(`Checking if user ${email} exists:`, !!user);
  return !!user;
};

// Add Napoleon user directly to localStorage
export const addNapoleonUser = () => {
  const users = getUsers();

  // Check if Napoleon already exists
  const napoleonExists = users.some(u => u.email === 'testing@user1.com');

  if (!napoleonExists) {
    // Create Napoleon user
    const napoleon = {
      email: 'testing@user1.com',
      password: 'password789',
      name: 'Napoleon Orwell',
      role: 'user',
      user_id: '09090',
      number_of_dogs: 2,
      website: 'https://reacttest-kappa-two.vercel.app',
      dash: 'https://reacttest-kappa-two.vercel.app'
    };

    // Add to users array
    users.push(napoleon);

    // Save back to localStorage
    localStorage.setItem('seededUsers', JSON.stringify(users));

    console.log('Napoleon user added directly to localStorage');
    return true;
  }

  console.log('Napoleon user already exists in localStorage');
  return false;
};

// Get all users
export const getUsers = () => {
  const users = localStorage.getItem('seededUsers');
  return users ? JSON.parse(users) : [];
};

// Authenticate user
export const authenticateUser = (email, password) => {
  const users = getUsers();
  console.log('Authenticating user:', email);
  console.log('All users:', users);

  const user = users.find(u => u.email === email && u.password === password);
  console.log('Found user:', user);

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
