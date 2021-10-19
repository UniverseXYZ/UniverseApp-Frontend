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
          auction.rewardTiers.map((tier) => (
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
                          <b>{tier.nftsPerWinner > 0 && tier.nftsPerWinner}</b>
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
                  {tier.nfts.map((nft) => (
                    <div className="rev-reward__box" key={uuid()}>
                      <div className="rev-reward__box__image">
                        {isVideo(nft) && (
                          <video
                            onMouseOver={(event) => event.target.play()}
                            onFocus={(event) => event.target.play()}
                            onMouseOut={(event) => event.target.pause()}
                            onBlur={(event) => event.target.pause()}
                          >
                            <source src={getNftImage(nft)} type="video/mp4" />
                            <track kind="captions" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {isAudio(nft) && (
                          <img className="preview-image" src={mp3Icon} alt={nft.name} />
                        )}
                        {isImage(nft) && (
                          <img className="preview-image" src={getNftImage(nft)} alt={nft.name} />
                        )}
                        {isVideo(nft) && (
                          <img className="video__icon" src={videoIcon} alt="Video Icon" />
                        )}
                      </div>
                      <div className="rev-reward__box__name">
                        <h3>{nft.name}</h3>
                      </div>
                      <div className="rev-reward__box__footer">
                        <div className="collection__details">
                          {nft.collection && (
                            <>
                              {typeof nft.collection.coverUrl === 'string' &&
                              nft.collection.coverUrl.startsWith('#') ? (
                                <div
                                  className="random__bg__color"
                                  style={{ backgroundColor: nft.collection.coverUrl }}
                                >
                                  {nft.collection.name.charAt(0)}
                                </div>
                              ) : nft.collection.symbol === 'NFUC' ? (
                                <img src={universeIcon} alt={nft.collection.name} />
                              ) : (
                                <img src={nft.collection.coverUrl} alt={nft.collection.name} />
                              )}
                              <span>{nft.collection.name}</span>
                            </>
                          )}
                        </div>
                        <span className="ed-count">{`x${nft?.tokenIds?.length || 1}`}</span>
                      </div>
                      {nft?.tokenIds?.length > 1 && (
                        <>
                          <div className="rev-reward__box__highlight__one" />
                          <div className="rev-reward__box__highlight__two" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
