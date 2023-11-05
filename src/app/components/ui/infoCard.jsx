import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const InfoCard = ({ id, objUser }) => {
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <div className="col-md-4 mb-3">
      <div className="card mb-3">
        <div className="card-body">
          {currentUserId === id && (
            <Link to={`/Users/${id}/edit`}>
              <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                <i className="bi bi-gear"></i>
              </button>
            </Link>
          )}
          <div className="d-flex flex-column align-items-center text-center position-relative">
            <img
              src={objUser.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="mt-3">
              <h4>{objUser.name}</h4>
              <p className="text-secondary mb-1">{objUser.professions}</p>
              <div className="text-muted">
                <i
                  className="bi bi-caret-down-fill text-primary"
                  role="button"
                ></i>
                <i className="bi bi-caret-up text-secondary" role="button"></i>
                <span className="ms-2">{objUser.rate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Личные качества</span>
          </h5>
          <p className="card-text">{objUser.qualities}</p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card mb-3">
          <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
              <span>Количество встреч</span>
            </h5>

            <h1 className="display-1">{objUser.completedMeetings}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  id: PropTypes.string,
  objUser: PropTypes.object.isRequired
};

export default InfoCard;
