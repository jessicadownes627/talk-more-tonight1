// src/context/UserContext.jsx
import { createContext, useState } from "react";

// Named export so other files can use it
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [dateName, setDateName] = useState("");
  const [city, setCity] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([
    "Politics 🗳️",
    "Football 🏈",
    "Wildcard ❔"
  ]);
  
  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        dateName,
        setDateName,
        city,
        setCity,
        selectedTopics,
        setSelectedTopics,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
