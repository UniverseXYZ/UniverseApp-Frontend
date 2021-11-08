import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowDownIcon from '../../assets/images/arrow-down.svg';
import nftImage from '../../assets/images/marketplace/nfts/nft1.png';
import { shortenEthereumAddress } from '../../utils/helpers/format';

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
  console.log(rewardTiersSlots);
  console.log(rewardTiers);

  const displayBidderName = (bidder) => {
    if (bidder.user.displayName) {
      return bidder.user.displayName;
    }

    return shortenEthereumAddress(bidder.user.address);
  };
  const [openedBidderID, setOpenedBidderID] = useState(-1);
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
                <span style={getRewardTierSpanStyles(tier)}>{tier.name}</span>
              ))}
          </div>
        </div>
        <div className="bids__list">
          {rewardTiersSlots.map((tier, index) => {
            const bidder = onBidders[index];
            if (!bidder) return <></>;
            return (
              <div
                style={{ border: `border: 1px solid ${tier.color ? tier.color : '#bcbcbc'};` }}
                className="bid__list"
                key={bidder.id}
              >
                <div className="each--bid">
                  <div className="header">
                    <div className="bidder">
                      <span className="index">{`${index + 1}. `}</span>
                      <span>{displayBidderName(bidder)}</span>
                      <span
                        className="tier"
                        style={getRewardTierSpanStyles(rewardTiersSlots[index])}
                      >
                        {rewardTiersSlots[index].name}
                      </span>
                    </div>
                    <div className="bid">
                      <img src={currencyIcon} alt="Currency" />
                      <b>{bidder.amount}</b>
                      <span>~${Math.round(bidder.amount * ethPrice)}</span>
                    </div>
                    {rewardTiersSlots[index] ? (
                      <div
                        className={`arrow ${openedBidderID === index ? 'opened' : ''}`}
                        aria-hidden="true"
                        onClick={() =>
                          openedBidderID === index
                            ? setOpenedBidderID(-1)
                            : setOpenedBidderID(index)
                        }
                      >
                        <img src={arrowDownIcon} alt="Arrow down" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {openedBidderID === index ? (
                    <div className="nfts">
                      {tier.nfts.map((nft) => {
                        const collection = collections.find((c) => c.id === nft.collectionId);
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
                                  <img src={nftImage} alt="collection" />
                                  {collection.name}
                                </p>
                              </div>
                            </div>
                            <img src={nft.thumbnail_url} alt="nft" />
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
  currencyIcon: PropTypes.string.isRequired,
  collections: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default BidRankingsPopup;
