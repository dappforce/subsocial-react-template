import { createContext, PropsWithChildren, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

export type ResponsiveSizeState = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const ResponsiveContext = createContext<ResponsiveSizeState>({
  isDesktop: true,
  isMobile: false,
  isTablet: false,
});

export function ResponsiveProvider(props: PropsWithChildren<any>) {
  const value = {
    isDesktop: useMediaQuery({ minWidth: 992 }),
    isTablet: useMediaQuery({ minWidth: 768, maxWidth: 991 }),
    isMobile: useMediaQuery({ maxWidth: 767 }),
  };

  return (
    <ResponsiveContext.Provider value={value}>
      {props.children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsiveSize() {
  return useContext(ResponsiveContext);
}
