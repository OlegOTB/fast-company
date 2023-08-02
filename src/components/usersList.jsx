import React, { useState, useEffect } from "react";
import api from "../API";
import User from "./user";
import TableHead from "./tableHead";
import SumUser from "./sumUser";
import Pagination from "./paginations";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import _ from "lodash";

const UsersList = () => {
  const [allUsers, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const pageSize = 2;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setselectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  const handelDelete = (id) => {
    const newUsers = allUsers.filter((c) => c._id !== id);
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
  const handleProfessionSelect = (item) => {
    setCurrentPage(1);
    setselectedProf(item);
  };

  let filteredUsers = [];
  if (allUsers) {
    filteredUsers = selectedProf
      ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
      : allUsers;
  }
  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  if (userCrop?.length === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  const clearFilter = () => {
    setselectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className="btn btn-secondary btn-sm  m-2"
            onClick={clearFilter}
          >
            Очистить
          </button>
        </div>
      )}

      <div className="d-flex flex-column">
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageCange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
