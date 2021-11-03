import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format } from 'date-fns';
import { Draggable } from 'react-beautiful-dnd';
import { useAuthContext } from '../../contexts/AuthContext';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import icon from '../../assets/images/auction_icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import copyIcon from '../../assets/images/copy1.svg';
import AuctionsTabsCountdown from '../auctions/AuctionsTabsCountdown';
import Button from '../button/Button';

const ActiveAuctionsTabsCard = ({ activeAuction, index }) => {
  const { ethPrice, loggedInArtist } = useAuthContext();
  const [shownActionId, setShownActionId] = useState(null);
  const [startDate, setStartDate] = useState(
    format(new Date(activeAuction.startDate), 'MMMM dd, HH:mm')
  );
  const [endDate, setEndDate] = useState(format(new Date(activeAuction.endDate), 'MMMM dd, HH:mm'));
  const history = useHistory();

  const [copied, setCopied] = useState({
    state: false,
    index: null,
  });

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
      nftsCount += tier.numberOfWinners * tier.nftsPerWinner;
    });
    return nftsCount;
  };

  return (
    <Draggable draggableId={activeAuction.name} index={index} key={activeAuction.id}>
      {(prov) => (
        <div
          className="auction active-auction"
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          ref={prov.innerRef}
        >
          <div className="active-left-border-effect" />
          <div className="auction-header">
            <div className="img_head">
              <div className="img_head_title">
                <img className="auctionIcon" src={icon} alt="auction" />
                <h3>{activeAuction.name}</h3>
              </div>
              <div className="copy-div">
                <div className="copy" title="Copy to clipboard">
                  {copied.state && copied.index === index && (
                    <div className="copied-div">
                      URL copied!
                      <span />
                    </div>
                  )}
                  {activeAuction.link ? (
                    <CopyToClipboard
                      text={`${window.location.origin}/${loggedInArtist.name}/${activeAuction.link}`}
                      onCopy={() => {
                        setCopied({
                          state: true,
                          index,
                        });
                        setTimeout(() => {
                          setCopied({
                            state: true,
                            index,
                          });
                        });
                      }}
                    >
                      <span>
                        <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                        Copy URL
                      </span>
                    </CopyToClipboard>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="launch-auction">
              <Button
                className="light-border-button hide__on__mobile"
                onClick={() => history.push(`/${loggedInArtist.name}/${activeAuction.link}`)}
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
                  <img src={arrowUp} alt="Arrow up" aria-hidden="true" />
                ) : (
                  <img src={arrowDown} alt="Arrow down" aria-hidden="true" />
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
              <AuctionsTabsCountdown activeAuction={activeAuction} showLabel />
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
            <div className="bids first">
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
                    {(
                      activeAuction.bids.highestBid * ethPrice.market_data.current_price.usd
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            <div className="bids">
              <div className="boredred-div">
                <span className="head">Total bids amount</span>
                <span className="value">
                  <img src={bidIcon} alt="Total bids amount" />
                  {activeAuction.bids.totalBids} ETH
                  <span className="dollar-val">
                    ~$
                    {(
                      activeAuction.bids.totalBids * ethPrice.market_data.current_price.usd
                    ).toFixed(2)}
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
                    {(
                      activeAuction.bids.lowestBid * ethPrice.market_data.current_price.usd
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
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
                  {tier.nfts.map((nft) => (
                    <div className="tier-image" key={nft.id}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft.optimized_url} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

ActiveAuctionsTabsCard.propTypes = {
  activeAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
};

export default ActiveAuctionsTabsCard;
