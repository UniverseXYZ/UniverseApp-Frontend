import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import './NFTsList.scss';
import Slider from 'react-slick';
import priceIcon from '../../../assets/images/marketplace/eth-icon.svg';
import videoIcon from '../../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../../assets/images/mp3-icon.png';
import leftArrow from '../../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../../assets/images/marketplace/bundles-right-arrow.svg';
import count from '../../../assets/images/slidecounts.svg';
import clockIcon from '../../../assets/images/marketplace/green-clock.svg';
import Button from '../../button/Button';
import AppContext from '../../../ContextAPI';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';

const NFTsList = ({ data, nftNumber }) => {
  const [nfts, setNFTs] = useState(data);
  const history = useHistory();
  const { sortName, setSortName } = useMyNftsContext();

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

  useEffect(() => {
    // Prev Icon
    const prev = document.querySelector('.slick-prev');
    if (prev) {
      const prevIcon = document.createElement('img');
      prevIcon.src = leftArrow;
      prev.innerHTML = '';
      prev.appendChild(prevIcon);
    }

    // Next icon
    const next = document.querySelector('.slick-next');
    if (next) {
      const nextIcon = document.createElement('img');
      nextIcon.src = rightArrow;
      next.innerHTML = '';
      next.appendChild(nextIcon);
    }
  }, []);

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  useEffect(() => {
    setNFTs(data);
    if (sortName === 'Ending soon') {
      setNFTs(
        nfts
          .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
          .filter((item) => new Date(item.endDate) > new Date())
      );
    } else if (sortName === 'Lowest price first') {
      nfts.sort((a, b) => a.price - b.price);
    } else if (sortName === 'Highest price first') {
      nfts.sort((a, b) => b.price - a.price);
    } else if (sortName === 'Recently listed') {
      nfts.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
    } else if (sortName === 'Recently created') {
      nfts.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortName === 'Recently sold') {
      setNFTs(
        nfts
          .sort((a, b) => new Date(b.soldDate) - new Date(a.soldDate))
          .filter((item) => item.soldDate !== '-')
      );
    } else if (sortName === 'Most liked') {
      nfts.sort((a, b) => b.likesCount - a.likesCount);
    }
  }, []);

  return (
    <div className="browse--nft--list">
      {nfts.map(
        (nft, index) =>
          index <= nftNumber && (
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
                {nft.type === 'bundles' ? (
                  <div className="bundles--count">
                    <img src={count} alt="cover" />
                    <span>{nft.allItems.length}</span>
                  </div>
                ) : (
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
                )}
              </div>
              <div className="nft--box--body" aria-hidden="true">
                {nft.type !== 'bundles' ? (
                  <div
                  // onClick={() => history.push(`/nft/${nft.collection.address}/${nft.id}`, { nft })}
                  // aria-hidden="true"
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
                        muted
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
                      {nft.allItems.map((item) => (
                        <div
                          className="slider--box"
                          // onClick={() => history.push(`/nft/${nft.collection.address}/${nft.id}`, { nft })}
                          // aria-hidden="true"
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
                            <div className="video__icon">
                              <img src={videoIcon} alt="Video Icon" />
                            </div>
                          )}
                          {item.type === 'audio/mpeg' && (
                            <div className="video__icon">
                              <img src={audioIcon} alt="Audio Icon" />
                            </div>
                          )}
                        </div>
                      ))}
                    </Slider>
                  </>
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
                  <p>{nft.editions}</p>
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
  );
};
NFTsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
  nftNumber: PropTypes.number,
};

NFTsList.defaultProps = {
  data: [],
  nftNumber: 0,
};
export default NFTsList;
