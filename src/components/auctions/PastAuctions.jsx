import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import searchIcon from '../../assets/images/search-gray.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import Input from '../input/Input.jsx';
import copyIcon from '../../assets/images/copy1.svg';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation.jsx';
import { isBeforeNow } from '../../utils/dates';
import { useAuthContext } from '../../contexts/AuthContext';

const PastAuctions = ({ myAuctions, setMyAuctions }) => {
  const { ethPrice } = useAuthContext();
  const [shownActionId, setShownActionId] = useState(null);
  const [copied, setCopied] = useState({
    state: false,
    index: null,
  });
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const handleAuctionExpand = (id) => {
    const canExpandAuction = !id || id !== shownActionId;
    if (canExpandAuction) {
      setShownActionId(id);
    } else {
      setShownActionId(null);
    }
  };

  const getTotalBidsAmount = (auction) => {
    let totalBidsAmount = 0;
    auction.bids.forEach((bid) => {
      totalBidsAmount += bid.amount;
    });
    return totalBidsAmount.toFixed(2);
  };

  const getHighestWinBid = (auction) => {
    let highestWinBid = 0;
    auction.bids.forEach((bid) => {
      if (bid.amount > highestWinBid) {
        highestWinBid = bid.amount;
      }
    });
    return highestWinBid.toFixed(2);
  };

  const getLowestBid = (auction) => {
    let lowestBid = auction.bids[0].amount;
    auction.bids.forEach((bid) => {
      if (bid.amount < lowestBid) {
        lowestBid = bid.amount;
      }
    });
    return lowestBid.toFixed(2);
  };

  return (
    <div className="past-auctions">
      <div className="input-search">
        <div className="input--section">
          <Input
            className="searchInp"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchByName}
            placeholder="Search"
            hoverBoxShadowGradient
          />
          <img src={searchIcon} alt="search" />
        </div>
      </div>
      {myAuctions
        .slice(offset, offset + perPage)
        .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
        .filter((item) => item && isBeforeNow(item.endDate))
        .map((pastAuction, index) => {
          const auctionTotalNfts = pastAuction.rewardTiers
            .map((tier) => tier.nfts.length)
            .reduce((totalNfts, currentNftsCount) => totalNfts + currentNftsCount, 0);

          const startDate = format(new Date(pastAuction.startDate), 'MMMM dd, HH:mm');
          const endDate = format(new Date(pastAuction.endDate), 'MMMM dd, HH:mm');

          return (
            <div className="auction past-auction" key={pastAuction.id}>
              <div className="auction-header">
                <div className="img_head">
                  <h3>{pastAuction.name}</h3>
                  <div className="copy-div">
                    <div className="copy" title="Copy to clipboard">
                      {copied.state && copied.index === index && (
                        <div className="copied-div">
                          URL copied!
                          <span />
                        </div>
                      )}
                      {pastAuction.artist ? (
                        <CopyToClipboard
                          text={`${pastAuction.link.replace(
                            'universe.xyz',
                            window.location.origin
                          )}`}
                          onCopy={() => {
                            setCopied({
                              state: true,
                              index,
                            });
                            setTimeout(() => {
                              setCopied({
                                state: false,
                                index: null,
                              });
                            }, 1000);
                          }}
                        >
                          <span>
                            <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                            Copy URL
                          </span>
                        </CopyToClipboard>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="launch-auction">
                  <div
                    className="arrow"
                    onClick={() => handleAuctionExpand(pastAuction.id)}
                    role="button"
                    tabIndex={0}
                    aria-hidden
                  >
                    {shownActionId === pastAuction.id ? (
                      <img src={arrowUp} alt="Arrow up" aria-hidden="true" />
                    ) : (
                      <img src={arrowDown} alt="Arrow down" aria-hidden="true" />
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
                <div className="bids first">
                  <div className="boredred-div">
                    <span className="head">Total bids</span>
                    <span className="value">{pastAuction.bids.length}</span>
                  </div>
                  <div>
                    <span className="head">Highest winning bid</span>
                    <span className="value">
                      <img src={bidIcon} alt="Highest winning bid" />
                      {getHighestWinBid(pastAuction)} ETH
                      <span className="dollar-val">
                        ~$
                        {(
                          getHighestWinBid(pastAuction) * ethPrice.market_data.current_price.usd
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
                      {getTotalBidsAmount(pastAuction)} ETH
                      <span className="dollar-val">
                        ~$
                        {(
                          getTotalBidsAmount(pastAuction) * ethPrice.market_data.current_price.usd
                        ).toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="head">Lower winning bid</span>
                    <span className="value">
                      <img src={bidIcon} alt="Lower winning bid" />
                      {getLowestBid(pastAuction)} ETH
                      <span className="dollar-val">
                        ~$
                        {(
                          getLowestBid(pastAuction) * ethPrice.market_data.current_price.usd
                        ).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div hidden={shownActionId !== pastAuction.id} className="auctions-tier">
                {pastAuction.rewardTiers.map((tier) => (
                  <div className="tier" key={uuid()}>
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
                          <div className="tier-image" key={uuid()}>
                            <div className="tier-image-second" />
                            <div className="tier-image-first" />
                            <div className="tier-image-main">
                              <img src={imageUrl} alt={nft.name} />
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
        })}
      <div className="pagination__container">
        <Pagination data={myAuctions} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

PastAuctions.propTypes = {
  myAuctions: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setMyAuctions: PropTypes.func.isRequired,
};

export default PastAuctions;
