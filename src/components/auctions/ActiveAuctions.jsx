import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import moment from 'moment';
import Button from '../button/Button';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import infoIconRed from '../../assets/images/Vector.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import { AUCTIONS_DATA } from '../../utils/fixtures/AuctionsDummyData';
import { ACTIVE_ACTIONS_DATA } from '../../utils/fixtures/AuctionsDummyData';
import icon from '../../assets/images/auction_icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import copyIcon from '../../assets/images/copy1.svg';
import Input from '../input/Input';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation';

const ActiveAuctions = () => {
  const [shownActionId, setShownActionId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const clearInput = () => {
    setSearchByName('');
  };

  return (
    <div className="active-auctions">
      <div className="input-search">
        <button type="button" onClick={clearInput} className="clear-input">
          Clear
        </button>
        <img src={searchIcon} alt="search" />
        <Input
          className="searchInp"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchByName}
          placeholder="Search by name"
        />
      </div>
      {ACTIVE_ACTIONS_DATA.slice(offset, offset + perPage)
        .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
        .slice(offset, offset + perPage)
        .map((activeAuction) => (
          <div className="auction active-auction" key={activeAuction.id}>
            <div className="auction-header">
              <div className="img_head">
                <div className="img_head_title">
                  <img className="auctionIcon" src={icon} alt="auction" />
                  <h3>{activeAuction.name}</h3>
                </div>
                <div className="copy-div">
                  <div className="copy" title="Copy to clipboard">
                    <div className="copied-div" hidden={!copied}>
                      URL copied!
                      <span />
                    </div>
                    <CopyToClipboard
                      text={activeAuction.auctionLink}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
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
                {shownActionId === activeAuction.id ? (
                  <img
                    src={arrowUp}
                    onClick={() => setShownActionId(null)}
                    alt="Arrow up"
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    src={arrowDown}
                    onClick={() => setShownActionId(activeAuction.id)}
                    alt="Arrow down"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            <div className="auctions-launch-dates">
              <div className="total-dates">
                <p>
                  Total NFTs: <b>{activeAuction.totalNFTs}</b>
                </p>
              </div>
              <div className="total-dates">
                <p>
                  Auction ends in{' '}
                  <b>
                    {moment
                      .utc(moment(activeAuction.endDate).diff(moment(activeAuction.launchDate)))
                      .format('H : mm : ss')}
                  </b>
                </p>
              </div>
              <div className="total-dates">
                <p>
                  Launch date:{' '}
                  <b>
                    {' '}
                    <Moment format="MMMM DD, hh:mm">{activeAuction.launchDate}</Moment>
                  </b>
                </p>
              </div>
              <div className="total-dates">
                <p>
                  End date:{' '}
                  <b>
                    <Moment format="MMMM DD, hh:mm">{activeAuction.endDate}</Moment>
                  </b>
                </p>
              </div>
            </div>
            <div className="bid_info">
              <div className="bids first">
                <div className="boredred-div">
                  <span className="head">Total bids</span>
                  <span className="value">{activeAuction.total_bids}</span>
                </div>
                <div>
                  <span className="head">Highest winning bid</span>
                  <span className="value">
                    <img src={bidIcon} alt="Highest winning bid" />{' '}
                    {activeAuction.highest_winning_bid} ETH{' '}
                    <span className="dollar-val"> ~$41,594</span>
                  </span>
                </div>
              </div>

              <div className="bids">
                <div className="boredred-div">
                  <span className="head">Total bids amount</span>
                  <span className="value">
                    <img src={bidIcon} alt="Total bids amount" />
                    {activeAuction.total_bids_amount} ETH{' '}
                    <span className="dollar-val"> ~$41,594</span>
                  </span>
                </div>
                <div>
                  <span className="head">Lower winning bid</span>
                  <span className="value">
                    <img src={bidIcon} alt="Lower winning bid" />
                    {activeAuction.lower_winning_bid} ETH{' '}
                    <span className="dollar-val"> ~$41,594</span>
                  </span>
                </div>
              </div>
            </div>
            <div hidden={shownActionId !== activeAuction.id} className="auctions-tier">
              <div className="tier">
                <div className="tier-header">
                  <h3>{activeAuction.platinumTier.name}</h3>
                  <div className="tier-header-description">
                    <p>
                      NFTs per winner: <b>{activeAuction.platinumTier.nftsPerWinner}</b>
                    </p>
                    <p>
                      Winners: <b>{activeAuction.platinumTier.winners}</b>
                    </p>
                    <p>
                      Total NFTs: <b>{activeAuction.platinumTier.totalNFTs}</b>
                    </p>
                  </div>
                </div>
                <div className="tier-body">
                  {activeAuction.platinumTier.nfts.map((nft, index) => (
                    <div className="tier-image" key={index}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tier">
                <div className="tier-header">
                  <h3>{activeAuction.goldTier.name}</h3>
                  <div className="tier-header-description">
                    <p>
                      NFTs per winner: <b>{activeAuction.goldTier.nftsPerWinner}</b>
                    </p>
                    <p>
                      Winners: <b>{activeAuction.goldTier.winners}</b>
                    </p>
                    <p>
                      Total NFTs: <b>{activeAuction.goldTier.totalNFTs}</b>
                    </p>
                  </div>
                </div>
                <div className="tier-body">
                  {activeAuction.goldTier.nfts.map((nft, index) => (
                    <div className="tier-image" key={index}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tier">
                <div className="tier-header">
                  <h3>{activeAuction.silverTier.name}</h3>
                  <div className="tier-header-description">
                    <p>
                      NFTs per winner: <b>{activeAuction.silverTier.nftsPerWinner}</b>
                    </p>
                    <p>
                      Winners: <b>{activeAuction.silverTier.winners}</b>
                    </p>
                    <p>
                      Total NFTs: <b>{activeAuction.silverTier.totalNFTs}</b>
                    </p>
                  </div>
                </div>
                <div className="tier-body">
                  {activeAuction.silverTier.nfts.map((nft, index) => (
                    <div className="tier-image" key={index}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="pagination__container">
        <Pagination data={ACTIVE_ACTIONS_DATA} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default ActiveAuctions;
