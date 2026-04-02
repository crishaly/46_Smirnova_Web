import React from "react";

interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = "text" }) => {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
};

export default Input;