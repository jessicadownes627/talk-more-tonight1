import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "", dateName: "", city: "" });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customTopic, setCustomTopic] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedTopics,
        setSelectedTopics,
        customTopic,
        setCustomTopic,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
