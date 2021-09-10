import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../utils/fixtures/ActiveAuctionsDummyData';
import AppContext from '../../../../ContextAPI.js';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import ActiveAuctionsCard from '../../../auctionsCard/ActiveAuctionsCard.jsx';

const ActiveAuctionsTab = ({ onArtist }) => {
  const { loggedInArtist, myAuctions } = useContext(AppContext);
  const history = useHistory();

  const artistActiveAuctions =
    loggedInArtist.id === onArtist?.id
      ? myAuctions.filter((item) => item.launch && !moment(item.endDate).isBefore(moment.now()))
      : PLACEHOLDER_ACTIVE_AUCTIONS;

  return artistActiveAuctions.length ? (
    <>
      <ActiveAuctionsCard data={artistActiveAuctions} />
    </>
  ) : (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No active auctions found</h3>
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
  );
};

ActiveAuctionsTab.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ActiveAuctionsTab;
