import { useState } from 'react';

const useAuth = (value: any) => {
  const [isAuth, setIsAuth] = useState<Boolean>(value);

  return {
    isAuth,
    setIsAuth,
  };
};

export default useAuth;
