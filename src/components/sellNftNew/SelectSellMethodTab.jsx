import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import DutchAuctionIcon from '../../assets/images/sellNft/dutch-auction-method-icon.svg';
import EnglishAuctionIcon from '../../assets/images/sellNft/english-auction-method-icon.svg';
import FixedListingIcon from '../../assets/images/sellNft/fixed-listing-method-icon.svg';
import nextIcon from '../../assets/images/arrow.svg';
import './styles/SelectSellMethodTab.scss';

const SelectSellMethodTab = (props) => {
  const { onSelect, data } = props;
  const history = useHistory();
  return (
    <div className="select--sell--method--tab">
      <h3 className="select--sell--method--title">Select your sell method</h3>
      <div className="select--methods--section">
        <div className="method--item">
          <div className="child">
            <div className="icon--block">
              <img src={FixedListingIcon} alt="img" />
            </div>
            <h3 className="title">Fixed Listing</h3>
            <p className="description">List your NFT for a fixed price</p>
            <Button
              className="light-button select--method--btn"
              onClick={() => {
                onSelect({ ...data, selectedMethod: 'fixedListing', settings: null });
                history.push('/nft-marketplace/settings');
              }}
            >
              Select
            </Button>
          </div>
        </div>
        <div className="method--item">
          <div className="child">
            <div className="icon--block">
              <img src={DutchAuctionIcon} alt="img" />
            </div>
            <h3 className="title">Dutch Auction</h3>
            <p className="description">Set price for your NFT to sell at fixed or declining cost</p>
            <Button
              className="light-button select--method--btn"
              onClick={() => {
                onSelect({ ...data, selectedMethod: 'dutch', settings: null });
                history.push('/nft-marketplace/settings');
              }}
            >
              Select
            </Button>
          </div>
        </div>
        <div className="method--item">
          <div className="child">
            <div className="icon--block">
              <img src={EnglishAuctionIcon} alt="img" />
            </div>
            <h3 className="title">English Auction</h3>
            <p className="description">
              Set the starting bid and sell your NFT to the highest bidder
            </p>
            <Button
              className="light-button select--method--btn"
              onClick={() => {
                onSelect({ ...data, selectedMethod: 'english', settings: null });
                history.push('/nft-marketplace/settings');
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

SelectSellMethodTab.propTypes = {
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.shape({ selectedMethod: PropTypes.string }).isRequired,
};

export default SelectSellMethodTab;
