/* eslint-disable no-inner-declarations */
import React, { useState, useRef, useEffect, useContext } from 'react';
import '../marketplace/browseNFT/NFTsList.scss';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import Slider from 'react-slick';
import Draggable from 'react-draggable';
import { useDoubleTap } from 'use-double-tap';
import Blockies from 'react-blockies';
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
import Button from '../button/Button.jsx';
import NFTCard from '../nft/NFTCard.jsx';
import AppContext from '../../ContextAPI';
import pauseIcon from '../../assets/images/pause.svg';
import playIcon from '../../assets/images/play.svg';
import soundOnIcon from '../../assets/images/sound-on.svg';
import soundOffIcon from '../../assets/images/sound-off.svg';
import miniplayerIcon from '../../assets/images/miniplayer.svg';
import fullScreenIcon from '../../assets/images/full-screen.svg';
import fullScreenOffIcon from '../../assets/images/full-screen-off.svg';
import unveiling from '../../assets/images/unveiling.svg';
import bordergradient from '../../assets/images/border-gradient.svg';
import priceIcon from '../../assets/images/ETHiconupd.png';
import videoIcon from '../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import threedotsIcon from '../../assets/images/marketplace/3-dots.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import closeIcon from '../../assets/images/marketplace/close.svg';
import bundlesIcon from '../../assets/images/marketplace/bundles.svg';
import leftArrow from '../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../assets/images/marketplace/bundles-right-arrow.svg';
import likerTestImage from '../../assets/images/marketplace/users/user1.png';
import universeIcon from '../../assets/images/universe-img.svg';
import checkIcon from '../../assets/images/check.svg';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import SearchTokenIdField from '../input/SearchTokenIdField.jsx';

