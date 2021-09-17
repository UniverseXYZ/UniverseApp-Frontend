import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Input from '../../input/Input';
import SelectPrice from '../../input/SelectPrice';
import Switch from '../../ui-elements/Switch';
import EndDatePicker from '../../calendar/EndDatePicker';
import './SingleItemsDutchAuction.scss';

const BundleDutchAuction = (props) => {
  const [errorStartPrice, setErrorStartPrice] = useState(false);
  const [errorEndingPrice, setErrorEndingPrice] = useState(false);
  const { bundleData, setBundleData } = props;
  const [switchEndingPrice, setSwitchEndingPrice] = useState(
    bundleData.switch.includes('switchEndingPrice')
  );
  const [switchScheduleFutureTime, setSwitchScheduleFutureTime] = useState(
    bundleData.switch.includes('switchScheduleFutureTime')
  );
  const [switchPrivacy, setSwitchPrivacy] = useState(bundleData.switch.includes('switchPrivacy'));

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

  useEffect(() => {
    if (!switchPrivacy) delete bundleData.buyerAddres;
    if (!switchEndingPrice) delete bundleData.endPrice;
    if (!bundleData.switch.length) {
      delete bundleData.endingPriceDate;
      delete bundleData.scheduleDate;
    } else if (!bundleData.switch.includes('switchPrivacy') && !bundleData.endingPriceDate)
      bundleData.endingPriceDate = '';
    else if (!bundleData.switch.includes('switchPrivacy') && !bundleData.scheduleDate)
      bundleData.scheduleDate = '';
    dataStepsVerification(bundleData);
  }, [bundleData]);

  return (
    <div className="dutch--auction--settings--form">
      <h3 className="form--title">Bundle - Dutch auction</h3>
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
                    switchArray.push('switchEndingPrice');
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
                      value={bundleData.endingPriceDate}
                      onChange={(e) => setBundleData({ ...bundleData, endingPriceDate: e })}
                      title="Expiration date"
                    />
                  </div>
                </div>
              </div>
            </Animated>
          )}
        </div>
        {/* schedule future time */}
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
                    switchArray.push('switchScheduleFutureTime');
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
                      value={bundleData.scheduleDate}
                      onChange={(e) => setBundleData({ ...bundleData, scheduleDate: e })}
                      title="Select time and date"
                    />
                  </div>
                </div>
              </div>
            </Animated>
          )}
        </div>
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
                  value={bundleData.buyerAddress ? bundleData.buyerAddress : ''}
                  onChange={(e) => setBundleData({ ...bundleData, buyerAddress: e.target.value })}
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

BundleDutchAuction.propTypes = {
  bundleData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setBundleData: PropTypes.func.isRequired,
};

export default BundleDutchAuction;
