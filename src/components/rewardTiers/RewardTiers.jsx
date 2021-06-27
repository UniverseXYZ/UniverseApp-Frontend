import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import './RewardTiers.scss';
import '../auctions/Tiers.scss';
import union from '../../assets/images/Union.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';

const RewardTiers = () => {
  const history = useHistory();
  const [shownActionId, setShownActionId] = useState(null);

  const { auction, bidtype } = useContext(AppContext);

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
        {auction.tiers.length > 0 &&
          auction.tiers.map((tier) => (
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
                          NFTs per winner:&nbsp;<b>{tier.nftsPerWinner}</b>
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
                      <div className="rev-reward__box__name">
                        <h3>{nft.name}</h3>
                      </div>
                      <div className="rev-reward__box__footer">
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
      <div className="btn-div">
        <Button
          className="light-border-button"
          onClick={() => history.push('/setup-auction/auction-settings', auction.id)}
        >
          Back
        </Button>
        <Button
          className="light-button"
          onClick={() => auction.tiers.length && history.push('/setup-auction/review-auction')}
          disabled={!auction.tiers.length}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
export default RewardTiers;
