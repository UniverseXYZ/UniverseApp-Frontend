import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Button from '../button/Button';
import ethIcon from '../../assets/images/eth-marketplace-icon.svg';
import './styles/SummaryBlock.scss';

const priceTypes = [
  { type: 'eth', icon: ethIcon },
  { type: 'dai', icon: ethIcon },
  { type: 'usdc', icon: ethIcon },
  { type: 'bond', icon: ethIcon },
  { type: 'snx', icon: ethIcon },
];

const getText = (formType, startPrice) => {
  if (formType === 'endingPrice') {
    return 'Your item will start at';
  }
  return 'Your item will be listed for';
};

const SummaryBlock = (props) => {
  const { startPrice, startPriceType, endPrice, endPriceType, endPriceDate, formType } = props;
  return (
    <div className="summary--block--parent">
      <Animated animationIn="fadeIn">
        <div className="invoce--block">
          <h5>Summary</h5>
          <div className="listing--block">
            <h5>Listing </h5>
            {console.log(startPrice)}
            {startPrice !== '' && (
              <p>
                {getText(formType)}
                <span>
                  <img
                    src={priceTypes.find((elem) => elem.type === startPriceType).icon}
                    alt="img"
                  />
                  {!!startPrice && startPrice}
                </span>
              </p>
            )}
            {!!endPrice && formType === 'endingPrice' ? (
              <p>
                End at
                <span>
                  <img src={priceTypes.find((elem) => elem.type === endPriceType).icon} alt="img" />
                  {!!endPrice && endPrice}
                </span>
                on
                <span>{endPriceDate}</span>
              </p>
            ) : (
              <></>
            )}
            <Button type="button" disabled={!startPrice} className="light-button">
              Post your listing
            </Button>
          </div>
          <div className="fees--block">
            <h5>Fees</h5>
            <p>Listing is free! At the time of the sale, the following fees will be deducted. </p>
            <div className="invoce--bottom--block">
              <div className="row--one">
                <p className="left--paragraph">To Universe</p>
                <p className="center--paragraph" />
                <p className="right--paragraph">2.5%</p>
              </div>
              <div className="row--two">
                <p className="left--paragraph">To Colletion name</p>
                <p className="center--paragraph" />
                <p className="right--paragraph">10%</p>
              </div>
              <div className="row--total">
                <p className="left--paragraph">Total</p>
                <p className="center--paragraph" />
                <p className="right--paragraph">12.5%</p>
              </div>
            </div>
          </div>
        </div>
      </Animated>
    </div>
  );
};

SummaryBlock.propTypes = {
  startPrice: PropTypes.string,
  startPriceType: PropTypes.string,
  endPrice: PropTypes.string,
  endPriceType: PropTypes.string,
  endPriceDate: PropTypes.string,
  formType: PropTypes.string,
};

SummaryBlock.defaultProps = {
  startPrice: '',
  startPriceType: 'eth',
  endPrice: '',
  endPriceType: 'eth',
  endPriceDate: '',
  formType: null,
};

export default SummaryBlock;
