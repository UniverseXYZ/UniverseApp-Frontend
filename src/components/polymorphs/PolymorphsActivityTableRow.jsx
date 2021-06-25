import React from 'react';
import PropTypes from 'prop-types';
import ScrambleTypeImg from '../../assets/images/eventTypeScramble.svg';
import MintTypeImg from '../../assets/images/eventTypeMint.svg';
import TradeTypeImg from '../../assets/images/eventTypeTrade.svg';
import ListedTypeImg from '../../assets/images/eventTypeListed.svg';
import TransferTypeImg from '../../assets/images/eventTypeTransfer.svg';

const getTypeImage = (type) => {
  if (type === 'scramble') {
    return ScrambleTypeImg;
  }
  if (type === 'mint') {
    return MintTypeImg;
  }
  if (type === 'trade') {
    return TradeTypeImg;
  }
  if (type === 'listed') {
    return ListedTypeImg;
  }
  return TransferTypeImg;
};

const PolymorphsActivityTableRow = (props) => {
  const { data, className } = props;

  return (
    <tr className={`row ${className}`}>
      <td className="td--image">
        <div className="polymorph--table--image--block">
          <img alt="img" src={data.image} />
        </div>
      </td>
      <td className="td--name">
        <span>{data.name}</span>
      </td>
      <td className="td--skin">
        <span>{data.skin}</span>
      </td>
      <td className="td--event">
        <span>
          <div className="flex--event--block">
            <div className={`event--type event--type--${data.event}`}>
              <img alt="img" src={getTypeImage(data.event)} />
            </div>
            <div className="text--event">{data.event}</div>
          </div>
        </span>
      </td>
      <td className="td--price">
        <span className="price--eth">{data.priceETH} ETH</span>
        <span className="price--usd"> (${data.priceUSD})</span>
      </td>
    </tr>
  );
};
PolymorphsActivityTableRow.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    skin: PropTypes.string,
    event: PropTypes.string,
    priceETH: PropTypes.string,
    priceUSD: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

PolymorphsActivityTableRow.defaultProps = {
  className: '',
};

export default PolymorphsActivityTableRow;
