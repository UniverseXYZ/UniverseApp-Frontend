import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import { useAuthContext } from '../../contexts/AuthContext';

const CancelBidPopup = ({ close, setCurrentBid, myBid }) => {
  const { yourBalance, setYourBalance } = useAuthContext();

  const handlePlaceBidClick = () => {
    setYourBalance(parseFloat(yourBalance) + parseFloat(myBid.bid));
    setCurrentBid(null);
  };
  return (
    <div className="leave__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={close} aria-hidden="true" />
      <h1>Are you sure you want to cancel your bid?</h1>
      <p>
        Your bid will be cancelled and the funds returned to your wallet. If you change your mind,
        you will be able to bid on the auction again as long as it is still open.
      </p>
      <div className="button__div">
        <Button className="light-button" onClick={handlePlaceBidClick}>
          Yes, cancel
        </Button>
        <Button className="light-border-button" onClick={close}>
          No, keep it
        </Button>
      </div>
    </div>
  );
};

CancelBidPopup.propTypes = {
  close: PropTypes.func.isRequired,
  setCurrentBid: PropTypes.number.isRequired,
  myBid: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CancelBidPopup;
