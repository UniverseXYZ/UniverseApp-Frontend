import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import currencyETHIcon from '../../assets/images/currency-eth.svg';
import arrowDownIcon from '../../assets/images/arrow-down.svg';
import nftImage from '../../assets/images/marketplace/nfts/nft1.png';

const BidRankingsPopup = ({ onClose, onBidders }) => {
  const [openedBidderID, setOpenedBidderID] = useState(null);

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
            <span>Platinum</span>
            <span>Gold</span>
            <span>Silver</span>
          </div>
        </div>
        <div className="bids__list">
          <div className="platinum">
            {onBidders.map(
              (bidder, index) =>
                bidder.rewardTier === 'Platinum' && (
                  <div className="each--bid" key={bidder.id}>
                    <div className="header">
                      <div className="bidder">
                        <span className="index">{`${index + 1}. `}</span>
                        <span title={bidder.name}>{`${bidder.name.substring(0, 6)}...`}</span>
                        <span style={{ color: '#80ccdf', borderColor: '#80ccdf' }} className="tier">
                          {bidder.rewardTier}
                        </span>
                      </div>
                      <div className="bid">
                        <img src={currencyETHIcon} alt="Currency" />
                        <b>{bidder.bid}</b>
                        <span>~$48,580</span>
                      </div>
                      <div
                        className={`arrow ${openedBidderID === bidder.id ? 'opened' : ''}`}
                        aria-hidden="true"
                        onClick={() =>
                          openedBidderID === bidder.id
                            ? setOpenedBidderID(null)
                            : setOpenedBidderID(bidder.id)
                        }
                      >
                        <img src={arrowDownIcon} alt="Arrow down" />
                      </div>
                    </div>
                    {openedBidderID === bidder.id && (
                      <div className="nfts">
                        <div className="each--nft">
                          <div className="tooltiptext">
                            <div>
                              <label>Name:</label>
                              <p>Joan Jet</p>
                            </div>
                            <div>
                              <label>Token ID:</label>
                              <p>#01111</p>
                            </div>
                            <div>
                              <label>Collection:</label>
                              <p>
                                <img src={nftImage} alt="collection" />
                                CryptoKitties
                              </p>
                            </div>
                          </div>
                          <img src={nftImage} alt="nft" />
                        </div>
                        <div className="each--nft">
                          <div className="tooltiptext">
                            <div>
                              <label>Name:</label>
                              <p>Joan Jet</p>
                            </div>
                            <div>
                              <label>Token ID:</label>
                              <p>#01111</p>
                            </div>
                            <div>
                              <label>Collection:</label>
                              <p>
                                <img src={nftImage} alt="collection" />
                                CryptoKitties
                              </p>
                            </div>
                          </div>
                          <img src={nftImage} alt="nft" />
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
          <div className="gold">
            {onBidders.map(
              (bidder, index) =>
                bidder.rewardTier === 'Gold' && (
                  <div className="each--bid" key={bidder.id}>
                    <div className="header">
                      <div className="bidder">
                        <span className="index">{`${index + 1}. `}</span>
                        <span title={bidder.name}>{`${bidder.name.substring(0, 6)}...`}</span>
                        <span style={{ color: '#ddbc45', borderColor: '#ddbc45' }} className="tier">
                          {bidder.rewardTier}
                        </span>
                      </div>
                      <div className="bid">
                        <img src={currencyETHIcon} alt="Currency" />
                        <b>{bidder.bid}</b>
                        <span>~$48,580</span>
                      </div>
                      <div
                        className={`arrow ${openedBidderID === bidder.id ? 'opened' : ''}`}
                        aria-hidden="true"
                        onClick={() =>
                          openedBidderID === bidder.id
                            ? setOpenedBidderID(null)
                            : setOpenedBidderID(bidder.id)
                        }
                      >
                        <img src={arrowDownIcon} alt="Arrow down" />
                      </div>
                    </div>
                    {openedBidderID === bidder.id && (
                      <div className="nfts">
                        <div className="each--nft">
                          <div className="tooltiptext">
                            <div>
                              <label>Name:</label>
                              <p>Joan Jet</p>
                            </div>
                            <div>
                              <label>Token ID:</label>
                              <p>#01111</p>
                            </div>
                            <div>
                              <label>Collection:</label>
                              <p>
                                <img src={nftImage} alt="collection" />
                                CryptoKitties
                              </p>
                            </div>
                          </div>
                          <img src={nftImage} alt="nft" />
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
          <div className="silver">
            {onBidders.map(
              (bidder, index) =>
                bidder.rewardTier === 'Silver' && (
                  <div className="each--bid" key={bidder.id}>
                    <div className="header">
                      <div className="bidder">
                        <span className="index">{`${index + 1}. `}</span>
                        <span title={bidder.name}>{`${bidder.name.substring(0, 6)}...`}</span>
                        <span style={{ color: '#bcbcbc', borderColor: '#bcbcbc' }} className="tier">
                          {bidder.rewardTier}
                        </span>
                      </div>
                      <div className="bid">
                        <img src={currencyETHIcon} alt="Currency" />
                        <b>{bidder.bid}</b>
                        <span>~$48,580</span>
                      </div>
                      <div
                        className={`arrow ${openedBidderID === bidder.id ? 'opened' : ''}`}
                        aria-hidden="true"
                        onClick={() =>
                          openedBidderID === bidder.id
                            ? setOpenedBidderID(null)
                            : setOpenedBidderID(bidder.id)
                        }
                      >
                        <img src={arrowDownIcon} alt="Arrow down" />
                      </div>
                    </div>
                    {openedBidderID === bidder.id && (
                      <div className="nfts">
                        <div className="each--nft">
                          <div className="tooltiptext">
                            <div>
                              <label>Name:</label>
                              <p>Joan Jet</p>
                            </div>
                            <div>
                              <label>Token ID:</label>
                              <p>#01111</p>
                            </div>
                            <div>
                              <label>Collection:</label>
                              <p>
                                <img src={nftImage} alt="collection" />
                                CryptoKitties
                              </p>
                            </div>
                          </div>
                          <img src={nftImage} alt="nft" />
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BidRankingsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default BidRankingsPopup;
