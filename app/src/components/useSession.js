import { useState, useEffect } from 'react';

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const user = sessionStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    handleLoginStatusChange();

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  return isLoggedIn;
};

export default useSession;
