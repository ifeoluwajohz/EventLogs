import React, { createContext, useContext, useState } from "react";

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
  setpreferredName: (preferredName: string) => void;
  setLocation: (location: string) => void;
  setEvent: (question: string, answer: string) => void;
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  reset: () => void;
}

const UserFlowContext = createContext<UserFlowContextProps | undefined>(undefined);

export const UserFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserFlowState>(initialState);

  const setIdToken = (idToken: string) => setState((prev) => ({ ...prev, idToken }));
  const setRole = (role: string) => setState((prev) => ({ ...prev, role }));
  const setpreferredName = (preferredName: string) => setState((prev) => ({ ...prev, preferredName }));
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

  return (
    <UserFlowContext.Provider
      value={{
        state,
        setIdToken,
        setRole,
        setpreferredName,
        setLocation,
        setEvent,
        setCategories,
        addCategory,
        setSelectedCategories,
        reset,
      }}
    >
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => {
  const context = useContext(UserFlowContext);
  if (!context) {
    throw new Error("useUserFlow must be used within a UserFlowProvider");
  }
  return context;
};
