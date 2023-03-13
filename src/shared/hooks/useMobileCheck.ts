import { useEffect, useState } from 'react';

// Iphone SE Landscape screen size
const MIN_SCREEN_SIZE = 667;

export const useMobileCheck = (breakpoint = MIN_SCREEN_SIZE): boolean => {
  const [width, setWidth] = useState<number>(window?.innerWidth || 0);
  const onWindowSizeChange = () => setWidth(window?.innerWidth || 0);
  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.addEventListener('resize', onWindowSizeChange);
      window.addEventListener('orientationchange', onWindowSizeChange);
    } else {
      throw new Error('At the moment, only the browser is supported.');
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('resize', onWindowSizeChange);
        window.removeEventListener('orientationchange', onWindowSizeChange);
      }
    };
  }, []);

  return width <= breakpoint;
};
