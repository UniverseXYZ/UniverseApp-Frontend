import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import Input from '../input/Input';
import SelectPrice from '../input/SelectPrice';
import Switch from '../ui-elements/Switch';
import './styles/BundleSellForm.scss';
import Button from '../button/Button';

const validationPrice = (price, setPriceError) => {
  const reg = /^\d+$/;
  if (price?.[0] === '0' && price?.[1] !== '.') {
    setPriceError('Invalid price');
    return false;
  }
  if (!reg.test(price) && price?.[1] !== '.') {
    setPriceError('Invalid price');
    return false;
  }
  setPriceError(false);
  return true;
};

const continueValidationData = (data, setErrorStartPrice) => {
  const keys = Object.keys(data);
  const checkStartPrice = validationPrice(data.startPrice, setErrorStartPrice);
  if (!checkStartPrice) {
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

const SingleItemsFixedListing = (props) => {
  const { stepData, setStepData, getData } = props;
  const history = useHistory();
  const [errorStartPrice, setErrorStartPrice] = useState(false);
  const [bundleData, setBundleData] = useState({
    startPrice: window.bundleData ? window.bundleData.startPrice : null,
    priceType: window.bundleData ? window.bundleData.priceType : 'eth',
    switch: window.bundleData ? window.bundleData.switch : [],
    buyerAddress: window.bundleData ? window.bundleData.buyerAddres : null,
  });
  const [switchPrivacy, setSwitchPrivacy] = useState(bundleData.switch.includes('switchPrivacy'));

  useEffect(() => {
    const copyData = { ...bundleData };
    if (!bundleData.switch.includes('switchPrivacy')) {
      delete copyData.buyerAddress;
    }
    const valid = continueValidationData(copyData, setErrorStartPrice);
    if (valid) {
      getData(copyData);
    } else getData(null);
    window.bundleData = copyData;
  }, [bundleData]);

  const clickContinue = () => {
    setStepData({ ...stepData, settings: { ...window.bundleData } });
    history.push('/nft-marketplace/summary');
  };

  return (
    <div className="bundle--sell--form--container">
      <h3 className="form--title">Single item - Fixed Listing</h3>
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
                value={bundleData.startPrice ? bundleData.startPrice : ''}
                onChange={(e) => setBundleData({ ...bundleData, startPrice: e.target.value })}
                onBlur={() => validationPrice(bundleData.startPrice, setErrorStartPrice)}
                error={errorStartPrice}
              />
              <SelectPrice
                value={bundleData.priceType}
                onChange={(e) => setBundleData({ ...bundleData, priceType: e })}
              />
            </div>
          </div>
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
      <div className="buttons--group">
        <Button
          className="light-border-button"
          onClick={() => history.push('/nft-marketplace/select-method')}
        >
          Back
        </Button>
        <Button className="light-button" disabled={!bundleData.startPrice} onClick={clickContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

SingleItemsFixedListing.propTypes = {
  stepData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setStepData: PropTypes.func,
  getData: PropTypes.func,
};

SingleItemsFixedListing.defaultProps = {
  getData: () => {},
  setStepData: () => {},
};

export default SingleItemsFixedListing;
