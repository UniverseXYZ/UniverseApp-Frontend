import React, { useState, useEffect, useRef } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import { utils, BigNumber } from 'ethers';
import videoIcon from '../../assets/images/video-icon.svg';
import Button from '../button/Button';
import copyIcon from '../../assets/images/copy1.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import infoIcon from '../../assets/images/icon.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import PastAuctionActionSection from './PastAuctionActionSection';
import { createRewardsTiersSlots } from '../../utils/helpers';

const PastAuctionsCard = ({ auction, setShowLoadingModal, setLoadingText }) => {
  const history = useHistory();

  const { loggedInArtist, ethPrice, universeAuctionHouseContract, address } = useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAuctioneerTooltip, setShowAuctioneerTooltip] = useState(false);
  const [showRewardsTooltip, setShowRewardsTooltip] = useState(false);
  const [slotsToWithdraw, setSlotsToWithdraw] = useState([]);
  const [slotsInfo, setSlotsInfo] = useState({});
  const [mySlot, setMySlot] = useState(null);
  const [mySlotIndex, setMySlotIndex] = useState(-1);
  const [claimableFunds, setClaimableFunds] = useState(0);
  const [unreleasedFunds, setUnreleasedFunds] = useState(0);
  const [rewardTiersSlots, setRewardTiersSlots] = useState([]);
  const auctionTotalNfts = auction.rewardTiers
    .map((tier) => tier.nfts.length)
    .reduce((totalNfts, currentNftsCount) => totalNfts + currentNftsCount, 0);
  const startDate = format(new Date(auction.startDate), 'MMMM dd, HH:mm');
  const endDate = format(new Date(auction.endDate), 'MMMM dd, HH:mm');
  const ethPriceUsd = ethPrice?.market_data?.current_price?.usd;
  const verifyClaimLoadingText = 'Your Claim tx is being verified. This will take a few seconds.';
  const defaultLoadingText = 'Your Claim tx is being processed. This will take a few seconds.';

  const slotsInfoRef = useRef(slotsInfo);

  useEffect(() => {
    slotsInfoRef.current = slotsInfo;
  }, [slotsInfo]);

  const getAuctionSlotsInfo = async () => {
    if (
      address &&
      universeAuctionHouseContract &&
      auction &&
      !auction.canceled &&
      auction.onChainId &&
      auction.onChain
    ) {
      const tierSlots = createRewardsTiersSlots(auction.rewardTiers, auction?.bidders);
      setRewardTiersSlots(tierSlots);

      const onChainAuction = await universeAuctionHouseContract.auctions(auction.onChainId);

      const auctionSlotsInfo = {};
      for (let i = 1; i <= onChainAuction.numberOfSlots; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const slotInfo = await universeAuctionHouseContract.getSlotInfo(auction.onChainId, i);
        auctionSlotsInfo[i] = slotInfo;
      }
      setSlotsInfo(auctionSlotsInfo);

      // eslint-disable-next-line no-restricted-syntax
      for (const [slotIndex, slotInfo] of Object.entries(auctionSlotsInfo)) {
        if (slotInfo.winner === utils.getAddress(address)) {
          setMySlot(slotInfo);
          setMySlotIndex(slotIndex);
        } else if (
          slotInfo.winner === '0x0000000000000000000000000000000000000000' &&
          slotInfo.revenueCaptured &&
          slotInfo.totalWithdrawnNfts.toNumber() !== slotInfo.totalDepositedNfts.toNumber()
        ) {
          setSlotsToWithdraw((slots) => [...slots, +slotIndex]);
        }
      }
    }
  };

  const getAuctionRevenue = async () => {
    if (universeAuctionHouseContract && Object.values(slotsInfoRef.current).length) {
      const revenueToClaim = await universeAuctionHouseContract.auctionsRevenue(auction.onChainId);

      const totalBids = Object.values(slotsInfoRef.current).reduce(
        (acc, slot) => acc.add(slot.winningBidAmount),
        BigNumber.from('0')
      );

      const toClaim = utils.formatEther(revenueToClaim);
      setClaimableFunds(toClaim);

      const unreleased =
        utils.formatEther(totalBids.sub(revenueToClaim)) - Number(auction.revenueClaimed);
      setUnreleasedFunds(unreleased);
    }
  };

  useEffect(() => {
    getAuctionRevenue();
  }, [universeAuctionHouseContract, slotsInfo]);

  useEffect(() => {
    getAuctionSlotsInfo();
  }, [universeAuctionHouseContract, auction]);

  const handleClaimFunds = async () => {
    try {
      setLoadingText(defaultLoadingText);
      setShowLoadingModal(true);
      const tx = await universeAuctionHouseContract.distributeCapturedAuctionRevenue(
        auction.onChainId
      );
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        // This modal will be closed upon recieving handleAuctionWithdrawnRevenueEvent
        setLoadingText(verifyClaimLoadingText);
        // TODO: This should be moved in the event handler somehow
        setClaimableFunds(0);
      }
    } catch (err) {
      setShowLoadingModal(false);
      setActiveTxHashes([]);
      console.log(err);
    }
  };

  const areAllSlotsCaptured =
    auction.finalised &&
    !auction.rewardTiers
      .map((r) => r.slots)
      .flat()
      .some((s) => !s.capturedRevenue);

  return (
    <div className="auction past-auction" key={auction.id}>
      <div className="past-left-border-effect" />
      <div className="auction-header">
        <div className="img_head">
          <h3>{auction.name}</h3>
          <div className="copy-div">
            <div className="copy" title="Copy to clipboard">
              {copiedUrl && (
                <div className="copied-div">
                  URL copied!
                  <span />
                </div>
              )}
              <CopyToClipboard
                text={`${window.location.origin}/${loggedInArtist.universePageAddress}/${auction.link}`}
                onCopy={() => {
                  setCopiedUrl(true);
                  setTimeout(() => {
                    setCopiedUrl(false);
                  }, 1000);
                }}
              >
                <span>
                  <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                  Copy URL
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="launch-auction">
          <Button
            className="light-border-button hide__on__mobile"
            onClick={() => history.push(`./${loggedInArtist.universePageAddress}/${auction.link}`)}
          >
            <span>Go to landing page</span>
          </Button>
          <div
            className="arrow"
            onClick={() => setShowMore(!showMore)}
            role="button"
            tabIndex={0}
            aria-hidden
          >
            {showMore ? (
              <>
                <span className="tooltiptext">Show less</span>
                <img src={arrowUp} alt="Arrow up" aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="tooltiptext">Show more</span>
                <img src={arrowDown} alt="Arrow down" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="auctions-launch-dates">
        <div className="total-dates">
          <p>
            Total NFTs: <b>{auctionTotalNfts}</b>
          </p>
        </div>
        <div className="total-dates">
          <p>
            Launch date:{' '}
            <b>
              {' '}
              <time>{startDate}</time>
            </b>
          </p>
        </div>
        <div className="total-dates">
          <p>
            End date:{' '}
            <b>
              <time>{endDate}</time>
            </b>
          </p>
        </div>
      </div>
      <div className="bid_info">
        <div className="boredred-div">
          <span className="head">Total bids</span>
          <span className="value">{auction.bids?.bidsCount}</span>
        </div>
        <div>
          <span className="head">Highest winning bid</span>
          <span className="value">
            <img src={bidIcon} alt="Highest winning bid" />
            {auction.bids.highestBid} ETH
            <span className="dollar-val">
              ~$
              {(auction?.bids?.highestBid * ethPriceUsd)?.toFixed(2)}
            </span>
          </span>
        </div>

        <div className="boredred-div">
          <span className="head">Total bids amount</span>
          <span className="value">
            <img src={bidIcon} alt="Total bids amount" />
            {auction.bids.totalBids} ETH
            <span className="dollar-val">
              ~$
              {(auction?.bids?.totalBids * ethPriceUsd)?.toFixed(2)}
            </span>
          </span>
        </div>
        <div>
          <span className="head">Lower winning bid</span>
          <span className="value">
            <img src={bidIcon} alt="Lower winning bid" />
            {auction.bids.lowestBid} ETH
            <span className="dollar-val">
              ~$
              {(auction?.bids?.lowestBid * ethPriceUsd)?.toFixed(2)}
            </span>
          </span>
        </div>
      </div>

      <div style={{ display: 'block', padding: '20px 0px' }} className="funds-and-balance">
        <div>
          <div className="unreleased-funds">
            <div className="head">
              <span>Unreleased funds</span>
              <span
                onMouseOver={() => setShowAuctioneerTooltip(true)}
                onFocus={() => setShowAuctioneerTooltip(true)}
                onMouseLeave={() => setShowAuctioneerTooltip(false)}
                onBlur={() => setShowAuctioneerTooltip(false)}
              >
                <img src={infoIcon} alt="Info Icon" />
              </span>
              {showAuctioneerTooltip && (
                <div className="info-text1">
                  <p>
                    For the auctioneer to be able to collect their winnings and for the users to be
                    able to claim their NFTs the rewards need to be released first.
                  </p>
                </div>
              )}
            </div>
            <div className="balance-body">
              <span className="value-section">
                <img src={bidIcon} alt="unreleased funds" />
                <span className="value">
                  {unreleasedFunds}
                  <span className="dollar-val">~${Math.round(unreleasedFunds * ethPriceUsd)}</span>
                </span>
              </span>
              <Button
                className="light-button"
                disabled={areAllSlotsCaptured}
                onClick={() =>
                  history.push('/release-rewards', {
                    auctionData: { auction },
                    myBid: null,
                    view: 'Auctioneer',
                    bidders: auction.bidders || [],
                    rewardTiersSlots,
                    winningSlot: null,
                    slotsInfo,
                    mySlot,
                    mySlotIndex,
                    backButtonText: 'My auctions',
                  })
                }
              >
                <span>Release rewards</span>
              </Button>
            </div>
          </div>
          <div className="available-balance">
            <div className="head">
              <span>Available balance</span>
              <span
                onMouseOver={() => setShowRewardsTooltip(true)}
                onFocus={() => setShowRewardsTooltip(true)}
                onMouseLeave={() => setShowRewardsTooltip(false)}
                onBlur={() => setShowRewardsTooltip(false)}
              >
                <img src={infoIcon} alt="Info Icon" />
              </span>
              {showRewardsTooltip && (
                <div className="info-text2">
                  <p>This is the released reward amount availble for claiming</p>
                </div>
              )}
            </div>
            <div className="balance-body">
              <span className="value-section">
                <img src={bidIcon} alt="unreleased funds" />
                <span className="value">
                  {claimableFunds}
                  <span className="dollar-val">~${Math.round(claimableFunds * ethPriceUsd)}</span>
                </span>
              </span>
              <Button
                className="light-button"
                disabled={!+claimableFunds}
                onClick={handleClaimFunds}
              >
                <span>Claim funds</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {auction.bids.bidsCount < Object.values(slotsInfo).length && (
        <div className="empty-section">
          <PastAuctionActionSection
            auction={auction}
            slotsToWithdraw={slotsToWithdraw}
            setSlotsToWithdraw={setSlotsToWithdraw}
            slotsInfo={slotsInfo}
            setShowLoading={setShowLoadingModal}
          />
        </div>
      )}

      {showMore ? (
        <div className="auctions-tier">
          {auction.rewardTiers.map((tier) => (
            <div className="tier" key={tier.id}>
              <div className="tier-header">
                <h3>{tier.name}</h3>
                <div className="tier-header-description">
                  <p>
                    NFTs per winner: <b>{tier.nftsPerWinner}</b>
                  </p>
                  <p>
                    Winners: <b>{tier.numberOfWinners || ''}</b>
                  </p>
                  <p>
                    Total NFTs: <b>{tier.nfts?.length}</b>
                  </p>
                </div>
              </div>
              <div className="tier-body">
                {tier.nfts.map((nft) => {
                  const imageUrl = nft.thumbnail_url ? nft.thumbnail_url : '';
                  return (
                    <div className="tier-image" key={nft.id}>
                      {nft?.numberOfEditions > 2 && <div className="tier-image-second" />}
                      {nft?.numberOfEditions > 1 && <div className="tier-image-first" />}
                      <div className="tier-image-main">
                        <div className="amount-of-editions">
                          <p>{nft.numberOfEditions}</p>
                        </div>
                        {nft.artworkType === 'mp4' ? (
                          <>
                            <video
                              aria-hidden
                              className="preview-video"
                              onMouseOver={(event) => event.target.play()}
                              onFocus={(event) => event.target.play()}
                              onMouseOut={(event) => event.target.pause()}
                              onBlur={(event) => event.target.pause()}
                            >
                              <source src={nft.thumbnail_url} type="video/mp4" />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                            <img className="video-icon" src={videoIcon} alt="Video Icon" />
                          </>
                        ) : (
                          <>
                            <img src={imageUrl} alt={nft.name} />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
PastAuctionsCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setShowLoadingModal: PropTypes.func.isRequired,
  setLoadingText: PropTypes.func.isRequired,
};
export default PastAuctionsCard;
