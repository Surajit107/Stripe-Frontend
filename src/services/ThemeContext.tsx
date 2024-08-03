import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    // Load the theme from localStorage or default to 'light'
    const getInitialTheme = (): Theme => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? (savedTheme as Theme) : 'light';
    };

    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme); // Save the new theme to localStorage
            return newTheme;
        });
    };

    useEffect(() => {
        // Apply the theme to the document body or another element if needed
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};