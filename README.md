# Stay Book - Hotel Booking Platform

A modern hotel booking platform built with React, featuring user authentication and Intercom integration for customer support.

## Features

- User authentication (login/register)
- Protected hotel listing and booking routes
- Interactive property search and filtering
- Responsive design
- Real-time customer support via Intercom

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd client-master
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Authentication

The app includes a complete authentication system with:

- User registration with validation
- Login with email/password
- Protected routes for authenticated users
- Session persistence using localStorage
- Automatic login state restoration

### Demo Accounts

For testing purposes, the following accounts are available:

- Regular User:
  - Email: john@example.com
  - Password: password123

- Admin User:
  - Email: admin@staybook.com
  - Password: admin123

## Intercom Integration

The app features a comprehensive Intercom integration for customer support and user engagement.

### Setup

Intercom is initialized in `public/index.html` with the app ID. After logging in: '/src/utils/intercom.js'

The integration is configured to:

1. Start a basic session for anonymous visitors
2. Identify users upon login
3. Track page views and user interactions
4. Handle session management across page refreshes

### User Identification

When a user logs in, Intercom receives the following data:
```javascript
{
  app_id: "app_id",
  name: user.name,
  email: user.email,
  user_id: user.email,
  created_at: timestamp,
  role: user.role
}
```

### Page Tracking

The app includes automatic page tracking using the `IntercomPageTracker` component, which:

- Updates Intercom on route changes
- Maintains conversation context across page navigation
- Updates the last_request_at timestamp

### Session Management

The Intercom integration handles various session states:

1. **Anonymous Users:**
   - Basic session with app_id only
   - No personal information tracked

2. **Authenticated Users:**
   - Full user profile sent to Intercom
   - Conversation history maintained
   - Role-based identification

3. **Logout:**
   - Session properly terminated
   - Conversation history cleared
   - Reset to anonymous state

### Implementation Details

The Intercom integration is spread across several files:

1. **src/utils/intercom.js**
   - Handles user updates
   - Manages session state
   - Tracks page views

2. **src/components/IntercomPageTracker.jsx**
   - Tracks route changes
   - Updates Intercom on navigation

3. **src/context/AuthContext.js**
   - Integrates authentication with Intercom
   - Manages user session state

### Best Practices Implemented

1. **Single Page App Optimization:**
   - Uses 'update' instead of 'boot' for subsequent changes
   - Properly handles page transitions
   - Maintains session across route changes

2. **Security:**
   - No sensitive data sent to Intercom
   - Proper session cleanup on logout
   - User identification only after authentication

3. **Performance:**
   - Lazy loading of the Intercom widget
   - Efficient update batching
   - Minimal re-renders

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

