import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import gradientArrow from '../../../../assets/images/gradient-arrow.svg';

const CreateYourAuction = () => {
  const history = useHistory();
  const { setAuction } = useAuctionContext();
  return (
    <div className="create__your__auction__section">
      <div className="create__your__auction__section__container">
        <div>
          <h1 className="title">Create Your Auction</h1>
          <p className="desc">Mint NFTs, set up rewards tiers and launch Universe auctions</p>
        </div>
        <div className="setup__auction__btn">
          <button
            type="button"
            onClick={() => {
              setAuction({ rewardTiers: [] });
              history.push('/setup-auction');
            }}
          >
            <span>Set up auction</span>
            <img src={gradientArrow} alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateYourAuction;
