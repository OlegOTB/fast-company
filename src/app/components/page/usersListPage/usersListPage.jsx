import React, { useState } from "react";

import SumUser from "../../ui/sumUser";
import Pagination from "../../common/paginations";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UserTable from "../../ui/usersTable";
import TextField from "../../common/form/textField";
// import { useUser } from "../../../hooks/useUsers";
// import { useProfessions } from "../../../hooks/useProfession";
// import { useAuth } from "../../../hooks/useAuth";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/profession";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());
  // const { users } = useUser();
  const users = useSelector(getUsers());
  // const { isLoading: professionsLoading, professions } = useProfessions();
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const professions = useSelector(getProfessions());
  // console.log(professionsLoading, professions);
  const [, setUsersRerender] = useState(false);
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setselectedProf] = useState();
  const [sortBy, setSortBy] = useState({
    iter: "name",
    order: "asc",
    addChar: "up"
  });
  const [serchString, setSearchString] = useState("");

  const handelDelete = (id) => {
    // const newUsers = users.filter((c) => c._id !== id);
    // const newUsers = allUsers.filter((c) => c._id !== id);
    // setUsers(newUsers);
  };
  const handelMark = (id) => {
    const index = users.findIndex((item) => item._id === id);
    users[index].bookmark = !users[index].bookmark;
    setUsersRerender((prevState) => !prevState);
    return users;
    // setUsers((prevState) => {
    //   const buff = [...prevState];
    //   const index = buff.findIndex((item) => item._id === id);
    //   buff[index].bookmark = !buff[index].bookmark;
    //   // console.log(index, buff[index].bookmark);
    //   return buff;
    // });
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

  function filterUsers(data) {
    let filteredUsers = [];
    if (data) {
      filteredUsers = selectedProf
        ? data.filter((user) => _.isEqual(user.profession, selectedProf))
        : data;
      filteredUsers =
        serchString !== ""
          ? data.filter((user) =>
              user.name.toLowerCase().includes(serchString.toLowerCase())
            )
          : filteredUsers;
    }
    return filteredUsers.filter((u) => u._id !== currentUserId);
  }
  const filteredUsers = filterUsers(users);
  const count = filteredUsers.length;
  if (count === 0) {
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
  // console.log(userCrop);
  return (
    <>
      <div className="d-flex">
        {professions && !professionsLoading && (
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
