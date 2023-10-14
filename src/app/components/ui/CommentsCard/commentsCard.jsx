import React from "react";
import UserCommentForm from "./userCommentForm";
import UsersListComments from "./usersListComments";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const CommentsCard = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  return (
    <div className="col-md-8">
      {currentUser._id !== userId ? <UserCommentForm /> : ""}
      <UsersListComments />
    </div>
  );
};

export default CommentsCard;
