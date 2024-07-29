import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const THEME_KEY = "theme";

const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(true);

    const saveTheme = (theme) => {
        localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        if (savedTheme !== null) {
            try {
                const parsedTheme = JSON.parse(savedTheme);
                setDark(parsedTheme);
                return;
            } catch (error) {
                console.error("Failed to parse theme from localStorage", error);
            }
        }

        // Fallback to system preference if no saved theme is found or parsing fails
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDark(prefersDark);
    }, []);

    return (
        <ThemeContext.Provider value={{ dark, setDark, saveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider };
export default ThemeContext;
