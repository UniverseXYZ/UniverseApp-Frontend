import React, { createContext, useContext, useRef } from 'react';

interface ILayoutValue {
  headerRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
}

const LayoutContext = createContext({} as ILayoutValue);

interface ILayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = (props: ILayoutProviderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const value: ILayoutValue = {
    headerRef,
    footerRef,
  };

  return (
    <LayoutContext.Provider value={value} {...props} />
  );
};

export const useLayout: () => ILayoutValue = () => useContext(LayoutContext);
