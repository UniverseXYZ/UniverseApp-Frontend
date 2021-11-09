import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import './RewardTiers.scss';
import '../auctions/Tiers.scss';
import { Popup } from 'reactjs-popup';
import Slider from 'react-slick';
import union from '../../assets/images/Union.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import pencil from '../../assets/images/pencil.svg';
import universeIcon from '../../assets/images/universe-img.svg';
import Button from '../button/Button.jsx';
import delateIcon from '../../assets/images/RemoveBtn.svg';
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
          auction.rewardTiers
            .filter((a) => !a.removed)
            .map((tier) => {
              const settings = {
                dots: true,
                slidesToShow: 2,
                variableWidth: true,
              };
              let allTierNFTs = [];
              if (tier.nftSlots) {
                // If we have tier.nftSlots it means we have local data to work with, otherwise we are editing an existing future auction fetched from the server and the response will be different
                tier.nftSlots.forEach((curr) => {
                  const nfts = [...curr.nftsData];
                  if (auction.collections) {
                    nfts.forEach((nft) => {
                      const collection = auction.collections.find((c) => c.id === nft.collectionId);
                      if (collection) {
                        nft.collectioName = collection.name;
                        nft.collectionAddress = collection.address;
                        nft.collectionUrl = collection.coverUrl;
                      }
                    });
                  }
                  allTierNFTs.push(nfts);
                }, []);
              } else if (tier.nfts) {
                // we are editing an existing future auction fetched from the server and the response will be different
                allTierNFTs = tier.nfts.reduce((res, curr) => {
                  const {
                    optimized_url: url,
                    numberOfEditions,
                    artworkType,
                    name,
                    collectionId,
                  } = curr;

                  const collection = auction.collections.find((c) => c.id === collectionId);

                  const collectioName = collection.name;
                  const collectionAddress = collection.address;
                  const collectionUrl = collection.coverUrl;

                  const nft = {
                    url,
                    count: 0,
                    artworkType,
                    nftName: name,
                    collectioName,
                    collectionAddress,
                    collectionUrl,
                  };
                  res.push(nft);
                  return res;
                }, []);
              }

              const onlyUniqueNFTs = allTierNFTs.map((a) =>
                a.reduce((res, curr) => {
                  const { url, collectioName, collectionAddress, collectionUrl } = curr;
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
                  res[url].artworkType = curr.artworkType;
                  res[url].collectioName = collectioName;
                  res[url].collectionAddress = collectionAddress;
                  res[url].collectionUrl = collectionUrl;
                  res[url].nftName = curr.nftName || curr.name;
                  return res;
                }, {})
              );
              let countNfts = 0;
              let countWinnersNft = 0;
              allTierNFTs.forEach((a) => {
                countNfts += a.length;
              });
              onlyUniqueNFTs.forEach((s) => {
                countWinnersNft += Object.keys(s).length;
              });
              settings.infinite = countWinnersNft > 4;

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
                              Winners:&nbsp;<b>{tier.winners || tier.numberOfWinners}</b>
                            </h4>
                          </div>
                          <div className="tier-winners">
                            <h4>
                              NFTs:&nbsp;<b>{countNfts}</b>
                            </h4>
                          </div>
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
                      <Slider {...settings}>
                        {onlyUniqueNFTs.map((winner, index) => (
                          <div className="rev-reward__block" key={uuid()}>
                            <div className="rev-reward__block__title">Winner #{index + 1}</div>
                            {Object.keys(winner).map((key) => {
                              const {
                                artworkType,
                                url,
                                count,
                                nftName,
                                collectioName,
                                collectionAddress,
                                collectionUrl,
                              } = winner[key];
                              const nftIsImage =
                                artworkType === 'png' ||
                                artworkType === 'jpg' ||
                                artworkType === 'jpeg' ||
                                artworkType === 'mpeg' ||
                                artworkType === 'webp';

                              return (
                                <div className="rev-reward__box">
                                  <div className="rev-reward__box__image">
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
                                      <img
                                        className="video__icon"
                                        src={videoIcon}
                                        alt="Video Icon"
                                      />
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
                                    <div>
                                      {count > 1 ? (
                                        <div className="tickeid-popup">
                                          <span className="ed-count">{`x${count || 1}`}</span>
                                          <div className="tooltiptext nft-tokenid-block">
                                            <span className="nft-tokenid-title">Token IDs: </span>
                                            <span className="nft-tokenids">
                                              #01112, #01113, #01114
                                            </span>
                                          </div>
                                        </div>
                                      ) : (
                                        <span className="ed-count">{`x${count || 1}`}</span>
                                      )}
                                    </div>
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
                        ))}
                      </Slider>
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
