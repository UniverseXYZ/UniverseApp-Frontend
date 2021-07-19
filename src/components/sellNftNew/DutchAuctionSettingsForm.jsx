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

const validationPrice = (price) => {
  if (price !== null) {
    if (!+price || price[0] === '.') return 'invalid price';
  }
  return false;
};
const checkPriceWithStartPrice = (startPrice, endPrice) => {
  const checkFormat = validationPrice(endPrice);
  if (checkFormat) return checkFormat;
  if (+endPrice > +startPrice) return 'Ending price cannot be greater than starting price.';
  return false;
};

const DutchAuctionSettingsForm = (props) => {
  const history = useHistory();
  const { data, setData } = props;
  const [dutchData, setDutchData] = useState(
    data.settings ? { ...data.settings } : { priceType: 'eth', startPrice: null }
  );
  const [switchEndingPrice, setSwitchEndingPrice] = useState(false);
  const [switchScheduleFutureTime, setSwitchScheduleFutureTime] = useState(false);
  const [switchPrivacy, setSwitchPrivacy] = useState(false);

  console.log(dutchData);
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
                error={validationPrice(dutchData.startPrice)}
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
              <Switch value={switchEndingPrice} onChange={setSwitchEndingPrice} />
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
                      error={checkPriceWithStartPrice(dutchData.startPrice, dutchData.endPrice)}
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
                      value={dutchData.expirationDate}
                      onChange={(e) => setDutchData({ ...dutchData, expirationDate: e })}
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
                <Switch value={switchScheduleFutureTime} onChange={setSwitchScheduleFutureTime} />
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
                        value={dutchData.scheduleTime}
                        onChange={(e) => setDutchData({ ...dutchData, scheduleTime: e })}
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
              <Switch value={switchPrivacy} onChange={setSwitchPrivacy} />
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
            setData({ ...data, settings: { ...dutchData } });
            history.push('/nft-marketplace/select-method');
          }}
        >
          Back
        </Button>
        <Button className="light-button">Continue</Button>
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
