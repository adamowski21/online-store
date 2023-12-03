"use client"
import { createContext, useState, useEffect } from 'react';

export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setToken(JSON.parse(authToken));
    },[]);

    return (
        <NavigationContext.Provider value={{ token, setToken }}>
            {children}
        </NavigationContext.Provider>
    );
};
