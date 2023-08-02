import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  const liClass = (item) => {
    let buff = "list-group-item";
    if (item === selectedItem) buff += " active";
    return buff;
  };
  const itemObj = (items) => {
    if (typeof items === "object") return Object.values(items);
    else return items;
  };
  return (
    <ul className="list-group">
      {itemObj(items).map((item) => (
        <li
          key={item[valueProperty]}
          className={liClass(item)}
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupList;
