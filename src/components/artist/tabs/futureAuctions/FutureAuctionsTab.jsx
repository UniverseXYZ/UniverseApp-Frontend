import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { isAfterNow } from '../../../../utils/dates';
import FutureAuctionsList from '../../../auctionsCard/futureAuction/FutureAuctionsList.jsx';
import AuctionsCardSkeleton from '../../../auctionsCard/skeleton/AuctionsCardSkeleton';
import { getUserFutureAuctions } from '../../../../utils/api/auctions';

const FutureAuctionsTab = ({ onArtist, showCreatePrompt }) => {
  const { myAuctions, setAuction } = useAuctionContext();
  const [artistFutureAuctions, setArtistFutureAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInArtist } = useAuthContext();
  const history = useHistory();

  useEffect(async () => {
    if (loggedInArtist.id === onArtist?.id) {
      setArtistFutureAuctions(
        myAuctions.filter((item) => !item.launch && isAfterNow(item.endDate))
      );
      setIsLoading(false);
    } else {
      const { auctions } = await getUserFutureAuctions(loggedInArtist.id);
      setArtistFutureAuctions(auctions);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div className="future__auctions__list">
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
    </div>
  ) : artistFutureAuctions.length ? (
    <FutureAuctionsList data={artistFutureAuctions} />
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
