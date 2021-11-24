/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './PastAuctionCard.scss';
import { getPromoImageProps, bidsInUsd, createNftsPerWinnerMarkup } from '../utils';
import { getBidTypeByName } from '../../../utils/fixtures/BidOptions';
import { useAuctionContext } from '../../../contexts/AuctionContext';
import { useAuthContext } from '../../../contexts/AuthContext';

const PastAuctionCard = ({ auction }) => {
  const { loggedInArtist } = useAuthContext();
  const { options } = useAuctionContext();
  const history = useHistory();

  const bids = bidsInUsd(auction);
  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);

  const { tokenSymbol } = auction;
  const tokenLogo = getBidTypeByName(tokenSymbol, options);
  const promoImageProps = getPromoImageProps(auction.promoImageUrl, loggedInArtist.avatar);

  return (
    <div
      className="past__auction__item"
      onClick={() => {
        history.push(`/${loggedInArtist.universePageAddress}/${auction.name}`);
      }}
    >
      <div
        className={`past__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        <img className={promoImageProps.class} src={promoImageProps.src} alt={auction.name} />
      </div>
      <div className="past__auction__details">
        <div className="title">
          <h2>{auction.name}</h2>
        </div>
        <div className="creator">
          <img src={loggedInArtist.avatar} alt={loggedInArtist.name} />
          <span>by</span>
          <a
            aria-hidden="true"
            onClick={() =>
              history.push(`/${loggedInArtist.name.split(' ')[0]}`, {
                id: loggedInArtist.id,
              })
            }
          >
            {loggedInArtist.name}
          </a>
        </div>
        <div className="statistics">
          <div>
            <label>Winners</label>
            <p>{winnersCount}</p>
          </div>
          <div>
            <label>Highest Winning Bid:</label>
            {bids.highestBidInUsd ? (
              <p>
                <img src={tokenLogo.img} alt={tokenSymbol} />
                {bids.highestBid} <span>{`~$${Math.round(bids.highestBidInUsd)}`}</span>
              </p>
            ) : null}
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            {nftsPerWinnerMarkup}
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            {bids.lowestBidInUsd ? (
              <p>
                <img src={tokenLogo.img} alt={tokenSymbol} />
                {bids.lowestBid} <span>{`~$${Math.round(bids.lowestBidInUsd)}`}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

PastAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default PastAuctionCard;
