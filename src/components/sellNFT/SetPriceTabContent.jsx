import React, { useState } from 'react';
import Input from '../input/Input';
import Switch from '../ui-elements/Switch';
import './styles/SetPriceTabContent.scss';

const SetPrice = () => {
  const [endingPrice, setEndingPrice] = useState(false);
  const [scheduleFutureTime, setScheduleFutureTime] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="set--price--parent">
      <div className="row">
        <div className="row--child">
          <div className="left--block">
            <h3 className="title">Price</h3>
            <p className="hint--text">Will be on sale until you transfer this item or cancel it.</p>
          </div>
          <div className="right--block">
            <Input type="number" />
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
            <Switch value={endingPrice} onChange={setEndingPrice} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="row--child">
          <div className="left--block">
            <h3 className="title">Schedule for a future time</h3>
            <p className="hint--text">
              You can schedle this listing to only be buyable at a future date.
            </p>
          </div>
          <div className="right--block">
            <Switch value={scheduleFutureTime} onChange={setScheduleFutureTime} />
          </div>
        </div>
      </div>

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
            <Switch value={privacy} onChange={setPrivacy} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetPrice;
