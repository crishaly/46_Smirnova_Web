// Типы пользователей
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface State {
  users: User[];
}

export type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: { id: number; firstName: string } }
  | { type: "DELETE_USER"; payload: number };

// Типы компонентов
export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

// Типы API
export interface BtcResponse {
  bitcoin: {
    usd: number;
  };
}

export interface IpResponse {
  ip: string;
}

// Если файл пустой, можно добавить пустой экспорт, чтобы TypeScript считал его модулем
export {};