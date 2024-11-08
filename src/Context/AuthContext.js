// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export function AuthProvider({ children }) {
    const [id, setId] = useState(sessionStorage.getItem("userId") || null);

    const Clogin = (userId) => {
        setId(userId);
        sessionStorage.setItem("userId", userId);
    };

    const logout = () => {
        setId(null);
        sessionStorage.removeItem("userId");
    };

    // Check if session has expired every 10 minutes
    useEffect(() => {
        const checkSession = setInterval(() => {
            if (!sessionStorage.getItem("userId")) {
                setId(null); // Clear id if session has expired
                console.log("Session expired. User logged out.");
            }
        }, 600000); // 10 minutes in milliseconds

        return () => clearInterval(checkSession); // Clean up interval on component unmount
    }, []);

    // Value provided by the AuthContext
    const value = {
        id,
        Clogin,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
