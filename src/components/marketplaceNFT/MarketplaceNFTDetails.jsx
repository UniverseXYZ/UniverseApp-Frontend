import React, { useState, useRef, useEffect, useContext } from 'react';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import cover from '../../assets/images/Rectangle 40198.png';
import heart from '../../assets/images/heart.svg';
import share from '../../assets/images/share.svg';
import avatar from '../../assets/images/avatarrr.svg';
import avatar1 from '../../assets/images/collection_img (2).svg';
import avatar2 from '../../assets/images/collection_img.svg';
import Button from '../button/Button.jsx';
import Properties from '../marketplaceTabComponents/Properties';
import Owners from '../marketplaceTabComponents/Owners';
import Bids from '../marketplaceTabComponents/Bids';
import TradingHistory from '../marketplaceTabComponents/TradingHistory';
import SharePopup from '../popups/SharePopup';
import NFTPlaceBid from '../popups/NFTPlaceBid';
import Offers from '../marketplaceTabComponents/Offers';
import unveiling from '../../assets/images/unveiling.svg';
import pyramid from '../../assets/images/pyramid.svg';
import '../marketplace/browseNFT/NFTsList.scss';
import priceIcon from '../../assets/images/marketplace/price.svg';
import videoIcon from '../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import dot3 from '../../assets/images/3333dots.svg';

