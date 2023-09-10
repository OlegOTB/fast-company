import React, { useState, useEffect } from "react";
import SelectField from "../../common/form/selectField";
import PropTypes from "prop-types";

const UserCommentForm = ({ id, allUsers, OnAddComment }) => {
  const [comment, setComment] = useState({
    userId: "",
    pageId: id,
    content: ""
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
    OnAddComment(comment);
    setComment(() => ({
      userId: "",
      pageId: id,
      content: ""
    }));
    setIsValid(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>Новый комментарий</h2>
            <div className="mb-4">
              <SelectField
                key={id}
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
  OnAddComment: PropTypes.func.isRequired
};

export default UserCommentForm;
