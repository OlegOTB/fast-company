import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const CardBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    const buff = columns[column].includeName ? columns[column].name + ": " : "";
    return buff + _.get(item, columns[column].path);
  };

  return (
    <div>
      {Object.keys(columns).map((column) => (
        <div
          key={column}
          className={columns[column].class ? columns[column].class : ""}
        >
          {renderContent(data, column)}
        </div>
      ))}
    </div>
  );
};

export default CardBody;
CardBody.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};
