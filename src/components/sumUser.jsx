import React from "react";
import PropTypes from "prop-types";

const SumUser = ({ key, count }) => {
  const ending = (number) => {
    const edNumber = number > 4 && number < 22 ? number : number % 10;
    return edNumber === 2 || edNumber === 3 || edNumber === 4 ? "а" : "";
  };
  return (
    <>
      <h1
        style={{ fontSize: 24 }}
        className={count === 0 ? "badge bg-danger m-2" : "badge bg-primary m-2"}
      >
        {count === 0
          ? "Никто с тобой не тусанет"
          : count + " человек" + ending(count) + " тусанет с тобой сегодня"}
      </h1>
    </>
  );
};

SumUser.propTypes = {
  key: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default SumUser;
