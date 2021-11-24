import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { isAfterNow, isBeforeNow } from '../../../../utils/dates';
import ActiveAuctionsList from '../../../auctionsCard/activeAuction/ActiveAuctionsList';
import AuctionsCardSkeleton from '../../../auctionsCard/skeleton/AuctionsCardSkeleton';
import { getUserActiveAuctions } from '../../../../utils/api/auctions';

const ActiveAuctionsTab = ({ onArtist, showCreatePrompt }) => {
  const { myAuctions, setAuction } = useAuctionContext();
  const { loggedInArtist } = useAuthContext();
  const [artistActiveAuctions, setArtistActiveAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    if (loggedInArtist.id === onArtist?.id) {
      setArtistActiveAuctions(
        myAuctions.filter((item) => isAfterNow(item.startDate) && isBeforeNow(item.endDate))
      );
      setIsLoading(false);
    } else {
      const { auctions } = await getUserActiveAuctions(loggedInArtist.id);
      setArtistActiveAuctions(auctions);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div className="active__auctions__list">
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
    </div>
  ) : artistActiveAuctions.length ? (
    <ActiveAuctionsList data={artistActiveAuctions} />
  ) : showCreatePrompt ? (
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
      <h3>No active auctions found</h3>
    </div>
  );
};

ActiveAuctionsTab.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showCreatePrompt: PropTypes.bool,
};

ActiveAuctionsTab.defaultProps = {
  showCreatePrompt: true,
};
export default ActiveAuctionsTab;
