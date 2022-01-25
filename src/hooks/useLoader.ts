import { useState } from 'react';

const useLoader = () => {
  const [isLoader, setIsLoader] = useState(false);

  const toggleLoader = () => {
    setIsLoader((current) => !current);
  };

  return {
    isLoader,
    toggleLoader,
  };
};

export default useLoader;
