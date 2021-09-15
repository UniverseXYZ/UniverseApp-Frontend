import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import Input from '../input/Input';
import SelectPrice from '../input/SelectPrice';
import Switch from '../ui-elements/Switch';
import EndDatePicker from '../calendar/EndDatePicker';
import Button from '../button/Button';
import './styles/DutchAuctionSettingsForm.scss';

const validationPrice = (price, setPriceError, type, checkPrice) => {
  const reg = /^\d+$/;
  if (price?.[0] === '0' && price?.[1] !== '.') {
    setPriceError('Invalid price');
    return false;
  }
  if (!reg.test(price) && price?.[1] !== '.') {
    setPriceError('Invalid price');
    return false;
  }
  if (type === 'endingPrice') {
    if (+price > +checkPrice) {
      setPriceError('Ending price cannot be greater than starting price.');
      return false;
    }
  }
  setPriceError(false);
  return true;
};

const dataStepsVerification = (data) => {
  const keys = Object.keys(data);
  let startPrice = false;
  let endPrice = false;
  if (data.startPrice) {
    startPrice = validationPrice(data.startPrice, () => {}, 'startPrice', data.endPrice);
  }
  if (data.endPrice) {
    endPrice = validationPrice(data.endPrice, () => {}, 'endingPrice', data.startPrice);
  } else endPrice = true;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!data[key]) return false;
  }
  return startPrice && endPrice;
};

