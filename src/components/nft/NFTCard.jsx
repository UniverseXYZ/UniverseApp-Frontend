/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import './NFTCard.scss';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import videoIcon from '../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingImage from '../general/LoadingImage';
import clockIcon from '../../assets/images/marketplace/green-clock.svg';
import checkIcon from '../../assets/images/check-black.svg';
import NFTCardHeader from './NFTCardHeader';
import PendingPrevArrow from '../myNFTs/pendingDropdown/misc/PendingPrevArrow';
import PendingNextArrow from '../myNFTs/pendingDropdown/misc/PendingNextArrow';

const NFTCard = React.memo(
  ({ nft, canSelect, collectionAddress, selectedNFTsIds, setSelectedNFTsIds }) => {
    const { loggedInArtist } = useAuthContext();
    const history = useHistory();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const { creator } = nft;
    const owner = location.pathname === '/my-nfts' ? loggedInArtist : nft.owner;

    const ref = useRef();

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <PendingPrevArrow />,
      prevArrow: <PendingNextArrow />,
    };

    const handleSelectNFT = (id) => {
      if (selectedNFTsIds.includes(id)) {
        const findById = selectedNFTsIds.filter((i) => i !== id);
        setSelectedNFTsIds([...findById]);
      } else {
        setSelectedNFTsIds([...selectedNFTsIds, id]);
      }
    };

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
      <div
        className={`nft--card${canSelect ? ' can--select' : ''}${
          selectedNFTsIds && selectedNFTsIds.includes(nft.id) ? ' selected' : ''
        }`}
      >
        <NFTCardHeader nft={nft} owner={owner} creator={creator} collection={nft.collection} />
        <div className="nft--card--body" aria-hidden="true">
          {nft?.artworkType && nft.artworkType !== 'bundles' ? (
            <div
              onClick={() =>
                !canSelect
                  ? history.push(
                      `/nft/${nft.collection?.address || collectionAddress}/${nft.tokenId}`,
                      {
                        nft,
                      }
                    )
                  : handleSelectNFT(nft.id)
              }
              aria-hidden="true"
            >
              {nft.artworkType !== 'audio/mpeg' && nft.artworkType !== 'mp4' && (
                <img className="nft--image" src={nft.thumbnail_url} alt={nft.name} />
              )}
              {nft.artworkType === 'mp4' && (
                <video
                  onMouseOver={(event) => event.target.play()}
                  onFocus={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  onBlur={(event) => event.target.pause()}
                  muted
                >
                  <source src={nft.thumbnail_url} type="video/mp4" />
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {nft.artworkType === 'audio/mpeg' && (
                <img className="nft--image" src={mp3Icon} alt={nft.name} />
              )}
              {/* {nft.artworkType === 'video/mp4' && (
                    <div className="video--icon">
                      <img src={videoIcon} alt="Video Icon" />
                    </div>
                  )} */}
              {nft.artworkType === 'audio/mpeg' && (
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
              {/* TODO:: comment out the slider, its going to be needed for the Marketplace only */}
              {/* <Slider {...sliderSettings}> */}
              {/* {nft.tokenIds &&
                  nft.tokenIds.map(
                    (item, index) =>
                      index < 7 && (
                        <div
                          className="slider--box"
                          onClick={() =>
                            !canSelect
                              ?history.push(`/nft/${nft.collection?.address || collectionAddress}/${nft.tokenId}`, { nft })
                              : handleSelectNFT(nft.id)
                          }
                          aria-hidden="true"
                          key={uuid()}
                        >
                          {nft.artworkType &&
                            !nft.artworkType.endsWith('mpeg') &&
                            !nft.artworkType.endsWith('mp4') && (
                              <img className="nft--image" src={nft.thumbnail_url} alt={nft.name} />
                            )}
                          {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                            <video
                              onMouseOver={(event) => event.target.play()}
                              onFocus={(event) => event.target.play()}
                              onMouseOut={(event) => event.target.pause()}
                              onBlur={(event) => event.target.pause()}
                              muted
                            >
                              <source src={nft.thumbnail_url} type="video/mp4" />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
                            <img className="nft--image" src={mp3Icon} alt={nft.name} />
                          )}
                        </div>
                      )
                  )} */}
              {/* Colelction View NFTs  TODO:: The code below should be commented when we realse Marketplace and uncomment the upper one */}
              {nft.tokenIds && (
                <div
                  className="slider--box"
                  onClick={() =>
                    history.push(
                      `/nft/${nft.collection?.address || collectionAddress}/${nft.tokenId}`,
                      { nft }
                    )
                  }
                  aria-hidden="true"
                  key={uuid()}
                >
                  {nft.artworkType &&
                    !nft.artworkType.endsWith('mpeg') &&
                    !nft.artworkType.endsWith('mp4') && (
                      <LoadingImage
                        className="nft--image"
                        alt={nft.name}
                        src={nft.thumbnail_url}
                        placeholderImage={nft.thumbnail_url}
                      />
                    )}
                  {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                      muted
                    >
                      <source src={nft.thumbnail_url} type="video/mp4" />
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
                    <img className="nft--image" src={mp3Icon} alt={nft.name} />
                  )}
                </div>
              )}
              {/* </Slider> */}
            </>
          )}
        </div>
        <div className="nft--card--footer">
          <div className="name--and--price">
            <h4>{nft.name}</h4>
            {/* <div className="price--div">
            <img src={priceIcon} alt="Price" />
            <span>0.5</span>
          </div> */}
          </div>
          <div className="quantity--and--offer">
            {/* // TODO:: we need a property from the BE about the total editions count */}
            <p>{`${nft.tokenIds.length} / ${nft.numberOfEditions}`}</p>
            {/* <div className="price--offer--div">
            <label>Offer for</label>
            <img src={priceIcon} alt="Price" />
            <span>0.35</span>
          </div> */}
          </div>
        </div>
        {selectedNFTsIds && selectedNFTsIds.includes(nft.id) && (
          <div className="nft--selected">
            <img src={checkIcon} alt="img" />
          </div>
        )}
      </div>
    );
  }
);

NFTCard.propTypes = {
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  canSelect: PropTypes.bool,
  collectionAddress: PropTypes.string,
  selectedNFTsIds: PropTypes.oneOfType([PropTypes.array]),
  setSelectedNFTsIds: PropTypes.func,
};

NFTCard.defaultProps = {
  canSelect: false,
  collectionAddress: '',
  selectedNFTsIds: [],
  setSelectedNFTsIds: () => {},
};

export default NFTCard;
