import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { utils } from 'ethers';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import bubleIcon from '../../assets/images/text-bubble.png';
import Exclamation from '../../assets/images/Exclamation.svg';
import plusIcon from '../../assets/images/plus.svg';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { setErrors } from '../../utils/helpers/contractsErrorHandler';

const PastAuctionActionSection = ({
  auction,
  slotsToWithdraw,
  setSlotsToWithdraw,
  slotsInfo,
  setShowLoading,
}) => {
  const history = useHistory();

  const { loggedInArtist, universeAuctionHouseContract, address } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const { setAuction } = useAuctionContext();
  const { activeTxHashes, setActiveTxHashes } = useMyNftsContext();
  const [canWithdrawNfts, setCanWithdrawNfts] = useState(false);
  const [revenueCaptured, setRevenueCaptured] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  const getTitleText = () => {
    const winners = 0;
    if (auction.canceled) {
      return 'The auction was cancelled';
    }
    if (auction.bids.bidsCount === 0) {
      return "The auction didn't get any bids";
    }

    if (auction.bids.bidsCount < winners) {
      return "The auction didn't get bids on all the slots";
    }
    return '';
  };

  // eslint-disable-next-line consistent-return
  const getDescriptionText = () => {
    if (auction.finalised && withdrawn && !slotsToWithdraw.length) {
      return 'You have already withdrawn your NFTs to your wallet.';
    }

    if (auction.finalised && revenueCaptured && slotsToWithdraw.length) {
      return 'You can withdraw your NFTs by clicking a button below.';
    }
  };

  const handleWithdrawNfts = async () => {
    try {
      const txs = [...slotsToWithdraw];
      const txCalls = txs.map(async (slotIndex) => {
        const slot = slotsInfo[slotIndex];
        const tx = await universeAuctionHouseContract.withdrawERC721FromNonWinningSlot(
          auction.onChainId,
          slotIndex,
          slot.totalDepositedNfts
        );
        setShowLoading(true);
        setActiveTxHashes([...activeTxHashes, tx.hash]);
        // eslint-disable-next-line no-await-in-loop
        const txReceipt = await tx.wait();
        setWithdrawn(true);
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
      console.error(err);
      setShowError(true);
      setShowLoading(false);
      setActiveTxHashes([]);
      const { title, body } = setErrors(err);
      setErrorTitle(title);
      setErrorBody(body);
    }
  };

  useEffect(() => {
    let canWithdraw = true;
    if (!auction.finalised) {
      canWithdraw = false;
    } else if (!slotsToWithdraw.length) {
      canWithdraw = false;
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const [slotIndex, slotInfo] of Object.entries(slotsInfo)) {
        // Check if slot has been captured
        const slotsCantBeWithdrawn =
          slotsToWithdraw.find((index) => index === slotIndex) && !slotInfo.revenueCaptured;
        setRevenueCaptured(slotInfo.revenueCaptured);
        if (slotsCantBeWithdrawn) {
          canWithdraw = false;
        }
      }
    }
    // Check if the auctioneer can withdraw his nfts

    setCanWithdrawNfts(canWithdraw);
  }, [slotsInfo, slotsToWithdraw]);

  useEffect(() => {
    if (auction.finalised) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [slotIndex, slotInfo] of Object.entries(slotsInfo)) {
        setWithdrawn(
          slotInfo.totalWithdrawnNfts.toNumber() === slotInfo.totalDepositedNfts.toNumber()
        );
      }
    }
  }, []);

  return (
    auction.finalised && (
      <div className="empty__auction">
        <img src={bubleIcon} alt="Buble" />
        <h3>{getTitleText()}</h3>
        {!loggedInArtist.name || !loggedInArtist.avatar ? (
          <div className="warning__div">
            <img src={Exclamation} alt="Warning" />
            <p>
              Please, fill out the profile details before you set up an auction.{' '}
              <button
                type="button"
                onClick={() => history.push('/my-account', { redirect: 'setup-auction' })}
              >
                Go to my profile
              </button>
              .
            </p>
          </div>
        ) : (
          <p className="desc">{getDescriptionText()}</p>
        )}
        {!canWithdrawNfts && !revenueCaptured && !withdrawn && (
          <div className="warning__div">
            <img src={Exclamation} alt="Warning" />
            <p>You’ll be able to withdraw your NFTs right after all the rewards are released.</p>
          </div>
        )}
        {
          <button
            disabled={!canWithdrawNfts}
            type="button"
            className="light-button set_up"
            onClick={handleWithdrawNfts}
          >
            Withdraw NFTs
            <img src={plusIcon} alt="icon" style={{ marginLeft: '12px' }} />
          </button>
        }
      </div>
    )
  );
};

PastAuctionActionSection.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  slotsToWithdraw: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setSlotsToWithdraw: PropTypes.func.isRequired,
  slotsInfo: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
};

export default PastAuctionActionSection;
