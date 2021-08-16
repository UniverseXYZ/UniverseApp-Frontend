/* eslint-disable no-inner-declarations */
import React, { useState, useRef, useEffect } from 'react';
import '../marketplace/browseNFT/NFTsList.scss';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import Slider from 'react-slick';
import Draggable from 'react-draggable';
import { useDoubleTap } from 'use-double-tap';
import Properties from '../marketplaceTabComponents/Properties.jsx';
import Owners from '../marketplaceTabComponents/Owners.jsx';
import Bids from '../marketplaceTabComponents/Bids.jsx';
import TradingHistory from '../marketplaceTabComponents/TradingHistory.jsx';
import SharePopup from '../popups/SharePopup.jsx';
import ReportPopup from '../popups/ReportPopup.jsx';
import LikesPopup from '../popups/LikesPopup.jsx';
import Offers from '../marketplaceTabComponents/Offers.jsx';
import BuyNFTSection from '../BuyNFTSection/BuyNFTSection.jsx';
import NFTs from '../marketplaceTabComponents/NFTs.jsx';
import pauseIcon from '../../assets/images/pause.svg';
import playIcon from '../../assets/images/play.svg';
import soundOnIcon from '../../assets/images/sound-on.svg';
import soundOffIcon from '../../assets/images/sound-off.svg';
import miniplayerIcon from '../../assets/images/miniplayer.svg';
import fullScreenIcon from '../../assets/images/full-screen.svg';
import fullScreenOffIcon from '../../assets/images/full-screen-off.svg';
import unveiling from '../../assets/images/unveiling.svg';
import priceIcon from '../../assets/images/ETHiconupd.png';
import videoIcon from '../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import closeIcon from '../../assets/images/marketplace/close.svg';
import bundlesIcon from '../../assets/images/marketplace/bundles.svg';
import leftArrow from '../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../assets/images/marketplace/bundles-right-arrow.svg';

