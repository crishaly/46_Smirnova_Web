import React, { useEffect } from "react";
import { useUsers } from "../store/usersStore";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const UsersPage: React.FC = () => {
  const { dispatch } = useUsers();

  // Предзагрузка пользователей с API
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=6");
        const data = await res.json();
        const users = data.users.map((u: any) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username || u.firstName.toLowerCase(),
        }));
        dispatch({ type: "SET_USERS", payload: users });
      } catch (err) {
        console.error("Ошибка загрузки пользователей", err);
      }
    }
    fetchUsers();
  }, [dispatch]);

  return (
    <div className="panel">
      <h2>dummyjson GET POST PATCH DELETE</h2>
      <UserForm />
      <UserList />
    </div>
  );
};

export default UsersPage;