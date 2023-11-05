import { useDispatch, useSelector } from "react-redux";
import {
  //   getDataStaus,
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from "../../../store/users";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/profession";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStausLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    if (isLoggedIn) dispatch(loadUsersList());
  }, [isLoggedIn]);
  if (usersStausLoading) return "Loading...";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default AppLoader;