const MarketplaceNFTDetails = ({ data, onNFT }) => {
  const { myNFTs, setMyNFTs } = useMyNftsContext();
  const { loggedInArtist, deployedCollections, universeERC721CoreContract } = useAuthContext();
  const history = useHistory();
  const ref = useRef(null);
  const sharePopupRef = useRef(null);
  const reportPopupRef = useRef(null);
  const customPlayerRef = useRef(null);

  const [selectedNFT, setSelectedNFT] = useState(onNFT.nft);
  const { moreFromCollection, collection, owner, creator, tokenIds } = onNFT;
  const tabs = selectedNFT?.properties ? ['Properties'] : [''];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');

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
    selectedNFT?.type === 'bundles' ? 0 : null
  );
  const [tablet, setTablet] = useState(false);
  const [count, setCount] = useState(4);
  const mediaRef = useRef(null);
  // const mediaRef =
  //   selectedNFT.artworkType !== 'bundles'
  //     ? selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mp4')
  //       ? useRef()
  //       : selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mpeg')
  //       ? useRef(new Audio(selectedNFT.media.url))
  //       : null
  //     : selectedNFT.allItems[selectedNFTIndex].type === 'audio/mpeg'
  //     ? useRef(new Audio(selectedNFT.allItems[selectedNFTIndex].url))
  //     : useRef(null);

  function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    const handleClick = () => {
      onClick();
      if (selectedNFTIndex < selectedNFT?.tokenIds?.length - 1) {
        setSelectedNFTIndex(selectedNFTIndex + 1);
      } else {
        setSelectedNFTIndex(0);
      }
    };
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={handleClick}
        aria-hidden="true"
      >
        <img src={rightArrow} alt="arrow right" />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    const handleClick = () => {
      onClick();
      if (selectedNFTIndex > 0) {
        setSelectedNFTIndex(selectedNFTIndex - 1);
      } else {
        setSelectedNFTIndex(selectedNFT.tokenIds?.length - 1);
      }
    };
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={handleClick}
        aria-hidden="true"
      >
        <img src={leftArrow} alt="arrow left" />
      </button>
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: selectedNFT.tokenIds?.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
      if (selectedNFT.tokenIds[selectedNFTIndex].type === 'video/mp4' && video) {
        video.setAttribute('src', selectedNFT.tokenIds[selectedNFTIndex].url);
      }
      mediaRef.current =
        selectedNFT.tokenIds[selectedNFTIndex].type === 'audio/mpeg'
          ? new Audio(selectedNFT.tokenIds[selectedNFTIndex].url)
          : selectedNFT.tokenIds[selectedNFTIndex].type === 'video/mp4'
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
    if (Number(window.innerWidth) <= 1230) {
      setTablet(true);
      setCount(3);
    } else {
      setTablet(false);
      setCount(4);
    }
  }, []);

  useEffect(() => {
    if (onNFT.id !== selectedNFT.id) {
      setSelectedNFT(onNFT.nft);
    }
  }, [onNFT]);

  const handleSelectedNFTLikeClick = (id) => {
    const newNFTs = [...myNFTs];
    newNFTs.forEach((item) => {
      if (item.id === id) {
        if (!item.likers?.length) {
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
    if (placeholderData) {
      setDummyData(newNFTs);
    } else {
      setMyNFTs(newNFTs);
    }
    // setSelectedNFT({
    //   ...selectedNFT,
    //   likesCount: selectedNFT.liked ? selectedNFT.likesCount - 1 : selectedNFT.likesCount + 1,
    //   liked: !selectedNFT.liked,
    // });
    // setNFTs((prevState) =>
    //   prevState.map((el) =>
    //     el.id === id
    //       ? {
    //           ...el,
    //           likesCount: el.liked ? el.likesCount - 1 : el.likesCount + 1,
    //           liked: !el.liked,
    //         }
    //       : el
    //   )
    // );
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

  console.log(selectedNFT);
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
                {selectedNFT.artworkType &&
                  !selectedNFT.artworkType.endsWith('mpeg') &&
                  !selectedNFT.artworkType.endsWith('mp4') && (
                    <img src={selectedNFT.optimized_url} alt={selectedNFT.name} />
                  )}
                {selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mp4') && (
                  <Draggable disabled={!miniPlayer} onMouseDown={handleDragStart} bounds="body">
                    <div
                      {...bind}
                      className={`media--container ${miniPlayer ? 'show--miniplayer' : ''} ${
                        showControls ? 'show--controls' : ''
                      } ${scalePlayer ? 'scale--player' : ''}`}
                    >
                      <video ref={mediaRef}>
                        <source
                          src={
                            typeof selectedNFT.optimized_url === 'string'
                              ? selectedNFT.optimized_url
                              : URL.createObjectURL(selectedNFT.optimized_url)
                          }
                          type="video/mp4"
                        />
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
                {selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mpeg') && (
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
                {((selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mp4')) ||
                  (selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mpeg'))) &&
                  miniPlayer && <div className="empty--black--video" />}
                {(selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mpeg')) ||
                (selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mp4')) ? (
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
                {/* // TODO:: there is no such format in the current BE */}
                {selectedNFT.tokenIds[selectedNFTIndex].type !== 'audio/mpeg' &&
                  selectedNFT.tokenIds[selectedNFTIndex].type !== 'video/mp4' && (
                    <img
                      src={selectedNFT.tokenIds[selectedNFTIndex].optimized_url}
                      alt={selectedNFT.name}
                    />
                  )}
                {selectedNFT.tokenIds[selectedNFTIndex].type === 'video/mp4' && (
                  <Draggable disabled={!miniPlayer} onMouseDown={handleDragStart} bounds="body">
                    <div
                      {...bind}
                      className={`media--container ${miniPlayer ? 'show--miniplayer' : ''} ${
                        showControls ? 'show--controls' : ''
                      } ${scalePlayer ? 'scale--player' : ''}`}
                    >
                      <video ref={mediaRef}>
                        <source src={selectedNFT.tokenIds[selectedNFTIndex].url} type="video/mp4" />
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
                {selectedNFT.tokenIds[selectedNFTIndex].type === 'audio/mpeg' && (
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
                    <span>{`${selectedNFTIndex + 1} of ${selectedNFT.tokenIds?.length}`}</span>
                  </div>
                )}
                {(selectedNFT.tokenIds[selectedNFTIndex].type === 'video/mp4' ||
                  selectedNFT.tokenIds[selectedNFTIndex].type === 'audio/mpeg') &&
                  miniPlayer && <div className="empty--black--video" />}
                {selectedNFT.tokenIds[selectedNFTIndex].type === 'audio/mpeg' ||
                selectedNFT.tokenIds[selectedNFTIndex].type === 'video/mp4' ? (
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
                {selectedNFT.tokenIds.map((nft, index) => (
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
                {selectedNFT.tokenIds.map((nft, index) => (
                  <div
                    className={`each--nft ${selectedNFTIndex === index ? 'selected' : ''}`}
                    aria-hidden="true"
                    onClick={() => setSelectedNFTIndex(index)}
                    key={nft.id}
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
              {/* <div className="like--share" aria-hidden="true" onClick={handleLikeDivClick}>
                <div className="likes--count">
                  <div>
                    <svg
                      className={
                        selectedNFT.likers.filter((liker) => liker.id === loggedInArtist.id).length
                          ? 'fill'
                          : ''
                      }
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
                      <div className="likers--text">{`${selectedNFT.likers.length} people liked this`}</div>
                      <div className="likers--avatars">
                        {selectedNFT.likers.map((liker) => (
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
                    </div>
                  </div>
                  <span className={selectedNFT.likers.length ? 'redlike' : 'like-count'}>
                    {selectedNFT.likers.length}
                  </span>
                </div>
              </div> */}
              {/* <div
                ref={ref}
                className={`share_dropdown ${isDropdownOpened ? 'opened' : ''}`}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                <div className="selected__item">
                  <span />
                  <span />
                  <span />
                </div>
                {isDropdownOpened && (
                  <div className="sort__share__dropdown">
                    {selectedNFT.view === 'user' ? (
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
                    ) : (
                      <ul>
                        <li aria-hidden="true">Transfer</li>
                        <li aria-hidden="true" className="dropdown__report">
                          Burn
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div> */}
            </div>
          </div>
          <div className="Marketplace--number">
            <p>
              Edition&nbsp;
              {`${selectedNFT.tokenIds ? selectedNFT.tokenIds.length : 1}/${
                selectedNFT.numberOfEditions
                  ? selectedNFT.numberOfEditions
                  : selectedNFT.tokenIds
                  ? selectedNFT.tokenIds.length
                  : 1
              }`}
            </p>
            <div className="tokenIds-dropdown">
              <SearchTokenIdField searchValue={searchValue} setSearchValue={setSearchValue} />
              <ul className="tokenIds">
                {tokenIds.filter((tokenId) => tokenId.toString().includes(searchValue)).length ? (
                  <>
                    {tokenIds
                      .filter((tokenId) => tokenId.toString().includes(searchValue))
                      .map((tokenId) => (
                        <li
                          key={uuid()}
                          aria-hidden="true"
                          onClick={() => {
                            history.push(`/nft/${collection.address}/${tokenId}`);
                          }}
                        >
                          <span>{`#${tokenId}`}</span>
                          {tokenId === selectedNFT.tokenId ? (
                            <img src={checkIcon} alt="check" />
                          ) : (
                            <></>
                          )}
                        </li>
                      ))}
                  </>
                ) : (
                  <p>No results</p>
                )}
              </ul>
              <div className="inset--bottom--shadow" />
            </div>
          </div>
          <div className="Marketplace--collections">
            {creator &&
            (creator.avatar || (creator.profileImageUrl && creator.profileImageUrl.length > 48)) ? (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${creator.universePageUrl}`)}
                aria-hidden
              >
                <img src={creator.profileImageUrl} alt="icon" />
                <div className="creator--name">
                  <p>Creator</p>
                  <h6>{creator.displayName}</h6>
                </div>
              </div>
            ) : (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${creator.address}`)}
                aria-hidden
              >
                <Blockies className="blockie--details" seed={creator.address} size={9} scale={4} />
                <div className="creator--name">
                  <p>Creator</p>
                  <h6
                    // TODO: Vik to fix this or someone else
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {creator.address}
                  </h6>
                  <span className="tooltiptext tooltiptext--left">{creator.address}</span>
                </div>
              </div>
            )}

            {collection && collection.coverUrl && (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/collection/${collection.address}`)}
                aria-hidden
              >
                {!collection.coverUrl ? (
                  <div
                    className="random--bg--color"
                    style={{ backgroundColor: getCollectionBackgroundColor(collection) }}
                  >
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img src={collection.coverUrl} alt={collection.name} />
                )}
                <div className="creator--name">
                  <p>Collection</p>
                  <h6
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {collection.name}
                  </h6>
                  <span className="tooltiptext tooltiptext--center">{collection.name}</span>
                </div>
              </div>
            )}

            {collection && !collection.coverUrl && (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/collection/${collection.address}`)}
                aria-hidden
              >
                <img src={universeIcon} alt={collection.name} />
                <div className="creator--name">
                  <p>Collection</p>
                  <h6>{collection.name}</h6>
                </div>
              </div>
            )}

            {owner &&
            (owner.avatar || (owner.profileImageUrl && owner.profileImageUrl.length > 48)) ? (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${owner.universePageUrl}`)}
                aria-hidden
              >
                <img src={owner.avatar || owner.profileImageUrl} alt="icon2" />
                <div className="creator--name">
                  <p>Owner</p>
                  <h6>{owner.displayName}</h6>
                </div>
              </div>
            ) : (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${owner.address}`)}
                aria-hidden
              >
                <Blockies className="blockie--details" seed={owner.address} size={9} scale={4} />
                <div className="creator--name">
                  <p>Owner</p>
                  <h6
                    // TODO: Vik to fix this or someone else
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {owner.address}
                  </h6>
                  <span className="tooltiptext tooltiptext--right">{owner.address}</span>
                </div>
              </div>
            )}
          </div>

          <div className="Marketplace--text">
            <p>
              <ReactReadMoreReadLess
                charLimit={150}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {selectedNFT.description || ''}
              </ReactReadMoreReadLess>
            </p>
          </div>
          <div className="tabs">
            <ul className="tab_items">
              {tabs.map((tab, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
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
                {selectedTabIndex === 0 && selectedNFT.properties !== null && (
                  <Properties properties={selectedNFT.properties || []} />
                )}
                {selectedTabIndex === 1 && <Owners />}
                {selectedTabIndex === 2 && <Bids />}
                {selectedTabIndex === 3 && <Offers view={selectedNFT.view} />}
                {selectedTabIndex === 4 && <TradingHistory />}
              </>
            ) : (
              <>
                {selectedTabIndex === 0 && <NFTs data={selectedNFT.tokenIds} />}
                {selectedTabIndex === 1 && <Bids />}
                {selectedTabIndex === 2 && <Offers view={selectedNFT.view} />}
                {selectedTabIndex === 3 && <TradingHistory />}
              </>
            )}
          </div>
          {/* {selectedNFT.view === 'user' ? (
            <BuyNFTSection
              highestBid={highestBid}
              firstButtonText="Place a bid"
              secondButtonText="Make offer"
              auctionLeftTime="1d : 4h : 20m : 30s"
              infotext="(10% of sales will go to creator)"
            />
          ) : selectedNFT.viewAction === 'Change price' ? (
            <BuyNFTSection
              highestBid={highestBid}
              firstButtonText="Change price"
              secondButtonText="Cancel listing"
              auctionLeftTime="1d : 4h : 20m : 30s"
              infotext="(This NFT is on your wallet)"
            />
          ) : selectedNFT.viewAction === 'Lower price' ? (
            <BuyNFTSection
              highestBid={highestBid}
              firstButtonText="Lower price"
              secondButtonText="Cancel listing"
              auctionLeftTime="1d : 4h : 20m : 30s"
              infotext="(This NFT is on your wallet)"
            />
          ) : (
            <div className="theunveiling" style={{ paddingBottom: '0px' }}>
              <img className="border--gradient" src={bordergradient} alt="border" />
              <div className="saler__content">
                <Button className="light-button">Put on sale</Button>
                <p>This NFT is on your wallet</p>
              </div>
            </div>
          )} */}
        </div>
      </div>
      {collection && moreFromCollection?.length ? (
        <div className="collection">
          <div className="collection--container">
            <div className="collection--title">
              <h1>More from this collection</h1>
            </div>
            <div className="nfts__lists">
              {moreFromCollection.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={{
                    ...nft,
                    collection,
                  }}
                />
              ))}
            </div>
            <div className="view--button">
              <button
                type="button"
                className="light-button"
                onClick={() =>
                  history.push(`/collection/${collection.address}`, {
                    collection,
                    saved: false,
                  })
                }
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

MarketplaceNFTDetails.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
  onNFT: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholderData: PropTypes.bool,
};

MarketplaceNFTDetails.defaultProps = {
  data: [],
  placeholderData: false,
};
export default MarketplaceNFTDetails;
