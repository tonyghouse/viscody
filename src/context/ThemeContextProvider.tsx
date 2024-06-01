"use client"
import {
  useEffect,
  useState,
} from "react"
import { ThemeContext } from "./ThemeContext";
import {ThemeMode} from "../util/ThemeUtil";

const ThemeContextDefaultProvider = (props: any) => {
  const [userThemeMode, setUserThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    let userColorScheme: ThemeMode = "light";

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        userColorScheme = event.matches ? "dark" : "light";
      });

     const themeValue= localStorage.getItem('viscodyThemeValue');
     const colorScheme: ThemeMode = (themeValue === "dark" || themeValue === "light") 
                        ?  themeValue : userColorScheme;
                        
   localStorage.setItem('viscodyThemeValue', colorScheme);
   setUserThemeMode(colorScheme);
  }, []);


  useEffect(() => {
    //shadcn theme changing
    if (userThemeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
  }, [userThemeMode]);

  const toggleUserThemeMode = () => {
    let toggledThemeMode: ThemeMode = userThemeMode === "dark" ? "light" : "dark";
    localStorage.setItem('viscodyThemeValue', toggledThemeMode);
    setUserThemeMode(toggledThemeMode);
  };

  return (
    <>
      <ThemeContext.Provider value={{
      themeMode:userThemeMode,
      toggleThemeMode: toggleUserThemeMode,
      }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeContextDefaultProvider;
