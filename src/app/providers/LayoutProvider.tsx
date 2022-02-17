import React, { createContext, useContext, useRef } from 'react';

interface ILayoutValue {
  footerRef: React.MutableRefObject<HTMLElement>;
}

const LayoutContext = createContext({} as ILayoutValue);

export const LayoutProvider = (props: any) => {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <LayoutContext.Provider value={{ footerRef } as ILayoutValue} {...props} />
  );
};

export const useLayout: () => ILayoutValue = () => useContext(LayoutContext);
