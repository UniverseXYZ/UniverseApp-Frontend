import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import currencyIcon from '../../assets/images/eth-icon-new.svg';
import calendarIcon from '../../assets/images/calendar-small.svg';
import congratsIcon from '../../assets/images/bid-submitted.png';
import SmallCalendar from '../calendar/SmallCalendar.jsx';

const NFTMakeOffer = ({ close }) => {
  const [bidAmount, setBidAmount] = useState(0.25);
  const [loading, setLoading] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const d = new Date();
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
  const [offerExpirationDate, setOfferExpirationDate] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
  });

  const handleClick = () => {
    setLoading('processing');
    setTimeout(() => {
      setLoading('done');
    }, 2000);
  };

  return (
    <div className="nft--place--bid--popup">
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {!loading ? (
        <div className="step1">
          <h1 className="title">Make an offer</h1>
          <div className="form">
            <label className="price">Price</label>
            <div className={`input--field ${!bidAmount ? 'error' : ''}`}>
              <div className="currency--dropdown">
                <div>
                  <img src={currencyIcon} alt="Currency" />
                  <span className="currency">ETH</span>
                  <img className="arrow" src={arrowDown} alt="arrow" />
                </div>
              </div>
              <div>
                <input
                  className="input--field--item"
                  type="number"
                  placeholder="Amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <div className="convert--to--dollar">
                {!bidAmount ? '$ 0.00' : `$ ${(bidAmount * 2156).toFixed(2)}`}
              </div>
            </div>
            {!bidAmount && <p className="error">This field is required</p>}
            <label className="offer--expiration">Offer Expiration</label>
            <div className="input--field diff">
              <div className="selected--date">
                {`${offerExpirationDate.month} ${offerExpirationDate.day}, ${offerExpirationDate.year}, `}
                <span>{`${offerExpirationDate.hours}:${offerExpirationDate.minutes} EST`}</span>
              </div>
              <div
                className="calendar--icon"
                aria-hidden="true"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <img src={calendarIcon} alt="Calendar" />
              </div>
              {showCalendar && (
                <SmallCalendar
                  showCalendar={showCalendar}
                  setShowCalendar={setShowCalendar}
                  monthNames={monthNames}
                  offerExpirationDate={offerExpirationDate}
                  setOfferExpirationDate={setOfferExpirationDate}
                />
              )}
            </div>
            <div className="checkout__checkbox">
              <div className="custom__checkbox">
                <label htmlFor="toggleSelection">
                  <input
                    id="toggleSelection"
                    type="checkbox"
                    value={checkboxValue}
                    onChange={() => setCheckboxValue(!checkboxValue)}
                  />
                  <i />
                </label>
              </div>
              <p>
                By checking this box, I agree to Universe&#39;s <span>Terms of Service</span>
              </p>
            </div>
            <div className="actions">
              <Button
                className="light-button"
                disabled={!bidAmount || !checkboxValue}
                onClick={handleClick}
              >
                Place Bid
              </Button>
              <Button className="light-border-button">Convert ETH</Button>
            </div>
          </div>
        </div>
      ) : loading === 'processing' ? (
        <div className="step2">
          <h1 className="title">Making an offer...</h1>
          <p className="desc">
            Just accept the signature request and wait for us to process your offer
          </p>
          <div className="loading--div">
            <div className="lds-roller">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      ) : (
        <div className="step3">
          <img className="check--icon" src={congratsIcon} alt="Congrats" />
          <h1 className="title">Congratulations!</h1>
          <p className="desc">
            You have successfully made an offer for
            <b>
              <img src={currencyIcon} alt="Currency" /> {bidAmount}
            </b>
          </p>
          <p className="desc">
            that ends on
            <b>
              &nbsp;
              {`${offerExpirationDate.month} ${offerExpirationDate.day}, ${offerExpirationDate.year}, ${offerExpirationDate.hours}:${offerExpirationDate.minutes} EST`}
            </b>
          </p>
          <Button className="light-border-button" onClick={close}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

NFTMakeOffer.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NFTMakeOffer;
