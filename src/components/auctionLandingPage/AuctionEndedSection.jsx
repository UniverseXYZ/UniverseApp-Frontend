import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { utils, BigNumber } from 'ethers';
import warningIcon from '../../assets/images/Exclamation.svg';
import smallCongratsIcon from '../../assets/images/congrats-small.png';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../button/Button';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import infoIcon from '../../assets/images/icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import { shortenEthereumAddress } from '../../utils/helpers/format';
import { getRewardTierSpanStyles } from '../../utils/helpers';
import CongratsSection from './CongratsSection';
import WarningSection from './WarningSection';
import UnfortunatelySection from './UnfortunatelySection';

const AuctionEndedSection = ({
  currentBid,
  setCurrentBid,
  bidders,
  numberOfWinners,
  rewardTiersSlots,
  setShowBidRankings,
  onAuction,
  winningSlot,
  slotsInfo,
  setShowLoading,
  setLoadingText,
  ethPrice,
  currencyIcon,
  isWinningBid,
  mySlot,
  setMySlot,
  mySlotIndex,
  setMySlotIndex,
  slotsToWithdraw,
  setSlotsToWithdraw,
  claimableFunds,
  unreleasedFunds,
}) => {
  const verifyLoadingText = 'Your tx is being verified';

  const history = useHistory();

  const { address, universeAuctionHouseContract } = useAuthContext();
  const { setActiveTxHashes, activeTxHashes } = useMyNftsContext();

  const [isAuctionner, setIsAuctioneer] = useState(address === onAuction.artist.address);

  const [showUnreleasedFundsTooltip, setShowUnreleasedFundsTooltip] = useState(false);
  const [showClaimableFundsTooltip, setShowClaimableFundsTooltip] = useState(false);

  const handleClaimNfts = async () => {
    try {
      const tx = await universeAuctionHouseContract.claimERC721Rewards(
        onAuction.auction.onChainId,
        +mySlotIndex,
        mySlot.totalDepositedNfts
      );
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);

      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        // This modal will be closed upon recieving notifyERC721Claimed event
        setLoadingText(verifyLoadingText);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handleClaimFunds = async () => {
    try {
      const tx = await universeAuctionHouseContract.distributeCapturedAuctionRevenue(
        onAuction.auction.onChainId
      );
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);

      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        // This modal will be closed upon receiving Auction revenue claimed event handleAuctionWithdrawnRevenueEvent
        setLoadingText(verifyLoadingText);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);

      console.log(err);
    }
  };

  // This can be used if the auctionner has a button to withdraw nfts that were not won from this component
  const handleWithdrawNfts = async () => {
    try {
      const txs = [...slotsToWithdraw];
      const txCalls = txs.map(async (slotIndex) => {
        const slot = slotsInfo[slotIndex];
        const tx = await universeAuctionHouseContract.withdrawERC721FromNonWinningSlot(
          onAuction.auction.onChainId,
          slotIndex,
          slot.totalDepositedNfts
        );
        setShowLoading(true);
        setActiveTxHashes([...activeTxHashes, tx.hash]);
        // eslint-disable-next-line no-await-in-loop
        const txReceipt = await tx.wait();
        return txReceipt.status;
      });
      const txReceipts = await Promise.all(txCalls);
      const hasFailedTransaction = txReceipts.includes(0);

      if (!hasFailedTransaction) {
        setSlotsToWithdraw([]);
      }
      setShowLoading(false);
      setActiveTxHashes([]);
    } catch (err) {
      console.log(err);
      setActiveTxHashes([]);
      setShowLoading(false);
    }
  };

  const withdrawBid = async () => {
    try {
      let tx = null;
      if (onAuction.auction.tokenSymbol === 'ETH') {
        tx = await universeAuctionHouseContract.withdrawEthBid(onAuction.auction.onChainId);
      } else {
        tx = await universeAuctionHouseContract.withdrawERC20Bid(onAuction.auction.onChainId);
      }
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        setLoadingText(verifyLoadingText);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      console.log(err);
    }
  };

  const { depositedNfts } = onAuction.auction;

  // Find the Auctioneer Winning Slot, if any
  const auctioneerSlot = winningSlot?.slotIndex ? slotsInfo[winningSlot.slotIndex] : null;

  // Find out if the slot has been captured
  const { revenueCaptured: auctioneerSlotRevenueCaptured } = auctioneerSlot || {};
  const hasRevenue = Object.values(slotsInfo).some((slot) => slot.revenueCaptured);

  const auctioneerBidWon = isAuctionner && isWinningBid;
  const hasNFTsToClaim =
    mySlot?.revenueCaptured &&
    mySlot?.totalDepositedNfts?.toNumber() > mySlot?.totalWithdrawnNfts?.toNumber();

  const bidWithdrawn = currentBid && currentBid.withdrawn;
  const hasUnreleasedFunds = Number(unreleasedFunds) > 0;
  const hasClaimableFunds = Number(claimableFunds) > 0;
  const allSlotsCaptured = !Object.values(slotsInfo).some((slot) => !slot.revenueCaptured);

  return isAuctionner ? (
    <div className="auction__details__box__top__bidders">
      {/* Tested with 3 different auctions
        1. Auctioneer has made a bid and has won a slot, another user has also bid and won the second(last) slot
        2. Auctioneer has made a bid and has won a slot (the only one)
        3. Auctioneer has made an auction and another user has won the slot (the only one)
      */}

      {/* The Auctioneer has Bid in his own auction and has a winning Bid */}
      {isWinningBid ? (
        <>
          {/* Congrats Text must change based on the statusеs
            1. Auctioneer has won a slot but not captured slot revenue
            2. Auctioneer has won a slot, has captured revenue but has not claimed NFTs
            3. Auctioneer has won a slot, has captured revenue and has claimed NFTs
            4. Auctioneer has won a slot, has captured revenue, has claimed nfts and has claimed Funds
          */}
          <CongratsSection
            text={
              <>
                {auctioneerBidWon && !auctioneerSlotRevenueCaptured ? (
                  <span>
                    Your bid won the <b>{winningSlot?.name}</b> tier. You can claim your NFTs after
                    your rewards are released
                  </span>
                ) : auctioneerBidWon && auctioneerSlotRevenueCaptured && hasNFTsToClaim ? (
                  <span>
                    Your bid won the <b>{winningSlot?.name}</b> tier. You can claim your NFTs by
                    clicking the button below
                  </span>
                ) : auctioneerBidWon &&
                  auctioneerSlotRevenueCaptured &&
                  !hasNFTsToClaim &&
                  (!allSlotsCaptured || hasClaimableFunds) ? (
                  <span>
                    You have already claimed your NFTs. If you want more NFTs to claim - go to other
                    auctions and bid.
                  </span>
                ) : auctioneerBidWon &&
                  auctioneerSlotRevenueCaptured &&
                  !hasNFTsToClaim &&
                  allSlotsCaptured &&
                  !hasClaimableFunds ? (
                  <span>You have already claimed all your funds and NFTs.</span>
                ) : null}
              </>
            }
            heading={
              <>
                {/* Auctioneer has won a slot, has captured revenue and has claimed NFTs, so .. show Success! */}
                {auctioneerBidWon && auctioneerSlotRevenueCaptured && !hasNFTsToClaim ? (
                  <span>Success!</span>
                ) : (
                  <span>Congratulations!</span>
                )}
              </>
            }
          />

          {/* Warning should be only shown if the rewards are not released (slot revenue has not been captured to any slot) */}
          {!hasRevenue ? <WarningSection mySlot={mySlot} /> : null}

          <div className="view-rankings-btn-container">
            {/* If the Auctioneer has won a slot and the slot revenue has been captured show the claim button */}
            {hasNFTsToClaim && (
              <Button className="light-button" onClick={handleClaimNfts}>
                Claim NFTs
              </Button>
            )}

            <button
              type="button"
              className="light-border-button"
              onClick={() => setShowBidRankings(true)}
            >
              View rankings
            </button>
          </div>
        </>
      ) : !isWinningBid && currentBid ? (
        //  The Auctioneer has Bid in his own auction and has a Lost
        <>
          <UnfortunatelySection
            text={
              <>
                {!auctioneerBidWon && !bidWithdrawn ? (
                  <span>
                    You are able to withdraw your funds by clicking the Withdraw button below. You
                    can still buy individual NFTs from other sellers on NFT marketplaces.
                  </span>
                ) : !auctioneerBidWon && bidWithdrawn ? (
                  <span>
                    You have already withdrawed your funds. You can still buy individual NFTs from
                    other sellers on NFT marketplaces.
                  </span>
                ) : (
                  <></>
                )}
              </>
            }
          />

          <div className="view-rankings-btn-container">
            {/* The Auctioneer has Bid in his own auction and has lost.. so show Withdraw Button */}
            {!bidWithdrawn && (
              <Button onClick={withdrawBid} className="light-button">
                Withdraw
              </Button>
            )}

            <button
              type="button"
              className="light-border-button"
              onClick={() => setShowBidRankings(true)}
            >
              View rankings
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="auction__details__box__top__bidders__header">
            <h2 className="title">Top 5 bidders</h2>
            <button
              type="button"
              className="view__all__bids"
              onClick={() => setShowBidRankings(true)}
            >
              View all bids
            </button>
          </div>

          <div className="auction__details__box__top__bidders__content">
            <div className="five__bidders">
              {bidders.slice(0, 5).map((bidder, index) => (
                <div className="bidder" key={bidder.id}>
                  <div className="name">
                    <b>{`${index + 1}.`}</b>
                    {bidder.user.displayName
                      ? bidder.user.displayName
                      : shortenEthereumAddress(bidder.user.address)}

                    {rewardTiersSlots[index] ? (
                      <span style={getRewardTierSpanStyles(rewardTiersSlots[index])}>
                        {rewardTiersSlots[index].name}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="bid-container">
                    <div className="bid">
                      <img src={currencyIcon} alt="Currency" />
                      <b>{bidder.amount}</b>
                      <span>~${Math.round(bidder.amount * ethPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="footer">
        <div
          className={`funds-and-balance ${
            allSlotsCaptured && !hasClaimableFunds && !hasUnreleasedFunds && auctioneerBidWon
              ? 'auctioneerClaimedAllFundsAndWonSlot'
              : ''
          }`}
        >
          {/* If the Auction slots have been captured, hide the Release Rewards Button Section */}
          {allSlotsCaptured || !depositedNfts ? null : (
            <div
              className={`unreleased-funds ${
                hasClaimableFunds ? 'hasClaimableFunds' : 'noClaimableFunds'
              }`}
            >
              <div className="head">
                <span>Unreleased funds</span>
                <span
                  onMouseOver={() => setShowUnreleasedFundsTooltip(true)}
                  onFocus={() => setShowUnreleasedFundsTooltip(true)}
                  onMouseLeave={() => setShowUnreleasedFundsTooltip(false)}
                  onBlur={() => setShowUnreleasedFundsTooltip(false)}
                >
                  <img src={infoIcon} alt="Info Icon" />
                </span>
                {showUnreleasedFundsTooltip && (
                  <div className="info-text1">
                    <p>
                      For the auctioneer to be able to collect their winnings and for the users to
                      be able to claim their NFTs the rewards need to be released first.
                    </p>
                  </div>
                )}
              </div>
              <div className="balance-body">
                <span className="value-section">
                  <img src={bidIcon} alt="unreleased funds" />
                  <span className="value">
                    {unreleasedFunds}
                    <span className="dollar-val">~${Math.round(unreleasedFunds * ethPrice)}</span>
                  </span>
                </span>
                <Button
                  style={{ width: 180 }}
                  className="light-button"
                  onClick={() =>
                    history.push('/release-rewards', {
                      auctionData: onAuction,
                      myBid: currentBid,
                      view: isAuctionner ? 'Auctioneer' : 'Bidder',
                      bidders,
                      rewardTiersSlots,
                      winningSlot,
                      slotsInfo,
                      mySlot,
                      mySlotIndex,
                      backButtonText: onAuction.auction.headline,
                    })
                  }
                >
                  Release rewards
                </Button>
              </div>
            </div>
          )}

          {/* If the Auction has no claimable funds or unreleasedFunds hide the Claim Funds Button Section */}
          {hasClaimableFunds ? (
            <div
              className={`available-balance ${
                allSlotsCaptured ? 'allSlotsCaptured' : 'notAllSlotsCaptured'
              }`}
            >
              <div className="head">
                <span>Available balance</span>
                <span
                  onMouseOver={() => setShowClaimableFundsTooltip(true)}
                  onFocus={() => setShowClaimableFundsTooltip(true)}
                  onMouseLeave={() => setShowClaimableFundsTooltip(false)}
                  onBlur={() => setShowClaimableFundsTooltip(false)}
                >
                  <img src={infoIcon} alt="Info Icon" />
                </span>
                {showClaimableFundsTooltip && (
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
                    <span className="dollar-val">~${Math.round(claimableFunds * ethPrice)}</span>
                  </span>
                </span>
                <Button
                  className="light-button"
                  disabled={!+claimableFunds}
                  onClick={handleClaimFunds}
                >
                  Claim funds
                </Button>
              </div>
            </div>
          ) : null}

          {/* If all slot have been captured and the Auction has no claimable funds or unreleasedFunds, show success message */}
          {!auctioneerBidWon && allSlotsCaptured && !hasClaimableFunds && !hasUnreleasedFunds && (
            <CongratsSection
              text={<>You have already claimed all your funds.</>}
              heading={
                <>
                  <span>Success!</span>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  ) : !isWinningBid ? (
    <Animated animationIn="zoomIn">
      <div className="ended__result">
        <div className="content">
          <h2 className="title">Unfortunately, your bid didn’t win</h2>
          <p className="desc">
            {currentBid.withdrawn
              ? 'You have withdrawn your bid.'
              : 'You are able to withdraw your funds by clicking the Withdraw button below. You can still buy individual NFTs from other sellers on NFT marketplaces.'}
          </p>
          <div className="view__rankings">
            <button type="button" onClick={() => setShowBidRankings(true)}>
              View rankings
            </button>
          </div>
        </div>
        <div className="footer">
          <Button
            disabled={!currentBid || currentBid.withdrawn}
            onClick={withdrawBid}
            className="light-button"
          >
            Withdraw
          </Button>
        </div>
      </div>
    </Animated>
  ) : (
    <Animated animationIn="zoomIn">
      <div className="ended__result">
        <div className="content">
          <div className="icon">
            <img src={smallCongratsIcon} alt="Congrats" />
          </div>
          <h2 className="title">Congratulations!</h2>
          <p className="desc">
            Your bid won the <b>{winningSlot?.name}</b> tier. You can claim your NFTs by clicking
            the button below
          </p>
          <div className="view__rankings">
            <button type="button" onClick={() => setShowBidRankings(true)}>
              View rankings
            </button>
          </div>
          {!mySlot ? (
            <div className="warning__div">
              <img src={warningIcon} alt="" />
              <p>
                The auctions rewards need to be released first. Without this step, the auctioneer
                will not be able to collect his earnings and the bidders will not be able to claim
                their NFTs.
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="footer">
          {Object.values(slotsInfo).some((slot) => !slot.revenueCaptured) ? (
            <Button
              disabled={!depositedNfts}
              className="light-button"
              onClick={() =>
                history.push('/release-rewards', {
                  auctionData: onAuction,
                  myBid: currentBid,
                  view: isAuctionner ? 'Auctioneer' : 'Bidder',
                  bidders,
                  rewardTiersSlots,
                  winningSlot,
                  slotsInfo,
                  mySlot,
                  mySlotIndex,
                  backButtonText: onAuction.auction.headline,
                })
              }
            >
              Release rewards
            </Button>
          ) : (
            <></>
          )}

          <Button
            className="light-button"
            disabled={
              !mySlot ||
              !mySlot.revenueCaptured ||
              mySlot.totalDepositedNfts.toNumber() === mySlot.totalWithdrawnNfts.toNumber()
            }
            onClick={handleClaimNfts}
          >
            Claim NFTs
          </Button>
        </div>
      </div>
    </Animated>
  );
};
AuctionEndedSection.propTypes = {
  currentBid: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setCurrentBid: PropTypes.func.isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  setShowBidRankings: PropTypes.func.isRequired,
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winningSlot: PropTypes.number.isRequired,
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  slotsInfo: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
  ethPrice: PropTypes.number.isRequired,
  currencyIcon: PropTypes.string,
  isWinningBid: PropTypes.bool.isRequired,
  setLoadingText: PropTypes.func.isRequired,
  mySlot: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setMySlot: PropTypes.func.isRequired,
  mySlotIndex: PropTypes.number.isRequired,
  setMySlotIndex: PropTypes.func.isRequired,
  slotsToWithdraw: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setSlotsToWithdraw: PropTypes.func.isRequired,
  claimableFunds: PropTypes.func.isRequired,
  unreleasedFunds: PropTypes.func.isRequired,
};

AuctionEndedSection.defaultProps = {
  currencyIcon: '',
};
export default AuctionEndedSection;
