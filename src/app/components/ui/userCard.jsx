import React, { useState, useEffect } from "react";
import api from "../../api";
import { useHistory, Link } from "react-router-dom";

import CardBody from "../page/userPage/cardBody";
import Qualities from "./qualities";
import PropTypes from "prop-types";

const UserCard = ({ id }) => {
  // if (id === undefined) return;
  const history = useHistory();
  const handleClick = () => {
    history.push("/Users");
  };

  const [message, setMessage] = useState("Поиск пользователя");
  const [data, setData] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => {
      setData(data);
      if (data === null || data === undefined) {
        setMessage("Пользователь не найден");
      }
    });
  }, []);

  if (data === null || data === undefined) {
    return message;
  }
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      includeName: false,
      class: "h1 m-2"
    },
    professions: {
      path: "profession.name",
      name: "Профессия",
      includeName: true,
      class: "h2 m-2"
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />,
      includeName: false
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился кол-во раз",
      includeName: true,
      class: "h3 m-2"
    },
    rate: { path: "rate", name: "Оценка", includeName: true, class: "h1 m-2" }
  };
  return (
    <>
      <CardBody key={data._id} {...{ data, columns }} />

      {/* <Link
        key={"button-card"}
        to={"/Users"}
        className={"btn btn-secondary btn-sm  m-2"}
      >
        Все пользователи
      </Link> */}
      <button onClick={handleClick} className={"btn btn-secondary btn-sm  m-2"}>
        Все Пользователи
      </button>
      <Link to={`/Users/${id}/edit`}>
        <button className={"btn btn-secondary btn-sm  m-2"} type="button">
          Изменить данные
        </button>
      </Link>
    </>
  );
};

UserCard.propTypes = {
  id: PropTypes.string
};

export default UserCard;
