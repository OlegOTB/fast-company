import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ onMark, id, bookmark }) => {
  const bokmarkClass = () =>
    bookmark ? "bi bi-bookmark-check" : "bi bi-bookmark";
  // console.log(bookmark);
  return (
    <>
      <i className={bokmarkClass()} onClick={() => onMark(id)}></i>
    </>
  );
};

Bookmark.propTypes = {
  onMark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired
};

export default Bookmark;
