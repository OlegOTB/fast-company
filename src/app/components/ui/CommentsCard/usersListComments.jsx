import React from "react";
import UserComment from "./userComment";
import { useComments } from "../../../hooks/useComments";

const UsersListComments = () => {
  const { comments, isLoading, removeComment } = useComments();
  if (isLoading) {
    return <h5>Загрузка комментариев...</h5>;
  }
  const handelDelete = (id) => {
    removeComment(id);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Комментарии</h2>
        <hr />
        {comments.map((comment) => (
          <UserComment
            key={comment._id}
            onDelete={handelDelete}
            _id={comment._id}
            userId={comment.userId}
            content={comment.content}
            createdAt={Number(comment.created_at)}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersListComments;
