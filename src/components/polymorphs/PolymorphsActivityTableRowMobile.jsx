import React from 'react';
import PropTypes from 'prop-types';
import ScrambleTypeImg from '../../assets/images/eventTypeScramble.svg';
import MintTypeImg from '../../assets/images/eventTypeMint.svg';
import TradeTypeImg from '../../assets/images/eventTypeTrade.svg';
import ListedTypeImg from '../../assets/images/eventTypeListed.svg';
import TransferTypeImg from '../../assets/images/eventTypeTransfer.svg';
import './styles/PolymorphsActivityTableRowMobile.scss';

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

const PolymorphsActivityTableRowMobile = (props) => {
  const { data, className } = props;
  const { image, name, skin, event, priceETH, priceUSD } = data;
  return (
    <div className={`item table--row--mobile ${className}`}>
      <div className="left--block image--block">
        <div>
          <img alt="img" src={image} />
        </div>
      </div>
      <div className="center--block data--block">
        <p className="name--block">
          {name} . <span>{skin}</span>
        </p>
        <div className="event--block">
          <div className="event--type--icon-block">
            <img alt="img" src={getTypeImage(event)} />
          </div>
          <p className="event--text">{event}</p>
        </div>
      </div>
      <div className="right--block price--block">
        <p className="price--eth">{priceETH} ETH</p>
        <p className="price--usd">${priceUSD}</p>
      </div>
    </div>
  );
};

PolymorphsActivityTableRowMobile.propTypes = {
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

PolymorphsActivityTableRowMobile.defaultProps = {
  className: '',
};

export default PolymorphsActivityTableRowMobile;
