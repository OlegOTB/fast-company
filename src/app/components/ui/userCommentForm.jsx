import React, { useState, useEffect } from "react";
import api from "../../api";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";

const UserCommentForm = ({ id, allUsers, OnNewComment }) => {
  const [comment, setComment] = useState({
    _id: Math.random().toString(36).substr(2, 9),
    userId: "",
    pageId: id,
    content: "",
    created_at: ""
  });
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (comment.content && comment.userId) setIsValid(true);
  }, [comment]);

  const handleChange = (target) => {
    setComment((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const handleChangeTextArea = ({ target }) => {
    setComment((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    if (!target.value) setIsValid(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    api.comments
      .add({
        userId: comment.userId,
        pageId: comment.pageId,
        content: comment.content
      })
      .then((data) => {
        OnNewComment(data);
        setComment(() => ({
          _id: Math.random().toString(36).substr(2, 9),
          userId: "",
          pageId: id,
          content: "",
          created_at: ""
        }));
        setIsValid(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>Новый комментарий</h2>
            <div className="mb-4">
              <SelectField
                key="userIdCard"
                label=""
                name="userId"
                value={comment.userId}
                onChange={handleChange}
                defaultOption="Выберите пользователя"
                options={allUsers}
                error={null}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Сообщение
              </label>
              <textarea
                className="form-control"
                name="content"
                value={comment.content}
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleChangeTextArea}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" disabled={!isValid} className="btn btn-primary">
        Отправить
      </button>
    </form>
  );
};

UserCommentForm.propTypes = {
  id: PropTypes.string,
  allUsers: PropTypes.array,
  OnNewComment: PropTypes.func.isRequired
};

export default UserCommentForm;
