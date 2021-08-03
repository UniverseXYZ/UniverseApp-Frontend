import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Input from '../input/Input';
import SelectPrice from '../input/SelectPrice';
import Switch from '../ui-elements/Switch';
import EndDatePicker from '../calendar/EndDatePicker';
import Button from '../button/Button';
import './styles/BundleSellForm.scss';

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

const continueValidationData = (data, setErrorStartPrice, setErrorEndPrice) => {
  const keys = Object.keys(data);
  const checkStartPrice = validationPrice(
    data.startPrice,
    setErrorStartPrice,
    'startPrice',
    data.endPrice
  );
  let checkEndPrice = true;
  if (data.switch.includes('switchEndingPrice')) {
    checkEndPrice = validationPrice(
      data.endPrice,
      setErrorEndPrice,
      'endingPrice',
      data.startPrice
    );
  }
  if (!(checkEndPrice && checkStartPrice)) {
    return false;
  }
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (data[key] === null || data[key] === '' || data[key] === undefined || !data[key]) {
      return false;
    }
  }
  return true;
};

const BundleSellForm = (props) => {
  const { getData } = props;
  const [errorStartPrice, setErrorStartPrice] = useState(false);
  const [errorEndingPrice, setErrorEndingPrice] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [bundleData, setBundleData] = useState({
    startPrice: window.bundleData ? window.bundleData.startPrice : null,
    endPrice: window.bundleData ? window.bundleData.endPrice : null,
    date: window.bundleData ? window.bundleData.date : '',
    priceType: window.bundleData ? window.bundleData.priceType : 'eth',
    bundleName: window.bundleData ? window.bundleData.bundleName : null,
    bundleDescription: window.bundleData ? window.bundleData.bundleDescription : null,
    switch: window.bundleData ? window.bundleData.switch : [],
    buyerAddress: window.bundleData ? window.bundleData.buyerAddres : null,
  });
  const [switchEndingPrice, setSwitchEndingPrice] = useState(
    bundleData.switch.includes('switchEndingPrice')
  );
  const [switchScheduleFutureTime, setSwitchScheduleFutureTime] = useState(
    bundleData.switch.includes('switchScheduleFutureTime')
  );
  const [switchPrivacy, setSwitchPrivacy] = useState(bundleData.switch.includes('switchPrivacy'));

  useEffect(() => {
    const copyData = { ...bundleData };
    if (!bundleData.switch.includes('switchEndingPrice')) {
      delete copyData.endPrice;
    }
    if (!bundleData.switch.includes('switchPrivacy')) {
      delete copyData.buyerAddress;
    }
    if (
      !bundleData.switch.includes('switchEndingPrice') &&
      !bundleData.switch.includes('switchScheduleFutureTime')
    ) {
      delete copyData.date;
    }
    const valid = continueValidationData(copyData, setErrorStartPrice, setErrorEndingPrice);
    if (valid) {
      getData(copyData);
    } else getData(null);
    window.bundleData = copyData;
  }, [bundleData]);

  return (
    <div className="bundle--sell--form--container">
      <h3 className="form--title">Bundle settings</h3>
      <div className="form--block--parent">
        {/* bundle name */}
        <div className="row row--bundle--name">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Bundle Name</h5>
              <Input
                type="text"
                placeholder="Enter name"
                value={bundleData.bundleName ? bundleData.bundleName : ''}
                onChange={(e) => setBundleData({ ...bundleData, bundleName: e.target.value })}
              />
            </div>
          </div>
        </div>
        {/* bundle description */}
        <div className="row row--bundle--description">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">
                Bundle description (optional)
                <span className="characters--used">0 of 500 characters used</span>
              </h5>
              <Input
                type="text"
                placeholder="Bundle description"
                value={bundleData.bundleDescription ? bundleData.bundleDescription : ''}
                onChange={(e) =>
                  setBundleData({ ...bundleData, bundleDescription: e.target.value })
                }
              />
            </div>
          </div>
        </div>
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
                value={bundleData.startPrice ? bundleData.startPrice : ''}
                onChange={(e) => setBundleData({ ...bundleData, startPrice: e.target.value })}
                onBlur={() =>
                  validationPrice(
                    bundleData.startPrice,
                    setErrorStartPrice,
                    'startPrice',
                    bundleData.endPrice
                  )
                }
                error={errorStartPrice}
              />
              <SelectPrice
                value={bundleData.priceType}
                onChange={(e) => setBundleData({ ...bundleData, priceType: e })}
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
                  const switchArray = bundleData.switch;
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
                  setBundleData({ ...bundleData, switch: switchArray });
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
                      value={bundleData.endPrice ? bundleData.endPrice : ''}
                      onChange={(e) => setBundleData({ ...bundleData, endPrice: e.target.value })}
                      onBlur={() =>
                        validationPrice(
                          bundleData.endPrice,
                          setErrorEndingPrice,
                          'endingPrice',
                          bundleData.startPrice
                        )
                      }
                      error={errorEndingPrice}
                    />
                    <SelectPrice
                      value={bundleData.priceType}
                      onChange={(e) => setBundleData({ ...bundleData, priceType: e })}
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
                      value={bundleData.date}
                      onChange={(e) => setBundleData({ ...bundleData, date: e })}
                      title="Expiration date"
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
                    const switchArray = bundleData.switch;
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
                    setBundleData({ ...bundleData, switch: switchArray });
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
                        value={bundleData.date}
                        onChange={(e) => setBundleData({ ...bundleData, date: e })}
                        title="Schedule future time"
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
                  const switchArray = bundleData.switch;
                  if (e && !switchArray.includes('switchPrivacy')) {
                    switchArray.push('switchPrivacy');
                  } else {
                    switchArray.splice(switchArray.indexOf('switchPrivacy'), 1);
                  }
                  setBundleData({ ...bundleData, switch: switchArray });
                }}
              />
            </div>
          </div>
          {switchPrivacy && (
            <Animated animationIn="fadeIn">
              <div className="buyer--address">
                <Input
                  value={bundleData.buyerAddres ? bundleData.buyerAddres : ''}
                  onChange={(e) => setBundleData({ ...bundleData, buyerAddres: e.target.value })}
                  placeholder="Buyer address"
                  type="text"
                />
              </div>
            </Animated>
          )}
        </div>
      </div>
    </div>
  );
};

BundleSellForm.propTypes = {
  getData: PropTypes.func,
};

BundleSellForm.defaultProps = {
  getData: () => {},
};

export default BundleSellForm;
