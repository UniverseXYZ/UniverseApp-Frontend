import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import Input from '../../input/Input';
import SelectPrice from '../../input/SelectPrice';
import Switch from '../../ui-elements/Switch';
import EndDatePicker from '../../calendar/EndDatePicker';
import Button from '../../button/Button';
import './SingleItemsDutchAuction.scss';
import AppContext from '../../../ContextAPI';

const SingleItemsDutchAuction = (props) => {
  const { sellNFTSingleDutchAuctionData, setSellNFTSingleDutchAuctionData } =
    useContext(AppContext);
  const [errorStartPrice, setErrorStartPrice] = useState(false);
  const [errorEndingPrice, setErrorEndingPrice] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const history = useHistory();
  const { stepData, setStepData } = props;
  const [dutchData, setDutchData] = useState({
    priceType: sellNFTSingleDutchAuctionData.priceType || 'eth',
    startPrice: sellNFTSingleDutchAuctionData.startPrice || null,
    endPrice: sellNFTSingleDutchAuctionData.endPrice || null,
    switch: sellNFTSingleDutchAuctionData.switch || [],
    buyerAddres: sellNFTSingleDutchAuctionData.buyerAddres || null,
    endingPriceDate: sellNFTSingleDutchAuctionData.endingPriceDate || '',
    scheduleDate: sellNFTSingleDutchAuctionData.scheduleDate || '',
  });
  const [switchEndingPrice, setSwitchEndingPrice] = useState(
    dutchData.switch.includes('switchEndingPrice')
  );
  const [switchScheduleFutureTime, setSwitchScheduleFutureTime] = useState(
    dutchData.switch.includes('switchScheduleFutureTime')
  );
  const [switchPrivacy, setSwitchPrivacy] = useState(dutchData.switch.includes('switchPrivacy'));

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
    if (!switchPrivacy) delete dutchData.buyerAddres;
    if (!switchEndingPrice) delete dutchData.endPrice;
    if (!dutchData.switch.length) {
      delete dutchData.endingPriceDate;
      delete dutchData.scheduleDate;
    } else if (!dutchData.switch.includes('switchPrivacy') && !dutchData.endingPriceDate)
      dutchData.endingPriceDate = '';
    else if (!dutchData.switch.includes('switchPrivacy') && !dutchData.scheduleDate)
      dutchData.scheduleDate = '';
    const verif = dataStepsVerification(dutchData);
    setContinueDisabled(!verif);
  }, [dutchData]);

  const clickContinue = () => {
    const verification = dataStepsVerification(dutchData);
    if (verification) {
      setStepData({ ...stepData, settings: { ...dutchData } });
      setSellNFTSingleDutchAuctionData(dutchData);
      history.push('/nft-marketplace/summary');
    }
  };

  return (
    <div className="dutch--auction--settings--form">
      <h3 className="form--title">Single item - Dutch auction</h3>
      <div className="form--block--parent">
        {/* price row */}
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Price</h5>
              <p className="row--description">Set an initial price</p>
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
                    // setSwitchScheduleFutureTime(true);
                    switchArray.push('switchEndingPrice');
                    // const switchScheduleTimeIndex = switchArray.indexOf('switchScheduleFutureTime');
                    // if (switchScheduleTimeIndex !== -1) {
                    //   switchArray.splice(switchScheduleTimeIndex, 1);
                    // }
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
                      value={dutchData.endingPriceDate}
                      onChange={(e) => setDutchData({ ...dutchData, endingPriceDate: e })}
                      title="Expiration date"
                    />
                  </div>
                </div>
              </div>
            </Animated>
          )}
        </div>
        {/* schedule future time */}
        {/* {switchScheduleFutureTime && ( */}
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Schedule for a future time</h5>
              <p className="row--description">
                You can schedule this listing to only be buyable at a future date.
              </p>
            </div>
            <div className="right--block right--switch">
              <Switch
                value={switchScheduleFutureTime}
                onChange={(e) => {
                  setSwitchScheduleFutureTime(e);
                  const switchArray = dutchData.switch;
                  if (e && !switchArray.includes('switchScheduleFutureTime')) {
                    // setSwitchEndingPrice(true);
                    switchArray.push('switchScheduleFutureTime');
                    // const endPriceSwitchIndex = switchArray.indexOf('switchEndingPrice');
                    // if (endPriceSwitchIndex !== -1) {
                    //   switchArray.splice(endPriceSwitchIndex, 1);
                    // }
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
                      You can schedule this listing to only be buyable at a future date.
                    </p>
                  </div>
                  <div className="right--block">
                    <EndDatePicker
                      value={dutchData.scheduleDate}
                      onChange={(e) => setDutchData({ ...dutchData, scheduleDate: e })}
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
        <Button className="light-button" disabled={continueDisabled} onClick={clickContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

SingleItemsDutchAuction.propTypes = {
  stepData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setStepData: PropTypes.func.isRequired,
};

export default SingleItemsDutchAuction;
