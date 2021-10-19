import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import './RewardTiers.scss';
import '../auctions/Tiers.scss';
import { Popup } from 'reactjs-popup';
import union from '../../assets/images/Union.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import pencil from '../../assets/images/pencil.svg';
import universeIcon from '../../assets/images/universe-img.svg';
import Button from '../button/Button.jsx';
import delateIcon from '../../assets/images/RemoveBtn.svg';

import {
  isImage,
  isVideo,
  isAudio,
  getNftImage,
  getNftColletionImage,
  getEditionsCount,
} from '../../utils/helpers/pureFunctions/nfts';
import { useAuctionContext } from '../../contexts/AuctionContext';
import RewardTierRemovePopup from '../popups/RewardTierRemovePopup';

const RewardTiers = () => {
  const history = useHistory();
  const location = useLocation();
  const [shownActionId, setShownActionId] = useState(null);

  const { auction, bidtype } = useAuctionContext();

  return (
    <div className="container reward-tiers">
      <div>
        <div className="head-part">
          <h2 className="tier-title">Reward tiers</h2>
          <p>
            Reward Tiers are the NFT bundles that users are bidding for to win. There can be up to
            10 tiers in one auction.
          </p>
        </div>
        {auction.rewardTiers &&
          auction.rewardTiers.map((tier) => {
            const allTierNFTs = tier.nftSlots.reduce((res, curr) => {
              const nfts = curr.fullData.nftIds;
              res.push(...nfts);
              return res;
            }, []);

            const onlyUniqueNFTs = allTierNFTs.reduce((res, curr) => {
              const { url, artWorkType, nftName, collectioName, collectionAddress, collectionUrl } =
                curr;
              res[url] = res[url] || {
                url,
                count: 0,
                artWorkType: '',
                nftName: '',
                collectioName: '',
                collectionAddress: '',
                collectionUrl: '',
              };

              res[url].count += 1;
              res[url].artWorkType = artWorkType;
              res[url].collectioName = collectioName;
              res[url].collectionAddress = collectionAddress;
              res[url].collectionUrl = collectionUrl;
              res[url].nftName = nftName;
              return res;
            }, {});
            return (
              <div className="view-tier" key={uuid()}>
                <div className="auction-header">
                  <div className="img_head">
                    <div className="img_head_title">
                      <h3>{tier.name}</h3>
                    </div>
                    <div className="winners__edit__btn">
                      <div className="winners">
                        <div className="tier-winners">
                          <h4>
                            Winners:&nbsp;<b>{tier.winners}</b>
                          </h4>
                        </div>
                        <div className="tier-perwinners">
                          <h4>
                            NFTs per winner:&nbsp;
                            <b>{tier.customNFTsPerWinner ? 'custom' : tier.nftsPerWinner}</b>
                          </h4>
                        </div>
                        {tier.minBidValue ? (
                          <div className="tier-minbid">
                            <h4>
                              Minimum bid per tier:&nbsp;
                              <b>
                                {tier.minBidValue} <span className="bidtype">{bidtype}</span>
                              </b>
                            </h4>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <Button
                        className="light-border-button"
                        onClick={() => {
                          history.push('/create-tiers', tier.id);
                        }}
                      >
                        Edit <img src={pencil} alt="edit-icon" />
                      </Button>
                    </div>
                  </div>
                  <div className="edit-show">
                    <div className="edit-btn">
                      <Button
                        className="light-border-button"
                        onClick={() => {
                          history.push('/create-tiers', tier.id);
                        }}
                      >
                        Edit <img src={pencil} alt="edit-icon" />
                      </Button>
                      <Popup
                        nested
                        handleEdit
                        trigger={
                          <div className="remove-image">
                            <img
                              src={delateIcon}
                              alt="Delete"
                              className="remove-img"
                              aria-hidden="true"
                            />
                            <span className="tooltiptext">Remove reward tier</span>
                          </div>
                        }
                      >
                        {(close) => <RewardTierRemovePopup onClose={close} id={tier.id} />}
                      </Popup>
                    </div>
                    <div className="launch-auction">
                      {shownActionId === tier.id ? (
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
                          onClick={() => setShownActionId(tier.id)}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div hidden={shownActionId !== tier.id} className="auctions-tier">
                  <div className="rev-reward">
                    {Object.keys(onlyUniqueNFTs).map((key) => {
                      const {
                        artWorkType,
                        url,
                        count,
                        nftName,
                        collectioName,
                        collectionAddress,
                        collectionUrl,
                      } = onlyUniqueNFTs[key];
                      const nftIsImage =
                        artWorkType === 'png' ||
                        artWorkType === 'jpg' ||
                        artWorkType === 'jpeg' ||
                        artWorkType === 'mpeg' ||
                        artWorkType === 'webp';

                      return (
                        <div className="rev-reward__box" key={uuid()}>
                          <div className="rev-reward__box__image">
                            {artWorkType === 'mp4' && (
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
                            {artWorkType === 'mpeg' && (
                              <img className="preview-image" src={mp3Icon} alt={nftName} />
                            )}
                            {nftIsImage && (
                              <img className="preview-image" src={url} alt={nftName} />
                            )}
                            {artWorkType === 'mp4' && (
                              <img className="video__icon" src={videoIcon} alt="Video Icon" />
                            )}
                          </div>
                          <div className="rev-reward__box__name">
                            <h3>{nftName}</h3>
                          </div>
                          <div className="rev-reward__box__footer">
                            <div className="collection__details">
                              {collectioName && (
                                <>
                                  {typeof collectionUrl === 'string' &&
                                  collectionUrl.startsWith('#') ? (
                                    <div
                                      className="random__bg__color"
                                      style={{ backgroundColor: collectionUrl }}
                                    >
                                      {collectioName.charAt(0)}
                                    </div>
                                  ) : collectionAddress ===
                                    process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                                    <img src={universeIcon} alt={collectioName} />
                                  ) : (
                                    <img src={collectionUrl} alt={collectioName} />
                                  )}
                                  <span>{collectioName}</span>
                                </>
                              )}
                            </div>
                            <span className="ed-count">{`x${count || 1}`}</span>
                          </div>
                          {count > 1 && (
                            <>
                              <div className="rev-reward__box__highlight__one" />
                              <div className="rev-reward__box__highlight__two" />
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
        <div
          className="create-rew-tier"
          onClick={() => {
            history.push('/create-tiers');
          }}
          aria-hidden="true"
        >
          <div className="plus-icon">
            <img src={union} alt="create" />
          </div>
          <div className="create-rew-text">
            <p>Create reward tier</p>
          </div>
        </div>
      </div>
      <div className={!auction?.rewardTiers?.length ? 'btn-div' : 'btn-div withtier'}>
        <Button
          className="light-border-button"
          onClick={() =>
            history.push({
              pathname: '/setup-auction/auction-settings',
              state: location.state === 'edit' ? location.state : true,
            })
          }
        >
          Back
        </Button>
        <Button
          className="light-button"
          onClick={() =>
            auction?.rewardTiers?.length &&
            history.push({
              pathname: '/setup-auction/review-auction',
              state: location.state === 'edit' ? location.state : true,
            })
          }
          disabled={!auction?.rewardTiers?.length}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
export default RewardTiers;
