import React, { useState, useEffect } from "react";
import api from "../../../api";
import _ from "lodash";
import UserCommentForm from "./userCommentForm";
import UsersListComments from "./usersListComments";
import PropTypes from "prop-types";

const CommentsCard = ({ pageId }) => {
  const [commentsLoad, setCommentsLoad] = useState(false);
  const [comments, setComments] = useState();
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) =>
      setUsers(
        data.map((item) => {
          return { ...item, value: item._id };
        })
      )
    );
    api.comments.fetchCommentsForUser(pageId).then((data) => {
      setComments(data);
      if (data !== null || data !== undefined) {
        setCommentsLoad(true);
        setComments(_.orderBy(data, ["created_at"], ["asc"]));
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
        setComments(comments.concat([data]));
      });
  };

  const handelDelete = (_id) => {
    //   console.log(_id);
    //   console.log(comments);
    api.comments.remove(_id).then(() => {
      setComments(comments.filter((c) => !(c._id === _id)));
    });
  };

  if (comments && allUsers) {
    comments.forEach(
      (item) =>
        (item.name = allUsers.find((buff) => buff._id === item.userId).name)
    );
  }
  if (!commentsLoad) {
    return "Загрузка комментариев";
  }

  return (
    <div className="col-md-8">
      <UserCommentForm
        id={pageId}
        allUsers={allUsers}
        OnAddComment={handelAddComment}
      />
      <UsersListComments comments={comments} handelDelete={handelDelete} />
    </div>
  );
};

CommentsCard.propTypes = {
  pageId: PropTypes.string.isRequired
};

export default CommentsCard;
