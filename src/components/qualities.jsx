import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
  const getBageClasses = (color) => {
    return "badge m-2 bg-" + color;
  };
  return qualities.map((qualitie) => (
    <span key={qualitie._id} className={getBageClasses(qualitie.color)}>
      {qualitie.name}
    </span>
  ));
};

Qualities.propTypes = {
  qualities: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Qualities;
