import React from "react";

const Bookmark = (props) => {
  if (props.bookmark)
    return (
      <>
        <i
          class="bi bi-bookmark-check"
          onClick={() => props.onMark(props.id)}
        ></i>
      </>
    );
  return (
    <>
      <i class="bi bi-bookmark" onClick={() => props.onMark(props.id)}></i>
    </>
  );
};

export default Bookmark;
