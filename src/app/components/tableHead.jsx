import React from "react";
import PropTypes from "prop-types";

const TableHead = ({ visible, onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    // for (let i = 0; i < columns.length; i++) columns[i].addChar = undefined;
    if (selectedSort.path === item) {
      onSort({
        path: item,
        order: selectedSort.order === "asc" ? "desc" : "asc",
        addChar: selectedSort.addChar === "up" ? "down" : "up"
      });
    } else {
      onSort({ path: item, order: "asc", addChar: "up" });
    }
  };
  const addCharFunc = (buff) => {
    return buff ? <i className={"bi bi-caret-" + buff + "-fill"}></i> : "";
  };
  return (
    <>
      <thead hidden={visible ? "" : "hidden"}>
        <tr>
          {Object.keys(columns).map((column) => (
            <th
              key={column}
              onClick={
                columns[column].path
                  ? () => handleSort(columns[column].path)
                  : undefined
              }
              role={columns[column].path && "button"}
              scope="col"
            >
              <span>{columns[column].name}</span>
              {selectedSort.path && columns[column].path === selectedSort.path
                ? addCharFunc(selectedSort.addChar)
                : ""}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

TableHead.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHead;
