import { createContext, useEffect, useState } from "react";

export const DarkMode = createContext();

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <DarkMode.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkMode.Provider>
    );
}