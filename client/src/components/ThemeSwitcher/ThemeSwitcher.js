import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <div className="flex items-center">
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                <span className="mr-2 text-m text-gray-600 dark:text-gray-300">☀️</span>
                <div className="relative">
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="hidden"
                        checked={isDarkMode}
                        onChange={toggleTheme}
                    />
                    <div className="toggle-background w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div
                        className={`toggle-dot absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            isDarkMode ? "transform translate-x-6" : ""
                        }`}
                    ></div>
                </div>
                <span className="ml-2 text-m text-gray-600 dark:text-gray-300">🌙</span>
            </label>
        </div>
    );
};

export default ThemeSwitcher;

