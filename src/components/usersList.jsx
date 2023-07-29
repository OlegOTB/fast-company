import React, { useState } from "react";
import api from "../API";
import User from "./user";
import TableHead from "./tableHead";
import SumUser from "./sumUser";
import Pagination from "./paginations";
import { paginate } from "../utils/paginate";

const UsersList = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
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
  const handlePageCange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);
  if (userCrop.length === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  // const handleReset = () => {
  //   setUsers(api.users.fetchAll());
  // };
  return (
    <>
      <SumUser key="sumUser" count={count} />

      <table className="table">
        <TableHead key="tableHead" visible={Boolean(count)} />
        <tbody>
          {userCrop.map((user) => (
            <User
              key={user._id}
              onDelete={handelDelete}
              onMark={handelMark}
              {...user}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageCange}
        currentPage={currentPage}
      />
      {/* <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        Сброс
      </button> */}
    </>
  );
};

export default UsersList;
