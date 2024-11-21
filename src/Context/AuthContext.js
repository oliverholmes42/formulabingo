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
    const [admin, setAdmin] = useState(sessionStorage.getItem("admin") === "true");

    const Clogin = (userId, isAdmin) => {
        setId(userId);
        setAdmin(isAdmin);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("admin", isAdmin);
    };

    const logout = () => {
        setId(null);
        setAdmin(false);
        sessionStorage.clear();
    };

    // Check if session has expired every 10 minutes
    useEffect(() => {
        const checkSession = setInterval(() => {
            if (!sessionStorage.getItem("userId")) {
                setId(null);
                setAdmin(false);
                console.log("Session expired. User logged out.");
            }
        }, 600000); // 10 minutes in milliseconds

        return () => clearInterval(checkSession); // Clean up interval on component unmount
    }, []);

    useEffect(() => {
        let checkSession;

        if (id && admin !== null) {
            checkSession = setInterval(() => {
                const storedUserId = sessionStorage.getItem("userId");
                const storedAdmin = sessionStorage.getItem("admin") === "true"; // Convert to boolean

                if (storedUserId !== String(id) || storedAdmin !== admin) {
                    setId(null);
                    setAdmin(false);
                    sessionStorage.clear();
                    console.log("Session edited. User logged out.");
                }
            }, 5000);
        }

        return () => {
            if (checkSession) clearInterval(checkSession); // Clean up when user logs out or component unmounts
        };
    }, [id, admin, setId, setAdmin]); // Dynamically watch for id/admin changes
    // Value provided by the AuthContext
    const value = {
        id,
        Clogin,
        logout,
        admin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
