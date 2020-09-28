import { createContext } from 'react'

export const DarkModeContext = createContext({
  darkMode: true,
  toggleDark: () => {},
  toggleLight: () => {},
  setDarkMode: () => {}
})