import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/ui/userCard";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage id={userId} />
        ) : (
          <UserCard id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
