import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cancelIcon from '../../assets/images/activity-icons/cancel-bid.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import universeIcon from '../../assets/images/universe-img.svg';
import arrowDownIcon from '../../assets/images/arrow-down.svg';
import { shortenEthereumAddress } from '../../utils/helpers/format.js';

const TopBidders = ({
  bidders,
  currentBid,
  selectedAuctionEnded,
  rewardTiersSlots,
  setShowBidPopup,
  setShowBidRankings,
  canPlaceBids,
  getRewardTierSpanStyles,
  ethPrice,
  isWinningBid,
  currencyIcon,
  collections,
  setShowCancelBidPopup,
}) => {
  const [openSlots, setOpenSlots] = useState([]);

  const toggleOpenSlot = (slotIndex) => {
    const isSlotOpened = openSlots.indexOf(slotIndex) >= 0;
    if (isSlotOpened) {
      const newSlots = [...openSlots];
      const indexOfSlot = newSlots.indexOf(slotIndex);
      newSlots.splice(indexOfSlot, 1);
      setOpenSlots(newSlots);
    } else {
      const newSlots = [...openSlots];
      newSlots.push(slotIndex);
      setOpenSlots(newSlots);
    }
  };

  return (
    <div className="auction__details__box__top__bidders">
      <div className="auction__details__box__top__bidders__header">
        <h2 className="title">Top 5 bidders</h2>
        <button type="button" className="view__all__bids" onClick={() => setShowBidRankings(true)}>
          View all bids
        </button>
      </div>
      <div className="auction__details__box__top__bidders__content">
        <div className="five__bidders">
          {bidders.slice(0, 5).map((bidder, index) => {
            const isSlotOpened = openSlots.indexOf(index) >= 0;

            return (
              <>
                <div className="bidder" key={bidder.id}>
                  <div className="name">
                    <b>{`${index + 1}.`}</b>
                    {bidder.user.displayName
                      ? bidder.user.displayName
                      : shortenEthereumAddress(bidder.user.address)}

                    {rewardTiersSlots[index] ? (
                      <span style={getRewardTierSpanStyles(rewardTiersSlots[index])}>
                        {rewardTiersSlots[index].name}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="bid-container">
                    <div className="bid">
                      <img src={currencyIcon} alt="Currency" />
                      <b>{bidder.amount}</b>
                      <span>~${Math.round(bidder.amount * ethPrice)}</span>
                    </div>
                    {rewardTiersSlots[index] ? (
                      <div
                        className={`arrow ${isSlotOpened ? 'opened' : ''}`}
                        aria-hidden="true"
                        onClick={() => toggleOpenSlot(index)}
                      >
                        <img src={arrowDownIcon} alt="Arrow down" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {isSlotOpened ? (
                  <div className="nfts">
                    {rewardTiersSlots[index].nfts.map((nft) => {
                      const collection = collections.find((c) => c.id === nft.collectionId);
                      const nftUrl = `${window.location.origin}/nft/${collection.address}/${nft.tokenId}`;
                      const { artworkType } = nft;
                      const nftIsImage =
                        artworkType === 'png' ||
                        artworkType === 'jpg' ||
                        artworkType === 'jpeg' ||
                        artworkType === 'mpeg' ||
                        artworkType === 'gif' ||
                        artworkType === 'webp';

                      return (
                        <div className="each--nft">
                          <div className="tooltiptext">
                            <div>
                              <label>Name:</label>
                              <p>{nft.name}</p>
                            </div>
                            <div>
                              <label>Token ID:</label>
                              <p>#{nft.tokenId}</p>
                            </div>
                            <div>
                              <label>Collection:</label>
                              <p>
                                {collection.address ===
                                process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                                  <img src={universeIcon} alt={collection.name} />
                                ) : !collection.coverUrl ? (
                                  <div
                                    className="random--bg--color"
                                    style={{
                                      backgroundColor: getCollectionBackgroundColor(collection),
                                    }}
                                  >
                                    {collection.name.charAt(0)}
                                  </div>
                                ) : (
                                  <img src={collection.coverUrl} alt={collection.name} />
                                )}
                                {collection.name}
                              </p>
                            </div>
                          </div>

                          {nft.artworkType === 'mp4' && (
                            <video
                              aria-hidden
                              onClick={() => window.open(nftUrl, '_blank')}
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
                          )}
                          {nftIsImage && (
                            <img
                              aria-hidden
                              onClick={() => window.open(nftUrl, '_blank')}
                              className="preview-image"
                              src={nft.thumbnail_url}
                              alt={nft.name}
                            />
                          )}
                          {artworkType === 'mp4' && (
                            <img className="video-icon" src={videoIcon} alt="Video Icon" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </div>
      </div>
      {selectedAuctionEnded ? (
        <></>
      ) : (
        <div className="auction__details__box__top__bidders__footer">
          <div className="your__bid">
            {currentBid ? (
              <span className="your__current__bid">
                <b>
                  Your bid:
                  <img src={currencyIcon} alt="Currency" />
                  {currentBid.amount}
                </b>
                {`(#${bidders.findIndex((x) => x.userId === currentBid.userId) + 1} in the list)`}
              </span>
            ) : (
              <span className="no__bids">You haven&apos;t placed any bids</span>
            )}
          </div>
          {canPlaceBids ? (
            <div className="place__bid">
              <button onClick={() => setShowBidPopup(true)} type="button" className="light-button">
                Place a bid
              </button>
              {currentBid && !isWinningBid ? ( // TODO: add is winning bid //
                <div className="cacnel__bid">
                  <button
                    type="button"
                    className="cancel--button"
                    onClick={() => setShowCancelBidPopup(true)}
                  >
                    <span className="tooltiptext">Cancel my bid</span>
                    <img src={cancelIcon} alt="cancel" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

TopBidders.propTypes = {
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  currentBid: PropTypes.oneOfType([PropTypes.object]),
  setShowBidPopup: PropTypes.func.isRequired,
  setShowBidRankings: PropTypes.func.isRequired,
  getRewardTierSpanStyles: PropTypes.func.isRequired,
  selectedAuctionEnded: PropTypes.bool.isRequired,
  canPlaceBids: PropTypes.bool.isRequired,
  ethPrice: PropTypes.number.isRequired,
  isWinningBid: PropTypes.bool.isRequired,
  currencyIcon: PropTypes.string,
  collections: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setShowCancelBidPopup: PropTypes.func.isRequired,
};
TopBidders.defaultProps = {
  currentBid: null,
  currencyIcon: '',
};
export default TopBidders;
