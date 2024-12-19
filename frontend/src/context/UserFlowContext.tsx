import React, { createContext, useContext, useReducer } from "react";

interface UserFlowState {
  idToken: string | null;
  role: string | null; // 'admin' or 'attendee'
  answers: Record<string, string>; // Store answers dynamically as key-value pairs
  categories: string[]; // Store the list of categories (fetched from the backend)
  selectedCategories: string[]; // Store the categories selected by the user
}

const initialState: UserFlowState = {
  idToken: null,
  role: null,
  answers: {},
  categories: [], // Initialize with an empty category list
  selectedCategories: [], // Initialize with an empty selected category list
};

// Define action types
type UserFlowAction =
  | { type: "SET_ID_TOKEN"; payload: string }
  | { type: "SET_ROLE"; payload: string }
  | { type: "SET_ANSWER"; payload: { question: string; answer: string } }
  | { type: "SET_CATEGORIES"; payload: string[] } // Action to set the entire category list (fetched)
  | { type: "ADD_CATEGORY"; payload: string } // Action to add a single category (custom input)
  | { type: "SET_SELECTED_CATEGORIES"; payload: string[] } // Action to set selected categories
  | { type: "RESET" };

// Reducer function to manage state updates
const reducer = (state: UserFlowState, action: UserFlowAction): UserFlowState => {
  switch (action.type) {
    case "SET_ID_TOKEN":
      return { ...state, idToken: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.question]: action.payload.answer,
        },
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }; // Replace the category list (fetched)
    case "ADD_CATEGORY":
      return state.selectedCategories.includes(action.payload)
        ? state
        : { ...state, selectedCategories: [...state.selectedCategories, action.payload] }; // Add category only if it's not already selected
    case "SET_SELECTED_CATEGORIES":
      return { ...state, selectedCategories: action.payload }; // Set the selected categories
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const UserFlowContext = createContext<{
  state: UserFlowState;
  dispatch: React.Dispatch<UserFlowAction>;
}>({ state: initialState, dispatch: () => null });

export const UserFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserFlowContext.Provider value={{ state, dispatch }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);
