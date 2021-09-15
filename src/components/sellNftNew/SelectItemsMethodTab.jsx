import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import DutchAuctionIcon from '../../assets/images/sellNft/dutch-auction-method-icon.svg';
import EnglishAuctionIcon from '../../assets/images/sellNft/english-auction-method-icon.svg';
import BundleSaleIcon from '../../assets/images/sellNft/bundle-sale-method-icon.svg';
import nextIcon from '../../assets/images/arrow.svg';
import './styles/SelectItemsMethodTab.scss';
import singleIcon from '../../assets/images/sellNft/single-icon.svg';
import collectionIcon from '../../assets/images/sellNft/collection-icon.svg';

const SelectItemsMethodTab = (props) => {
  const { onSelect, data } = props;
  const history = useHistory();
  return (
    <div className="select--items--method--tab">
      <h3 className="select--items--method--title">Select the amount of items</h3>
      <div className="select--methods--section">
        <div className="method--item">
          <div className="child">
            <div className="icon--block">
              <img src={singleIcon} alt="img" />
            </div>
            <h3 className="title">Single Item</h3>
            <p className="description">Sell one item</p>
            <Button
              className="light-button select--method--btn"
              onClick={() => {
                onSelect({ ...data, selectedItems: 'single', settings: null });
                history.push('/nft-marketplace/select-method');
              }}
            >
              Select
            </Button>
          </div>
        </div>
        <div className="method--item">
          <div className="child">
            <div className="icon--block">
              <img src={collectionIcon} alt="img" />
            </div>
            <h3 className="title">Bundle</h3>
            <p className="description">Group this item with others to sell</p>
            <Button
              className="light-button select--method--btn"
              onClick={() => {
                onSelect({ ...data, selectedItems: 'bundle', settings: null });
                history.push('/nft-marketplace/select-method');
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

SelectItemsMethodTab.propTypes = {
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.shape({ selectedMethod: PropTypes.string }).isRequired,
};

export default SelectItemsMethodTab;
