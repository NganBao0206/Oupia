// File: ParamsProvider.js
import React, { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ParamsContext = createContext();

export const ParamsProvider = ({ children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [params, setParams] = useState(Object.fromEntries(searchParams));

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
};
