import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import './RewardTiers.scss';
import '../auctions/Tiers.scss';
import { Popup } from 'reactjs-popup';
import union from '../../assets/images/Union.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button.jsx';
import delateIcon from '../../assets/images/RemoveBtn.svg';
import { useAuctionContext } from '../../contexts/AuctionContext';
import RewardTierRemovePopup from '../popups/RewardTierRemovePopup';
import { AUCTION_SETTINGS_LIMITATION } from '../../utils/config';
import WinnersList from './WinnersList/WinnersList';
import NftsList from './NftsList/NftsList';

const RewardTiers = () => {
  const history = useHistory();
  const location = useLocation();
  const [shownActionId, setShownActionId] = useState(null);
  const [totalWinners, setTotalWinners] = useState(0);
  const [selectedWinners, setSelectedWinners] = useState({});

  const { auction } = useAuctionContext();

  useEffect(() => {
    console.log(selectedWinners);
  }, [selectedWinners]);

  useEffect(() => {
    if (auction?.rewardTiers?.length) {
      let count = 0;
      auction.rewardTiers.forEach((t) => {
        count += t.nftSlots.length;
      });
      setTotalWinners(count);
    }

    const selectedWinnersClone = { ...selectedWinners };
    auction.rewardTiers
      .filter((a) => !a.removed)
      .forEach((tier) => {
        selectedWinnersClone[tier.id] = 0;
      });
    setSelectedWinners(selectedWinnersClone);
  }, [auction]);

  return (
    <div className="container reward-tiers">
      <div>
        <div className="head-part">
          <h5 className="tier-title">Reward tiers</h5>
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

            return (
              <div className="view-tier" key={tier.id}>
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
                            {tier.nftSlots.length > 1 ? (
                              <>
                                Reserve price:&nbsp;
                                <b>
                                  {tier.nftSlots[0].minimumBid > 0
                                    ? ` ${tier.nftSlots[tier.nftSlots.length - 1].minimumBid} - ${
                                        tier.nftSlots[0].minimumBid
                                      } ETH`
                                    : '0 ETH'}
                                </b>
                              </>
                            ) : (
                              <>
                                Reserve price:&nbsp;
                                <b>{` ${
                                  tier.nftSlots[0].minimumBid ? tier.nftSlots[0].minimumBid : 0
                                } ETH`}</b>
                              </>
                            )}
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
                  <WinnersList
                    tier={tier}
                    selectedWinnerIndex={selectedWinners[tier.id] || 0}
                    setSelectedWinners={setSelectedWinners}
                  />

                  <div className="line-winners-nfts" />
                  <NftsList
                    onlyUniqueNFTs={onlyUniqueNFTs}
                    selectedWinnerIndex={selectedWinners[tier.id] || 0}
                  />
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
          disabled={!auction?.rewardTiers?.filter((el) => !el.removed).length}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
export default RewardTiers;
