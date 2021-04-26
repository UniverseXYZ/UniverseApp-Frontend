import React from 'react';
import gradientArrow from '../../../../assets/images/gradient-arrow.svg';

const CreateYourAuction = () => (
  <div className="create__your__auction__section">
    <div className="create__your__auction__section__container">
      <div>
        <h1 className="title">Create Your Auction</h1>
        <p className="desc">Mint NFTs, set up rewards tiers and launch Universe auctions</p>
      </div>
      <div className="setup__auction__btn">
        <button type="button">
          <span>Set up auction</span>
          <img src={gradientArrow} alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
);

export default CreateYourAuction;
