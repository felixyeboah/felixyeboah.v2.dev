"use client"

import React from "react"
import useKeyboardShortcut from "./use-keyboard-shortcut"

enum Theme {
    LIGHT = "light",
    DARK = "dark",
}

const KEY = "mode"

const defaultContextData = {
    dark: false,
    toggleDark: () => {},
}

export const ThemeContext = React.createContext(defaultContextData)

const useTheme = () => React.useContext(ThemeContext)

const storage = {
    get: (init?: Theme) => window.localStorage.getItem(KEY) || init,
    set: (value: Theme) => window.localStorage.setItem(KEY, value),
}

const supportsDarkMode = () => window.matchMedia("(prefers-color-scheme: dark)").matches === true

const useDarkMode = (): [Theme, (theme?: Theme) => void] => {
    const [themeState, setThemeState] = React.useState(() => {
        // Check if we're in the browser
        if (typeof window !== "undefined") {
            const stored = storage.get()
            if (stored) return stored as Theme
            if (supportsDarkMode()) return Theme.DARK
        }
        return Theme.LIGHT
    })

    const setThemeStateEnhanced = (themeValue?: Theme) => {
        setThemeState((prevState) => {
            const nextState = themeValue ? themeValue : prevState === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
            if (typeof window !== "undefined") {
                document.documentElement.classList.remove("maximeheckel-" + prevState)
                document.documentElement.classList.add("maximeheckel-" + nextState)

                if (nextState === Theme.DARK) {
                    document.documentElement.classList.add("dark")
                } else {
                    document.documentElement.classList.remove("dark")
                }

                localStorage.setItem("mode", nextState)
            }
            return nextState
        })
    }

    // Initial theme setup
    React.useEffect(() => {
        const root = document.documentElement
        root.classList.remove("maximeheckel-light", "maximeheckel-dark")
        root.classList.add("maximeheckel-" + themeState)
    }, [themeState])

    return [themeState, setThemeStateEnhanced]
}

const ThemeProvider = (props: { children: React.ReactNode }) => {
    const { children } = props
    const [themeState, setThemeStateEnhanced] = useDarkMode()
    const toggleDark = React.useCallback(() => {
        setThemeStateEnhanced()
    }, [setThemeStateEnhanced])

    useKeyboardShortcut("ctrl+t", toggleDark)

    React.useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            setThemeStateEnhanced(e.matches ? Theme.DARK : Theme.LIGHT)
        })
    }, [setThemeStateEnhanced, toggleDark])

    return (
        <ThemeContext.Provider
            value={{
                dark: themeState === Theme.DARK,
                toggleDark,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider }
export default useTheme
