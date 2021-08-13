/* eslint-disable no-cond-assign */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import Popup from 'reactjs-popup';
import moment from 'moment';
import './AuctionReview.scss';
import './Tiers.scss';
import uuid from 'react-uuid';
import infoIcon from '../../assets/images/icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import ethIcon from '../../assets/images/bid_icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import yellowIcon from '../../assets/images/yellowIcon.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';
import CongratsAuctionPopup from '../popups/CongratsAuctionPopup.jsx';
import LoadingPopup from '../popups/LoadingPopup.jsx';

const AuctionReview = () => {
  const {
    auction,
    setAuction,
    bidtype,
    myAuctions,
    setMyAuctions,
    selectedTabIndex,
    setSelectedTabIndex,
  } = useContext(AppContext);
  const history = useHistory();
  const [hideIcon, setHideIcon] = useState(false);
  const [bidicon, setBidicon] = useState(null);
  const isEditingAuction = myAuctions.filter((a) => a.id === auction.id);

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
      let totalNFTs = 0;
      auction.tiers.forEach((tier) => {
        totalNFTs += tier.winners * tier.nftsPerWinner;
      });
      // document.getElementById('loading-hidden-btn').click();
      setTimeout(() => {
        document.getElementById('popup-root').remove();
        document.getElementById('congrats-hidden-btn').click();
      }, 2000);
      setSelectedTabIndex(1);
      setTimeout(() => {
        const newAuction = { ...auction };
        newAuction.totalNFTs = totalNFTs;
        setMyAuctions([...myAuctions, newAuction]);
        setAuction({ tiers: [] });
        history.push('/my-auctions');
      }, 6000);
    }
  };

  const handleSaveAuction = () => {
    if (auction && auction.tiers.length) {
      let totalNFTs = 0;
      auction.tiers.forEach((tier) => {
        totalNFTs += tier.winners * tier.nftsPerWinner;
      });
      document.getElementById('loading-hidden-btn').click();
      setSelectedTabIndex(1);
      setTimeout(() => {
        document.getElementById('popup-root').remove();
        const newAuction = { ...auction };
        newAuction.totalNFTs = totalNFTs;
        setMyAuctions(myAuctions.map((item) => (item.id === newAuction.id ? newAuction : item)));
        setAuction({ tiers: [] });
        history.push('/my-auctions');
      }, 2000);
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
                <span>{moment(auction.startDate).format('MMMM DD, YYYY, HH:mm')} EST</span>
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
                <span>{moment(auction.endDate).format('MMMM DD, YYYY, HH:mm')} EST</span>
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
                    <div className="info-text">
                      <p>
                        Any bid in the last 3 minutes of an auction will extend the auction for an
                        additional 3 minutes.
                      </p>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {auction.properties &&
          auction.properties.length &&
          auction.properties
            .map((item) => item.address !== '' && item.amount !== '')
            .find((element) => element) && (
            <div className="royalty-settings-head">
              <h2 className="royalty-settings-title">Royalty splits</h2>
            </div>
          )}

        {auction.properties && auction.properties.length && (
          <div className="royalty-inf">
            {auction.properties.map(
              (item) =>
                item.address &&
                item.amount && (
                  <div className="royalty">
                    <p>{item.address}</p>
                    <span>{item.amount}%</span>
                  </div>
                )
            )}
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
        {auction.tiers.length &&
          auction.tiers.map((tier) => (
            <div key={tier.id} className="view-tier">
              <div className="auction-header">
                <div className="img_head">
                  <div className="img_head_title">
                    <h3>{tier.name}</h3>
                  </div>
                  <div className="winners__edit__btn">
                    <div className="winners">
                      <div className="tier-perwinners">
                        <h4>
                          NFTs per winner:&nbsp;<b>{tier.nftsPerWinner}</b>
                        </h4>
                      </div>
                      <div className="tier-winners">
                        <h4>
                          Winners:&nbsp;<b>{tier.winners}</b>
                        </h4>
                      </div>
                      <div className="tier-minbid">
                        <h4>
                          Total NFTs:&nbsp;
                          <b>{tier.nftsPerWinner * tier.winners}</b>
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
              </div>
              <div className="auctions-tier">
                <div className="auction-reward">
                  {tier.nfts.map((nft) => (
                    <div className="auction-reward__box" key={uuid()}>
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
                      </div>
                      {nft.generatedEditions.length > 1 && (
                        <>
                          <div className="auction-reward__box__highlight__one" />
                          <div className="auction-reward__box__highlight__two" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
        {isEditingAuction.length ? (
          <Button className="light-button" onClick={handleSaveAuction}>
            Save changes
          </Button>
        ) : (
          <Button className="light-button" onClick={handleSetAuction}>
            Set up auction
          </Button>
        )}
      </div>
    </div>
  );
};
export default AuctionReview;
