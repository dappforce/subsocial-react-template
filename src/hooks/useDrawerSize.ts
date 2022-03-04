import { useState, useEffect } from 'react';
import { useResponsiveSize } from 'src/components/responsive/ResponsiveContext';

export interface Size {
  height: number | undefined;
}

export function useDrawerSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    height: undefined,
  });
  const { isDesktop } = useResponsiveSize();
  const headerHeight = isDesktop ? 56 : 54;
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight - headerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
