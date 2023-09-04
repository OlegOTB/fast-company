import React, { useState, useEffect } from "react";
import api from "../../../api";
import _ from "lodash";
import PropTypes from "prop-types";
import UserComment from "../../ui/userComment/userComment";

const UsersListComments = ({ pageId }) => {
  const [commentsLoad, setCommentsLoad] = useState(false);
  const [comments, setComments] = useState();
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    api.comments.fetchCommentsForUser(pageId).then((data) => {
      setComments(data);
      if (data !== null || data !== undefined) {
        setCommentsLoad(true);
        setComments(_.orderBy(data, ["created_at"], ["asc"]));
      }
    });
  }, []);

  if (comments && allUsers) {
    comments.forEach(
      (item) =>
        (item.name = allUsers.find((buff) => buff._id === item.userId).name)
    );
  }

  const handelDelete = (_id, userId, pageId) => {
    const newComments = comments.filter(
      (c) => !(c._id === _id && c.userId === userId && c.pageId === pageId)
    );
    // setComments(newComments);
    api.comments.remove(_id).then(() => setComments(newComments));
  };

  if (!commentsLoad) {
    return "Загрузка комментариев";
  }
  if (!comments || comments.length === 0) return;
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
            userId={comment.userId}
            pageId={comment.pageId}
            content={comment.content}
            createdAt={comment.created_at}
          />
        ))}
      </div>
    </div>
  );
};

UsersListComments.propTypes = {
  pageId: PropTypes.string.isRequired
};

export default UsersListComments;
