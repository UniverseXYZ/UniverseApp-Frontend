import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const RewardTierRemovePopup = ({ onClose, id }) => {
  const { auction, setAuction } = useAuctionContext();

  const removeTier = () => {
    const newAuction = [...auction.rewardTiers];
    const tier = newAuction.filter((a) => a.id !== id);
    setAuction({ ...auction, rewardTiers: tier });
  };

  return (
    <div className="popup-div modal-close-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="popup-title">
        <h4>Are you sure?</h4>
      </div>
      <div className="popup-text">
        <p>
          You’re about to remove the reward tier
          <br />
          All progress on it will be lost.
        </p>
      </div>
      <div className="popup-btns">
        <Button className="light-button" onClick={removeTier}>
          Remove
        </Button>
        <Button className="light-border-button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

RewardTierRemovePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default RewardTierRemovePopup;
