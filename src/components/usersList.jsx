import React, { useState } from "react";
import api from "../API";
import User from "./user";
import TableHead from "./tableHead";
import SumUser from "./sumUser";

const UsersList = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handelDelete = (id) => {
    const newUsers = users.filter((c) => c._id !== id);
    setUsers(newUsers);
  };
  const handelMark = (id) => {
    setUsers((prevState) => {
      const buff = [...prevState];
      const index = buff.findIndex((item) => item._id === id);
      buff[index].bookmark = !buff[index].bookmark;
      return buff;
    });
  };
  // const handleReset = () => {
  //   setUsers(api.users.fetchAll());
  // };
  return (
    <>
      <SumUser key="sumUser" count={users.length} />

      <table className="table">
        <TableHead key="tableHead" visible={users.length > 0 ? true : false} />
        <tbody>
          {users.map((user) => (
            <User
              key={user._id}
              onDelete={handelDelete}
              onMark={handelMark}
              {...user}
            />
          ))}
        </tbody>
      </table>
      {/* <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        Сброс
      </button> */}
    </>
  );
};

export default UsersList;
