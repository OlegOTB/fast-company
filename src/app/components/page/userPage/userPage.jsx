import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { cardBody } from "../../../utils/cardBody";
import Qualities from "../../ui/qualities";
import InfoCard from "../../ui/infoCard";
import CommentsCard from "../../ui/CommentsCard/commentsCard";
import PropTypes from "prop-types";
// import { useUser } from "../../../hooks/useUsers";
import CommentsProvider from "../../../hooks/useComments";
// import { useProfessions } from "../../../hooks/useProfession";
import { useSelector } from "react-redux";
import { getProfessionsLoadingStatus } from "../../../store/profession";
import Profession from "../../ui/profession";
import { getUserById } from "../../../store/users";

const UserPage = ({ id }) => {
  // if (id === undefined) return;

  const history = useHistory();
  const handleClick = () => {
    history.push("/Users");
  };
  // const { getUserById } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  // const { isLoading: isLoadingProf, getProfession } = useProfessions();

  const isLoadingProf = useSelector(getProfessionsLoadingStatus());

  useEffect(() => {
    if (!isLoadingProf) setIsLoading(true);
  }, [isLoadingProf]);
  // const data = getUserById(id);
  const data = useSelector(getUserById(id));
  if (data === null || data === undefined) {
    return "Поиск пользователя";
  }
  const columns = {
    image: {
      path: "image",
      name: "Фото"
    },
    name: {
      path: "name",
      name: "Имя"
    },
    professions: {
      // path: "profession.name",
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualitiesId={user.qualities} />
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился кол-во раз"
    },
    rate: { path: "rate", name: "Оценка" }
  };
  if (!isLoading) return <h5>Загрузка формы...</h5>;
  const objUser = cardBody(data, columns);
  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <InfoCard id={id} objUser={objUser} />
          <CommentsProvider>
            {/* pageId={id} */}
            <CommentsCard />
          </CommentsProvider>
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
