import React from "react";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import PropTypes from "prop-types";

const Table = ({ count, onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHead
            key="tableHead"
            visible={Boolean(count)}
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
          />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  count: PropTypes.number.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
};

export default Table;
