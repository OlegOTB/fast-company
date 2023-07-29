import React from "react";

const Bookmark = (props) => {
  const bokmarkClass = () =>
    props.bookmark ? "bi bi-bookmark-check" : "bi bi-bookmark";
  return (
    <>
      <i className={bokmarkClass()} onClick={() => props.onMark(props.id)}></i>
    </>
  );
};

export default Bookmark;
