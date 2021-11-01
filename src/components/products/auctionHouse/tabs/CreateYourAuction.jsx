import React from 'react';
import { useHistory } from 'react-router-dom';
import './CreateYourAuction.scss';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import plusIcon from '../../../../assets/images/plus.svg';
import Button from '../../../button/Button';

const CreateYourAuction = () => {
  const history = useHistory();
  const { setAuction } = useAuctionContext();
  return (
    <div className="create__your__auction__section">
      <div className="create__your__auction__section__container">
        <div>
          <h1 className="title">Create your auction</h1>
          <p className="desc">Mint NFTs, set up rewards tiers and launch Universe auctions.</p>
        </div>
        <div className="setup__auction__btn">
          <Button
            className="light-button"
            onClick={() => {
              setAuction({ rewardTiers: [] });
              history.push('/setup-auction');
            }}
          >
            Set up auction
            <img src={plusIcon} alt="icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateYourAuction;
