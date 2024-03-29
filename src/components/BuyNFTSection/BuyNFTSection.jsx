import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import bordergradient from '../../assets/images/border-gradient.svg';
import pyramid from '../../assets/images/marketplace/eth-icon.svg';
import NFTPlaceBid from '../popups/NFTPlaceBid';
import NFTMakeOffer from '../popups/NFTMakeOffer';
import clock from '../../assets/images/clock.svg';

const BuyNFTSection = ({
  highestBid,
  firstButtonText,
  secondButtonText,
  auctionLeftTime,
  infotext,
}) => {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);

  return (
    <div className="theunveiling">
      <img className="border--gradient" src={bordergradient} alt="border" />
      {auctionLeftTime && (
        <div className="auction-timer-box">
          <img src={clock} alt="clock" />
          <p>{auctionLeftTime} left</p>
        </div>
      )}
      {highestBid && (
        <div className="unveiling--box">
          <img src={highestBid.userAvatar} alt="avatar" />
          <div className="unveiling--info">
            <h1>
              <span>Highest bid by</span> The Unveiling
            </h1>
            <div className="icon--box">
              <div className="box--hover">
                <img src={pyramid} alt="pyramid" className="weth--icon" />
                <span className="weth--hover">WETH</span>
              </div>
              <p>
                {highestBid.bid} <span className="span--price">${highestBid.bid * 1862}</span>
                <span className="span--percent">{infotext}</span>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="button--box">
        <Popup
          trigger={
            <button type="button" className="light-button">
              {firstButtonText}
            </button>
          }
        >
          {(close) => (
            <NFTPlaceBid
              close={close}
              setSelectedTokenIndex={setSelectedTokenIndex}
              selectedTokenIndex={selectedTokenIndex}
            />
          )}
        </Popup>
        <Popup
          trigger={
            <button type="button" className="light-border-button light-border-button-shadow">
              {secondButtonText}
            </button>
          }
        >
          {(close) => (
            <NFTMakeOffer
              close={close}
              setSelectedTokenIndex={setSelectedTokenIndex}
              selectedTokenIndex={selectedTokenIndex}
            />
          )}
        </Popup>
      </div>
      {!highestBid && <span className="span--percent--seperate">{infotext}</span>}
    </div>
  );
};

BuyNFTSection.propTypes = {
  highestBid: PropTypes.oneOfType([PropTypes.object]),
  firstButtonText: PropTypes.string.isRequired,
  secondButtonText: PropTypes.string.isRequired,
  auctionLeftTime: PropTypes.string,
  infotext: PropTypes.string,
};

BuyNFTSection.defaultProps = { highestBid: null, auctionLeftTime: null, infotext: '' };

export default BuyNFTSection;
