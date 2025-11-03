import React, { createContext, useState } from "react";
export const UserContext = createContext();
export function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        username,
        setUsername,
        login,
        setLogin,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
