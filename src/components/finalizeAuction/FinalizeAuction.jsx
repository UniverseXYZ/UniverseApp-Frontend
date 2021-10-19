import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import { utils } from 'ethers';
import SuccessPopup from '../popups/SuccessPopup';
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
import { createContractInstanceFromAddress } from '../../utils/helpers/pureFunctions/minting';
import ApproveCollection from './ApproveCollection';
import { addDeployInfoToAuction } from '../../utils/api/auctions';
import LoadingImage from '../general/LoadingImage';
import LoadingPopup from '../popups/LoadingPopup';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { calculateTransactions } from '../../utils/helpers/depositNfts';
import DepositNftsSection from './DepositNftsSection';

const FinalizeAuction = () => {
  const history = useHistory();
  const { auction, setAuction, bidExtendTime } = useAuctionContext();
  const { setActiveTxHashes } = useMyNftsContext();
  const {
    signer,
    universeERC721CoreContract,
    universeERC721FactoryContract,
    address,
    universeAuctionHouseContract,
  } = useAuthContext();

  const [approvals, setApprovals] = useState(1);
  const [loadingApproval, setLoadingApproval] = useState(undefined);
  const [collections, setCollections] = useState([]);
  const [approvedCollections, setApprovedCollections] = useState([]);

  const [showAuctionDeployLoading, setShowAuctionDeployLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [auctionOnChainId, setAuctionOnChainId] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [approvedTxCount, setApprovedTxCount] = useState(0);
  const [approvedTx, setApprovedTx] = useState([]);
  // TODO: if auction is null -> redirect to my auctions page
  // console.log(approvals);
  console.log(auction);

  const setupPage = async () => {
    // Get optimal transaction setup
    const transactionsConfig = calculateTransactions(auction);
    setTransactions(transactionsConfig);
    console.log(transactionsConfig);

    // TODO: Check if auction is deployed
    if (auction.onChain && auction.onChainId) {
      setAuctionOnChainId(auction.onChainId);
    }

    if (auction.collections) {
      setCollections(auction.collections);
      // TODO: Check if collections are already approved
      for (let i = 0; i < auction.collections.length; i += 1) {
        const collection = auction.collections[i];
        const contract = createContractInstanceFromAddress(
          collection.address,
          universeERC721CoreContract,
          universeERC721FactoryContract,
          signer
        );
        // eslint-disable-next-line no-await-in-loop
        const isApproved = await contract.isApprovedForAll(
          address,
          universeAuctionHouseContract.address
        );
        // console.log(`isApproved result:`);
        // console.log(isApproved);
        if (isApproved) {
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

  useEffect(() => {
    if (loadingApproval !== undefined) {
      setTimeout(() => {
        setApprovals(loadingApproval + 1);
        setLoadingApproval(undefined);
      }, 1000);
    }
  }, [loadingApproval]);
  // console.log(universeAuctionHouseContract);

  const handleCreateAuction = async () => {
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
      const tx = await universeAuctionHouseContract.createAuction([
        new Date(auction.startDate).getTime(),
        new Date(auction.endDate).getTime(),
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
        setAuctionOnChainId(+auctionid);

        // TODO: Call api to save auction
        // This will be temporary while the scraper isn't ready
        await addDeployInfoToAuction({
          auctionId: +auction.id,
          onChainId: +auctionid,
          txHash: tx.hash,
        });
        setAuction({ ...auction, auctionId: +auction.id, onChainId: +auctionid, txHash: tx.hash });
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
      const contract = createContractInstanceFromAddress(
        collectionAddress,
        universeERC721CoreContract,
        universeERC721FactoryContract,
        signer
      );

      const tx = await contract.setApprovalForAll(
        process.env.REACT_APP_UNIVERSE_AUCTION_HOUSE_ADDRESS,
        true
      );
      const result = await tx.wait();
      setApprovedCollections([...approvedCollections, collectionAddress]);
      setLoadingApproval(approvals);
      setIsApproving(false);
    } catch (err) {
      console.log(err);
      setIsApproving(false);
    }
  };

  const handleDepositTier = async (txIndex) => {
    try {
      setShowAuctionDeployLoading(true);

      // Deposit tier
      const tx = await universeAuctionHouseContract.batchDepositToAuction(
        auctionOnChainId,
        transactions.finalSlotIndices[txIndex],
        transactions.finalNfts[txIndex]
      );
      setActiveTxHashes([tx.hash]);

      const txReceipt = tx.wait();
      // If last tier show success modal
      if (txReceipt.status === 1 && txIndex === transactions.finalSlotIndices.length - 1) {
        setShowSuccessPopup(true);
      }
      setApprovedTx([...approvedTxCount, txIndex]);
      setApprovedTxCount(approvedTxCount + 1);
      setShowAuctionDeployLoading(false);
      setActiveTxHashes([]);
    } catch (err) {
      setShowAuctionDeployLoading(false);
      setActiveTxHashes([]);

      console.log(err);
    }
  };

  const handleWithdraw = async (txIndex) => {};

  console.log(approvedCollections);
  console.log(collections.length);

  const completedCollectionsStep =
    auctionOnChainId && approvedCollections.length === collections.length;

  const completedDepositStep =
    completedCollectionsStep && approvedTxCount === transactions.finalSlotIndices.length;
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
                {auctionOnChainId ? (
                  <img src={doneIcon} alt="Done" />
                ) : (
                  <img src={emptyMark} alt="Empty mark" />
                )}
              </div>
              <div className={`line ${auctionOnChainId ? 'colored' : ''}`} />
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
              {auctionOnChainId ? (
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
                      auctionOnChainId={auctionOnChainId}
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
            approvedTx={approvedTx}
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
