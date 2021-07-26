import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import ethIcon from '../../assets/images/marketplace/eth-icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import './styles/Summary.scss';

const mapPriceType = [
  { type: 'eth', icon: ethIcon },
  { type: 'dai', icon: daiIcon },
  { type: 'usdc', icon: usdcIcon },
  { type: 'bond', icon: bondIcon },
  { type: 'snx', icon: snxIcon },
];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const changeDateFormat = (date) => {
  const dat = new Date(date);
  const month = dat.getMonth();
  const day = dat.getDate();
  const year = dat.getFullYear();
  const hours = dat.getHours();
  const minutes = dat.getMinutes();
  return `${monthNames[month]} ${day}, ${year}, ${hours}:${minutes} EST`;
};

const calculatePricePercent = (price, percent) => {
  const perc = (price * percent) / 100;
  return (price - perc).toFixed(1);
};

const getListedText = (data) => {
  const { selectedMethod, settings } = data;
  const switchArray = settings.switch;
  const { priceType, startPrice } = settings;
  if (selectedMethod === 'dutch') {
    if (!switchArray?.length) {
      return (
        <p className="listed--paragraph">
          Your item will be listed for
          <img src={mapPriceType.find((elem) => elem.type === priceType).icon} alt="img" />
          <span className="price">{startPrice}</span>
        </p>
      );
    }
    if (switchArray?.includes('switchEndingPrice')) {
      return (
        <p className="listed--paragraph">
          Your item will start at
          <img src={mapPriceType.find((elem) => elem.type === priceType).icon} alt="img" />
          <span className="price">{startPrice}</span>
          <br />
          End at
          <img src={mapPriceType.find((elem) => elem.type === priceType).icon} alt="img" />
          <span className="price">{settings.endPrice}</span>
          on
          <span className="date">{changeDateFormat(settings.date)}</span>
        </p>
      );
    }
    if (switchArray?.includes('switchScheduleFutureTime')) {
      return (
        <p className="listed--paragraph">
          Your item will be listed for
          <img src={mapPriceType.find((elem) => elem.type === priceType).icon} alt="img" />
          <span className="price">{startPrice}</span>
          <br />
          Scheduled on
          <span className="date">{changeDateFormat(settings.date)}</span>
        </p>
      );
    }
  }
  if (selectedMethod === 'english') {
    return (
      <p className="listed--paragraph">
        Your item will be auctioned. The highest bidder will win on
        <span className="date">{changeDateFormat(settings.date)}</span>
        as long as their bid is at least
        <img src={mapPriceType.find((elem) => elem.type === priceType).icon} alt="img" />
        <span className="price">{settings.startPrice}</span>
      </p>
    );
  }
  return <p />;
};

const Summary = (props) => {
  const history = useHistory();
  const [toUniverse] = useState(2.5);
  const [toCreator] = useState(10);
  const [totalPercent] = useState(toUniverse + toCreator);
  const { nftImage, data } = props;
  const { settings } = data;
  const { priceType, startPrice } = settings;
  return (
    <div className="summary--parent--block">
      <h3 className="section--title">Summary</h3>
      <div className="summary--content--block">
        <div className="nft--image--block">
          <img src={nftImage} alt="img" />
        </div>
        <div className="right--block">
          <div className="listing--row">
            <h5 className="listing--title">Listing</h5>
            {getListedText(data)}
          </div>
          <div className="fees--row">
            <h5 className="listing--title">Fees</h5>
            <p className="fees--desc">
              Listing is free! At the time of the sale, the following fees will be deducted.
            </p>
            <div className="fees--percent--block">
              <div className="to--universe--row">
                <p>To Universe</p>
                <div />
                <p className="percent--value">{toUniverse}%</p>
              </div>
              <div className="to--creator--row">
                <p>To Creator</p>
                <div />
                <p className="percent--value">{toCreator}%</p>
              </div>
              <div className="total--row">
                <p>Total</p>
                <div />
                <p className="percent--value">{totalPercent}%</p>
              </div>
            </div>
          </div>
          <div className="will--receive--row">
            <p className="listing--title">
              You will receive:
              <span className="price--receive">
                <img src={mapPriceType.find((elem) => elem.type === priceType).icon} alt="img" />
                {calculatePricePercent(startPrice, totalPercent)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="button--group">
        <Button
          className="light-border-button"
          onClick={() => history.push('/nft-marketplace/settings')}
        >
          Back
        </Button>
        <Button className="light-button">Post your listing</Button>
      </div>
    </div>
  );
};

Summary.propTypes = {
  nftImage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({
      startPrice: PropTypes.string,
      priceType: PropTypes.string,
    }),
  }),
};

Summary.defaultProps = {
  data: {
    selectedMethod: '',
    settings: {
      startPrice: '',
      priceType: 'eth',
    },
  },
};

export default Summary;
