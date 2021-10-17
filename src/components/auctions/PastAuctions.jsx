import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import moment from 'moment';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import searchIcon from '../../assets/images/search-gray.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import Input from '../input/Input.jsx';
import copyIcon from '../../assets/images/copy1.svg';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation.jsx';

const PastAuctions = ({ myAuctions, setMyAuctions }) => {
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
        .filter((item) => item && moment(item.endDate).isBefore(moment.now()))
        .map((pastAuction, index) => {
          const auctionTotalNfts = pastAuction.rewardTiers
            .map((tier) => tier.nfts.length)
            .reduce((totalNfts, currentNftsCount) => totalNfts + currentNftsCount, 0);

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
                      <Moment format="MMMM DD, HH:mm">{pastAuction.startDate}</Moment>
                    </b>
                  </p>
                </div>
                <div className="total-dates">
                  <p>
                    End date:{' '}
                    <b>
                      <Moment format="MMMM DD, HH:mm">{pastAuction.endDate}</Moment>
                    </b>
                  </p>
                </div>
              </div>
              <div className="bid_info">
                <div className="bids first">
                  <div className="boredred-div">
                    <span className="head">Total bids</span>
                    <span className="value">120</span>
                  </div>
                  <div>
                    <span className="head">Highest winning bid</span>
                    <span className="value">
                      <img src={bidIcon} alt="Highest winning bid" />
                      14 ETH
                      <span className="dollar-val"> ~$41,594</span>
                    </span>
                  </div>
                </div>

                <div className="bids">
                  <div className="boredred-div">
                    <span className="head">Total bids amount</span>
                    <span className="value">
                      <img src={bidIcon} alt="Total bids amount" />
                      14 ETH
                      <span className="dollar-val"> ~$41,594</span>
                    </span>
                  </div>
                  <div>
                    <span className="head">Lower winning bid</span>
                    <span className="value">
                      <img src={bidIcon} alt="Lower winning bid" />
                      14 ETH
                      <span className="dollar-val"> ~$41,594</span>
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
