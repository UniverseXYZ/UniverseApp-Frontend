import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../../../utils/fixtures/FutureAuctionsDummyData';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import AppContext from '../../../../ContextAPI.js';
import FutureAuctionsCard from '../../../auctionsCard/FutureAuctionsCard.jsx';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import { useAuthContext } from '../../../../contexts/AuthContext';

const FutureAuctionsTab = ({ onArtist, showCreatePrompt }) => {
  const { myAuctions } = useAuctionContext();
  const { loggedInArtist } = useAuthContext();
  const history = useHistory();

  const artistFutureAuctions =
    loggedInArtist.id === onArtist?.id
      ? myAuctions.filter((item) => !item.launch && !moment(item.endDate).isBefore(moment.now()))
      : PLACEHOLDER_FUTURE_AUCTIONS;

  return artistFutureAuctions.length ? (
    <>
      <FutureAuctionsCard data={artistFutureAuctions} />
    </>
  ) : showCreatePrompt ? (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No future auctions found</h3>
      {!loggedInArtist.name || !loggedInArtist.avatar ? (
        <div className="warning__div">
          <img src={Exclamation} alt="Warning" />
          <p>
            Please, fill out the profile details before you set up an auction.{' '}
            <button type="button" onClick={() => history.push('/my-account')}>
              Go to my profile
            </button>
            .
          </p>
        </div>
      ) : (
        <p className="desc">Create your first auction by clicking the button below</p>
      )}
      <button
        type="button"
        className="light-button set_up"
        onClick={() =>
          loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
        }
        disabled={!loggedInArtist.name || !loggedInArtist.avatar}
      >
        Set up auction
      </button>
    </div>
  ) : (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No future auctions found</h3>
    </div>
  );
};

FutureAuctionsTab.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showCreatePrompt: PropTypes.bool,
};

FutureAuctionsTab.defaultProps = {
  showCreatePrompt: true,
};

export default FutureAuctionsTab;
