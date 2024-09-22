import { create } from "zustand";

const loadUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

const loadIsAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const useStore = create((set) => ({
  isAuthenticated: loadIsAuthenticated(),
  userData: loadUserData(),
  setIsAuthenticated: (isAuthenticated) => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    set({ isAuthenticated });
  },
  setUserData: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set({ userData });
  },
}));
