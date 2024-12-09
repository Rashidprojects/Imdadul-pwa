import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const SigninContext = createContext();

const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 1 hour in milliseconds

export const SigninProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const lastLogin = localStorage.getItem("lastLoginTime");
                const currentTime = Date.now();

                if (lastLogin && currentTime - parseInt(lastLogin, 10) > SESSION_TIMEOUT) {
                    // Session expired
                    handleLogout();
                } else {
                    // Session valid
                    setIsAuthenticated(true);
                    if (!lastLogin) {
                        localStorage.setItem("lastLoginTime", currentTime.toString());
                    }
                }
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem("lastLoginTime");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = () => setIsAuthenticated(true);
    
    const handleLogout = async () => {
        await signOut(auth);
        setIsAuthenticated(false);
        localStorage.removeItem("lastLoginTime");
    };

    return (
        <SigninContext.Provider value={{ isAuthenticated, loading, handleLogout, login }}>
            {children}
        </SigninContext.Provider>
    );
};

export const useAuth = () => useContext(SigninContext);
