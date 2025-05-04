import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", dateName: "", city: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUserContext = () => {
  return useContext(UserContext);
};
