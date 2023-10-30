import React from "react";
import PropTypes from "prop-types";
import {
  getQualitiesLoadingStatus,
  getQualitieById
} from "../../../store/qualities";
import { useSelector } from "react-redux";
// import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ qualitiesId }) => {
  if (
    qualitiesId === null ||
    qualitiesId === undefined ||
    qualitiesId.length === 0
  ) {
    return;
  }
  const isLoading = useSelector(getQualitiesLoadingStatus());
  // const { isLoading, getQualities } = useQualities();
  const getBageClasses = (color) => {
    return "badge m-2 bg-" + color;
  };
  if (!isLoading) {
    return qualitiesId.map((id) => {
      // <span key={qualitie._id} className={getBageClasses(qualitie.color)}>
      //   {qualitie.name}
      // </span>
      // const qualitie = getQualities(id);
      const qualitie = useSelector(getQualitieById(id));
      return (
        <span key={id} className={getBageClasses(qualitie.color)}>
          {qualitie.name}
        </span>
      );
    });
  } else return "loading...";
};

Qualities.propTypes = {
  qualitiesId: PropTypes.array.isRequired
};

export default Qualities;
