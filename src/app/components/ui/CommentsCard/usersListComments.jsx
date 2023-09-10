import React from "react";
import PropTypes from "prop-types";
import UserComment from "./userComment";

const UsersListComments = ({ comments, handelDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Комментарии</h2>
        <hr />
        {comments.map((comment) => (
          <UserComment
            key={comment._id}
            name={comment.name}
            onDelete={handelDelete}
            _id={comment._id}
            content={comment.content}
            createdAt={Number(comment.created_at)}
          />
        ))}
      </div>
    </div>
  );
};

UsersListComments.propTypes = {
  comments: PropTypes.array.isRequired,
  handelDelete: PropTypes.func.isRequired
};

export default UsersListComments;