const DutchAuctionSettingsForm = (props) => {
  const [errorStartPrice, setErrorStartPrice] = useState(false);
  const [errorEndingPrice, setErrorEndingPrice] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const history = useHistory();
  const { data, setData } = props;
  const [dutchData, setDutchData] = useState({
    priceType: window.dutchData ? window.dutchData.priceType : 'eth',
    startPrice: window.dutchData ? window.dutchData.startPrice : null,
    endPrice: window.dutchData ? window.dutchData.endPrice : null,
    switch: window.dutchData ? window.dutchData.switch : [],
    buyerAddres: window.dutchData ? window.dutchData.buyerAddres : null,
    date: window.dutchData ? window.dutchData.date : '',
  });
  const [switchEndingPrice, setSwitchEndingPrice] = useState(
    dutchData.switch.includes('switchEndingPrice')
  );
  const [switchScheduleFutureTime, setSwitchScheduleFutureTime] = useState(
    dutchData.switch.includes('switchScheduleFutureTime')
  );
  const [switchPrivacy, setSwitchPrivacy] = useState(dutchData.switch.includes('switchPrivacy'));
  useEffect(() => {
    if (window.dutchData) {
      setDutchData({ ...window.dutchData });
    }
  }, []);

  useEffect(() => {
    if (!switchPrivacy) delete dutchData.buyerAddres;
    else if (!dutchData.buyerAddres) dutchData.buyerAddres = null;
    if (!switchEndingPrice) delete dutchData.endPrice;
    else if (!dutchData.endPrice) dutchData.endPrice = null;
    if (!dutchData.switch.length) delete dutchData.date;
    else if (!dutchData.switch.includes('switchPrivacy') && !dutchData.date) dutchData.date = '';
    const verif = dataStepsVerification(dutchData);
    setContinueDisabled(!verif);
    window.dutchData = { ...dutchData };
  }, [dutchData]);

  return (
    <div className="dutch--auction--settings--form">
      <h3 className="form--title">Dutch auction settings</h3>
      <div className="form--block--parent">
        {/* price row */}
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Price</h5>
              <p className="row--description">
                Will be on sale until you transfer this item or cancel it.
              </p>
            </div>
            <div className="right--block">
              <Input
                type="number"
                placeholder="Amount"
                value={dutchData.startPrice ? dutchData.startPrice : ''}
                onChange={(e) => setDutchData({ ...dutchData, startPrice: e.target.value })}
                // error={validationPrice(dutchData.startPrice)}
                onBlur={() =>
                  validationPrice(
                    dutchData.startPrice,
                    setErrorStartPrice,
                    'startPrice',
                    dutchData.endPrice
                  )
                }
                error={errorStartPrice}
              />
              <SelectPrice
                value={dutchData.priceType}
                onChange={(e) => setDutchData({ ...dutchData, priceType: e })}
              />
            </div>
          </div>
        </div>
        {/* ending price  */}
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Include ending price</h5>
              {!switchEndingPrice && (
                <p className="row--description">
                  Adding an ending price will allow this listing to expire, or for the price to be
                  reduced untill a buyer is found.
                </p>
              )}
            </div>
            <div className="right--block right--switch">
              <Switch
                value={switchEndingPrice}
                onChange={(e) => {
                  setSwitchEndingPrice(e);
                  const switchArray = dutchData.switch;
                  if (e && !switchArray.includes('switchEndingPrice')) {
                    setSwitchScheduleFutureTime(false);
                    switchArray.push('switchEndingPrice');
                    const switchScheduleTimeIndex = switchArray.indexOf('switchScheduleFutureTime');
                    if (switchScheduleTimeIndex !== -1) {
                      switchArray.splice(switchScheduleTimeIndex, 1);
                    }
                  } else {
                    switchArray.splice(switchArray.indexOf('switchEndingPrice'), 1);
                  }
                  setDutchData({ ...dutchData, switch: switchArray });
                }}
              />
            </div>
          </div>
          {switchEndingPrice && (
            <Animated animationIn="fadeIn">
              <div className="ending--price--content">
                <div className="row--child">
                  <div className="left--block">
                    <h5 className="row--title">Ending price</h5>
                    <p className="row--description">
                      Must be less than or equal to the starting price. The price will progress
                      linearly to this amount until the expiration date.
                    </p>
                  </div>
                  <div className="right--block">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={dutchData.endPrice ? dutchData.endPrice : ''}
                      onChange={(e) => setDutchData({ ...dutchData, endPrice: e.target.value })}
                      onBlur={() =>
                        validationPrice(
                          dutchData.endPrice,
                          setErrorEndingPrice,
                          'endingPrice',
                          dutchData.startPrice
                        )
                      }
                      error={errorEndingPrice}
                    />
                    <SelectPrice
                      value={dutchData.priceType}
                      onChange={(e) => setDutchData({ ...dutchData, priceType: e })}
                    />
                  </div>
                </div>
                <div className="row--child">
                  <div className="left--block">
                    <h5 className="row--title">Expiration date</h5>
                    <p className="row--description">
                      Your listing will automatically end at this time. No need to cancel it!
                    </p>
                  </div>
                  <div className="right--block">
                    <EndDatePicker
                      value={dutchData.date}
                      onChange={(e) => setDutchData({ ...dutchData, date: e })}
                      title="Schedule for a future time"
                    />
                  </div>
                </div>
              </div>
            </Animated>
          )}
        </div>
        {/* schedule future time */}
        {!switchEndingPrice && (
          <div className="row">
            <div className="row--child">
              <div className="left--block">
                <h5 className="row--title">Schedule for a future time</h5>
                <p className="row--description">
                  You can schedle this listing to only be buyable at a future date.
                </p>
              </div>
              <div className="right--block right--switch">
                <Switch
                  value={switchScheduleFutureTime}
                  onChange={(e) => {
                    setSwitchScheduleFutureTime(e);
                    const switchArray = dutchData.switch;
                    if (e && !switchArray.includes('switchScheduleFutureTime')) {
                      setSwitchEndingPrice(false);
                      switchArray.push('switchScheduleFutureTime');
                      const endPriceSwitchIndex = switchArray.indexOf('switchEndingPrice');
                      if (endPriceSwitchIndex !== -1) {
                        switchArray.splice(endPriceSwitchIndex, 1);
                      }
                    } else {
                      switchArray.splice(switchArray.indexOf('switchScheduleFutureTime'), 1);
                    }
                    setDutchData({ ...dutchData, switch: switchArray });
                  }}
                />
              </div>
            </div>
            {switchScheduleFutureTime && (
              <Animated animationIn="fadeIn">
                <div className="schedule--future--time--content">
                  <div className="row--child">
                    <div className="left--block">
                      <h5 className="row--title">Select time and date</h5>
                      <p className="row--description">
                        You can schedle this listing to only be buyable at a future date.
                      </p>
                    </div>
                    <div className="right--block">
                      <EndDatePicker
                        value={dutchData.date}
                        onChange={(e) => setDutchData({ ...dutchData, date: e })}
                      />
                    </div>
                  </div>
                </div>
              </Animated>
            )}
          </div>
        )}
        {/* privacy */}
        <div className="row row--privacy">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Privacy</h5>
              <p className="row--description">
                You can keep your listing public, or you can specify one address that’s allowed to
                buy it.
              </p>
            </div>
            <div className="right--block right--switch">
              <Switch
                value={switchPrivacy}
                onChange={(e) => {
                  setSwitchPrivacy(e);
                  const switchArray = dutchData.switch;
                  if (e && !switchArray.includes('switchPrivacy')) {
                    switchArray.push('switchPrivacy');
                  } else {
                    switchArray.splice(switchArray.indexOf('switchPrivacy'), 1);
                  }
                  setDutchData({ ...dutchData, switch: switchArray });
                }}
              />
            </div>
          </div>
          {switchPrivacy && (
            <Animated animationIn="fadeIn">
              <div className="buyer--address">
                <Input
                  value={dutchData.buyerAddres ? dutchData.buyerAddres : ''}
                  onChange={(e) => setDutchData({ ...dutchData, buyerAddres: e.target.value })}
                  placeholder="Buyer address"
                  type="text"
                />
              </div>
            </Animated>
          )}
        </div>
      </div>
      <div className="button--group">
        <Button
          className="light-border-button"
          onClick={() => {
            history.push('/nft-marketplace/select-method');
          }}
        >
          Back
        </Button>
        <Button
          className="light-button"
          disabled={continueDisabled}
          onClick={() => {
            const verification = dataStepsVerification(window.dutchData);
            if (verification) {
              setData({ ...data, settings: { ...window.dutchData } });
              history.push('/nft-marketplace/summary');
              window.clickNextDutchToSummary = true;
            }
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

DutchAuctionSettingsForm.propTypes = {
  data: PropTypes.shape({
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({}),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default DutchAuctionSettingsForm;
