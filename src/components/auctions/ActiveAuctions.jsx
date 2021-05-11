import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Moment from 'react-moment';
import moment from 'moment';
import uuid from 'react-uuid';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import { ACTIVE_ACTIONS_DATA } from '../../utils/fixtures/AuctionsDummyData';
import icon from '../../assets/images/auction_icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import copyIcon from '../../assets/images/copy1.svg';
import Input from '../input/Input';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation';

const ActiveAuctions = ({ myAuctions, setMyAuctions }) => {
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

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newAuctions = myAuctions;
    const draggingAuction = newAuctions.splice(source.index, 1);
    newAuctions.splice(destination.index, 0, draggingAuction[0]);

    setMyAuctions(newAuctions);
  };

  useEffect(() => {
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  }, []);

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableId">
          {(provided) => (
            <div key={uuid()} ref={provided.innerRef} {...provided.droppableProps}>
              {myAuctions
                .slice(offset, offset + perPage)
                .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
                .filter(
                  (item) =>
                    moment(item.endDate).isAfter(moment.now()) &&
                    (moment(item.endDate).diff(moment(item.startDate)) > 0 &&
                      moment(item.startDate).isBefore(moment.now())) > 0 &&
                    item.launch
                )
                .slice(offset, offset + perPage)
                .map((activeAuction, index) => (
                  <Draggable draggableId={activeAuction.name} index={index} key={uuid()}>
                    {(prov) => (
                      <div
                        className="auction active-auction"
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        ref={prov.innerRef}
                      >
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
                                  text={`${window.location.origin}/${activeAuction.link}`}
                                  onCopy={() => {
                                    setCopied(true);
                                    setTimeout(() => {
                                      setCopied(false);
                                    }, 1000);
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
                              </div>
                            </div>
                          </div>
                          <div className="launch-auction">
                            {shownActionId === activeAuction.name ? (
                              <img
                                src={arrowUp}
                                onClick={() => setShownActionId(null)}
                                alt="Arrow up"
                                aria-hidden="true"
                              />
                            ) : (
                              <img
                                src={arrowDown}
                                onClick={() => setShownActionId(activeAuction.name)}
                                alt="Arrow down"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>
                        <div className="auctions-launch-dates">
                          <div className="total-dates">
                            <p>
                              Total NFTs: <b>45</b>
                            </p>
                          </div>
                          <div className="total-dates">
                            <p>
                              Auction ends in{' '}
                              <b>
                                {moment
                                  .utc(
                                    moment(activeAuction.endDate).diff(
                                      moment(activeAuction.startDate)
                                    )
                                  )
                                  .format('H : mm : ss')}
                              </b>
                            </p>
                          </div>
                          <div className="total-dates">
                            <p>
                              Launch date:{' '}
                              <b>
                                {' '}
                                <Moment format="MMMM DD, hh:mm">{activeAuction.startDate}</Moment>
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
                        <div
                          hidden={shownActionId !== activeAuction.name}
                          className="auctions-tier"
                        >
                          {activeAuction.tiers.map((tier) => (
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
                                    Total NFTs: <b>45</b>
                                  </p>
                                </div>
                              </div>
                              <div className="tier-body">
                                {tier.nfts.map((nft) => (
                                  <div className="tier-image" key={uuid()}>
                                    <div className="tier-image-second" />
                                    <div className="tier-image-first" />
                                    <div className="tier-image-main">
                                      <img src={URL.createObjectURL(nft.previewImage)} alt="NFT" />
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
                ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="pagination__container">
        <Pagination data={myAuctions} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

ActiveAuctions.propTypes = {
  myAuctions: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setMyAuctions: PropTypes.func.isRequired,
};

export default ActiveAuctions;
