import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Input from '../../input/Input';
import SelectPrice from '../../input/SelectPrice';
import EndDatePicker from '../../calendar/EndDatePicker';
import Button from '../../button/Button';
import infoIcon from '../../../assets/images/icon.svg';
import './SingleItemsEnglishAuction.scss';
import AppContext from '../../../ContextAPI';

const SingleItemsEnglishAuction = (props) => {
  const { sellNFTSingleEnglishAuctionData, setSellNFTSingleEnglishAuctionData } =
    useContext(AppContext);
  const { stepData, setStepData } = props;
  const history = useHistory();
  const [englishData, setEnglishData] = useState({
    startPrice: sellNFTSingleEnglishAuctionData.startPrice || null,
    endPrice: sellNFTSingleEnglishAuctionData.endPrice || null,
    date: sellNFTSingleEnglishAuctionData.date || null,
    priceType: sellNFTSingleEnglishAuctionData.priceType || 'eth',
  });
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

  const clickContinue = () => {
    if (
      validField(englishData.startPrice, englishData.endPrice) &&
      !!englishData.startPrice?.length &&
      !!englishData.endPrice?.length &&
      !!englishData.date?.length
    ) {
      setStepData({ ...stepData, settings: { ...englishData } });
      setSellNFTSingleEnglishAuctionData(englishData);
      history.push('/nft-marketplace/summary');
    }
  };

  return (
    <div className="english--auction--settings--form">
      <h3 className="form--title">Single item - English auction</h3>
      <div className="form--block--parent">
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
                value={englishData.startPrice ? englishData.startPrice : ''}
                onChange={(e) => setEnglishData({ ...englishData, startPrice: e.target.value })}
                onBlur={(e) =>
                  validField(
                    englishData.startPrice,
                    englishData.endPrice,
                    setErrorMinBid,
                    setErrorendPrice
                  )
                }
                error={errorMinBid}
              />
              <SelectPrice
                value={englishData.priceType}
                onChange={(e) => setEnglishData({ ...englishData, priceType: e })}
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
                value={englishData.endPrice ? englishData.endPrice : ''}
                onChange={(e) => setEnglishData({ ...englishData, endPrice: e.target.value })}
                onBlur={(e) =>
                  validField(
                    englishData.startPrice,
                    englishData.endPrice,
                    setErrorMinBid,
                    setErrorendPrice
                  )
                }
                error={errorendPrice}
              />
              <SelectPrice
                value={englishData.priceType}
                onChange={(e) => setEnglishData({ ...englishData, priceType: e })}
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
                value={englishData.date}
                onChange={(e) => setEnglishData({ ...englishData, date: e })}
              />
            </div>
          </div>
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
          disabled={
            errorMinBid || errorendPrice || !englishData.startPrice || !englishData.endPrice
          }
          onClick={clickContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

SingleItemsEnglishAuction.propTypes = {
  stepData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setStepData: PropTypes.func.isRequired,
};

export default SingleItemsEnglishAuction;