const MarketplaceNFTDetails = ({ data, onNFT }) => {
  const [nfts, setNFTs] = useState(data);
  const [selectedNFT, setSelectedNFT] = useState(onNFT);
  const tabs =
    selectedNFT.type !== 'bundles'
      ? ['Properties', 'Owners', 'Bids', 'Offers', 'History']
      : ['NFTs', 'Bids', 'Offers', 'History'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const history = useHistory();
  const ref = useRef(null);
  const sharePopupRef = useRef(null);
  const reportPopupRef = useRef(null);
  const customPlayerRef = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [trackProgress, setTrackProgress] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [miniPlayer, setMiniPlayer] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [scalePlayer, setScalePlayer] = useState(false);
  const [duration, setDuration] = useState('--:--');
  const [progressWidth, setProgressWidth] = useState(0);
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(
    selectedNFT.type === 'bundles' ? 0 : null
  );
  const mediaRef =
    selectedNFT.type !== 'bundles'
      ? selectedNFT.media.type === 'video/mp4'
        ? useRef()
        : selectedNFT.media.type === 'audio/mpeg'
        ? useRef(new Audio(selectedNFT.media.url))
        : null
      : selectedNFT.allItems[selectedNFTIndex].type === 'audio/mpeg'
      ? useRef(new Audio(selectedNFT.allItems[selectedNFTIndex].url))
      : useRef(null);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  const highestBid = {
    userAvatar: unveiling,
    userName: 'Asd',
    bid: 0.5,
  };
  const bind = useDoubleTap(() => {
    if (window.innerWidth < 576 && miniPlayer) {
      setScalePlayer(!scalePlayer);
    }
  });

  const canPlayEventHandler = () => {
    if (mediaRef && mediaRef.current) {
      const audioCurrentTime = mediaRef.current.duration;
      const minutes = `0${Math.floor(audioCurrentTime / 60)}`;
      const seconds = `0${Math.floor(audioCurrentTime - minutes * 60)}`;
      setDuration(`${minutes.substr(-2)}:${seconds.substr(-2)}`);
    }
  };

  const startTimer = () => {
    if (mediaRef && mediaRef.current) {
      if (mediaRef.current.currentTime === mediaRef.current.duration) {
        setProgressWidth(0);
        setTrackProgress('00:00');
        setIsPlaying(false);
        return;
      }
      const audioCurrentTimeProgress = mediaRef.current.currentTime;
      const minutesProgress = `0${Math.floor(audioCurrentTimeProgress / 60)}`;
      const secondsProgress = `0${Math.floor(audioCurrentTimeProgress - minutesProgress * 60)}`;
      const durationProgress = `${minutesProgress.substr(-2)}:${secondsProgress.substr(-2)}`;
      const width = (parseInt(audioCurrentTimeProgress, 10) * 100) / mediaRef.current.duration;
      if (durationProgress === duration) {
        setProgressWidth(100);
      } else {
        setProgressWidth(parseInt(width, 10));
      }
      setTrackProgress(durationProgress);
    }
  };

  useEffect(() => {
    if (mediaRef && selectedNFTIndex) {
      const video = document.querySelector('video');
      if (selectedNFT.allItems[selectedNFTIndex].type === 'video/mp4' && video) {
        video.setAttribute('src', selectedNFT.allItems[selectedNFTIndex].url);
      }
      mediaRef.current =
        selectedNFT.allItems[selectedNFTIndex].type === 'audio/mpeg'
          ? new Audio(selectedNFT.allItems[selectedNFTIndex].url)
          : selectedNFT.allItems[selectedNFTIndex].type === 'video/mp4'
          ? video
          : null;

      if (mediaRef && mediaRef.current) {
        mediaRef.current.addEventListener('canplay', canPlayEventHandler);
        mediaRef.current.addEventListener('timeupdate', startTimer);
      }
    }
  }, [selectedNFTIndex]);

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !sharePopupRef.current &&
      !reportPopupRef.current
    ) {
      setIsDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (mediaRef && mediaRef.current) {
      mediaRef.current.addEventListener('timeupdate', startTimer);
    }

    return () =>
      mediaRef &&
      mediaRef.current &&
      mediaRef.current.removeEventListener('timeupdate', startTimer);
  }, []);

  useEffect(() => {
    if (mediaRef && mediaRef.current) {
      mediaRef.current.addEventListener('canplay', canPlayEventHandler);
    }

    return () =>
      mediaRef &&
      mediaRef.current &&
      mediaRef.current.removeEventListener('canplay', canPlayEventHandler);
  }, []);

  useEffect(() => {
    if (mediaRef && mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    function onKeyboardDown(event) {
      if (
        (!document.getElementById('popup-root') ||
          (document.getElementById('popup-root') &&
            !document.getElementById('popup-root').hasChildNodes())) &&
        mediaRef &&
        mediaRef.current
      ) {
        if (event.keyCode === 32) {
          event.preventDefault();
          setIsPlaying(!isPlaying);
        } else if (event.keyCode === 70) {
          event.preventDefault();
          setFullScreen(!fullScreen);
        } else if (event.keyCode === 27) {
          event.preventDefault();
          setFullScreen(false);
        }
      }
    }
    document.addEventListener('keydown', onKeyboardDown, false);

    return () => document.removeEventListener('keydown', onKeyboardDown, false);
  });

  useEffect(() => {
    if (mediaRef && mediaRef.current) {
      if (muted) {
        mediaRef.current.muted = true;
      } else {
        mediaRef.current.muted = false;
      }
    }
  }, [muted]);

  useEffect(
    () => () => {
      if (mediaRef && mediaRef.current) {
        mediaRef.current.pause();
      }
    },
    []
  );

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

  const handleSelectedNFTLikeClick = (id) => {
    setSelectedNFT({
      ...selectedNFT,
      likesCount: selectedNFT.liked ? selectedNFT.likesCount - 1 : selectedNFT.likesCount + 1,
      liked: !selectedNFT.liked,
    });
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

  const handleLikeDivClick = (e) => {
    if (e.target.nodeName !== 'svg' && e.target.nodeName !== 'path') {
      document.getElementById('likes-hidden-btn').click();
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = document.querySelector('.progress--bar');
    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const elementWidth = progressBar.offsetWidth;
    mediaRef.current.currentTime = Math.round(
      (((left * 100) / elementWidth) * mediaRef.current.duration) / 100
    );
  };

  const handleBigClick = (e) => {
    if (
      !e.target.classList.contains('close--miniplayer') &&
      mediaRef &&
      customPlayerRef.current &&
      !miniPlayer &&
      !customPlayerRef.current.contains(e.target)
    ) {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (miniPlayer) {
      setFullScreen(false);
    } else {
      setScalePlayer(false);
    }
    if (document.querySelector('.media--container')) {
      document.querySelector('.media--container').style.transform = 'translate(0px, 0px)';
    }
  }, [miniPlayer]);

  useEffect(() => {
    if (fullScreen) {
      setMiniPlayer(false);
      setScalePlayer(false);
    }
    if (document.querySelector('.media--container')) {
      document.querySelector('.media--container').style.transform = 'translate(0px, 0px)';
    }
  }, [fullScreen]);

  const handleDragStart = (e) => {
    if (showControls && e.target.classList.contains('play--pause')) {
      setIsPlaying(!isPlaying);
    }
    if (showControls && e.target.classList.contains('close--miniplayer')) {
      setMiniPlayer(false);
    }
    if (miniPlayer && window.innerWidth < 992) {
      setShowControls(!showControls);
      setTimeout(() => {
        setShowControls(false);
      }, 4000);
    }
  };

  return (
    <>
      <div className="marketplace--nft--page">
        <Popup
          trigger={
            <button
              type="button"
              id="likes-hidden-btn"
              aria-label="hidden"
              style={{ display: 'none' }}
            />
          }
        >
          {(close) => <LikesPopup onClose={close} />}
        </Popup>
        <div
          className={`Marketplace--img ${fullScreen ? 'full--screen' : ''} ${
            miniPlayer ? 'miniplayer' : ''
          }`}
        >
          <div
            className={`image--wrapper ${selectedNFT.type === 'bundles' ? 'with--bundles' : ''}`}
            aria-hidden="true"
            onClick={handleBigClick}
            onDoubleClick={(event) =>
              mediaRef &&
              customPlayerRef.current &&
              !customPlayerRef.current.contains(event.target) &&
              !miniPlayer &&
              setFullScreen(!fullScreen)
            }
          >
            {selectedNFT.type !== 'bundles' ? (
              <>
                {selectedNFT.media.type !== 'audio/mpeg' &&
                  selectedNFT.media.type !== 'video/mp4' && (
                    <img src={selectedNFT.media.url} alt={selectedNFT.name} />
                  )}
                {selectedNFT.media.type === 'video/mp4' && (
                  <Draggable disabled={!miniPlayer} onMouseDown={handleDragStart} bounds="body">
                    <div
                      {...bind}
                      className={`media--container ${miniPlayer ? 'show--miniplayer' : ''} ${
                        showControls ? 'show--controls' : ''
                      } ${scalePlayer ? 'scale--player' : ''}`}
                    >
                      <video ref={mediaRef}>
                        <source src={selectedNFT.media.url} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                      {isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={pauseIcon}
                          alt="Pause"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(false)}
                        />
                      )}
                      {!isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={playIcon}
                          alt="Play"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(true)}
                        />
                      )}
                      {miniPlayer && (
                        <img
                          className="close--miniplayer"
                          src={closeIcon}
                          alt="Close miniplayer"
                          aria-hidden="true"
                          onClick={() => setMiniPlayer(false)}
                        />
                      )}
                    </div>
                  </Draggable>
                )}
                {selectedNFT.media.type === 'audio/mpeg' && (
                  <Draggable disabled={!miniPlayer} onMouseDown={handleDragStart} bounds="body">
                    <div
                      {...bind}
                      className={`media--container ${miniPlayer ? 'show--miniplayer' : ''} ${
                        showControls ? 'show--controls' : ''
                      } ${scalePlayer ? 'scale--player' : ''}`}
                    >
                      <img src={mp3Icon} alt={selectedNFT.name} style={{ pointerEvents: 'none' }} />
                      {isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={pauseIcon}
                          alt="Pause"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(false)}
                        />
                      )}
                      {!isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={playIcon}
                          alt="Play"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(true)}
                        />
                      )}
                      {miniPlayer && (
                        <img
                          className="close--miniplayer"
                          src={closeIcon}
                          alt="Close miniplayer"
                          aria-hidden="true"
                          onClick={() => setMiniPlayer(false)}
                        />
                      )}
                    </div>
                  </Draggable>
                )}
                {(selectedNFT.media.type === 'video/mp4' ||
                  selectedNFT.media.type === 'audio/mpeg') &&
                  miniPlayer && <div className="empty--black--video" />}
                {selectedNFT.media.type === 'audio/mpeg' ||
                selectedNFT.media.type === 'video/mp4' ? (
                  <div className="custom--player" ref={customPlayerRef}>
                    <div className="controls">
                      <div className="controls--left">
                        {isPlaying ? (
                          <img
                            src={pauseIcon}
                            alt="Pause"
                            aria-hidden="true"
                            onClick={() => setIsPlaying(false)}
                          />
                        ) : (
                          <img
                            src={playIcon}
                            alt="Play"
                            aria-hidden="true"
                            onClick={() => setIsPlaying(true)}
                          />
                        )}
                        <span>{`${trackProgress} / ${duration}`}</span>
                      </div>
                      <div className="controls--right">
                        {muted ? (
                          <img
                            src={soundOffIcon}
                            alt="Sound off"
                            aria-hidden="true"
                            onClick={() => setMuted(false)}
                          />
                        ) : (
                          <img
                            src={soundOnIcon}
                            alt="Sound on"
                            aria-hidden="true"
                            onClick={() => setMuted(true)}
                          />
                        )}
                        <img
                          src={miniplayerIcon}
                          alt="Miniplayer"
                          aria-hidden="true"
                          onClick={() => setMiniPlayer(true)}
                        />
                        {fullScreen ? (
                          <img
                            src={fullScreenOffIcon}
                            alt="Full screen off"
                            aria-hidden="true"
                            onClick={() => {
                              setFullScreen(false);
                            }}
                          />
                        ) : (
                          <img
                            src={fullScreenIcon}
                            alt="Full screen"
                            aria-hidden="true"
                            onClick={() => setFullScreen(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="progress--bar" aria-hidden="true" onClick={handleProgressClick}>
                      <div
                        className="progress--bar--filled"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {selectedNFT.allItems[selectedNFTIndex].type !== 'audio/mpeg' &&
                  selectedNFT.allItems[selectedNFTIndex].type !== 'video/mp4' && (
                    <img src={selectedNFT.allItems[selectedNFTIndex].url} alt={selectedNFT.name} />
                  )}
                {selectedNFT.allItems[selectedNFTIndex].type === 'video/mp4' && (
                  <Draggable disabled={!miniPlayer} onMouseDown={handleDragStart} bounds="body">
                    <div
                      {...bind}
                      className={`media--container ${miniPlayer ? 'show--miniplayer' : ''} ${
                        showControls ? 'show--controls' : ''
                      } ${scalePlayer ? 'scale--player' : ''}`}
                    >
                      <video ref={mediaRef}>
                        <source src={selectedNFT.allItems[selectedNFTIndex].url} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                      {isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={pauseIcon}
                          alt="Pause"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(false)}
                        />
                      )}
                      {!isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={playIcon}
                          alt="Play"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(true)}
                        />
                      )}
                      {miniPlayer && (
                        <img
                          className="close--miniplayer"
                          src={closeIcon}
                          alt="Close miniplayer"
                          aria-hidden="true"
                          onClick={() => setMiniPlayer(false)}
                        />
                      )}
                    </div>
                  </Draggable>
                )}
                {selectedNFT.allItems[selectedNFTIndex].type === 'audio/mpeg' && (
                  <Draggable disabled={!miniPlayer} onMouseDown={handleDragStart} bounds="body">
                    <div
                      {...bind}
                      className={`media--container ${miniPlayer ? 'show--miniplayer' : ''} ${
                        showControls ? 'show--controls' : ''
                      } ${scalePlayer ? 'scale--player' : ''}`}
                    >
                      <img src={mp3Icon} alt={selectedNFT.name} style={{ pointerEvents: 'none' }} />
                      {isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={pauseIcon}
                          alt="Pause"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(false)}
                        />
                      )}
                      {!isPlaying && miniPlayer && (
                        <img
                          className="play--pause"
                          src={playIcon}
                          alt="Play"
                          aria-hidden="true"
                          onClick={() => setIsPlaying(true)}
                        />
                      )}
                      {miniPlayer && (
                        <img
                          className="close--miniplayer"
                          src={closeIcon}
                          alt="Close miniplayer"
                          aria-hidden="true"
                          onClick={() => setMiniPlayer(false)}
                        />
                      )}
                    </div>
                  </Draggable>
                )}
                {!fullScreen && (
                  <div className="nft--count">
                    <img src={bundlesIcon} alt="Bundles" />
                    <span>{`${selectedNFTIndex + 1} of ${selectedNFT.allItems.length}`}</span>
                  </div>
                )}
                {(selectedNFT.allItems[selectedNFTIndex].type === 'video/mp4' ||
                  selectedNFT.allItems[selectedNFTIndex].type === 'audio/mpeg') &&
                  miniPlayer && <div className="empty--black--video" />}
                {selectedNFT.allItems[selectedNFTIndex].type === 'audio/mpeg' ||
                selectedNFT.allItems[selectedNFTIndex].type === 'video/mp4' ? (
                  <div className="custom--player" ref={customPlayerRef}>
                    <div className="controls">
                      <div className="controls--left">
                        {isPlaying ? (
                          <img
                            src={pauseIcon}
                            alt="Pause"
                            aria-hidden="true"
                            onClick={() => setIsPlaying(false)}
                          />
                        ) : (
                          <img
                            src={playIcon}
                            alt="Play"
                            aria-hidden="true"
                            onClick={() => setIsPlaying(true)}
                          />
                        )}
                        <span>{`${trackProgress} / ${duration}`}</span>
                      </div>
                      <div className="controls--right">
                        {muted ? (
                          <img
                            src={soundOffIcon}
                            alt="Sound off"
                            aria-hidden="true"
                            onClick={() => setMuted(false)}
                          />
                        ) : (
                          <img
                            src={soundOnIcon}
                            alt="Sound on"
                            aria-hidden="true"
                            onClick={() => setMuted(true)}
                          />
                        )}
                        <img
                          src={miniplayerIcon}
                          alt="Miniplayer"
                          aria-hidden="true"
                          onClick={() => setMiniPlayer(true)}
                        />
                        {fullScreen ? (
                          <img
                            src={fullScreenOffIcon}
                            alt="Full screen off"
                            aria-hidden="true"
                            onClick={() => setFullScreen(false)}
                          />
                        ) : (
                          <img
                            src={fullScreenIcon}
                            alt="Full screen"
                            aria-hidden="true"
                            onClick={() => setFullScreen(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="progress--bar" aria-hidden="true" onClick={handleProgressClick}>
                      <div
                        className="progress--bar--filled"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          {selectedNFT.type === 'bundles' && (
            <div className="bundles--slider">
              <Slider {...sliderSettings}>
                {selectedNFT.allItems.map((nft, index) => (
                  <div
                    className={`each--nft ${selectedNFTIndex === index ? 'selected' : ''}`}
                    aria-hidden="true"
                    onClick={() => setSelectedNFTIndex(index)}
                    key={uuid()}
                  >
                    {nft.type !== 'audio/mpeg' && nft.type !== 'video/mp4' && (
                      <img className="nft--media" src={nft.url} alt="NFT" />
                    )}
                    {nft.type === 'video/mp4' && (
                      <video className="nft--media">
                        <source src={nft.url} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {nft.type === 'audio/mpeg' && (
                      <img className="nft--media" src={mp3Icon} alt="NFT" />
                    )}
                  </div>
                ))}
              </Slider>
              <div className="slider--with--horizontall--scrolling">
                {selectedNFT.allItems.map((nft, index) => (
                  <div
                    className={`each--nft ${selectedNFTIndex === index ? 'selected' : ''}`}
                    aria-hidden="true"
                    onClick={() => setSelectedNFTIndex(index)}
                    key={uuid()}
                  >
                    {nft.type !== 'audio/mpeg' && nft.type !== 'video/mp4' && (
                      <img className="nft--media" src={nft.url} alt="NFT" />
                    )}
                    {nft.type === 'video/mp4' && (
                      <video className="nft--media">
                        <source src={nft.url} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {nft.type === 'audio/mpeg' && (
                      <img className="nft--media" src={mp3Icon} alt="NFT" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="Marketplace--settings">
          <div className="Marketplace--name">
            <h1>{selectedNFT.name}</h1>
            <div className="icon">
              <div className="like--share" aria-hidden="true" onClick={handleLikeDivClick}>
                <div className="likes--count">
                  <div>
                    <svg
                      className={selectedNFT.liked ? 'fill' : ''}
                      onClick={() => handleSelectedNFTLikeClick(selectedNFT.id)}
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
                      <div className="likers--text">{`${selectedNFT.likesCount} people liked this`}</div>
                      <div className="likers--avatars">
                        <img src={selectedNFT.owner.avatar} alt="Liker" />
                        <img src={selectedNFT.owner.avatar} alt="Liker" />
                        <img src={selectedNFT.owner.avatar} alt="Liker" />
                        <img src={selectedNFT.owner.avatar} alt="Liker" />
                        <img src={selectedNFT.owner.avatar} alt="Liker" />
                        <img src={selectedNFT.owner.avatar} alt="Liker" />
                      </div>
                    </div>
                  </div>
                  <span>{selectedNFT.likesCount}</span>
                </div>
              </div>
              <div
                ref={ref}
                className={`share_dropdown ${isDropdownOpened ? 'opened' : ''}`}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                <span className="selected__item">...</span>
                {isDropdownOpened && (
                  <div className="sort__share__dropdown">
                    <ul>
                      <Popup trigger={<li aria-hidden="true">Share</li>}>
                        {(close) => <SharePopup close={close} ref={sharePopupRef} />}
                      </Popup>
                      <Popup
                        trigger={
                          <li aria-hidden="true" className="dropdown__report">
                            Report
                          </li>
                        }
                      >
                        {(close) => <ReportPopup onClose={close} ref={reportPopupRef} />}
                      </Popup>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="Marketplace--number">
            <p>Edition {selectedNFT.editions}</p>
          </div>
          <div className="Marketplace--collections">
            <div className="Marketplace--creators">
              <img src={selectedNFT.creator.avatar} alt="icon" />
              <div className="creator--name">
                <p>Creator</p>
                <h6>{selectedNFT.creator.name}</h6>
              </div>
            </div>
            <div className="Marketplace--creators">
              <img src={selectedNFT.collection.avatar} alt="icon1" />
              <div className="creator--name">
                <p>Collection</p>
                <h6>{selectedNFT.collection.name}</h6>
              </div>
            </div>
            <div className="Marketplace--creators">
              <img src={selectedNFT.owner.avatar} alt="icon2" />
              <div className="creator--name">
                <p>Owner</p>
                <h6>{selectedNFT.owner.name}</h6>
              </div>
            </div>
          </div>
          <div className="Marketplace--text">
            <p>
              <ReactReadMoreReadLess
                charLimit={150}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {selectedNFT.description}
              </ReactReadMoreReadLess>
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
            {selectedNFT.type !== 'bundles' ? (
              <>
                {selectedTabIndex === 0 && <Properties />}
                {selectedTabIndex === 1 && <Owners />}
                {selectedTabIndex === 2 && <Bids />}
                {selectedTabIndex === 3 && <Offers />}
                {selectedTabIndex === 4 && <TradingHistory />}
              </>
            ) : (
              <>
                {selectedTabIndex === 0 && <NFTs data={selectedNFT.allItems} />}
                {selectedTabIndex === 1 && <Bids />}
                {selectedTabIndex === 2 && <Offers />}
                {selectedTabIndex === 3 && <TradingHistory />}
              </>
            )}
          </div>
          <BuyNFTSection
            highestBid={highestBid}
            firstButtonText="Place a bid"
            secondButtonText="Make offer"
            auctionLeftTime="1d: 4h : 20m : 30s"
          />
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
                    onClick={() => history.push(`/marketplace/nft/${nft.id}`, { nft })}
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
  onNFT: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

MarketplaceNFTDetails.defaultProps = {
  data: [],
};
export default MarketplaceNFTDetails;
