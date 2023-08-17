import React from "react";
import PropTypes from "prop-types";
// import TableHead from "./tableHead";
// import TableBody from "./tableBody";
import Bookmark from "../common/bookmark";
import Table from "../common/table";
import Qualities from "./qualities";
import { Link } from "react-router-dom";

const UserTable = ({
  users,
  onDelete,
  handelMark,
  count,
  handleSort,
  selectedSort
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/Users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился кол-во раз"
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          key={user._id}
          onMark={handelMark}
          id={user._id}
          bookmark={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      )
    }
  };

  return (
    <>
      <Table
        count={count}
        onSort={handleSort}
        selectedSort={selectedSort}
        columns={columns}
        data={users}
      >
        {/* <TableHead
          key="tableHead"
          visible={Boolean(count)}
          onSort={handleSort}
          selectedSort={selectedSort}
          columns={columns}
        />
        <TableBody {...{ columns, data: users }} /> */}
      </Table>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  handelMark: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  handleSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UserTable;
