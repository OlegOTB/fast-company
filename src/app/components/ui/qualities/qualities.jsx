import React from "react";
import PropTypes from "prop-types";
import {
  getQualitiesLoadingStatus,
  // getQualitieById,
  getQualities
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
  const qualitiesList = useSelector(getQualities());
  // const { isLoading, getQualities } = useQualities();
  const getBageClasses = (color) => {
    return "badge m-2 bg-" + color;
  };
  return !isLoading
    ? qualitiesId.map((id) => {
        // <span key={qualitie._id} className={getBageClasses(qualitie.color)}>
        //   {qualitie.name}
        // </span>
        // const qualitie = getQualities(id);

        // const qualitie = useSelector(getQualitieById(id));

        const qualitie = qualitiesList.find((p) => p._id === id);
        return (
          <span key={id} className={getBageClasses(qualitie.color)}>
            {qualitie.name}
          </span>
        );
      })
    : "loading...";
};

Qualities.propTypes = {
  qualitiesId: PropTypes.array.isRequired
};

export default Qualities;
