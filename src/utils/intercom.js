// Track if Intercom has been booted
let isBooted = false;

// Get Intercom app ID from environment variables
const INTERCOM_APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;

// Update Intercom with user data
export const updateIntercomUser = (user) => {
  if (!user) {
    // If no user, shutdown Intercom session and reset boot state
    window.Intercom && window.Intercom('shutdown');
    // Boot Intercom for logged-out state
    window.Intercom && window.Intercom('boot', {
      app_id: INTERCOM_APP_ID
    });
    isBooted = false;
    return;
  }

  const userData = {
    app_id: INTERCOM_APP_ID,
    name: user.name,
    email: user.email,
    user_id: user.email, // Using email as user_id since we don't have unique IDs
    created_at: Math.floor(Date.now() / 1000), // Current timestamp in seconds
    role: user.role,
    website: user.website
  };

  if (!isBooted) {
    // First time - boot with user data
    window.Intercom && window.Intercom('boot', userData);
    isBooted = true;
  } else {
    // Subsequent updates - use update
    window.Intercom && window.Intercom('update', userData);
  }
};

// Update Intercom when URL changes
export const updateIntercomPage = () => {
  if (window.Intercom) {
    window.Intercom('update', {
      last_request_at: Math.floor(Date.now() / 1000)
    });
  }
}; 
