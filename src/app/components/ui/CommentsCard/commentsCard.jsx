import React from "react";
import UserCommentForm from "./userCommentForm";
import UsersListComments from "./usersListComments";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
// import { useAuth } from "../../../hooks/useAuth";

const CommentsCard = () => {
  const { userId } = useParams();
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <div className="col-md-8">
      {currentUserId !== userId ? <UserCommentForm /> : ""}
      <UsersListComments />
    </div>
  );
};

export default CommentsCard;
