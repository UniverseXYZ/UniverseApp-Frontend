import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Input from '../input/Input';
import SelectPrice from '../input/SelectPrice';
import EndDatePicker from '../calendar/EndDatePicker';
import Button from '../button/Button';
import infoIcon from '../../assets/images/icon.svg';
import './styles/EnglishAuctionSettingsForm.scss';

const EnglishAuctionSettingsForm = (props) => {
  const { data, setData } = props;
  const history = useHistory();
  const [englishData, setEnglishData] = useState({
    minimumBid: null,
    reservePrice: null,
    expirationDate: null,
    priceType: 'eth',
  });

  useEffect(() => {
    // if (englishData.minimumBid || englishData.reservePrice || englishData.expirationDate) {
    //   setData({ ...data, settings: { ...englishData } });
    // }
    console.log(englishData);
  }, [englishData]);
  console.log(englishData);
  return (
    <div className="english--auction--settings--form">
      <h3 className="form--title">English auction settings</h3>
      <div className="form--block--parent">
        {/* minimum bid */}
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
                value={englishData.minimumBid ? englishData.minimumBid : ''}
                onChange={(e) => setEnglishData({ ...englishData, minimumBid: e.target.value })}
                // error={validationPrice(dutchData.startPrice)}
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
                value={englishData.reservePrice ? englishData.reservePrice : ''}
                onChange={(e) => setEnglishData({ ...englishData, reservePrice: e.target.value })}
                // error={validationPrice(dutchData.startPrice)}
              />
              <SelectPrice
                value={englishData.priceType}
                onChange={(e) => setEnglishData({ ...englishData, priceType: e })}
              />
            </div>
          </div>
        </div>
        {/*  */}
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
                value={englishData.expirationDate}
                onChange={(e) => setEnglishData({ ...englishData, expirationDate: e })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button--group">
        <Button
          className="light-border-button"
          onClick={() => {
            // setData({ ...data, settings: { ...dutchData } });
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

EnglishAuctionSettingsForm.propTypes = {
  data: PropTypes.shape({
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({}),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default EnglishAuctionSettingsForm;
