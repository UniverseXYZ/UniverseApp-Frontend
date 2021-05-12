import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import moment from 'moment';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import infoIconRed from '../../assets/images/Vector.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import doneIcon from '../../assets/images/Completed.svg';
import { AUCTIONS_DATA, PAST_ACTIONS_DATA } from '../../utils/fixtures/AuctionsDummyData';
import icon from '../../assets/images/auction_icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import Input from '../input/Input';
import copyIcon from '../../assets/images/copy1.svg';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation';
import MyAccount from '../../containers/myAccount/MyAccount';

const PastAuctions = ({ myAuctions, setMyAuctions }) => {
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

  useEffect(() => {
    console.log('myAuctions', myAuctions);
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  }, []);

  return (
    <div className="past-auctions">
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
      {myAuctions
        .slice(offset, offset + perPage)
        .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
        .filter((item) => moment(item.endDate).isBefore(moment.now()) && item.launch)
        .map((pastAuction) => (
          <div className="auction past-auction" key={pastAuction.id}>
            <div className="auction-header">
              <div className="img_head">
                {/* <img className='auctionIcon' src={icon} alt='auction'/> */}
                <h3>{pastAuction.name}</h3>
                <div className="copy-div">
                  <div className="copy" title="Copy to clipboard">
                    <div className="copied-div" hidden={!copied}>
                      URL copied!
                      <span />
                    </div>
                    <CopyToClipboard
                      text={`${window.location.origin}/${pastAuction.link}`}
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
                {shownActionId === pastAuction.id ? (
                  <img
                    src={arrowUp}
                    onClick={() => setShownActionId(null)}
                    alt="Arrow up"
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    src={arrowDown}
                    onClick={() => setShownActionId(pastAuction.id)}
                    alt="Arrow down"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            <div className="auctions-launch-dates">
              <div className="total-dates">
                <p>
                  Total NFTs: <b>{pastAuction.totalNFTs}</b>
                </p>
              </div>
              <div className="total-dates">
                <p>
                  Launch date:{' '}
                  <b>
                    {' '}
                    <Moment format="MMMM DD, hh:mm">{pastAuction.startDate}</Moment>
                  </b>
                </p>
              </div>
              <div className="total-dates">
                <p>
                  End date:{' '}
                  <b>
                    <Moment format="MMMM DD, hh:mm">{pastAuction.endDate}</Moment>
                  </b>
                </p>
              </div>
            </div>
            <div className="bid_info">
              <div className="bids first">
                <div className="boredred-div">
                  <span className="head">Total bids</span>
                  <span className="value">{pastAuction.total_bids}</span>
                </div>
                <div>
                  <span className="head">Highest winning bid</span>
                  <span className="value">
                    <img src={bidIcon} alt="Highest winning bid" />{' '}
                    {pastAuction.highest_winning_bid} ETH{' '}
                    <span className="dollar-val"> ~$41,594</span>
                  </span>
                </div>
              </div>

              <div className="bids">
                <div className="boredred-div">
                  <span className="head">Total bids amount</span>
                  <span className="value">
                    <img src={bidIcon} alt="Total bids amount" />
                    {pastAuction.total_bids_amount} ETH{' '}
                    <span className="dollar-val"> ~$41,594</span>
                  </span>
                </div>
                <div>
                  <span className="head">Lower winning bid</span>
                  <span className="value">
                    <img src={bidIcon} alt="Lower winning bid" />
                    {pastAuction.lower_winning_bid} ETH{' '}
                    <span className="dollar-val"> ~$41,594</span>
                  </span>
                </div>
              </div>
            </div>
            <div hidden={shownActionId !== pastAuction.id} className="auctions-tier">
              {pastAuction.tiers.map((tier) => (
                <div className="tier">
                  <div className="tier-header">
                    <h3>{tier.name}</h3>
                    <div className="tier-header-description">
                      <p>
                        NFTs per winner: <b>{tier.nftsPerWinner}</b>
                      </p>
                      <p>
                        Winners: <b>{tier.winners}</b>
                      </p>
                      <p>
                        Total NFTs: <b>{tier.winners * tier.nftsPerWinner}</b>
                      </p>
                    </div>
                  </div>
                  <div className="tier-body">
                    {tier.nfts.map((nft) => (
                      <div className="tier-image" key={uuid()}>
                        <div className="tier-image-second" />
                        <div className="tier-image-first" />
                        <div className="tier-image-main">
                          <img src={nft} alt="NFT" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