const MarketplaceNFTDetails = ({ data }) => {
  const [nfts, setNFTs] = useState(data);
  const tabs = ['Properties', 'Owners', 'Bids', 'Offers', 'History'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const history = useHistory();
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('...');

  const handleLikeClick = (id) => {
    setNFTs((prevState) =>
      prevState.map((el) =>
        el.id === id
          ? {
              ...el,
              likesCount: el.liked ? el.likesCount - 1 : el.likesCount + 1,
              liked: !el.liked,
            }
          : el
      )
    );
  };

  return (
    <>
      <div className="marketplace--nft--page">
        <div className="Marketplace--img">
          <img src={cover} alt="cover" />
        </div>
        <div className="Marketplace--settings">
          <div className="Marketplace--name">
            <h1>NFT long name</h1>
            <div className="icon">
              <div className="like--share">
                {nfts.map(
                  (nft, index) =>
                    index < 1 && (
                      <div className="likes--count">
                        <div>
                          <svg
                            className={nft.liked ? 'fill' : ''}
                            onClick={() => handleLikeClick(nft.id)}
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.9998 13.3996C8.15207 13.3996 8.36959 13.302 8.52911 13.2114C12.6113 10.7016 15.1998 7.78044 15.1998 4.8105C15.1998 2.34253 13.4379 0.599609 11.1611 0.599609C9.7974 0.599609 8.7372 1.30007 8.07164 2.38196C8.03914 2.4348 7.96094 2.43454 7.92872 2.38153C7.27515 1.30607 6.20174 0.599609 4.83848 0.599609C2.56174 0.599609 0.799805 2.34253 0.799805 4.8105C0.799805 7.78044 3.38832 10.7016 7.47775 13.2114C7.63002 13.302 7.84754 13.3996 7.9998 13.3996Z"
                              stroke="black"
                              strokeOpacity="0.4"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="tooltiptext">
                            <div className="likers--text">{`${nft.likesCount} people liked this`}</div>
                            <div className="likers--avatars">
                              <img src={nft.owner.avatar} alt="Liker" />
                              <img src={nft.owner.avatar} alt="Liker" />
                              <img src={nft.owner.avatar} alt="Liker" />
                              <img src={nft.owner.avatar} alt="Liker" />
                              <img src={nft.owner.avatar} alt="Liker" />
                              <img src={nft.owner.avatar} alt="Liker" />
                            </div>
                          </div>
                        </div>
                        <span>{nft.likesCount}</span>
                      </div>
                    )
                )}
              </div>
              {/* <Popup trigger={<img src={share} alt="fsk" className="share-open" />}>
                {(close) => (
                  <SharePopup
                    close={close}
                    handleConnectWallet={handleConnectWallet}
                    showInstallWalletPopup={showInstallWalletPopup}
                    setShowInstallWalletPopup={setShowInstallWalletPopup}
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                  />
                )}
              </Popup> */}
              {/* <img src={dot3} alt="icon" className="share-open" /> */}
              {/* <div> */}
              <div
                ref={ref}
                className={`share_dropdown ${isDropdownOpened ? 'opened' : ''}`}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                <span className="selected__item">{selectedItem}</span>
                {/* <img className="arrow__down" src={audioIcon} alt="Arrow" /> */}
                {isDropdownOpened && (
                  <div className="sort__share__dropdown">
                    <ul>
                      <li
                        onClick={() => {
                          setSelectedItem('All characters');
                          setIsDropdownOpened(false);
                        }}
                        aria-hidden="true"
                      >
                        Share
                      </li>
                      <li
                        onClick={() => {
                          setSelectedItem('OG characters');
                          setIsDropdownOpened(false);
                        }}
                        aria-hidden="true"
                        className="dropdown__report"
                      >
                        Report
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="Marketplace--number">
            <p>1/20</p>
          </div>
          <div className="Marketplace--collections">
            <div className="Marketplace--creators">
              <img src={avatar} alt="icon" />
              <div className="creator--name">
                <p>Creator</p>
                <h6>Name</h6>
              </div>
            </div>
            <div className="Marketplace--creators">
              <img src={avatar1} alt="icon1" />
              <div className="creator--name">
                <p>Collection</p>
                <h6>Name</h6>
              </div>
            </div>
            <div className="Marketplace--creators">
              <img src={avatar2} alt="icon2" />
              <div className="creator--name">
                <p>Owner</p>
                <h6>Name</h6>
              </div>
            </div>
          </div>
          <div className="Marketplace--text">
            <p>
              Cras vel eget vitae quis scelerisque arcu ut. Tristique velit nec sed sit massa. Odio
              molestie velit purus at blandit. Lacus, fusce quam dolor imperdiet velit augue neque
              tincidunt lorem et diam... <span>Read more</span>
            </p>
          </div>
          <div className="tabs">
            <ul className="tab_items">
              {tabs.map((tab, index) => (
                <li
                  key={uuid()}
                  className={selectedTabIndex === index ? 'active' : ''}
                  aria-hidden="true"
                  onClick={() => setSelectedTabIndex(index)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedTabIndex === 0 && <Properties />}
            {selectedTabIndex === 1 && <Owners />}
            {selectedTabIndex === 2 && <Bids />}
            {selectedTabIndex === 3 && <Offers />}
            {selectedTabIndex === 4 && <TradingHistory />}
          </div>
          <div className="theunveiling">
            <div className="unveiling--box">
              <img src={unveiling} alt="avatar" />
              <div className="unveiling--info">
                <h1>
                  <span>Highest bid by</span> The Unveiling
                </h1>
                {/* <img src={pyramid} alt="pyramid" /> */}
                <p>
                  <img src={pyramid} alt="pyramid" />
                  0.5<span className="span--price">$142.39s</span>
                  <span className="span--procent">(10% of sales will go to creator)</span>
                </p>
              </div>
            </div>
            <div className="button--box">
              <Popup
                trigger={
                  <button type="button" className="light-button">
                    Place a bid
                  </button>
                }
              >
                {(close) => <NFTPlaceBid close={close} />}
              </Popup>
              <Button className="light-border-button">Make offer</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="collection">
        <div className="collection--title">
          <h1>More from this collection</h1>
        </div>
        <div className="browse--nft--list">
          {nfts.map(
            (nft, index) =>
              index < 4 && (
                <div className="nft--box" key={uuid()}>
                  <div className="nft--box--header">
                    <div className="three--images">
                      <div className="creator--details">
                        <img src={nft.creator.avatar} alt={nft.creator.name} />
                        <span className="tooltiptext">{`Creator: ${nft.creator.name}`}</span>
                      </div>
                      <div className="collection--details">
                        <img src={nft.collection.avatar} alt={nft.collection.name} />
                        <span className="tooltiptext">{`Collection: ${nft.collection.name}`}</span>
                      </div>
                      <div className="owner--details">
                        <img src={nft.owner.avatar} alt={nft.owner.name} />
                        <span className="tooltiptext">{`Owner: ${nft.owner.name}`}</span>
                      </div>
                    </div>
                    <div className="likes--count">
                      <div>
                        <svg
                          className={nft.liked ? 'fill' : ''}
                          onClick={() => handleLikeClick(nft.id)}
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.9998 13.3996C8.15207 13.3996 8.36959 13.302 8.52911 13.2114C12.6113 10.7016 15.1998 7.78044 15.1998 4.8105C15.1998 2.34253 13.4379 0.599609 11.1611 0.599609C9.7974 0.599609 8.7372 1.30007 8.07164 2.38196C8.03914 2.4348 7.96094 2.43454 7.92872 2.38153C7.27515 1.30607 6.20174 0.599609 4.83848 0.599609C2.56174 0.599609 0.799805 2.34253 0.799805 4.8105C0.799805 7.78044 3.38832 10.7016 7.47775 13.2114C7.63002 13.302 7.84754 13.3996 7.9998 13.3996Z"
                            stroke="black"
                            strokeOpacity="0.4"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="tooltiptext">
                          <div className="likers--text">{`${nft.likesCount} people liked this`}</div>
                          <div className="likers--avatars">
                            <img src={nft.owner.avatar} alt="Liker" />
                            <img src={nft.owner.avatar} alt="Liker" />
                            <img src={nft.owner.avatar} alt="Liker" />
                            <img src={nft.owner.avatar} alt="Liker" />
                            <img src={nft.owner.avatar} alt="Liker" />
                            <img src={nft.owner.avatar} alt="Liker" />
                          </div>
                        </div>
                      </div>
                      <span>{nft.likesCount}</span>
                    </div>
                  </div>
                  <div
                    className="nft--box--body"
                    aria-hidden="true"
                    onClick={() => history.push(`/marketplace/nft/${nft.id}`)}
                  >
                    {nft.media.type !== 'audio/mpeg' && nft.media.type !== 'video/mp4' && (
                      <img className="nft--image" src={nft.media.url} alt={nft.name} />
                    )}
                    {nft.media.type === 'video/mp4' && (
                      <video
                        onMouseOver={(event) => event.target.play()}
                        onFocus={(event) => event.target.play()}
                        onMouseOut={(event) => event.target.pause()}
                        onBlur={(event) => event.target.pause()}
                      >
                        <source src={nft.media.url} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {nft.media.type === 'audio/mpeg' && (
                      <img className="nft--image" src={mp3Icon} alt={nft.name} />
                    )}
                    {nft.media.type === 'video/mp4' && (
                      <div className="video__icon">
                        <img src={videoIcon} alt="Video Icon" />
                      </div>
                    )}
                    {nft.media.type === 'audio/mpeg' && (
                      <div className="video__icon">
                        <img src={audioIcon} alt="Video Icon" />
                      </div>
                    )}
                  </div>
                  <div className="nft--box--footer">
                    <div className="name--and--price">
                      <h4>{nft.name}</h4>
                      <div className="price--div">
                        <img src={priceIcon} alt="Price" />
                        <span>{nft.price}</span>
                      </div>
                    </div>
                    <div className="quantity--and--offer">
                      <p>{nft.quantity}</p>
                      <div className="price--offer--div">
                        <label>Offer for</label>
                        <img src={priceIcon} alt="Price" />
                        <span>{nft.offerFor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="view--button">
          <button type="button" className="light-button">
            View Collection
          </button>
        </div>
      </div>
    </>
  );
};

MarketplaceNFTDetails.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
};

MarketplaceNFTDetails.defaultProps = {
  data: [],
};
export default MarketplaceNFTDetails;
