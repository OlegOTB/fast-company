import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../userCard";
import UsersList from "../usersList";
const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserCard id={userId} /> : <UsersList />}</>;
};

export default Users;
