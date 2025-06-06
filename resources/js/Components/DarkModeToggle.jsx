import { useEffect, useState } from "react";
import axios from "axios";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        axios.get("/user/theme").then((res) => {
            setDarkMode(res.data.dark_mode);
            document.documentElement.classList.toggle("dark", res.data.dark_mode);
        });
    }, []);
    const toggleMode = async () => {
        const newValue = !darkMode;
        setDarkMode(newValue);
        document.documentElement.classList.toggle("dark", newValue);
        try {
            await axios.put("/user/theme", {
                dark_mode: newValue,
            });
        } catch (e) {
            console.error("Failed to save dark mode setting", e);
        }
    };

    return (
        <button
            onClick={toggleMode}
            type="button"
            className="relative inline-flex flex-shrink-0 h-6 mr-5 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer bg-zinc-200 dark:bg-zinc-700 w-11 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
            role="switch"
            aria-checked={darkMode}
        >
            <span className="sr-only">Use setting</span>
            <span
                className={`relative inline-block w-5 h-5 transition duration-500 ease-in-out transform ${
                    darkMode ? "translate-x-5" : "translate-x-0"
                } bg-white rounded-full shadow pointer-events-none ring-0`}
            >
                {darkMode ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-neutral-700"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-neutral-700"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                    </svg>
                )}
            </span>
        </button>
    );
}