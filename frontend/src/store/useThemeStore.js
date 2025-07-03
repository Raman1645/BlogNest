import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("BlogNext-theme") || "dark",

  setTheme: (theme) => {
    localStorage.setItem("BlogNest-theme", theme);
    document.documentElement.setAttribute("data-theme", theme); // ✨ Apply theme to <html>
    set({ theme });
  },
}));
