import React from "react";
// import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from "../../store/profession";

const Profession = ({ id }) => {
  // const { isLoading, getProfession } = useProfessions();
  // const prof = getProfession(id);
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const prof = useSelector(getProfessionById(id));
  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else return "loading...";
};

Profession.propTypes = {
  id: PropTypes.string.isRequired
};

export default Profession;
