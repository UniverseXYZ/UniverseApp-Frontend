import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import Button from '../button/Button';
import copyIcon from '../../assets/images/copy1.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import infoIcon from '../../assets/images/icon.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import NoAuctionsFound from './NoAuctionsFound';

const PastAuctionsCard = ({ auction }) => {
  const history = useHistory();

  const { loggedInArtist, ethPrice } = useAuthContext();

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAuctioneerTooltip, setShowAuctioneerTooltip] = useState(false);
  const [showRewardsTooltip, setShowRewardsTooltip] = useState(false);

  const auctionTotalNfts = auction.rewardTiers
    .map((tier) => tier.nfts.length)
    .reduce((totalNfts, currentNftsCount) => totalNfts + currentNftsCount, 0);
  const startDate = format(new Date(auction.startDate), 'MMMM dd, HH:mm');
  const endDate = format(new Date(auction.endDate), 'MMMM dd, HH:mm');

  console.log(auction);

  return (
    <div className="auction past-auction" key={auction.id}>
      <div className="past-left-border-effect" />
      <div className="auction-header">
        <div className="img_head">
          <h3>{auction.name}</h3>
          <div className="copy-div">
            <div className="copy" title="Copy to clipboard">
              {copiedUrl && (
                <div className="copied-div">
                  URL copied!
                  <span />
                </div>
              )}
              <CopyToClipboard
                text={`${window.location.origin}/${loggedInArtist.universePageAddress}/${auction.link}`}
                onCopy={() => {
                  setCopiedUrl(true);
                  setTimeout(() => {
                    setCopiedUrl(false);
                  }, 1000);
                }}
              >
                <span>
                  <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                  Copy URL
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="launch-auction">
          <Button
            className="light-border-button hide__on__mobile"
            onClick={() => history.push(`./${loggedInArtist.universePageAddress}/${auction.link}`)}
          >
            <span>Go to landing page</span>
          </Button>
          <div
            className="arrow"
            onClick={() => setShowMore(true)}
            role="button"
            tabIndex={0}
            aria-hidden
          >
            {showMore ? (
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
        <div className="total-dates">
          <p>
            Total NFTs: <b>{auctionTotalNfts}</b>
          </p>
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
          <span className="value">{auction.bids?.bidsCount}</span>
        </div>
        <div>
          <span className="head">Highest winning bid</span>
          <span className="value">
            <img src={bidIcon} alt="Highest winning bid" />
            {auction.bids.highestBid} ETH
            <span className="dollar-val">
              ~$
              {(auction?.bids?.highestBid * ethPrice?.market_data?.current_price?.usd)?.toFixed(2)}
            </span>
          </span>
        </div>

        <div className="boredred-div">
          <span className="head">Total bids amount</span>
          <span className="value">
            <img src={bidIcon} alt="Total bids amount" />
            {auction.bids.totalBids} ETH
            <span className="dollar-val">
              ~$
              {(auction?.bids?.totalBids * ethPrice?.market_data?.current_price?.usd)?.toFixed(2)}
            </span>
          </span>
        </div>
        <div>
          <span className="head">Lower winning bid</span>
          <span className="value">
            <img src={bidIcon} alt="Lower winning bid" />
            {auction.bids.lowestBid} ETH
            <span className="dollar-val">
              ~$
              {(auction?.bids?.lowestBid * ethPrice?.market_data?.current_price.usd)?.toFixed(2)}
            </span>
          </span>
        </div>
      </div>

      <div className="funds-and-balance">
        <div>
          <div className="unreleased-funds">
            <div className="head">
              <span>Unreleased funds</span>
              <span
                onMouseOver={() => setShowAuctioneerTooltip(true)}
                onFocus={() => setShowAuctioneerTooltip(true)}
                onMouseLeave={() => setShowAuctioneerTooltip(false)}
                onBlur={() => setShowAuctioneerTooltip(false)}
              >
                <img src={infoIcon} alt="Info Icon" />
              </span>
              {showAuctioneerTooltip === auction.id && (
                <div className="info-text1">
                  <p>
                    For the auctioneer to be able to collect their winnings and for the users to be
                    able to claim their NFTs the rewards need to be released first.
                  </p>
                </div>
              )}
            </div>
            <div className="balance-body">
              <span className="value-section">
                <img src={bidIcon} alt="unreleased funds" />
                <span className="value">
                  120.42
                  <span className="dollar-val">~$41,594</span>
                </span>
              </span>
              <Button className="light-button ">
                <span>Release rewards</span>
              </Button>
            </div>
          </div>
          <div className="available-balance">
            <div className="head">
              <span>Available balance</span>
              <span
                onMouseOver={() => setShowRewardsTooltip(true)}
                onFocus={() => setShowRewardsTooltip(true)}
                onMouseLeave={() => setShowRewardsTooltip(false)}
                onBlur={() => setShowRewardsTooltip(false)}
              >
                <img src={infoIcon} alt="Info Icon" />
              </span>
              {showRewardsTooltip === auction.id && (
                <div className="info-text2">
                  <p>This is the released reward amount availble for claiming</p>
                </div>
              )}
            </div>
            <div className="balance-body">
              <span className="value-section">
                <img src={bidIcon} alt="unreleased funds" />
                <span className="value">
                  14.24
                  <span className="dollar-val">~$41,594</span>
                </span>
              </span>
              <Button className="light-button ">
                <span>Claim funds</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="empty-section">
        <NoAuctionsFound
          title="The auction didn’t get bids on all the slots"
          desc="You can withdraw your NFTs by clicking a button below."
          btnText="Withdraw NFTs"
        />
      </div>
      {showMore ? (
        <div className="auctions-tier">
          {auction.rewardTiers.map((tier) => (
            <div className="tier" key={tier.id}>
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
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <div className="amount-of-editions">
                          <p>{nft.numberOfEditions}</p>
                        </div>
                        <img src={imageUrl} alt={nft.name} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
PastAuctionsCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default PastAuctionsCard;
