import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Input from '../input/Input';
import Switch from '../ui-elements/Switch';
import SelectPrice from '../input/SelectPrice';
import EndDatePicker from '../calendar/EndDatePicker';
import './styles/SetPriceTabContent.scss';

const SetPrice = (props) => {
  const [endingPrice, setEndingPrice] = useState(false);
  const [scheduleFutureTime, setScheduleFutureTime] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [typeSwitch, setTypeSwitch] = useState(null);
  const { startPrice, setStartPrice, endPrice, setEndPrice, priceType, setPriceType, setFormType } =
    props;

  useEffect(() => {
    if (!endingPrice && !privacy && !scheduleFutureTime) {
      setTypeSwitch(null);
      setFormType(null);
    } else setFormType(typeSwitch);
  }, [endingPrice, privacy, scheduleFutureTime]);

  return (
    <div className="set--price--parent">
      <div className="row">
        <div className="row--child">
          <div className="left--block">
            <h3 className="title">Price</h3>
            <p className="hint--text">Will be on sale until you transfer this item or cancel it.</p>
          </div>
          <div className="right--block">
            <Input
              type="number"
              placeholder="Amount"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
            />
            <SelectPrice value={priceType} onChange={setPriceType} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row--child">
          <div className="left--block">
            <h3 className="title">Include ending price</h3>
            <p className="hint--text">
              Adding an ending price will allow this listing to expire, or for the price to be
              reduced untill a buyer is found.
            </p>
          </div>
          <div className="right--block">
            <Switch
              value={endingPrice}
              onChange={() => {
                setEndingPrice(!endingPrice);
                setTypeSwitch('endingPrice');
                setPrivacy(false);
                setScheduleFutureTime(false);
              }}
            />
          </div>
        </div>
        {endingPrice && typeSwitch === 'endingPrice' ? (
          <Animated animationIn="fadeIn">
            <div className="row--child switch--block">
              <div className="left--block">
                <h3 className="title">Ending price</h3>
                <p className="hint--text">
                  Must be less than or equal to the starting price. The price will progress linearly
                  to this amount until the expiration date.
                </p>
              </div>
              <div className="right--block">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={endPrice}
                  onChange={(e) => setEndPrice(e.target.value)}
                />
                <SelectPrice value={priceType} onChange={setPriceType} />
              </div>
            </div>
            <div className="row--child switch--block">
              <div className="left--block">
                <h3 className="title">Expiration date</h3>
                <p className="hint--text">
                  Your listing will automatically end at this time. No need to cancel it!
                </p>
              </div>
              <div className="right--block">
                <EndDatePicker />
              </div>
            </div>
          </Animated>
        ) : (
          <></>
        )}
      </div>

      {!endingPrice && (
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h3 className="title">Schedule for a future time</h3>
              <p className="hint--text">
                You can schedle this listing to only be buyable at a future date.
              </p>
            </div>
            <div className="right--block">
              <Switch
                value={scheduleFutureTime}
                onChange={() => {
                  setScheduleFutureTime(!scheduleFutureTime);
                  setTypeSwitch('scheduleTime');
                  setEndingPrice(false);
                  setPrivacy(false);
                }}
              />
            </div>
          </div>
          {scheduleFutureTime && typeSwitch === 'scheduleTime' ? (
            <Animated animationIn="fadeIn">
              <div className="row--child switch--block">
                <div className="left--block">
                  <h3 className="title">Schedule for a future time</h3>
                  <p className="hint--text">
                    You can schedle this listing to only be buyable at a future date.
                  </p>
                </div>
                <div className="right--block">
                  <EndDatePicker />
                </div>
              </div>
            </Animated>
          ) : (
            <></>
          )}
        </div>
      )}

      <div className="row">
        <div className="row--child">
          <div className="left--block">
            <h3 className="title">Privacy</h3>
            <p className="hint--text">
              You can keep your listing public, or you can specify one address that’s allowed to buy
              it.
            </p>
          </div>
          <div className="right--block">
            <Switch
              value={privacy}
              onChange={() => {
                setPrivacy(!privacy);
                setTypeSwitch('privacy');
                setEndingPrice(false);
                setScheduleFutureTime(false);
              }}
            />
          </div>
        </div>
        {privacy && (
          <Animated animationIn="fadeIn">
            <div className="row--child switch--block">
              <Input
                type="text"
                placeholder="Buyer address"
                value={endPrice}
                onChange={(e) => setEndPrice(e.target.value)}
              />
            </div>
          </Animated>
        )}
      </div>
    </div>
  );
};

SetPrice.propTypes = {
  startPrice: PropTypes.string,
  setStartPrice: PropTypes.func,
  endPrice: PropTypes.string,
  setEndPrice: PropTypes.func,
  priceType: PropTypes.string,
  setPriceType: PropTypes.func,
  setFormType: PropTypes.func,
};

SetPrice.defaultProps = {
  startPrice: '',
  setStartPrice: (e) => console.log(e),
  endPrice: '',
  setEndPrice: (e) => console.log(e),
  priceType: 'eth',
  setPriceType: () => {},
  setFormType: () => {},
};

export default SetPrice;
