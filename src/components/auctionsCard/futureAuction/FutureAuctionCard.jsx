import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './FutureAuctionCard.scss';
import AuctionsTabsCountdown from '../../auctions/AuctionsTabsCountdown';
import { createNftsPerWinnerMarkup } from '../utils';
import { useAuthContext } from '../../../contexts/AuthContext';

const FutureAuctionCard = ({ auction }) => {
  const history = useHistory();
  const { loggedInArtist } = useAuthContext();

  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);

  return (
    <div className="future__auction__item">
      <div className={`auction__img ${auction.promoImageUrl ? '' : 'show__avatar'}`}>
        {auction.promoImageUrl && (
          <img className="original" src={auction.promoImageUrl} alt={auction.name} />
        )}
        <img className="artist__image" src="" alt={auction.name} />
        <div className="start__date">
          <label>STARTS IN</label>
          <AuctionsTabsCountdown activeAuction={auction} showLabel={false} />
        </div>
      </div>
      <div className="title">
        <h1>{auction.name}</h1>
        <div className="artist__details">
          <img
            src={
              typeof loggedInArtist.avatar === 'string'
                ? loggedInArtist.avatar
                : URL.createObjectURL(loggedInArtist.avatar)
            }
            alt={loggedInArtist.name}
          />
          <span>by</span>
          <button
            type="button"
            onClick={() =>
              history.push(`/${loggedInArtist.name.split(' ')[0]}`, {
                id: loggedInArtist.id,
              })
            }
          >
            {loggedInArtist.name}
          </button>
        </div>
      </div>
      <div className="auction__details">
        <div className="auction__details__box">
          <label>Winners</label>
          <p>{winnersCount}</p>
        </div>
        <div className="auction__details__box">
          <label>Nfts per winner:</label>
          {nftsPerWinnerMarkup}
        </div>
      </div>
    </div>
  );
};

FutureAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default FutureAuctionCard;
