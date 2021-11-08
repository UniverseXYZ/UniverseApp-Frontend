import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import submitted from '../../assets/images/bid-submitted.png';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

const AuctionCanceledSuccessPopup = ({ onClose, onAuction, auctionRemoved }) => {
  const history = useHistory();
  const { loggedInArtist } = useAuthContext();

  const getModalText = () => {
    let startDate = '';
    if (auctionRemoved) {
      return <>Your auction ${onAuction.name} was successfully removed</>;
    }

    startDate = format(new Date(onAuction.startDate), 'MMMM dd, yyyy');
    return (
      <>
        Your auction {onAuction.name} was successfully created and scheduled for launch on{' '}
        <span>{startDate}</span>
      </>
    );
  };

  return (
    <div className="success__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <img className="submitted" src={submitted} alt="Submitted" />
      <h1>Success</h1>
      <p>{getModalText()}</p>
      <div className="button__div">
        <Button
          className="light-button"
          onClick={() => {
            history.push('/my-auctions');
            onClose();
          }}
        >
          Go to my auctions
        </Button>
        {!auctionRemoved && (
          <Button
            className="light-border-button"
            onClick={() => {
              history.push(`./${loggedInArtist.universePageAddress}/${onAuction.link}`);
            }}
          >
            Visit landing page
          </Button>
        )}
      </div>
    </div>
  );
};
AuctionCanceledSuccessPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  auctionRemoved: PropTypes.bool,
};
AuctionCanceledSuccessPopup.defaultProps = {
  auctionRemoved: PropTypes.false,
};
export default AuctionCanceledSuccessPopup;
