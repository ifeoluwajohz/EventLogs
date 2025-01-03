import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Adjust the path as needed

interface UserFlowState {
  idToken: string | null;
  role: string | null;
  preferredName: string | null;
  location: string | null;
  event: Record<string, string>;
  categories: string[];
  selectedCategories: string[];
}

const initialState: UserFlowState = {
  idToken: null,
  role: null,
  preferredName: null,
  location: null,
  event: {},
  categories: [],
  selectedCategories: [],
};

interface UserFlowContextProps {
  state: UserFlowState;
  setIdToken: (idToken: string) => void;
  setRole: (role: string) => void;
  setPreferredName: (preferredName: string) => void;
  setLocation: (location: string) => void;
  setEvent: (question: string, answer: string) => void;
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  reset: () => void;
  syncWithBackend: () => Promise<void>;
}

const UserFlowContext = createContext<UserFlowContextProps | undefined>(
  undefined
);

export const UserFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile } = useAuth();
  const [state, setState] = useState<UserFlowState>(initialState);

  // const storedToken = localStorage.getItem("jwt");



  useEffect(() => {
    // Read JWT token on component mount
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      if (storedToken) {
        setState((prev) => ({
          ...prev,
          idToken: storedToken,
        }));
      }
    }
  
    // Sync data from AuthContext
    if (userProfile) {
      setState((prev) => ({
        ...prev,
        role: typeof userProfile.role === 'string' ? userProfile.role : null,
        preferredName: userProfile.name || null,
        location: userProfile.location || null,
      }));
    }
    
  }, [userProfile]);
  

  const setIdToken = (idToken: string) => setState((prev) => ({ ...prev, idToken }));
  const setRole = (role: string) => setState((prev) => ({ ...prev, role }));
  const setPreferredName = (preferredName: string) =>
    setState((prev) => ({ ...prev, preferredName }));
  const setLocation = (location: string) => setState((prev) => ({ ...prev, location }));

  const setEvent = (question: string, answer: string) =>
    setState((prev) => ({
      ...prev,
      event: { ...prev.event, [question]: answer },
    }));
  const setCategories = (categories: string[]) =>
    setState((prev) => ({ ...prev, categories }));
  const addCategory = (category: string) =>
    setState((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories
        : [...prev.selectedCategories, category],
    }));
  const setSelectedCategories = (categories: string[]) =>
    setState((prev) => ({ ...prev, selectedCategories: categories }));
  const reset = () => setState(initialState);

  const syncWithBackend = async (): Promise<void> => {
    try {
      const response = await fetch("https://zorra-lxsj.onrender.com/event/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")?.toString()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.event),
      });

      console.log(localStorage.getItem("jwt"))
      const data = await response.json();
      console.log(data, "data")
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message); // Safely access the error message
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
    
  };

  return (
    <UserFlowContext.Provider
      value={{
        state,
        setIdToken,
        setRole,
        setPreferredName,
        setLocation,
        setEvent,
        setCategories,
        addCategory,
        setSelectedCategories,
        reset,
        syncWithBackend,
      }}
    >
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = (): UserFlowContextProps => {
  const context = useContext(UserFlowContext);
  if (!context) {
    throw new Error("useUserFlow must be used within a UserFlowProvider");
  }
  return context;
};
