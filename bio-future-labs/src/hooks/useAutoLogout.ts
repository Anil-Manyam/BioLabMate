// useAutoLogout.ts - Custom hook for auto-logout after inactivity
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseAutoLogoutOptions {
  timeoutMinutes?: number; // Default: 15 minutes
  warningMinutes?: number; // Show warning before logout (Default: 2 minutes before timeout)
  onWarning?: () => void; // Callback when warning is shown
  onLogout?: () => void; // Callback when logout happens
}

export const useAutoLogout = (options: UseAutoLogoutOptions = {}) => {
  const {
    timeoutMinutes = 15,
    warningMinutes = 2,
    onWarning,
    onLogout,
  } = options;

  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  };

  const logout = () => {
    console.log('🔒 Auto-logout triggered due to inactivity');
    
    // Clear token
    localStorage.removeItem('admin_token');
    
    // Call custom logout callback if provided
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to login
    navigate('/admin/login', { 
      state: { message: 'You have been logged out due to inactivity.' } 
    });
  };

  const showWarning = () => {
    console.log('⚠️ Inactivity warning: Logging out soon');
    
    if (onWarning) {
      onWarning();
    }
  };

  const resetTimer = () => {
    const now = Date.now();
    lastActivityRef.current = now;

    // Clear existing timers
    clearTimers();

    // Set warning timer (timeout - warning time)
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000;
    warningTimeoutRef.current = setTimeout(() => {
      showWarning();
    }, warningTime);

    // Set logout timer
    const logoutTime = timeoutMinutes * 60 * 1000;
    timeoutRef.current = setTimeout(() => {
      logout();
    }, logoutTime);
  };

  useEffect(() => {
    // Events that indicate user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Reset timer on any activity
    const handleActivity = () => {
      resetTimer();
    };

    // Attach event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearTimers();
    };
  }, [timeoutMinutes, warningMinutes]);

  return {
    resetTimer,
    lastActivity: lastActivityRef.current,
  };
};

export default useAutoLogout;