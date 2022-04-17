import { createContext, useContext } from "react"
export type GlobalContent = {
  darkMode: string | null
  setDarkMode:(c: string | null) => void
}
export const darkContext = createContext<GlobalContent>({
darkMode: '', // set a default value
setDarkMode: () => {},
})
export const useGlobalContext = () => useContext(darkContext)