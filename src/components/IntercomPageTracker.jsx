import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateIntercomPage } from '../utils/intercom';

const IntercomPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Update Intercom whenever the route changes
    updateIntercomPage();
  }, [location]);

  return null; // This component doesn't render anything
};

export default IntercomPageTracker; 