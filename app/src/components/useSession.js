import { useState, useEffect } from 'react';

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const user = sessionStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    // Add event listener
    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    // Initial check
    handleLoginStatusChange();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  return isLoggedIn;
};

export default useSession;
