import React, { createContext, useState } from "react";

// Create the context
export const DoctorContext = createContext();

// Create a provider component
export const DoctorProvider = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <DoctorContext.Provider value={{ selectedDoctor, setSelectedDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};
