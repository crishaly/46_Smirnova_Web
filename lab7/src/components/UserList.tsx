import React from "react";
import { useUsers } from "../store/usersStore";

const UserList: React.FC = () => {
  const { state } = useUsers();

  if (state.users.length === 0) return <div className="result-box">Пользователей нет.</div>;

  return (
    <div className="result-box">
      <b>Обновлённый список пользователей:</b>
      <ul className="user-list">
        {state.users.map((u) => (
          <li key={u.id}>
            ID: {u.id} {u.firstName} {u.lastName} (username: {u.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;