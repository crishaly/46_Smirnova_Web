import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UsersProvider } from "./store/usersStore";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
  </React.StrictMode>
);