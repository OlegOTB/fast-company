import React from "react";

const SumUser = (props) => {
  const ending = (number) => {
    const edNumber = number > 4 && number < 22 ? number : number % 10;
    return edNumber === 2 || edNumber === 3 || edNumber === 4 ? "а" : "";
  };
  return (
    <>
      <h1
        style={{ fontSize: 24 }}
        className={
          props.count === 0 ? "badge bg-danger m-2" : "badge bg-primary m-2"
        }
      >
        {props.count === 0
          ? "Никто с тобой не тусанет"
          : props.count +
            " человек" +
            ending(props.count) +
            " тусанет с тобой сегодня"}
      </h1>
    </>
  );
};

export default SumUser;
