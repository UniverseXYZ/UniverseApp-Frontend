import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import DutchAuctionIcon from '../../assets/images/sellNft/dutch-auction-method-icon.svg';
import EnglishAuctionIcon from '../../assets/images/sellNft/english-auction-method-icon.svg';
import BundleSaleIcon from '../../assets/images/sellNft/bundle-sale-method-icon.svg';
import nextIcon from '../../assets/images/arrow.svg';
import './styles/SelectSellMethodTab.scss';

const SelectSellMethodTab = (props) => {
  const { onSelect, data } = props;
  const [activeMethod, setActiveMethod] = useState(0);
  const history = useHistory();
  return (
    <div className="select--sell--method--tab">
      <h3 className="select--sell--method--title">Select your sell method</h3>
      <div className="select--methods--section">
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
                onSelect({ ...data, selectedMethod: 'dutch' });
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
                onSelect({ ...data, selectedMethod: 'endlish' });
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
              <img src={BundleSaleIcon} alt="img" />
            </div>
            <h3 className="title">Bundle Sale</h3>
            <p className="description">
              Group your NFT with other items to sell in a bundle at fixed price
            </p>
            <Button
              className="light-button select--method--btn"
              onClick={() => {
                onSelect({ ...data, selectedMethod: 'bundle' });
                history.push('/nft-marketplace/settings');
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
      <div className="go--to--universe--auctions--section">
        <div className="child">
          <h3 className="section--title">Universe tiered auctions</h3>
          <Button className="light-button" onClick={() => history.push('/my-auctions')}>
            Go to Universe auctions
            <img src={nextIcon} alt="img" />
          </Button>
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
