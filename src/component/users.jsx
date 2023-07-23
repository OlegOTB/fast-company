import React, { useState } from "react";
import api from "../API";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  // console.log(users);
  const sumUsers = () => {
    return (
      <h1
        className={
          users.length === 0
            ? "badge bg-danger btn-sm m-2"
            : "badge bg-primary btn-sm m-2"
        }
      >
        {users.length === 0
          ? "Никто с тобой не тусанет"
          : users.length + " человек тусанет с тобой сегодня"}
      </h1>
    );
  };
  const getBageClasses = (color) => {
    return "badge m-2 bg-" + color;
  };
  const handelDelete = (userId) => {
    setUsers((prevState) => prevState.filter((Id) => Id._id !== userId));
  };
  const renderQualities = (qualities) => {
    return qualities.map((qualitie) => (
      <span key={qualitie._id} className={getBageClasses(qualitie.color)}>
        {qualitie.name}
      </span>
    ));
  };
  const renderUsers = () => {
    return users.map((user) => (
      <>
        <tr>
          <th>{user.name}</th>
          <th>{renderQualities(user.qualities)}</th>
          <th>{user.profession.name}</th>
          <th>{user.completedMeetings}</th>
          <th>{user.rate}/5</th>
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => handelDelete(user._id)}
          >
            delete
          </button>
        </tr>
      </>
    ));
  };

  return (
    <>
      {sumUsers()}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился кол-во раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
