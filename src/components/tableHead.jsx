import React from "react";

const TableHead = (props) => {
  return (
    <>
      <thead hidden={props.visible ? "" : "hidden"}>
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

export default TableHead;
