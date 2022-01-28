import React, { useEffect, useState } from 'react';
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
import WinnerIcon from '../../assets/images/winner-icon.svg';
import Button from '../button/Button.jsx';
import delateIcon from '../../assets/images/RemoveBtn.svg';
import { useAuctionContext } from '../../contexts/AuctionContext';
import RewardTierRemovePopup from '../popups/RewardTierRemovePopup';
import { AUCTION_SETTINGS_LIMITATION } from '../../utils/config';

const RewardTiers = () => {
  const history = useHistory();
  const location = useLocation();
  const [shownActionId, setShownActionId] = useState(null);
  const [totalWinners, setTotalWinners] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState(0);

  const { auction, bidtype } = useAuctionContext();

  useEffect(() => {
    if (auction?.rewardTiers?.length) {
      let count = 0;
      auction.rewardTiers.forEach((t) => {
        count += t.nftSlots.length;
      });
      setTotalWinners(count);
    }
  }, [auction]);

  return (
    <div className="container reward-tiers">
      <div>
        <div className="head-part">
          <h2 className="tier-title">Reward tiers</h2>
          <p>
            Reward Tiers are the NFT bundles that users are bidding for to win. There can be up to{' '}
            {AUCTION_SETTINGS_LIMITATION.TOTAL_WINNERS_COUNT} winners distrubted into the Auction
            Tiers.
          </p>
        </div>
        {auction.rewardTiers
          .filter((a) => !a.removed)
          .map((tier) => {
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
                const { url, collectioName, collectionAddress, collectionUrl, id } = curr;
                res[url] = res[url] || {
                  url,
                  count: 0,
                  tokenIds: [],
                  artworkType: '',
                  nftName: '',
                  collectioName: '',
                  collectionAddress: '',
                  collectionUrl: '',
                };

                res[url].tokenIds.push(id);
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
            allTierNFTs.forEach((a) => {
              countNfts += a.length;
            });

            const winnerNftLength = Object.keys(onlyUniqueNFTs[selectedWinner]).length;
            const settingsNfts = {
              variableWidth: true,
              infinite: winnerNftLength > 5,
              slidesToShow: winnerNftLength < 6 ? winnerNftLength : 1,
              initialSlide: 0,
              responsive: [
                {
                  breakpoint: 993,
                  settings: {
                    infinite: winnerNftLength > 3,
                    slidesToShow: winnerNftLength < 4 ? winnerNftLength : 1,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    infinite: winnerNftLength > 2,
                    slidesToShow: winnerNftLength < 3 ? winnerNftLength : 1,
                  },
                },
                {
                  breakpoint: 426,
                  settings: {
                    infinite: winnerNftLength > 1,
                    slidesToShow: winnerNftLength < 2 ? winnerNftLength : 1,
                  },
                },
              ],
            };

            const settingsWinners = {
              variableWidth: true,
              infinite: tier.winners > 7,
              slidesToShow: tier.winners < 8 ? tier.winners : 1,
              initialSlide: 0,
              responsive: [
                {
                  breakpoint: 1225,
                  settings: {
                    infinite: tier.winners > 6,
                    slidesToShow: tier.winners < 7 ? tier.winners : 1,
                  },
                },
                {
                  breakpoint: 992,
                  settings: {
                    infinite: tier.winners > 4,
                    slidesToShow: tier.winners < 5 ? tier.winners : 1,
                  },
                },
                {
                  breakpoint: 680,
                  settings: {
                    infinite: tier.winners > 3,
                    slidesToShow: tier.winners < 4 ? tier.winners : 1,
                  },
                },
                {
                  breakpoint: 497,
                  settings: {
                    infinite: tier.winners > 2,
                    slidesToShow: tier.winners < 3 ? tier.winners : 1,
                  },
                },
                {
                  breakpoint: 367,
                  settings: {
                    infinite: tier.winners > 1,
                    slidesToShow: tier.winners < 2 ? tier.winners : 1,
                  },
                },
              ],
            };

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
                            Reserve price:&nbsp;
                            <b>
                              {tier.customNFTsPerWinner || tier.nftsPerWinner === 0
                                ? '0-2.3 ETH'
                                : tier.nftsPerWinner}
                            </b>
                          </h4>
                        </div>
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
                  <div className="reward__winner__lists">
                    <Slider {...settingsWinners}>
                      {tier.nftSlots.map((data, i) => (
                        <div
                          className={
                            selectedWinner === i
                              ? 'reward__winner-box selected'
                              : 'reward__winner-box'
                          }
                          aria-hidden="true"
                          key={uuid()}
                          onClick={() => setSelectedWinner(i)}
                          onKeyDown={() => setSelectedWinner(i)}
                        >
                          <img src={WinnerIcon} alt="winner-icon" />
                          <p>Winner #{data.slot + 1}</p>
                          <span>{data.nftsData?.length} NFTs</span>
                          <div className="box--shadow--effect--block" />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="line-winners-nfts" />
                  <div className="rev-reward">
                    <Slider {...settingsNfts}>
                      {Object.keys(onlyUniqueNFTs[selectedWinner]).map((key) => {
                        const {
                          artworkType,
                          url,
                          count,
                          nftName,
                          collectioName,
                          collectionAddress,
                          collectionUrl,
                          tokenIds,
                        } = onlyUniqueNFTs[selectedWinner][key];
                        const nftIsImage =
                          artworkType === 'png' ||
                          artworkType === 'jpg' ||
                          artworkType === 'jpeg' ||
                          artworkType === 'mpeg' ||
                          artworkType === 'webp';

                        let tokenIdString = '';
                        const tokenIdsLength = tokenIds.length > 5 ? 4 : tokenIds.length - 1;
                        for (let i = 0; i <= tokenIdsLength; i += 1) {
                          tokenIdString += ` #${tokenIds[i]},`;
                        }
                        tokenIdString = tokenIdString.slice(0, tokenIdString.length - 1);
                        if (tokenIds.length > 5) {
                          tokenIdString += ' .....';
                        }

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
                              <div>
                                {count > 1 ? (
                                  <div className="tickeid-popup">
                                    <span className="ed-count">{`x${count || 1}`}</span>
                                    <div className="tooltiptext nft-tokenid-block">
                                      <span className="nft-tokenid-title">Token IDs: </span>
                                      <span className="nft-tokenids">{tokenIdString}</span>
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
                    </Slider>
                  </div>
                </div>
              </div>
            );
          })}
        <div
          className="create-rew-tier"
          style={{
            opacity: totalWinners >= AUCTION_SETTINGS_LIMITATION.TOTAL_WINNERS_COUNT ? '0.3' : 1,
          }}
          onClick={() => {
            if (totalWinners >= AUCTION_SETTINGS_LIMITATION.TOTAL_WINNERS_COUNT) return;
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
