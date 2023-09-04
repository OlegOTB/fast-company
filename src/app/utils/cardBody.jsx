import PropTypes from "prop-types";
import _ from "lodash";

export function cardBody(data, columns) {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };
  const acc = {};
  Object.keys(columns).map((column) =>
    Object.assign(acc, { [column]: renderContent(data, column) })
  );
  return acc;
}

export default cardBody;
cardBody.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};
