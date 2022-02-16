import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowDownIcon from '../../assets/images/arrow-down.svg';
import nftImage from '../../assets/images/marketplace/nfts/nft1.png';
import { shortenEthereumAddress } from '../../utils/helpers/format';
import videoIcon from '../../assets/images/video-icon.svg';
import universeIcon from '../../assets/images/universe-img.svg';
import { getCollectionBackgroundColor } from '../../utils/helpers';

const BidRankingsPopup = ({
  onClose,
  onBidders,
  rewardTiersSlots,
  rewardTiers,
  getRewardTierSpanStyles,
  ethPrice,
  currencyIcon,
  collections,
}) => {
  const displayBidderName = (bidder) => {
    if (bidder.user) {
      return bidder.user.displayName || bidder.user.address;
    }
    return shortenEthereumAddress(bidder.bidder);
  };

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
    <div className="bid__rankings__popup">
      <img
        className="close__popup"
        onClick={onClose}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      <div className="bid__rankings__popup__content">
        <h1 className="title">Bid rankings</h1>
        <div className="reward__tiers">
          <div className="label">Reward tiers:</div>
          <div className="tiers">
            {rewardTiers
              .sort((a, b) => a.tierPosition - b.tierPosition)
              .map((tier) => (
                <span key={tier.id} style={getRewardTierSpanStyles(tier)}>
                  {tier.name}
                </span>
              ))}
          </div>
        </div>
        <div className="bids__list">
          {rewardTiersSlots.map((tier, index) => {
            const bidder = onBidders[index];
            const isSlotOpened = openSlots.indexOf(index) >= 0;
            const bigNumberAmount = new BigNumber(bidder?.amount);
            const usdAmount = bigNumberAmount.multipliedBy(ethPrice).toFixed(2);

            return (
              <div
                style={{ border: `border: 1px solid ${tier.color ? tier.color : '#bcbcbc'}` }}
                className="bid__list"
                key={tier.slotIndex}
              >
                <div className="each--bid">
                  <div className="header">
                    <div className="bidder">
                      <span className="index">{`${index + 1}. `}</span>
                      <span className="bidder--address">
                        {bidder ? displayBidderName(bidder) : 'No bidder yet'}
                      </span>
                      <span
                        className="tier"
                        style={getRewardTierSpanStyles(rewardTiersSlots[index])}
                      >
                        {rewardTiersSlots[index].name}
                      </span>
                    </div>
                    <div className="bid">
                      {bidder && bidder.amount ? (
                        <>
                          <img src={currencyIcon} alt="Currency" />
                          <b>{bigNumberAmount.toFixed()}</b>
                          <span>~${usdAmount}</span>
                        </>
                      ) : (
                        <></>
                      )}
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
                  {isSlotOpened ? (
                    <div className="nfts">
                      {tier.nfts.map((nft) => {
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
                          <div className="each--nft" key={nft.id}>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

BidRankingsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  getRewardTierSpanStyles: PropTypes.func.isRequired,
  ethPrice: PropTypes.number.isRequired,
  currencyIcon: PropTypes.string,
  collections: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

BidRankingsPopup.defaultProps = {
  currencyIcon: '',
};

export default BidRankingsPopup;
