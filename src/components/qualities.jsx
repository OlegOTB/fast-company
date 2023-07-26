import React from "react";

const Qualities = (props) => {
  const { qualities } = props;
  const getBageClasses = (color) => {
    return "badge m-2 bg-" + color;
  };
  return qualities.map((qualitie) => (
    <span key={qualitie._id} className={getBageClasses(qualitie.color)}>
      {qualitie.name}
    </span>
  ));
};

export default Qualities;
