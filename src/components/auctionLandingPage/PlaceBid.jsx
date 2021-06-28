import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import gradientArrow from '../../assets/images/gradient-arrow.svg';
import PlaceBidPopup from '../popups/PlaceBidPopup.jsx';

const PlaceBid = ({ auction, bidders, setBidders }) => (
  <div className="place__bid__section">
    <div className="place__bid__section__container">
      <div>
        <h1 className="title">Place a bid</h1>
        <p className="desc">Bid to win 1 of {auction.totalNFTs} NFT bundles</p>
      </div>
      <div className="place__bid__btn">
        <Popup
          trigger={
            <button type="button">
              <span>Place a bid</span>
              <img src={gradientArrow} alt="Arrow" />
            </button>
          }
        >
          {(close) => (
            <PlaceBidPopup
              onClose={close}
              onAuctionId={auction.id}
              onAuctionTitle={auction.name}
              onArtistName={auction.artist.name}
              onBidders={bidders}
              onSetBidders={setBidders}
            />
          )}
        </Popup>
      </div>
    </div>
  </div>
);

PlaceBid.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setBidders: PropTypes.func.isRequired,
};

export default PlaceBid;
