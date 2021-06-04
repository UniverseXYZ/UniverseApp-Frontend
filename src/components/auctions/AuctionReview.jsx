/* eslint-disable no-cond-assign */
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import Popup from 'reactjs-popup';
import moment from 'moment';
import './AuctionReview.scss';
import './Tiers.scss';
import arrow from '../../assets/images/arrow.svg';
import infoIcon from '../../assets/images/icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import ethIcon from '../../assets/images/bid_icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import yellowIcon from '../../assets/images/yellowIcon.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import checkIcon from '../../assets/images/check.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';
import CongratsAuctionPopup from '../popups/CongratsAuctionPopup.jsx';
import LoadingPopup from '../popups/LoadingPopup.jsx';

const AuctionReview = () => {
  const { auction, setAuction, bidtype, setBidype } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();
  const [shownActionId, setShownActionId] = useState(null);
  const [hideIcon, setHideIcon] = useState(false);
  const [bidicon, setBidicon] = useState(null);

  useEffect(() => {
    if (bidtype === 'eth') {
      setBidicon(ethIcon);
    }
    if (bidtype === 'dai') {
      setBidicon(daiIcon);
    }
    if (bidtype === 'usdc') {
      setBidicon(usdcIcon);
    }
    if (bidtype === 'bond') {
      setBidicon(bondIcon);
    }
    if (bidtype === 'snx') {
      setBidicon(snxIcon);
    }
  }, []);

  const handleSetAuction = () => {
    if (auction && auction.tiers.length) {
      document.getElementById('loading-hidden-btn').click();
      setTimeout(() => {
        document.getElementById('popup-root').remove();
        document.getElementById('congrats-hidden-btn').click();
      }, 2000);
      setTimeout(() => {
        history.push('/customize-auction-landing-page');
      }, 6000);
    }
  };

  return (
    <div className="container auction-reward">
      <Popup
        trigger={
          <button
            type="button"
            id="loading-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <LoadingPopup onClose={close} />}
      </Popup>
      <Popup
        trigger={
          <button
            type="button"
            id="congrats-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <CongratsAuctionPopup onClose={close} />}
      </Popup>
      <div>
        <div className="head-part">
          <h2 className="tier-title">Review auction</h2>
          <p>Review the auction settings and reward tiers</p>
        </div>

        <div className="auction-settings-head">
          <h2 className="auction-settings-title">Auction settings</h2>
          {auction.name && auction.startingBid && auction.startDate && auction.endDate && (
            <button
              type="button"
              className="edit-auction-settings"
              onClick={() => {
                history.push('/setup-auction/auction-settings', auction.id);
              }}
            >
              Edit <img src={pencil} alt="edit-icon" />
            </button>
          )}
        </div>
        {auction.name && auction.startingBid && auction.startDate && auction.endDate && (
          <div className="auction-inf">
            <div className="name-bid">
              <div className="tName">
                <p>Auction name</p>
                <span>{auction.name}</span>
              </div>
              <div className="startDate">
                <p>Start date</p>
                <span>{moment(auction.startDate).format('MMMM DD, YYYY')}</span>
              </div>
            </div>
            <div className="date-part">
              <div className="bid-part">
                <div className="bidToken">
                  <p>Bid token (ERC-20)</p>
                  <span className="bidtype">
                    {bidicon && <img src={bidicon} alt="icon" />}
                    {bidtype}
                  </span>
                </div>
                <div className="startingBid">
                  <p>Starting bid</p>
                  <span>{auction.startingBid}</span>
                </div>
              </div>
              <div className="endDate">
                <p>End date</p>
                <span>{moment(auction.endDate).format('MMMM DD, YYYY')}</span>
                <span className="auction-ext">
                  Ending auction extension timer: 3 minutes
                  <img
                    src={infoIcon}
                    alt="Info Icon"
                    onMouseOver={() => setHideIcon(true)}
                    onFocus={() => setHideIcon(true)}
                    onMouseLeave={() => setHideIcon(false)}
                    onBlur={() => setHideIcon(false)}
                  />
                  {hideIcon && (
                    <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                      <div className="info-text">
                        <p>
                          Any bid in the last 3 minutes of an auction will extend the auction for an
                          additional 3 minutes.
                        </p>
                      </div>
                    </Animated>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="reward-tiers-head">
          <h2 className="reward-tiers-title">Reward tiers</h2>
          <button
            type="button"
            className="edit-reward-tiers"
            onClick={() => {
              history.push('/setup-auction/reward-tiers');
            }}
          >
            Edit <img src={pencil} alt="edit-icon" />
          </button>
        </div>
        {auction.tiers.length === 0 && (
          <div key={1} className="view-tier">
            <div className="auction-header">
              <div className="img_head">
                <div className="img_head_title">
                  {/* <h3>{tier.name}</h3> */}
                  <h3>Platinum tier</h3>
                </div>
                <div className="winners__edit__btn">
                  <div className="winners">
                    <div className="tier-perwinners">
                      <h4>
                        {/* NFTs per winner:&nbsp;<b>{tier.nftsPerWinner}</b> */}
                        NFTs per winner:&nbsp;<b>3</b>
                      </h4>
                    </div>
                    <div className="tier-winners">
                      <h4>
                        {/* Winners:&nbsp;<b>{tier.winners}</b> */}
                        Winners:&nbsp;<b>5</b>
                      </h4>
                    </div>
                    <div className="tier-minbid">
                      <h4>
                        Total NFTs:&nbsp;
                        <b>15</b>
                      </h4>
                    </div>
                  </div>
                  {/* <Button
                    className="light-border-button"
                    onClick={() => {
                      history.push('/create-tiers', 1);
                    }}
                  >
                    Edit <img src={pencil} alt="edit-icon" />
                  </Button> */}
                </div>
              </div>
              {/* <div className="edit-show">
                <div className="edit-btn">
                  <Button
                    className="light-border-button"
                    onClick={() => {
                      history.push('/create-tiers', 1);
                    }}
                  >
                    Edit <img src={pencil} alt="edit-icon" />
                  </Button>
                </div>
                <div className="launch-auction">
                  {shownActionId === 1 ? (
                    <img
                      src={arrowUp}
                      alt="Arrow up"
                      onClick={() => setShownActionId(null)}
                      aria-hidden="true"
                    />
                  ) : (
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      onClick={() => setShownActionId(1)}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div> */}
            </div>
            <div hidden={shownActionId !== 1} className="auctions-tier">
              <div className="auction-reward">
                {/* {tier.nfts.map((nft) => (
                    <div className="auction-reward__box">
                      <div className="auction-reward__box__image">
                        {nft.previewImage.type === 'video/mp4' && (
                          <video
                            onMouseOver={(event) => event.target.play()}
                            onFocus={(event) => event.target.play()}
                            onMouseOut={(event) => event.target.pause()}
                            onBlur={(event) => event.target.pause()}
                          >
                            <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                            <track kind="captions" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {nft.previewImage.type === 'audio/mpeg' && (
                          <img className="preview-image" src={mp3Icon} alt={nft.name} />
                        )}
                        {nft.previewImage.type !== 'audio/mpeg' &&
                          nft.previewImage.type !== 'video/mp4' && (
                            <img
                              className="preview-image"
                              src={URL.createObjectURL(nft.previewImage)}
                              alt={nft.name}
                            />
                          )}
                        {nft.previewImage.type === 'video/mp4' && (
                          <img className="video__icon" src={videoIcon} alt="Video Icon" />
                        )}
                        {nft.selected && (
                          <img className="check__icon" src={checkIcon} alt="Check Icon" />
                        )}
                      </div>
                      <div className="auction-reward__box__name">
                        <h3>{nft.name}</h3>
                      </div>
                      <div className="auction-reward__box__footer">
                        <div className="collection__details">
                          {nft.type === 'collection' && (
                            <>
                              {typeof nft.collectionAvatar === 'string' &&
                              nft.collectionAvatar.startsWith('#') ? (
                                <div
                                  className="random__bg__color"
                                  style={{ backgroundColor: nft.collectionAvatar }}
                                >
                                  {nft.collectionName.charAt(0)}
                                </div>
                              ) : (
                                <img
                                  src={URL.createObjectURL(nft.collectionAvatar)}
                                  alt={nft.collectionName}
                                />
                              )}
                              <span>{nft.collectionName}</span>
                            </>
                          )}
                        </div>
                        <span className="ed-count">{`x${nft.generatedEditions.length}`}</span>
                      </div>
                      {nft.generatedEditions.length > 1 && (
                        <>
                          <div className="auction-reward__box__highlight__one" />
                          <div className="auction-reward__box__highlight__two" />
                        </>
                      )}
                    </div>
                  ))} */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="message">
        <span>
          <img src={yellowIcon} alt="icon" />
        </span>
        <h1>
          Creating an auction doesn’t launch it. You will be able to mint all the NFTs and set up a
          landing page to host your launch. Once you launch anyone can start bidding.
        </h1>
      </div>
      <div className="btn-div">
        <Button
          className="light-border-button"
          onClick={() => history.push('/setup-auction/reward-tiers')}
        >
          Back
        </Button>
        <Button className="light-button" onClick={handleSetAuction}>
          Set up auction
        </Button>
      </div>
    </div>
  );
};
export default AuctionReview;
