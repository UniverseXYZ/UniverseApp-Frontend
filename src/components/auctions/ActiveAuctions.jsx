import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import { intervalToDuration, format } from 'date-fns';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import icon from '../../assets/images/auction_icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import copyIcon from '../../assets/images/copy1.svg';
import Input from '../input/Input.jsx';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation.jsx';
import Button from '../button/Button';
import searchIconGray from '../../assets/images/search-gray.svg';
import { isAfterNow, isBeforeNow } from '../../utils/dates';
import { useAuthContext } from '../../contexts/AuthContext';
import AuctionsCardSkeleton from '../auctionsCard/skeleton/AuctionsCardSkeleton.jsx';
import NoAuctionsFound from './NoAuctionsFound';
import { getActiveAuctions } from '../../utils/api/auctions';

const ActiveAuctions = () => {
  const { ethPrice, loggedInArtist } = useAuthContext();
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [shownActionId, setShownActionId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState({
    state: false,
    index: null,
  });
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await getActiveAuctions();
      if (!response.auctions?.length) {
        setNotFound(true);
        setLoading(false);
      } else {
        setActiveAuctions(response.auctions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newAuctions = activeAuctions;
    const draggingAuction = newAuctions.splice(source.index, 1);
    newAuctions.splice(destination.index, 0, draggingAuction[0]);

    setActiveAuctions(newAuctions);
  };

  const getTotalNFTSperAuction = (auction) => {
    let nftsCount = 0;
    auction?.rewardTiers?.forEach((tier) => {
      nftsCount += tier.numberOfWinners * tier.nftsPerWinner;
    });
    return nftsCount;
  };

  useEffect(() => {
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  }, []);

  const handleAuctionExpand = (name) => {
    const canExpandAuction = !name || name !== shownActionId;
    if (canExpandAuction) {
      setShownActionId(name);
    } else {
      setShownActionId(null);
    }
  };

  return (
    <div className="active-auctions">
      <div className="input-search">
        <div className="input--section">
          <Input
            className="searchInp"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchByName}
            placeholder="Search by name"
            hoverBoxShadowGradient
          />
          <img src={searchIconGray} alt="search" />
        </div>
      </div>
      {!loading ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableId">
            {(provided) => (
              <div key={uuid()} ref={provided.innerRef} {...provided.droppableProps}>
                {activeAuctions
                  .slice(offset, offset + perPage)
                  .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
                  .filter((item) => item && isBeforeNow(item.startDate) && isAfterNow(item.endDate))
                  .map((activeAuction, index) => {
                    const { days, hours, minutes, seconds } = intervalToDuration({
                      start: new Date(activeAuction.endDate),
                      end: new Date(),
                    });

                    const startDate = format(new Date(activeAuction.startDate), 'MMMM dd, HH:mm');
                    const endDate = format(new Date(activeAuction.endDate), 'MMMM dd, HH:mm');

                    const auctionTotalNfts = activeAuction.rewardTiers
                      .map((tier) => tier.nfts.length)
                      .reduce((totalNfts, currentNftsCount) => totalNfts + currentNftsCount, 0);

                    return (
                      <Draggable draggableId={activeAuction.name} index={index} key={uuid()}>
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
                                          <img
                                            src={copyIcon}
                                            alt="Copy to clipboard icon"
                                            className="copyImg"
                                          />
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
                                  onClick={() =>
                                    history.push(`/${loggedInArtist.name}/${activeAuction.link}`)
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
                                  onClick={() =>
                                    history.push(`/${loggedInArtist.name}/${activeAuction.link}`)
                                  }
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
                                {isAfterNow(activeAuction.startDate) ? (
                                  <p>
                                    Auction starts in{' '}
                                    <b>{`${days}d : ${hours}h : ${minutes}m : ${seconds}s`}</b>
                                  </p>
                                ) : (
                                  <p>
                                    Auction ends in{' '}
                                    <b>{`${days}d : ${hours}h : ${minutes}m : ${seconds}s`}</b>
                                  </p>
                                )}
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
                                        activeAuction.bids.highestBid *
                                        ethPrice.market_data.current_price.usd
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
                                        activeAuction.bids.totalBids *
                                        ethPrice.market_data.current_price.usd
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
                                        activeAuction.bids.lowestBid *
                                        ethPrice.market_data.current_price.usd
                                      ).toFixed(2)}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              hidden={shownActionId !== activeAuction.name}
                              className="auctions-tier"
                            >
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
                                      <div className="tier-image" key={uuid()}>
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
                  })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <AuctionsCardSkeleton variant="active" />
      )}
      {notFound && <NoAuctionsFound title="No active auctions found" />}
      <div className="pagination__container">
        <Pagination data={activeAuctions} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default ActiveAuctions;
