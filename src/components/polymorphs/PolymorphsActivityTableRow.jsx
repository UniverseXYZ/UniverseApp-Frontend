import React from 'react';
import PropTypes from 'prop-types';

const PolymorphsActivityTableRow = (props) => {
  const { data, className } = props;
  return (
    <tr className={`row ${className}`}>
      <td className="td--name">{data.name}</td>
      <td className="td--skin">{data.skin}</td>
      <td className="td--event">{data.event}</td>
      <td className="td--price">
        <span className="price--eth">{data.priceETH} ETH</span>
        <span className="price--usd">({data.priceUSD} USD)</span>
      </td>
    </tr>
  );
};
PolymorphsActivityTableRow.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      skin: PropTypes.string,
      event: PropTypes.string,
      priceETH: PropTypes.string,
      priceUSD: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
};

PolymorphsActivityTableRow.defaultProps = {
  className: '',
};

export default PolymorphsActivityTableRow;
