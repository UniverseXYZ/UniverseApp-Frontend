import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuthContext } from '../../contexts/AuthContext';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import AuctionsTabsCountdown from '../auctions/AuctionsTabsCountdown';
import Button from '../button/Button';
import {
  disconnectAuctionSocket,
  initiateAuctionSocket,
  removeAllListeners,
  subscribeToBidSubmitted,
  subscribeToBidWithdrawn,
} from '../../utils/websockets/auctionEvents';

const ActiveAuctionsTabsCard = ({ activeAuction, setActiveAuctions, removeAuction }) => {
  const { ethPrice, loggedInArtist } = useAuthContext();
  const [shownActionId, setShownActionId] = useState(null);
  const [startDate, setStartDate] = useState(
    format(new Date(activeAuction.startDate), 'MMMM dd, HH:mm')
  );
  const [endDate, setEndDate] = useState(format(new Date(activeAuction.endDate), 'MMMM dd, HH:mm'));
  const history = useHistory();

  const handleAuctionExpand = (name) => {
    const canExpandAuction = !name || name !== shownActionId;
    if (canExpandAuction) {
      setShownActionId(name);
    } else {
      setShownActionId(null);
    }
  };

  const getTotalNFTSperAuction = (auction) => {
    let nftsCount = 0;
    auction?.rewardTiers?.forEach((tier) => {
      nftsCount += tier.nfts.length;
    });
    return nftsCount;
  };

  const handleBidSubmittedEvent = (err, { user, amount, userProfile, bids }) => {
    setActiveAuctions((upToDateAuctions) => {
      const newAuctions = [...upToDateAuctions];
      const updatedAuctions = newAuctions.map((auction) => {
        const updatedAuction = { ...auction };
        if (updatedAuction.id === activeAuction.id) {
          updatedAuction.bids = bids;
        }
        return updatedAuction;
      });
      return updatedAuctions;
    });
  };

  const handleBidWithdrawnEvent = (err, { user, amount, userProfile, bids }) => {
    if (bids) {
      setActiveAuctions((upToDateAuctions) => {
        const newAuctions = [...upToDateAuctions];
        const updatedAuctions = newAuctions.map((auction) => {
          const updatedAuction = { ...auction };
          if (updatedAuction.id === activeAuction.id) {
            updatedAuction.bids = bids;
          }
          return updatedAuction;
        });
        return updatedAuctions;
      });
    }
  };

  useEffect(() => {
    if (activeAuction.id) {
      initiateAuctionSocket();
      removeAllListeners(activeAuction.id);

      subscribeToBidSubmitted(activeAuction.id, handleBidSubmittedEvent);
      subscribeToBidWithdrawn(activeAuction.id, handleBidWithdrawnEvent);
    }

    return () => {
      disconnectAuctionSocket();
    };
  }, [activeAuction.id]);

  return (
    <div className="auction active-auction">
      <div className="active-left-border-effect" />
      <div className="auction-header">
        <div className="img_head">
          <div className="img_head_title">
            <h3>{activeAuction.name}</h3>
          </div>
        </div>
        <div className="launch-auction">
          <Button
            className="light-border-button hide__on__mobile"
            onClick={() =>
              history.push(`/${loggedInArtist.universePageAddress}/${activeAuction.link}`)
            }
          >
            <span>Go to landing page</span>
          </Button>
          <div
            className="arrow"
            onClick={() => handleAuctionExpand(activeAuction.name)}
            role="button"
            tabIndex={0}
            aria-hidden
          >
            {shownActionId === activeAuction.name ? (
              <>
                <span className="tooltiptext">Show less</span>
                <img src={arrowUp} alt="Arrow up" aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="tooltiptext">Show more</span>
                <img src={arrowDown} alt="Arrow down" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="auctions-launch-dates">
        <div className="show__on__mobile">
          <Button
            className="light-border-button"
            onClick={() => history.push(`/${loggedInArtist.name}/${activeAuction.link}`)}
          >
            <span>Go to landing page</span>
          </Button>
        </div>
        <div className="total-dates">
          <p>
            Total NFTs: <b>{getTotalNFTSperAuction(activeAuction)}</b>
          </p>
        </div>
        <div className="total-dates">
          <AuctionsTabsCountdown
            activeAuction={activeAuction}
            removeAuction={removeAuction}
            showLabel
          />
        </div>
        <div className="total-dates">
          <p>
            Launch date:{' '}
            <b>
              {' '}
              <time>{startDate}</time>
            </b>
          </p>
        </div>
        <div className="total-dates">
          <p>
            End date:{' '}
            <b>
              <time>{endDate}</time>
            </b>
          </p>
        </div>
      </div>
      <div className="bid_info">
        <div className="boredred-div">
          <span className="head">Total bids</span>
          <span className="value">{activeAuction.bids.bidsCount}</span>
        </div>
        <div>
          <span className="head">Highest winning bid</span>
          <span className="value">
            <img src={bidIcon} alt="Highest winning bid" />
            {activeAuction.bids.highestBid} ETH
            <span className="dollar-val">
              ~$
              {(activeAuction.bids.highestBid * ethPrice.market_data.current_price.usd).toFixed(2)}
            </span>
          </span>
        </div>

        <div className="boredred-div">
          <span className="head">Total bids amount</span>
          <span className="value">
            <img src={bidIcon} alt="Total bids amount" />
            {activeAuction.bids.totalBids} ETH
            <span className="dollar-val">
              ~$
              {(activeAuction.bids.totalBids * ethPrice.market_data.current_price.usd).toFixed(2)}
            </span>
          </span>
        </div>
        <div>
          <span className="head">Lower winning bid</span>
          <span className="value">
            <img src={bidIcon} alt="Lower winning bid" />
            {activeAuction.bids.lowestBid} ETH
            <span className="dollar-val">
              ~$
              {(activeAuction.bids.lowestBid * ethPrice.market_data.current_price.usd).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
      <div hidden={shownActionId !== activeAuction.name} className="auctions-tier">
        {activeAuction.rewardTiers.map((tier) => (
          <div className="tier">
            <div className="tier-header">
              <h3>{tier.name}</h3>
              <div className="tier-header-description">
                <p>
                  NFTs per winner: <b>{tier.nftsPerWinner}</b>
                </p>
                <p>
                  Winners: <b>{tier.numberOfWinners || ''}</b>
                </p>
                <p>
                  Total NFTs: <b>{tier.nfts?.length}</b>
                </p>
              </div>
            </div>
            <div className="tier-body">
              {tier.nfts.map((nft) => {
                const imageUrl = nft.thumbnail_url ? nft.thumbnail_url : '';

                return (
                  <div className="tier-image" key={nft.id}>
                    {nft?.numberOfEditions > 2 && <div className="tier-image-second" />}
                    {nft?.numberOfEditions > 1 && <div className="tier-image-first" />}
                    <div className="tier-image-main">
                      <div className="amount-of-editions">
                        <p>{nft?.numberOfEditions}</p>
                      </div>
                      {nft.artworkType === 'mp4' ? (
                        <>
                          <video
                            aria-hidden
                            className="preview-video"
                            onMouseOver={(event) => event.target.play()}
                            onFocus={(event) => event.target.play()}
                            onMouseOut={(event) => event.target.pause()}
                            onBlur={(event) => event.target.pause()}
                          >
                            <source src={nft.thumbnail_url} type="video/mp4" />
                            <track kind="captions" />
                            Your browser does not support the video tag.
                          </video>
                          <img className="video-icon" src={videoIcon} alt="Video Icon" />
                        </>
                      ) : (
                        <>
                          <img src={imageUrl} alt={nft.name} />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ActiveAuctionsTabsCard.propTypes = {
  activeAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setActiveAuctions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  removeAuction: PropTypes.func,
};

ActiveAuctionsTabsCard.defaultProps = {
  removeAuction: () => {},
};

export default ActiveAuctionsTabsCard;
