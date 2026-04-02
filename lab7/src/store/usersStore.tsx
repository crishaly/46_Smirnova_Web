import React, { createContext, useReducer, useContext, ReactNode } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

type State = { users: User[] };

type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: { id: number; firstName: string } }
  | { type: "DELETE_USER"; payload: number };

const initialState: State = { users: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.payload.id ? { ...u, firstName: action.payload.firstName } : u
        ),
      };
    case "DELETE_USER":
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };
    default:
      return state;
  }
}

const UsersContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <UsersContext.Provider value={{ state, dispatch }}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsers must be used within UsersProvider");
  return context;
};