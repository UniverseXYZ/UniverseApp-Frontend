import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Animated } from 'react-animated-css';
import CopyToClipboard from 'react-copy-to-clipboard';
import AuctionCountdown from './AuctionCountdown';
import darkCopyIcon from '../../assets/images/copy.svg';
import lightCopyIcon from '../../assets/images/copy2.svg';

const AuctionHeader = ({
  onAuction,
  setSelectedAuctionEnded,
  hasAuctionStarted,
  setHasAuctionStarted,
  selectedAuctionEnded,
}) => {
  const history = useHistory();
  const [copied, setCopied] = useState(false);

  return (
    <>
      <div
        className={`auction__details__box__image ${
          onAuction.auction.promoImageUrl ? '' : 'show__avatar'
        }`}
      >
        {onAuction.auction.promoImageUrl ? (
          <img
            className="original"
            src={onAuction.auction.promoImageUrl}
            alt={onAuction.auction.headline}
          />
        ) : (
          <img
            className="artist__image"
            src={onAuction.artist.profileImageUrl}
            alt={onAuction.artist.displayName}
          />
        )}
      </div>
      <div className="auction__details__box__info">
        <h1 className="title">{onAuction.auction.headline}</h1>
        <div className="artist__details">
          <img src={onAuction.artist.profileImageUrl} alt={onAuction.artist.displayName} />
          <span>by</span>
          <button
            type="button"
            onClick={() => history.push(`/${onAuction.artist.universePageUrl}`)}
          >
            {onAuction.artist.displayName}
          </button>
        </div>
        <div className="auction__ends__in">
          {!selectedAuctionEnded ? (
            <AuctionCountdown
              startDate={onAuction.auction.startDate}
              endDate={onAuction.auction.endDate}
              setSelectedAuctionEnded={setSelectedAuctionEnded}
              hasAuctionStarted={hasAuctionStarted}
              setHasAuctionStarted={setHasAuctionStarted}
            />
          ) : (
            <Animated animationIn="zoomIn">
              <div className="auction__ended">Auction has ended</div>
            </Animated>
          )}
          <div className="copy-div">
            <div className="copy" title="Copy to clipboard">
              <div className="copied-div" hidden={!copied}>
                URL copied!
                <span />
              </div>
              <CopyToClipboard
                text={window.location.href}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              >
                <span>
                  {onAuction.auction.backgroundImageUrl ? (
                    <img src={lightCopyIcon} alt="Copy to clipboard icon" className="copyImg" />
                  ) : (
                    <img src={darkCopyIcon} alt="Copy to clipboard icon" className="copyImg" />
                  )}
                  Copy URL
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
AuctionHeader.propTypes = {
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedAuctionEnded: PropTypes.func.isRequired,
  hasAuctionStarted: PropTypes.bool.isRequired,
  selectedAuctionEnded: PropTypes.bool.isRequired,
  setHasAuctionStarted: PropTypes.func.isRequired,
};
export default AuctionHeader;
