import { createContext, useEffect, useState, useContext } from "react";
import React from 'react';
import axios from 'axios';

export const DarkMode = createContext();

export function DarkModeProvider({ children }) {
    const isBrowser = typeof window !== 'undefined';
    const [darkMode, setDarkMode] = useState(() => {
        if (isBrowser) {
            return localStorage.getItem("darkMode") === "true";
        }
        return false;
    });

    useEffect(() => {
        if (isBrowser) {
            axios.get("/user/theme")
                .then((res) => {
                    setDarkMode(res.data.dark_mode);
                    document.documentElement.classList.toggle("dark", res.data.dark_mode);
                    localStorage.setItem("darkMode", res.data.dark_mode);
                })
                .catch((error) => {
                    console.error("Failed to fetch dark mode setting:", error);
                });
        }
    }, [isBrowser]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        if (isBrowser) {
            localStorage.setItem("darkMode", darkMode);
        }
    }, [darkMode, isBrowser]);
    useEffect(() => {
        if (isBrowser) {
            axios.put("/user/theme", { dark_mode: darkMode })
                .then((res) => {
                })
                .catch((error) => {
                    console.error("Failed to save dark mode setting:", error);
                });
        }
    }, [darkMode, isBrowser]);

    return (
        <DarkMode.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkMode.Provider>
    );
}
export const useDarkMode = () => useContext(DarkMode);