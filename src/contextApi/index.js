import React, { useReducer, createContext } from "react";
import { PropTypes } from "prop-types";
const initialState = {
  loginUser: "",
  selectedUser: "",
  selectedPost: "",
  selectedCenter: "",
  selectedTags: [],
  selectedTown: "",
  currentPage: "",
};

function contextReducer(state, action) {
  const { nextState, type } = action;
  switch (type) {
    case "setLoginUser":
      return { ...state, loginUser: nextState };
    case "setUser":
      return { ...state, selectedUser: nextState };
    case "setPost":
      return { ...state, selectedPost: nextState };
    case "setCenter":
      return { ...state, selectedCenter: nextState };
    case "removeTag":
      return {
        ...state,
        selectedTags: state.selectedTags.filter((tag) => tag.id !== nextState),
      };
    case "addTag":
      return {
        ...state,
        selectedTags: [...state.selectedTags, { id: nextState }],
      };
    case "setTown":
      return { ...state, selectedTown: nextState };
    case "setCurrentPage":
      return { ...state, currentPage: nextState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const StateContext = createContext();
export const DispatchContext = createContext();

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.children,
};

export default ContextProvider;
