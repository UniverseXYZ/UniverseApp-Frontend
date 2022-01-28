import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import submitted from '../../assets/images/bid-submitted.png';

const SuccessPopup = ({ onClose, onAuction, auctionRemoved }) => {
  const history = useHistory();
  let startDate = '';
  let startDateMarkup = null;
  if (!auctionRemoved) {
    startDate = format(new Date(onAuction.startDate), 'MMMM dd, yyyy');
    startDateMarkup = <span>{startDate}</span>;
  }

  let modalText = '';
  if (auctionRemoved) {
    modalText = `Your auction ${onAuction.name} was successfully removed`;
  } else {
    modalText = `Your auction ${onAuction.name}
     was successfully created and scheduled for launch
    on ${startDateMarkup}`;
  }

  return (
    <div className="success__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <img className="submitted" src={submitted} alt="Submitted" />
      <h1>Success</h1>
      <p>{modalText}</p>
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
              history.push('/customize-auction-landing-page', onAuction.id);
            }}
          >
            Visit landing page
          </Button>
        )}
      </div>
    </div>
  );
};
SuccessPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  auctionRemoved: PropTypes.bool,
};
SuccessPopup.defaultProps = {
  auctionRemoved: PropTypes.undefined,
};
export default SuccessPopup;
