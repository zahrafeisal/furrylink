import React, { createContext } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children, value }) => {
    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider };