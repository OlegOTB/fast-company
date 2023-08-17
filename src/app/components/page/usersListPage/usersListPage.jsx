import React, { useState, useEffect } from "react";
import api from "../../../api";

import SumUser from "../../ui/sumUser";
import Pagination from "../../common/paginations";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UserTable from "../../ui/usersTable";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
  const [usersLoad, setUsersLoad] = useState(false);
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
      if (data !== null || data !== undefined) {
        setUsersLoad(true);
      }
    });
  }, []);
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setselectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    iter: "name",
    order: "asc",
    addChar: "up"
  });
  const [serchString, setSearchString] = useState("");

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
      // console.log(index, buff[index].bookmark);
      return buff;
    });
  };
  const handlePageCange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    setCurrentPage(1);
    setSearchString("");
    setselectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleSearchString = (target) => {
    setSearchString(target.value);
    if (target.value !== "") setselectedProf();
  };

  let filteredUsers = [];
  if (allUsers) {
    filteredUsers = selectedProf
      ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
      : allUsers;
    filteredUsers =
      serchString !== ""
        ? allUsers.filter((user) =>
            user.name.toLowerCase().includes(serchString.toLowerCase())
          )
        : filteredUsers;
  }
  const count = filteredUsers.length;
  if (!usersLoad && count === 0) {
    return "Загрузка пользователей";
  }
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);
  if (userCrop?.length === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  const clearFilter = () => {
    setselectedProf();
  };
  return (
    <>
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
          <TextField
            label="Поиск человека"
            name="serchString"
            value={serchString}
            onChange={handleSearchString}
            error={undefined}
            placeholder="Search..."
          />
          <UserTable
            key="userTable"
            users={userCrop}
            onDelete={handelDelete}
            handelMark={handelMark}
            count={count}
            handleSort={handleSort}
            selectedSort={sortBy}
          />
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
    </>
  );
};

export default UsersListPage;
