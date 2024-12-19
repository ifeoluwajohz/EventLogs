import React, { createContext, useContext, useReducer } from "react";

interface UserFlowState {
  idToken: string | null;
  role: string | null;
  answers: Record<string, string>;
  categories: string[];
  selectedCategories: string[];
}

const initialState: UserFlowState = {
  idToken: null,
  role: null,
  answers: {},
  categories: [],
  selectedCategories: [],
};

type UserFlowAction =
  | { type: "SET_ID_TOKEN"; payload: string }
  | { type: "SET_ROLE"; payload: string }
  | { type: "SET_ANSWER"; payload: { question: string; answer: string } }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "ADD_CATEGORY"; payload: string }
  | { type: "SET_SELECTED_CATEGORIES"; payload: string[] }
  | { type: "RESET" };

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
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return state.selectedCategories.includes(action.payload)
        ? state
        : { ...state, selectedCategories: [...state.selectedCategories, action.payload] };
    case "SET_SELECTED_CATEGORIES":
      return { ...state, selectedCategories: action.payload };
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

export const useUserFlow = () => {
  const context = useContext(UserFlowContext);
  if (!context) {
    throw new Error("useUserFlow must be used within a UserFlowProvider");
  }
  return context;
};
