import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseAutoLogoutOptions {
  timeoutMinutes?: number; 
  warningMinutes?: number; 
  onWarning?: () => void; 
  onLogout?: () => void; 
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
    console.log(' Auto-logout triggered due to inactivity');
    
    localStorage.removeItem('admin_token');
    if (onLogout) {
      onLogout();
    }

    navigate('/admin/login', { 
      state: { message: 'You have been logged out due to inactivity.' } 
    });
  };

  const showWarning = () => {
    console.log('Inactivity warning: Logging out soon');
    
    if (onWarning) {
      onWarning();
    }
  };

  const resetTimer = () => {
    const now = Date.now();
    lastActivityRef.current = now;
    clearTimers();
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000;
    warningTimeoutRef.current = setTimeout(() => {
      showWarning();
    }, warningTime);
    const logoutTime = timeoutMinutes * 60 * 1000;
    timeoutRef.current = setTimeout(() => {
      logout();
    }, logoutTime);
  };

  useEffect(() => {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    const handleActivity = () => {
      resetTimer();
    };
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });
    resetTimer();
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