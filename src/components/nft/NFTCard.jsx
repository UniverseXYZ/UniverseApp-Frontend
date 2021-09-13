/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState, useEffect, useRef } from 'react';
import './NFTCard.scss';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import uuid from 'react-uuid';
import { renderLoaders } from '../../containers/rarityCharts/renderLoaders';
import AppContext from '../../ContextAPI';
import videoIcon from '../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import countIcon from '../../assets/images/slidecounts.svg';
import priceIcon from '../../assets/images/marketplace/eth-icon.svg';
import likerTestImage from '../../assets/images/marketplace/users/user1.png';
import leftArrow from '../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../assets/images/marketplace/bundles-right-arrow.svg';
import sellNFTIcon from '../../assets/images/sell-nft.svg';
import transferNFTIcon from '../../assets/images/transfer-nft.svg';
import shareNFTIcon from '../../assets/images/share-nft.svg';
import hideNFTIcon from '../../assets/images/hide-nft.svg';
import unhideNFTIcon from '../../assets/images/unhide-nft.svg';
import burnNFTIcon from '../../assets/images/burn-nft.svg';

const NFTCard = ({ nft }) => {
  const { myNFTs, setMyNFTs, loggedInArtist } = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef();
  function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={onClick}
        aria-hidden="true"
      >
        <img src={rightArrow} alt="arrow right" />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={onClick}
        aria-hidden="true"
      >
        <img src={leftArrow} alt="arrow left" />
      </button>
    );
  }

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  });

  const handleLikeClick = (id) => {
    const newNFTs = [...myNFTs];
    newNFTs.forEach((item) => {
      if (item.id === id) {
        if (!item.likers.length) {
          item.likers.push({
            id: loggedInArtist.id,
            name: loggedInArtist.name || 'John Doe',
            avatar: loggedInArtist.avatar || likerTestImage,
          });
        } else {
          const alreadyLiked = item.likers.some((i) => i.id === loggedInArtist.id);
          if (!alreadyLiked) {
            item.likers.push({
              id: loggedInArtist.id,
              name: loggedInArtist.name || 'John Doe',
              avatar: loggedInArtist.avatar || likerTestImage,
            });
          } else {
            item.likers = item.likers.filter((i) => i.id !== loggedInArtist.id);
          }
        }
      }
    });
    setMyNFTs(newNFTs);
  };

  const hideNFT = (id) => {
    setMyNFTs(myNFTs.map((item) => (item.id === id ? { ...item, hidden: true } : item)));
  };

  const unhideNFT = (id) => {
    setMyNFTs(myNFTs.map((item) => (item.id === id ? { ...item, hidden: false } : item)));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="nft--card">
      <div className="nft--card--header">
        <div className="three--images">
          <div className="creator--details">
            <img
              src={
                typeof nft.creator.avatar === 'string'
                  ? nft.creator.avatar
                  : URL.createObjectURL(nft.creator.avatar)
              }
              alt={nft.creator.name}
            />
            <span className="tooltiptext">{`Creator: ${nft.creator.name}`}</span>
          </div>
          {nft.collection && (
            <div className="collection--details">
              {typeof nft.collection.avatar === 'string' &&
              nft.collection.avatar.startsWith('#') ? (
                <div
                  className="random--bg--color"
                  style={{ backgroundColor: nft.collection.avatar }}
                >
                  {nft.collection.name.charAt(0)}
                </div>
              ) : (
                <img
                  src={
                    typeof nft.collection.avatar === 'string'
                      ? nft.collection.avatar
                      : URL.createObjectURL(nft.collection.avatar)
                  }
                  alt={nft.collection.name}
                />
              )}
              <span className="tooltiptext">{`Collection: ${nft.collection.name}`}</span>
            </div>
          )}
          <div className="owner--details">
            <img
              src={
                typeof nft.owner.avatar === 'string'
                  ? nft.owner.avatar
                  : URL.createObjectURL(nft.owner.avatar)
              }
              alt={nft.owner.name}
            />
            <span className="tooltiptext">{`Owner: ${nft.owner.name}`}</span>
          </div>
        </div>
        <div className="nft--card--header--right">
          {nft.type === 'bundles' ? (
            <div className="bundles--count">
              <img src={countIcon} alt="cover" />
              <span>{nft.numberOfEditions}</span>
            </div>
          ) : (
            <div onClick={() => handleLikeClick(nft.id)} className="likes--count">
              <div>
                <svg
                  className={
                    nft.likers.filter((liker) => liker.id === loggedInArtist.id).length
                      ? 'fill'
                      : ''
                  }
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
                  <div className="likers--text">{`${nft.likers.length} people liked this`}</div>
                  {nft.likers.length ? (
                    <div className="likers--avatars">
                      {nft.likers.map((liker) => (
                        <img
                          key={liker.id}
                          src={
                            typeof liker.avatar === 'string'
                              ? liker.avatar
                              : URL.createObjectURL(liker.avatar)
                          }
                          alt={liker.name}
                        />
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <span className={nft.likers.length ? 'redlike' : 'like-count'}>
                {nft.likers.length}
              </span>
            </div>
          )}
          <div
            className="nft--card--header--right--dropdown"
            aria-hidden="true"
            onClick={() => {
              setShowDropdown(!showDropdown);
              setDropdownID(nft.id);
            }}
          >
            <span />
            <span />
            <span />
            {dropdownID === nft.id && showDropdown && (
              <ul ref={ref} className="nft--card--header--right--dropdown--items">
                <li aria-hidden="true">
                  <img src={sellNFTIcon} alt="Sell" />
                  <p>Sell</p>
                </li>
                <li aria-hidden="true">
                  <img src={transferNFTIcon} alt="Transfer" />
                  <p>Transfer</p>
                </li>
                <li aria-hidden="true">
                  <img src={shareNFTIcon} alt="Share" />
                  <p>Share</p>
                </li>
                {nft.hidden ? (
                  <li aria-hidden="true" onClick={() => unhideNFT(nft.id)}>
                    <img src={unhideNFTIcon} alt="Hide" />
                    <p>Unhide</p>
                  </li>
                ) : (
                  <li aria-hidden="true" onClick={() => hideNFT(nft.id)}>
                    <img src={hideNFTIcon} alt="Hide" />
                    <p>Hide</p>
                  </li>
                )}
                <li className="burn" aria-hidden="true">
                  <img src={burnNFTIcon} alt="Burn" />
                  <p>Burn</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="nft--card--body" aria-hidden="true">
        {loading ? (
          renderLoaders(1, 'nft')
        ) : (
          <>
            {nft.type !== 'bundles' ? (
              <div
                onClick={() => history.push(`/marketplace/nft/${nft.id}`, { nft })}
                aria-hidden="true"
              >
                {nft.media.type !== 'audio/mpeg' && nft.media.type !== 'video/mp4' && (
                  <img className="nft--image" src={URL.createObjectURL(nft.media)} alt={nft.name} />
                )}
                {nft.media.type === 'video/mp4' && (
                  <video
                    onMouseOver={(event) => event.target.play()}
                    onFocus={(event) => event.target.play()}
                    onMouseOut={(event) => event.target.pause()}
                    onBlur={(event) => event.target.pause()}
                    muted
                  >
                    <source src={URL.createObjectURL(nft.media)} type="video/mp4" />
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {nft.media.type === 'audio/mpeg' && (
                  <img className="nft--image" src={mp3Icon} alt={nft.name} />
                )}
                {nft.media.type === 'video/mp4' && (
                  <div className="video--icon">
                    <img src={videoIcon} alt="Video Icon" />
                  </div>
                )}
                {nft.media.type === 'audio/mpeg' && (
                  <div className="video--icon">
                    <img src={audioIcon} alt="Video Icon" />
                  </div>
                )}
                {nft.state === 'On Auction' && (
                  <div className="nft--time--left">
                    <p>
                      <img src={clockIcon} alt="Clock" /> 20m : 30s left
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Slider {...sliderSettings}>
                  {nft.allItems.map(
                    (item, index) =>
                      index < 7 && (
                        <div
                          className="slider--box"
                          onClick={() => history.push(`/marketplace/nft/${nft.id}`, { nft })}
                          aria-hidden="true"
                          key={uuid()}
                        >
                          {item.type !== 'audio/mpeg' && item.type !== 'video/mp4' && (
                            <img className="nft--image" src={item.url} alt={nft.name} />
                          )}
                          {item.type === 'video/mp4' && (
                            <video
                              onMouseOver={(event) => event.target.play()}
                              onFocus={(event) => event.target.play()}
                              onMouseOut={(event) => event.target.pause()}
                              onBlur={(event) => event.target.pause()}
                              muted
                            >
                              <source src={item.url} type="video/mp4" />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {item.type === 'audio/mpeg' && (
                            <img className="nft--image" src={mp3Icon} alt={nft.name} />
                          )}
                          {item.type === 'video/mp4' && (
                            <div className="video--icon">
                              <img src={videoIcon} alt="Video Icon" />
                            </div>
                          )}
                          {item.type === 'audio/mpeg' && (
                            <div className="video--icon">
                              <img src={audioIcon} alt="Audio Icon" />
                            </div>
                          )}
                        </div>
                      )
                  )}
                </Slider>
              </>
            )}
          </>
        )}
      </div>
      <div className="nft--card--footer">
        <div className="name--and--price">
          <h4>{nft.name}</h4>
          <div className="price--div">
            <img src={priceIcon} alt="Price" />
            <span>0.5</span>
          </div>
        </div>
        <div className="quantity--and--offer">
          <p>{`1 / ${nft.numberOfEditions}`}</p>
          <div className="price--offer--div">
            <label>Offer for</label>
            <img src={priceIcon} alt="Price" />
            <span>0.35</span>
          </div>
        </div>
      </div>
    </div>
  );
};

NFTCard.propTypes = {
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NFTCard;
