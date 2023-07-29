import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  key,
  onDelete,
  onMark,
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark
}) => {
  // console.log(users);

  return (
    <>
      <tr>
        <th>{name}</th>
        <th>
          <Qualities qualities={qualities} />
        </th>
        <th>{profession.name}</th>
        <th>{completedMeetings}</th>
        <th>{rate}/5</th>
        <th style={{ textAlign: "center", verticalAlign: "middle" }}>
          <Bookmark key={_id} onMark={onMark} id={_id} bookmark={bookmark} />
        </th>
        <th>
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={() => onDelete(_id)}
          >
            delete
          </button>
        </th>
      </tr>
    </>
  );
};

User.propTypes = {
  key: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMark: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),

  qualities: PropTypes.shape({
    qualitie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  }),
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired
};

export default User;
