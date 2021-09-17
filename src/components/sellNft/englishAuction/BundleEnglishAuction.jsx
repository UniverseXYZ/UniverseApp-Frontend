import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Input from '../../input/Input';
import SelectPrice from '../../input/SelectPrice';
import EndDatePicker from '../../calendar/EndDatePicker';
import infoIcon from '../../../assets/images/icon.svg';
import './SingleItemsEnglishAuction.scss';

const BundleEnglishAuction = (props) => {
  const { bundleData, setBundleData } = props;
  const [errorMinBid, setErrorMinBid] = useState(false);
  const [errorendPrice, setErrorendPrice] = useState(false);

  const validField = (minBid, reservePrice) => {
    if (minBid === '' || minBid?.[0] === '.' || !+minBid || +minBid <= 0) {
      setErrorMinBid('Invalid price');
      return false;
    }
    if (+minBid?.[0] === 0 && minBid?.[1] !== '.') {
      setErrorMinBid('Invalid price');
      return false;
    }
    setErrorMinBid(false);
    if (!reservePrice?.length) {
      setErrorendPrice('Highest bid listings must have a reserve price.');
      return false;
    }
    if (reservePrice === '' || reservePrice?.[0] === '.' || !+reservePrice || +reservePrice <= 0) {
      setErrorendPrice('Invalid price');
      return false;
    }
    if (+reservePrice?.[0] === 0 && reservePrice?.[1] !== '.') {
      setErrorendPrice('Invalid price');
      return false;
    }
    if (+reservePrice < 1 || +reservePrice <= +minBid) {
      setErrorendPrice(
        'The reserve price must be greater than the start price. The reserve price must be greater than 1 ETH in value.'
      );
      return false;
    }

    setErrorendPrice(false);
    return true;
  };

  return (
    <div className="english--auction--settings--form">
      <h3 className="form--title">Single item - English auction</h3>
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
        {/* Minimum bid */}
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">
                Minimum bid
                <img src={infoIcon} alt="img" />
              </h5>
              <p className="row--description">Set your starting bid price.</p>
            </div>
            <div className="right--block">
              <Input
                type="number"
                placeholder="Amount"
                value={bundleData.startPrice ? bundleData.startPrice : ''}
                onChange={(e) => setBundleData({ ...bundleData, startPrice: e.target.value })}
                onBlur={(e) =>
                  validField(
                    bundleData.startPrice,
                    bundleData.endPrice,
                    setErrorMinBid,
                    setErrorendPrice
                  )
                }
                error={errorMinBid}
              />
              <SelectPrice
                value={bundleData.priceType}
                onChange={(e) => setBundleData({ ...bundleData, priceType: e })}
              />
            </div>
          </div>
        </div>
        {/* Reserve price */}
        <div className="row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">
                Reserve price
                <img src={infoIcon} alt="img" />
              </h5>
              <p className="row--description">Set a minimum bid to start an auction</p>
            </div>
            <div className="right--block">
              <Input
                type="number"
                placeholder="Amount"
                value={bundleData.endPrice ? bundleData.endPrice : ''}
                onChange={(e) => setBundleData({ ...bundleData, endPrice: e.target.value })}
                onBlur={(e) =>
                  validField(
                    bundleData.startPrice,
                    bundleData.endPrice,
                    setErrorMinBid,
                    setErrorendPrice
                  )
                }
                error={errorendPrice}
              />
              <SelectPrice
                value={bundleData.priceType}
                onChange={(e) => setBundleData({ ...bundleData, priceType: e })}
              />
            </div>
          </div>
        </div>
        {/* Expiration date */}
        <div className="row last--row">
          <div className="row--child">
            <div className="left--block">
              <h5 className="row--title">Expiration date</h5>
              <p className="row--description">
                Your auction will automatically end at this time and the highest bidder will win. No
                need to cancel it.
              </p>
            </div>
            <div className="right--block">
              <EndDatePicker
                title="Expiration date"
                value={bundleData.date}
                onChange={(e) => setBundleData({ ...bundleData, date: e })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BundleEnglishAuction.propTypes = {
  bundleData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setBundleData: PropTypes.func.isRequired,
};

export default BundleEnglishAuction;
