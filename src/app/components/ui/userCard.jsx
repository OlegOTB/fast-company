import React, { useState, useEffect } from "react";
import api from "../../api";
import { useHistory, Link } from "react-router-dom";

import { cardBody } from "../../utils/cardBody";
import Qualities from "./qualities";
import SelectField from "../common/form/selectField";
import UsersListComments from "../page/usersListComments/usersListComments";
import PropTypes from "prop-types";

const UserCard = ({ id }) => {
  // if (id === undefined) return;
  const history = useHistory();
  const handleClick = () => {
    history.push("/Users");
  };
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) =>
      setUsers(
        data.map((item) => {
          return { ...item, value: item._id };
        })
      )
    );
  }, []);
  const [comment, setComment] = useState({
    _id: Math.random().toString(36).substr(2, 9),
    userId: "",
    pageId: id,
    content: "",
    created_at: ""
  });

  const [message, setMessage] = useState("Поиск пользователя");
  const [data, setData] = useState();
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    api.users.getById(id).then((data) => {
      setData(data);
      if (data === null || data === undefined) {
        setMessage("Пользователь не найден");
      }
    });
  }, []);

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
    setComment(() => ({
      _id: Math.random().toString(36).substr(2, 9),
      userId: "",
      pageId: id,
      content: "",
      created_at: ""
    }));
    setIsValid(false);
    api.comments.add({
      userId: comment.userId,
      pageId: comment.pageId,
      content: comment.content
    });
  };

  if (data === null || data === undefined) {
    return message;
  }
  const columns = {
    name: {
      path: "name",
      name: "Имя"
    },
    professions: {
      path: "profession.name",
      name: "Профессия"
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился кол-во раз"
    },
    rate: { path: "rate", name: "Оценка" }
  };
  const objUser = cardBody(data, columns);
  // console.log(objUser);
  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <Link to={`/Users/${id}/edit`}>
                  <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                    <i className="bi bi-gear"></i>
                  </button>
                </Link>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                  />
                  <div className="mt-3">
                    <h4>{objUser.name}</h4>
                    <p className="text-secondary mb-1">{objUser.professions}</p>
                    <div className="text-muted">
                      <i
                        className="bi bi-caret-down-fill text-primary"
                        role="button"
                      ></i>
                      <i
                        className="bi bi-caret-up text-secondary"
                        role="button"
                      ></i>
                      <span className="ms-2">{objUser.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Личные качества</span>
                </h5>
                <p className="card-text">{objUser.qualities}</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Количество встреч</span>
                  </h5>

                  <h1 className="display-1">{objUser.completedMeetings}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
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
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary"
              >
                Отправить
              </button>
            </form>

            <UsersListComments pageId={id} />
          </div>
        </div>
      </div>
      <button onClick={handleClick} className={"btn btn-secondary btn-sm  m-2"}>
        Все Пользователи
      </button>
    </>
  );
};

UserCard.propTypes = {
  id: PropTypes.string
};

export default UserCard;
