/* eslint-disable no-debugger */
/* eslint-disable no-cond-assign */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './AuctionReview.scss';
import './Tiers.scss';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import infoIcon from '../../assets/images/icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import ethIcon from '../../assets/images/bid_icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import wethIcon from '../../assets/images/WETH 20x20.svg';
import wbtcIcon from '../../assets/images/WBTC 20x20.svg';
import aaveIcon from '../../assets/images/aave 20x20.png';
import compIcon from '../../assets/images/COMP 20x20.svg';
import ilvIcon from '../../assets/images/ILV 20x20.png';
import linkIcon from '../../assets/images/LINK 20x20.svg';
import sushiIcon from '../../assets/images/sushi 20x20.png';
import xyzIcon from '../../assets/images/XYZ 20x20.png';
import yellowIcon from '../../assets/images/yellowIcon.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button.jsx';
import CongratsAuctionPopup from '../popups/CongratsAuctionPopup.jsx';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import { AuctionCreate, AuctionUpdate } from '../../userFlows/AuctionCreate';
import { getFutureAuctions } from '../../utils/api/auctions';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useErrorContext } from '../../contexts/ErrorContext';

const AuctionReview = () => {
  const { auction, bidtype, options, myAuctions, setMyAuctions } = useAuctionContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const location = useLocation();
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
    if (bidtype === 'weth') {
      setBidicon(wethIcon);
    }
    if (bidtype === 'wbtc') {
      setBidicon(wbtcIcon);
    }
    if (bidtype === 'aave') {
      setBidicon(aaveIcon);
    }
    if (bidtype === 'link') {
      setBidicon(linkIcon);
    }
    if (bidtype === 'comp') {
      setBidicon(compIcon);
    }
    if (bidtype === 'ilv') {
      setBidicon(ilvIcon);
    }
    if (bidtype === 'sushi') {
      setBidicon(sushiIcon);
    }
    if (bidtype === 'xyz') {
      setBidicon(xyzIcon);
    }
  }, []);

  const handleSetAuction = async () => {
    if (auction && auction?.rewardTiers?.length) {
      document.getElementById('loading-hidden-btn').click();
      const popupRoot = document.getElementById('popup-root');
      if (popupRoot) popupRoot.remove();

      let res;
      if (isEditingAuction.length) {
        res = await AuctionUpdate({ auction, bidtype, options });
      } else {
        res = await AuctionCreate({ auction, bidtype, options });
      }

      if (res?.id) {
        document.getElementById('congrats-hidden-btn').click();
      } else if (res.error) {
        document.getElementById('congrats-hidden-btn').click();
        const errorMsg =
          res?.errors[0]?.message || 'An error occured, please check the network tab !';

        setShowError(true);
        setErrorTitle('Failed to update/create auction !');
        setErrorBody(errorMsg);
      }
    }
  };

  const handleAuctionPopupSuccess = async () => {
    const futureAuctionResponse = await getFutureAuctions();
    setMyAuctions(futureAuctionResponse?.auctions || []);
  };

  const startDate = format(new Date(auction.startDate), 'MMMM dd, yyyy, HH:mm');
  const endDate = format(new Date(auction.endDate), 'MMMM dd, yyyy, HH:mm');

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
        {(close) => <CongratsAuctionPopup onClose={handleAuctionPopupSuccess} />}
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
                <span>{startDate} EST</span>
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
                <span>{endDate} EST</span>
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
            .map((item) => item.address !== '' && item.percentAmount !== '')
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
                item.percentAmount && (
                  <div key={item.address} className="royalty">
                    <p className="show--on--desktop">{item.address}</p>
                    <p className="hide--on--desktop">
                      {`${item.address.substring(0, 13)}...${item.address.substring(
                        27,
                        item.address.length
                      )}`}
                    </p>
                    <span>{item.percentAmount}%</span>
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
        {auction?.rewardTiers
          ?.filter((t) => !t.removed)
          .map((tier) => {
            const allTierNFTs = tier.nftSlots.reduce((res, curr) => {
              const nfts = curr.nftsData;

              res.push(...nfts);
              return res;
            }, []);

            const onlyUniqueNFTs = allTierNFTs.reduce((res, curr) => {
              const { url, artworkType, nftName, collectioName, collectionAddress, collectionUrl } =
                curr;
              res[url] = res[url] || {
                url,
                count: 0,
                artworkType: '',
                nftName: '',
                collectioName: '',
                collectionAddress: '',
                collectionUrl: '',
              };

              res[url].count += 1;
              res[url].artworkType = artworkType;
              res[url].collectioName = collectioName;
              res[url].collectionAddress = collectionAddress;
              res[url].collectionUrl = collectionUrl;
              res[url].nftName = nftName;
              return res;
            }, {});

            return (
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
                            NFTs per winner:&nbsp;
                            <b>
                              {tier.customNFTsPerWinner || tier.nftsPerWinner === 0
                                ? 'custom'
                                : tier.nftsPerWinner}
                            </b>
                          </h4>
                        </div>
                        <div className="tier-winners">
                          <h4>
                            Winners:&nbsp;<b>{tier.winners || tier.numberOfWinners}</b>
                          </h4>
                        </div>
                        <div className="tier-minbid">
                          <h4>
                            Total NFTs:&nbsp;
                            <b>{allTierNFTs.length}</b>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="auctions-tier">
                  <div className="auction-reward">
                    {Object.keys(onlyUniqueNFTs).map((key) => {
                      const {
                        artworkType,
                        url,
                        count,
                        nftName,
                        collectioName,
                        collectionAddress,
                        collectionUrl,
                      } = onlyUniqueNFTs[key];
                      const nftIsImage =
                        artworkType === 'png' ||
                        artworkType === 'jpg' ||
                        artworkType === 'jpeg' ||
                        artworkType === 'mpeg' ||
                        artworkType === 'webp';

                      return (
                        <div className="auction-reward__box" key={uuid()}>
                          <div className="auction-reward__box__image">
                            {artworkType === 'mp4' && (
                              <video
                                onMouseOver={(event) => event.target.play()}
                                onFocus={(event) => event.target.play()}
                                onMouseOut={(event) => event.target.pause()}
                                onBlur={(event) => event.target.pause()}
                              >
                                <source src={url} type="video/mp4" />
                                <track kind="captions" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            {artworkType === 'mpeg' && (
                              <img className="preview-image" src={mp3Icon} alt={nftName} />
                            )}
                            {nftIsImage && (
                              <img className="preview-image" src={url} alt={nftName} />
                            )}
                            {artworkType === 'mp4' && (
                              <img className="video__icon" src={videoIcon} alt="Video Icon" />
                            )}
                          </div>
                          {count > 1 && (
                            <>
                              <div className="auction-reward__box__highlight__one" />
                              <div className="auction-reward__box__highlight__two" />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
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
          onClick={() =>
            history.push({
              pathname: '/setup-auction/reward-tiers',
              state: location.state === 'edit' ? location.state : true,
            })
          }
        >
          Back
        </Button>
        {isEditingAuction.length ? (
          <Button className="light-button" onClick={handleSetAuction}>
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
