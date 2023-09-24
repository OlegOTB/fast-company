import React, { useState, useEffect } from "react";
import api from "../../../api";
import _ from "lodash";
import UserCommentForm from "./userCommentForm";
import UsersListComments from "./usersListComments";
import PropTypes from "prop-types";

const CommentsCard = ({ pageId }) => {
  // const [commentsLoad, setCommentsLoad] = useState(false);
  const [comments, setComments] = useState(null);
  // const [allUsersLoad, setAllUsersLoad] = useState(false);
  const [dataValid, setDataValid] = useState(false);
  const [allUsers, setUsers] = useState(null);

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(
        data.map((item) => {
          return { ...item, value: item._id };
        })
      );
      if (data !== null || data !== undefined) {
        // setAllUsersLoad(true);
      }
    });
    api.comments.fetchCommentsForUser(pageId).then((data) => {
      setComments(data);
      if (data !== null || data !== undefined) {
        // setCommentsLoad(true);
        setComments(_.orderBy(data, ["created_at"], ["desc"]));
      }
    });
  }, []);

  const handelAddComment = (comment) => {
    // console.log(pageId);
    // console.log(comment);
    if (comment !== undefined && comment !== null) {
      if (comments.find((c) => c._id === comment._id) !== undefined) {
        return;
      }
    }

    api.comments
      .add({
        userId: comment.userId,
        pageId: comment.pageId,
        content: comment.content
      })
      .then((data) => {
        data.name = allUsers.find((buff) => buff._id === comment.userId).name;
        setComments([data].concat(comments));
      });
  };

  const handelDelete = (_id) => {
    //   console.log(_id);
    //   console.log(comments);
    api.comments.remove(_id).then(() => {
      setComments(comments.filter((c) => !(c._id === _id)));
    });
  };
  if (comments && allUsers && !dataValid) {
    comments.forEach(
      (item) =>
        (item.name = allUsers.find((buff) => buff._id === item.userId).name)
    );
    setDataValid(true);
  }
  return (
    <div className="col-md-8">
      {allUsers ? (
        <UserCommentForm
          id={pageId}
          allUsers={allUsers}
          OnAddComment={handelAddComment}
        />
      ) : (
        <h5>Загрузка пользователей...</h5>
      )}
      {comments ? (
        <UsersListComments comments={comments} handelDelete={handelDelete} />
      ) : (
        <h5>Загрузка комментариев...</h5>
      )}
    </div>
  );
};

CommentsCard.propTypes = {
  pageId: PropTypes.string.isRequired
};

export default CommentsCard;
