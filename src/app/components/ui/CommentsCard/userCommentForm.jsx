import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useComments } from "../../../hooks/useComments";
import { useAuth } from "../../../hooks/useAuth";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

const UserCommentForm = () => {
  const { userId } = useParams();
  // console.log(userId);
  const { currentUser } = useAuth();
  const [comment, setComment] = useState({
    _id: nanoid(),
    userId: currentUser._id,
    pageId: userId,
    content: "",
    created_at: ""
  });
  const [isValid, setIsValid] = useState(false);
  const { createComment } = useComments();

  const handleChangeTextArea = ({ target }) => {
    setComment((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    if (target.value) {
      setIsValid(true);
    } else setIsValid(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createComment(comment);
    setComment(() => ({
      _id: nanoid(),
      userId: currentUser._id,
      pageId: userId,
      content: "",
      created_at: ""
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

// UserCommentForm.propTypes = {
//   id: PropTypes.string,
//   allUsers: PropTypes.array,
//   OnAddComment: PropTypes.func.isRequired
// };

export default UserCommentForm;
