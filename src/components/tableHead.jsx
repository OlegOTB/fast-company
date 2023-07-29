import React from "react";
import PropTypes from "prop-types";

const TableHead = ({ visible }) => {
  return (
    <>
      <thead hidden={visible ? "" : "hidden"}>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился кол-во раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col"></th>
        </tr>
      </thead>
    </>
  );
};

TableHead.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default TableHead;
