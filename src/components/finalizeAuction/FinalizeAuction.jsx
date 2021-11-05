import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import { utils, Contract } from 'ethers';
import SuccessPopup from '../popups/AuctionCanceledSuccessPopup';
import arrow from '../../assets/images/arrow.svg';
import './FinalizeAuction.scss';
import warningIcon from '../../assets/images/Exclamation.svg';
import Button from '../button/Button.jsx';
import doneIcon from '../../assets/images/Completed.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import ApproveCollection from './ApproveCollection';
import {
  addDeployInfoToAuction,
  changeAuctionStatus,
  depositNfts,
  withdrawNfts,
} from '../../utils/api/auctions';
import LoadingImage from '../general/LoadingImage';
import LoadingPopup from '../popups/LoadingPopup';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { calculateTransactions } from '../../utils/helpers/depositNfts';
import DepositNftsSection from './DepositNftsSection';
import ERC721ABI from '../../contracts/ERC721.json';

const FinalizeAuction = () => {
  const history = useHistory();
  const { auction, setAuction, bidExtendTime } = useAuctionContext();
  const { setActiveTxHashes } = useMyNftsContext();
  const { signer, address, universeAuctionHouseContract } = useAuthContext();

  const [collections, setCollections] = useState([]);
  const [approvedCollections, setApprovedCollections] = useState([]);

  const [showAuctionDeployLoading, setShowAuctionDeployLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [transactions, setTransactions] = useState(null);
  const [approvedTxCount, setApprovedTxCount] = useState(0);
  const [approvedTxs, setApprovedTxs] = useState([]);

  // console.log(auction);
  // console.log(approvedTxCount);
  // console.log(approvedTxs);
  // console.log(collections.length);
  // console.log(universeAuctionHouseContract);

  const completedAuctionCreationStep = auction.onChainId && !auction.canceled;

  const completedCollectionsStep =
    completedAuctionCreationStep && approvedCollections.length === collections.length;

  const completedDepositStep =
    completedCollectionsStep && approvedTxCount === transactions?.finalSlotIndices.length;

  const setupPage = async () => {
    // Set nftsToWithdraw
    const transactionsConfig = calculateTransactions(auction);
    setTransactions(transactionsConfig);
    // console.log(transactionsConfig);

    if (auction.collections) {
      setCollections(auction.collections);
      for (let i = 0; i < auction.collections.length; i += 1) {
        const collection = auction.collections[i];
        const contract = new Contract(collection.address, ERC721ABI, signer);
        // eslint-disable-next-line no-await-in-loop
        const isApproved = await contract.isApprovedForAll(
          address,
          universeAuctionHouseContract.address
        );
        if (isApproved && approvedCollections.indexOf(contract.address) < 0) {
          setApprovedCollections([...approvedCollections, contract.address]);
        }
      }
    }
  };

  useEffect(() => {
    if (auction.id) {
      setupPage();
    } else {
      history.push('/my-auctions');
    }
  }, []);

  const handleCreateAuction = async () => {
    if (approvedTxs.length) {
      alert('Please withdraw your nfts before creating a new auction');
      return;
    }
    setShowAuctionDeployLoading(true);

    try {
      let numberOfSlots = 0;
      let paymentSplits = [];
      const minimumReserveValues = [];
      // TODO: Order by slotIndex
      auction.rewardTiers
        .sort((a, b) => +a.tierPosition - +b.tierPosition)
        .forEach((tier) => {
          const minimumBids = Array.from(Array(tier.numberOfWinners).keys()).map((slot) =>
            utils.parseEther(tier.minimumBid.toString()).toString()
          );
          minimumReserveValues.push(...minimumBids);
          numberOfSlots += tier.numberOfWinners;
        });

      if (auction.royaltySplits) {
        paymentSplits = auction.royaltySplits.map((royalty) => [
          royalty.address,
          royalty.percentAmount * 1000,
        ]);
      }
      const startTime = (
        new Date(new Date(auction.startDate).toUTCString()).getTime() / 1000
      ).toFixed(0);

      const endTime = (new Date(new Date(auction.endDate).toUTCString()).getTime() / 1000).toFixed(
        0
      );
      const tx = await universeAuctionHouseContract.createAuction([
        startTime,
        endTime,
        bidExtendTime * 60,
        numberOfSlots,
        auction.tokenAddress,
        minimumReserveValues,
        paymentSplits,
      ]);
      // TODO: Show tx hash
      setActiveTxHashes([tx.hash]);
      const txResult = await tx.wait();

      if (txResult.status === 1) {
        console.log(txResult);
        const auctionid = txResult.events[0].args[0].toString();

        // TODO: Call api to change auction
        // This will be temporary while the scraper isn't ready
        if (auction.canceled) {
          await changeAuctionStatus({
            auctionId: auction.id,
            statuses: [{ name: 'canceled', value: false }],
          });
        }

        await addDeployInfoToAuction({
          auctionId: +auction.id,
          onChainId: +auctionid,
          txHash: tx.hash,
        });

        setAuction({
          ...auction,
          auctionId: +auction.id,
          onChainId: +auctionid,
          txHash: tx.hash,
          canceled: false,
        });
      } else {
        // TODO: show error that tx has failed
      }
      setShowAuctionDeployLoading(false);
      setActiveTxHashes([]);
    } catch (err) {
      console.error(err);
      setShowAuctionDeployLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handleApproveCollection = async (collectionAddress, setIsApproving) => {
    try {
      setIsApproving(true);

      const contract = new Contract(collectionAddress, ERC721ABI, signer);

      const tx = await contract.setApprovalForAll(
        process.env.REACT_APP_UNIVERSE_AUCTION_HOUSE_ADDRESS,
        true
      );
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        setApprovedCollections([...approvedCollections, collectionAddress]);
      } else {
        // TODO: show error that tx has failed
      }
      setIsApproving(false);
    } catch (err) {
      console.log(err);
      setIsApproving(false);
    }
  };

  function getNftIds(nftMap) {
    const nftIds = [];
    nftMap.forEach((slot) => {
      slot.forEach((slotArray) => {
        nftIds.push(slotArray[0]);
      });
    });

    return nftIds;
  }

  const handleDepositTier = async (txIndex) => {
    try {
      setShowAuctionDeployLoading(true);

      // Deposit tier
      const tx = await universeAuctionHouseContract.batchDepositToAuction(
        auction.onChainId,
        transactions.finalSlotIndices[txIndex],
        transactions.finalNfts[txIndex]
      );
      setActiveTxHashes([tx.hash]);

      const txReceipt = await tx.wait();
      // If last tier show success modal
      if (txReceipt.status === 1) {
        // TODO: Mark nfts as deployed on backend
        // const result = await depositNfts({ auctionId: auction.id, nftIds });
        const nftIds = getNftIds(transactions.finalNfts[txIndex]);
        const result = await depositNfts({ auctionId: auction.id, nftIds });
        if (!auction.depositedNfts) {
          await changeAuctionStatus({
            auctionId: auction.id,
            statuses: [{ name: 'depositedNfts', value: true }],
          });
          setAuction({ ...auction, depositedNfts: true });
        }
        setApprovedTxCount(approvedTxCount + 1);
        setApprovedTxs([...approvedTxs, txIndex]);

        if (!auction.canceled && txIndex === transactions.finalSlotIndices.length - 1) {
          setShowSuccessPopup(true);
        }
      } else {
        // TODO: show error that tx has failed
      }

      setShowAuctionDeployLoading(false);
      setActiveTxHashes([]);
    } catch (err) {
      setShowAuctionDeployLoading(false);
      setActiveTxHashes([]);

      console.log(err);
    }
  };

  const handleWithdraw = async (txIndex) => {
    try {
      // TODO: What to do if auction is canceled? How do we mark that in the backend? Can we restart the auction?
      const onChainAuction = await universeAuctionHouseContract.auctions(auction.onChainId);

      // Cancel auction if not canceled
      if (!onChainAuction.isCanceled) {
        // Cancel auction
        setShowAuctionDeployLoading(true);
        const tx = await universeAuctionHouseContract.cancelAuction(auction.onChainId);
        setActiveTxHashes([tx.hash]);
        const txReceipt = await tx.wait();
        if (txReceipt.status === 1) {
          await changeAuctionStatus({
            auctionId: auction.id,
            statuses: [{ name: 'canceled', value: true }],
          });
          setAuction({ ...auction, canceled: true });
        } else {
          // Implement error handling
        }

        setActiveTxHashes([]);
      }

      setShowAuctionDeployLoading(true);
      // We need to withdraw each slot at a time
      // Calculate all count of deposited nfts at a slot
      const nftsCountMap = {};
      const nfts = transactions.finalNfts[txIndex];
      transactions.finalSlotIndices[txIndex].forEach((slot, index) => {
        if (!nftsCountMap[slot]) {
          nftsCountMap[slot] = nfts[index].length;
        } else {
          nftsCountMap[slot] += nfts[index].length;
        }
      });
      const nftIds = getNftIds(nfts);
      console.log(nftsCountMap);
      const txHashes = [];
      const txs = Object.keys(nftsCountMap).map(async (slot) => {
        const tx = await universeAuctionHouseContract.withdrawDepositedERC721(
          auction.onChainId,
          slot,
          nftsCountMap[slot]
        );
        txHashes.push(tx.hash);
        setActiveTxHashes(txHashes);

        const txReceipt = await tx.wait();
        return txReceipt.status;
      });
      const results = await Promise.all(txs);
      setShowAuctionDeployLoading(false);
      // Withdraw from backend
      const withdrawBE = await withdrawNfts({ auction: auction.onChainId, nftIds });
      console.log(results);
      console.log(withdrawBE);

      // Update nfts to withdraw
      const newApprovedTxs = [...approvedTxs];
      newApprovedTxs.splice(newApprovedTxs.indexOf(txIndex), 1);
      if (newApprovedTxs.length === 0) {
        await changeAuctionStatus({
          auctionId: auction.id,
          statuses: [{ name: 'depositedNfts', value: false }],
        });
        setAuction({ ...auction, depositedNfts: false });
      }
      setApprovedTxs(newApprovedTxs);
      setApprovedTxCount(approvedTxCount - 1);
    } catch (err) {
      console.log(err);
      setShowAuctionDeployLoading(false);
    }
  };

  return !auction ? (
    <></>
  ) : (
    <div className="finalize__auction">
      <div className="finalize container">
        <div
          className="back-rew"
          aria-hidden="true"
          onClick={() => {
            history.push('/my-auctions');
          }}
        >
          <img src={arrow} alt="back" />
          <span>My auctions</span>
          <h1 className="set-text">Finalize auction</h1>
        </div>
        <p className="description">
          The auction landing page will be automatically published after you successfully complete
          all transitions below
        </p>
        <div className="finalize__auction__body">
          <div className="create__auction">
            <div className="step">
              <div className="circle">
                {completedAuctionCreationStep ? (
                  <img src={doneIcon} alt="Done" />
                ) : (
                  <img src={emptyMark} alt="Empty mark" />
                )}
              </div>
              <div className={`line ${completedAuctionCreationStep ? 'colored' : ''}`} />
            </div>
            <div className="create__auction__body">
              <h2>Create auction</h2>
              <p className="auction__description">
                Proceed with the transaction to create the auction instance on the blockchain
              </p>
              <div className="warning__div">
                <img src={warningIcon} alt="Warning" />
                <p>
                  You will not be able to make any changes to the auction settings if you proceed
                </p>
              </div>
              {completedAuctionCreationStep ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button className="light-button" onClick={handleCreateAuction}>
                  Proceed
                </Button>
              )}
            </div>
          </div>

          <div className="create__auction">
            <div className="step">
              <div className="circle">
                {!completedCollectionsStep ? (
                  <img alt="Empty mark" src={emptyMark} />
                ) : completedCollectionsStep ? (
                  <img alt="Empty mark" src={doneIcon} />
                ) : (
                  <img alt="Empty white" src={emptyWhite} />
                )}
              </div>
              <div className={`line ${completedCollectionsStep ? 'colored' : ''}`} />
            </div>
            <div className="create__auction__body">
              <h2>Set approvals</h2>
              <p className="auction__description">
                Approve NFTs for depositing into the auction contract
              </p>
              <div className="warning__div">
                <img src={warningIcon} alt="Warning" />
                <p>
                  Depending on the gas fee cost, you may need to have a significant amount of ETH to
                  proceed
                </p>
              </div>
              <div className="collections">
                {collections.length ? (
                  collections.map((collection, index) => (
                    <ApproveCollection
                      collection={collection}
                      approveCollection={handleApproveCollection}
                      isApproved={
                        !!approvedCollections.find(
                          (collAddress) => collAddress === collection.address
                        )
                      }
                      auctionOnChainId={auction.onChainId}
                    />
                  ))
                ) : (
                  <div className="empty__nfts">
                    <h3>No Collections found</h3>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DepositNftsSection
            transactions={transactions}
            handleDepositTier={handleDepositTier}
            handleWithdraw={handleWithdraw}
            completedDepositStep={completedDepositStep}
            completedCollectionsStep={completedCollectionsStep}
            approvedTxCount={approvedTxCount}
            approvedTxs={approvedTxs}
            isCanceledAuction={auction.canceled}
            // withdrawTxs={withdrawTxs}
          />
        </div>
      </div>
      <Popup open={showAuctionDeployLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress."
          onClose={() => setShowAuctionDeployLoading(false)}
          contractInteraction
        />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showSuccessPopup}>
        <SuccessPopup onClose={() => setShowSuccessPopup(false)} onAuction={auction} />
      </Popup>
    </div>
  );
};

export default FinalizeAuction;
