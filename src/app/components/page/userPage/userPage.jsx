import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useHistory } from "react-router-dom";

import { cardBody } from "../../../utils/cardBody";
import Qualities from "../../ui/qualities";
import InfoCard from "../../ui/infoCard";
import CommentsCard from "../../ui/CommentsCard/commentsCard";
import PropTypes from "prop-types";

const UserPage = ({ id }) => {
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
  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <InfoCard id={id} objUser={objUser} />
          <CommentsCard pageId={id} />
        </div>
      </div>
      <button onClick={handleClick} className={"btn btn-secondary btn-sm  m-2"}>
        Все Пользователи
      </button>
    </>
  );
};

UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;