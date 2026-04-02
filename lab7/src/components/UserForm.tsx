import React, { useState } from "react";
import { useUsers, User } from "../store/usersStore";

const UserForm: React.FC = () => {
  const { dispatch } = useUsers();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const handleAdd = () => {
    if (!firstName || !lastName) return;
    const newUser: User = {
      id: Date.now(),
      firstName,
      lastName,
      username: firstName.toLowerCase(),
    };
    dispatch({ type: "ADD_USER", payload: newUser });
    setFirstName("");
    setLastName("");
  };

  const handleUpdate = () => {
    const id = Number(updateId);
    if (!id || !updateName) return;
    dispatch({ type: "UPDATE_USER", payload: { id, firstName: updateName } });
    setUpdateId("");
    setUpdateName("");
  };

  const handleDelete = () => {
    const id = Number(deleteId);
    if (!id) return;
    dispatch({ type: "DELETE_USER", payload: id });
    setDeleteId("");
  };

  return (
    <div className="crud-forms">
      <div>
        <h3>Добавить пользователя</h3>
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button className="button button-success" onClick={handleAdd}>
          POST создать
        </button>
      </div>

      <div>
        <h3>Обновить пользователя</h3>
        <input
          type="text"
          placeholder="ID"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Новое имя"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        <button className="button button-primary" onClick={handleUpdate}>
          PATCH обновить
        </button>
      </div>

      <div>
        <h3>Удалить пользователя</h3>
        <input
          type="text"
          placeholder="ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button className="button button-danger" onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default UserForm;