import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";

const UserComment = ({ name, onDelete, _id, content, createdAt }) => {
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {name}{" "}
                    <span className="small">{displayDate(createdAt)}</span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onDelete(_id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserComment.propTypes = {
  name: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired
};

export default UserComment;
