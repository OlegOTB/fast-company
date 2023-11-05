import React, { useEffect } from "react";
import UserComment from "./userComment";
// import { useComments } from "../../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from "../../../store/comments";
import { useParams } from "react-router-dom";

const UsersListComments = () => {
  // const { removeComment } = useComments();
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments(userId));
  const handelDelete = (id) => {
    dispatch(deleteComment(id));
    // removeComment(id);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Комментарии</h2>
        <hr />
        {!isLoading
          ? comments.map((comment) => (
              <UserComment
                key={comment._id}
                onDelete={handelDelete}
                _id={comment._id}
                userId={comment.userId}
                content={comment.content}
                createdAt={Number(comment.created_at)}
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default UsersListComments;
