import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { isBeforeNow } from '../../../../utils/dates';
import PastAuctionsList from '../../../auctionsCard/pastAuction/PastAuctionsList.jsx';
import AuctionsCardSkeleton from '../../../auctionsCard/skeleton/AuctionsCardSkeleton';
import { getUserPastAuctions } from '../../../../utils/api/auctions';

const PastAuctionsTab = ({ onArtist, showCreatePrompt }) => {
  const { myAuctions, setAuction } = useAuctionContext();
  const { loggedInArtist } = useAuthContext();
  const [artistPastAuctions, setArtistPastAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    if (loggedInArtist.id === onArtist?.id) {
      setArtistPastAuctions(myAuctions.filter((item) => item.launch && isBeforeNow(item.endDate)));
      setIsLoading(false);
    } else {
      const { auctions } = await await getUserPastAuctions(loggedInArtist.id);
      setArtistPastAuctions(auctions);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div className="future__auctions__list">
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
    </div>
  ) : artistPastAuctions.length ? (
    <PastAuctionsList data={artistPastAuctions} />
  ) : showCreatePrompt ? (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No past auctions found</h3>
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
        onClick={() => {
          setAuction({ rewardTiers: [] });
          return loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction');
        }}
        disabled={!loggedInArtist.name || !loggedInArtist.avatar}
      >
        Set up auction
      </button>
    </div>
  ) : (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No past auctions found</h3>
    </div>
  );
};

PastAuctionsTab.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showCreatePrompt: PropTypes.bool,
};

PastAuctionsTab.defaultProps = {
  showCreatePrompt: true,
};

export default PastAuctionsTab;
