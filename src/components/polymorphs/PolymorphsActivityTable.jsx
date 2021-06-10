import React from 'react';
import PropTypes from 'prop-types';

const PolymorphsActivityTable = (props) => {
  const { tableHead, className, rows } = props;
  return (
    <table className={`table ${className}`} rules="none" cellPadding="0" cellSpacing="0">
      {!!tableHead.length && (
        <thead>
          <tr>
            {tableHead.map((elem, index) => (
              <th className={elem.className} key={index.toString()}>
                {elem.labelText}
              </th>
            ))}
          </tr>
        </thead>
      )}
      {rows && <tbody>{rows}</tbody>}
    </table>
  );
};

PolymorphsActivityTable.propTypes = {
  tableHead: PropTypes.arrayOf(
    PropTypes.shape({ labelText: PropTypes.string, className: PropTypes.string })
  ),
  className: PropTypes.string,
  rows: PropTypes.node,
};

PolymorphsActivityTable.defaultProps = {
  tableHead: [],
  className: '',
  rows: null,
};

export default PolymorphsActivityTable;
