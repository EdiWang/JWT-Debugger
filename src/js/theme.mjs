// Theme management module
const THEME_KEY = 'jwt-debugger-theme';
const THEME_AUTO = 'auto';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.currentTheme = this.getStoredTheme();
        
        this.init();
    }

    init() {
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Listen to system theme changes
        this.watchSystemTheme();
        
        // Add click handler to toggle button
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    getStoredTheme() {
        return localStorage.getItem(THEME_KEY) || THEME_AUTO;
    }

    setStoredTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
    }

    getEffectiveTheme(theme) {
        if (theme === THEME_AUTO) {
            return this.getSystemTheme();
        }
        return theme;
    }

    applyTheme(theme) {
        const effectiveTheme = this.getEffectiveTheme(theme);
        
        // Apply theme to document
        if (effectiveTheme === THEME_DARK) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeIcon.textContent = '☀️';
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.themeIcon.textContent = '🌙';
        }
        
        this.currentTheme = theme;
    }

    toggleTheme() {
        let newTheme;
        
        // Cycle through: auto -> light -> dark -> auto
        if (this.currentTheme === THEME_AUTO) {
            const systemTheme = this.getSystemTheme();
            // If system is dark, next step is light (opposite of current display)
            // If system is light, next step is dark
            newTheme = systemTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        } else if (this.currentTheme === THEME_LIGHT) {
            newTheme = THEME_DARK;
        } else {
            newTheme = THEME_AUTO;
        }
        
        this.setStoredTheme(newTheme);
        this.applyTheme(newTheme);
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for system theme changes
        mediaQuery.addEventListener('change', (e) => {
            // Only apply if user hasn't set a manual preference
            if (this.currentTheme === THEME_AUTO) {
                this.applyTheme(THEME_AUTO);
            }
        });
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });
} else {
    new ThemeManager();
}

export { ThemeManager, THEME_AUTO, THEME_LIGHT, THEME_DARK };