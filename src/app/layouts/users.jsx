import React from "react";
import { useParams, useHistory } from "react-router-dom";
import UserCard from "../components/ui/userCard";
import UsersListPage from "../components/page/usersListPage";
import RegisterForm from "../components/ui/registerForm";

const Users = () => {
  const params = useParams();
  const history = useHistory();

  const { userId } = params;
  return (
    <>
      {userId ? (
        history.location.pathname.includes("/edit") ? (
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3 shadow p-4">
                <h3 className="mb-4">Изменение данных пользователя</h3>
                <RegisterForm id={userId} />
              </div>
            </div>
          </div>
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
