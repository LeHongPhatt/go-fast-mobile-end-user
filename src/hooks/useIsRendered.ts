import { useEffect, useState } from 'react';

/** Is view rendered done */
export const useIsRendered = () => {
  const [isRender, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return isRender;
};
