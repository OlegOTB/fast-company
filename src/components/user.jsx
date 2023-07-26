import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (props) => {
  // console.log(users);

  return (
    <>
      <tr>
        <th>{props.name}</th>
        <th>
          <Qualities qualities={props.qualities} />
        </th>
        <th>{props.profession.name}</th>
        <th>{props.completedMeetings}</th>
        <th>{props.rate}/5</th>
        <th style={{ textAlign: "center", verticalAlign: "middle" }}>
          <Bookmark
            key={props._id}
            onMark={props.onMark}
            id={props._id}
            bookmark={props.bookmark}
          />
        </th>
        <th>
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={() => props.onDelete(props._id)}
          >
            delete
          </button>
        </th>
      </tr>
    </>
  );
};

export default User;
