/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { utils, Contract } from 'ethers';
import SuccessPopup from '../popups/AuctionCanceledSuccessPopup';
import arrow from '../../assets/images/arrow.svg';
import './FinalizeAuction.scss';
import warningIcon from '../../assets/images/Exclamation.svg';
import Button from '../button/Button.jsx';
import doneIcon from '../../assets/images/Completed.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import ApproveCollection from './ApproveCollection';
import { patchAuction } from '../../utils/api/auctions';
import LoadingPopup from '../popups/LoadingPopup';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { calculateTransactions } from '../../utils/helpers/depositNfts';
import DepositNftsSection from './DepositNftsSection';
import ERC721ABI from '../../contracts/ERC721.json';
import GoBackPopup from './GoBackPopup';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useSocketContext } from '../../contexts/SocketContext';
import { TX_STATUSES } from '../../utils/helpers/constants';
import { setErrors } from '../../utils/helpers/contractsErrorHandler';

const FinalizeAuction = () => {
  const defaultLoadingText = 'The transaction is in progress...';
  const verificationLoadingText =
    'The transaction is being verified. This will take a few seconds.';

  const { auctionEvents, subscribeTo, unsubscribeFrom } = useSocketContext();
  const history = useHistory();
  const { auction, setAuction, bidExtendTime } = useAuctionContext();
  const { setActiveTxHashes } = useMyNftsContext();
  const { signer, address, universeAuctionHouseContract } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const [collections, setCollections] = useState([]);
  const [approvedCollections, setApprovedCollections] = useState([]);

  const [showLoading, setShowLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showGoBackPopup, setShowGoBackPopup] = useState(false);
  const [transactions, setTransactions] = useState(null);

  // Only one deposit button has to be enabled at a time
  // Buttons are enabled one at a time starting from the first one
  // After the nfts are deposited approvedTxs is updated with the approved tx indices
  // tx indices range: 0 - N
  const [approvedTxs, setApprovedTxs] = useState([]);

  const [loadingText, setLoadingText] = useState(defaultLoadingText);
  const [depositVerifyingTxIndex, setDepositVerifyingTxIndex] = useState(null);
  const [withdrawVerifyingTokenIds, setWithdrawVerifyingTokenIds] = useState(null);
  const [withdrawCount, setWithdrawCount] = useState(0);
  const [approvingCollections, setApprovingCollections] = useState([]);

  // useRef is used to access latest state inside socket event callbacks
  // More info why this is used here (https://github.com/facebook/react/issues/16975)
  // Start of useRef section

  const transactionsRef = useRef(transactions);
  const approvedTxsRef = useRef(approvedTxs);
  const depositVerifyingTxIndexRef = useRef(depositVerifyingTxIndex);
  const withdrawVerifyingTokenIdsRef = useRef(withdrawVerifyingTokenIds);
  const withdrawCountRef = useRef(withdrawCount);

  useEffect(() => {
    transactionsRef.current = transactions;
  }, [transactions]);

  useEffect(() => {
    approvedTxsRef.current = approvedTxs;
  }, [approvedTxs]);

  useEffect(() => {
    depositVerifyingTxIndexRef.current = depositVerifyingTxIndex;
  }, [depositVerifyingTxIndex]);

  useEffect(() => {
    withdrawVerifyingTokenIdsRef.current = withdrawVerifyingTokenIds;
  }, [withdrawVerifyingTokenIds]);

  useEffect(() => {
    withdrawCountRef.current = withdrawCount;
  }, [withdrawCount]);

  // End of useRef section

  const handleAuctionCreatedEvent = (err, { onChainId }) => {
    if (err) return;
    setAuction((upToDateAuction) => ({ ...upToDateAuction, onChainId, canceled: false }));
    setShowLoading(false);
  };

  const handleAuctionCanceledEvent = (err, data) => {
    if (err) return;
    setAuction((upToDateAuction) => ({ ...upToDateAuction, canceled: true }));
    setShowLoading(false);
  };

  const handlerErc721DepositedEvent = (err, { tokenId, collectionAddress }) => {
    if (err) return;

    // 1. Get tx index that is being verified
    const txIndex = depositVerifyingTxIndexRef.current;
    if (txIndex !== null) {
      // 2. Get nfts from the transactions config
      const slotNfts = transactionsRef.current.stateNfts[txIndex] || [];
      const collectionMatch = auction.collections.find(
        (c) => c.address.toLowerCase() === collectionAddress.toLowerCase()
      );

      // 3. Iterate over each nft
      for (let i = 0; i < slotNfts.length; i += 1) {
        const nft = slotNfts[i];

        // 4. Check if current nft is the one received from the event params
        const hasNftMatch = !!(nft.tokenId === tokenId && collectionMatch);

        // 5. If it is -> mark as deposited
        if (hasNftMatch) {
          nft.deposited = true;

          const hasNotDepositedNfts = slotNfts.some((slotNft) => !slotNft.deposited);
          // 6. If all nfts are deposited for the transaction -> add the tx index as approved
          if (!hasNotDepositedNfts) {
            if (approvedTxsRef.current.indexOf(txIndex) < 0) {
              const newApprovedTxs = [...approvedTxsRef.current, txIndex];
              setApprovedTxs(newApprovedTxs);
              setDepositVerifyingTxIndex(null);
              setShowLoading(false);

              // 7. If all transactions have been deposited show success modal
              if (newApprovedTxs.length === transactionsRef.current.finalSlotIndices.length) {
                setShowSuccessPopup(true);
              }
            }

            // 8. Set auction deposited nfts status to true
            setAuction((auct) => ({ ...auct, depositedNfts: true }));
          }
        }

        // If we have found a matching nft there is no need to loop futher
        if (hasNftMatch) {
          break;
        }
      }
    }
    setTransactions(transactionsRef.current);
  };

  const handlerErc721WithdrawnEvent = (err, { hasWithdrawnAll, tokenId }) => {
    if (err) return;

    // 1. Get tx index that is being withdrawn
    const txIndex = withdrawVerifyingTokenIdsRef.current;

    if (txIndex !== null) {
      // 2. Get nfts from the transactions config
      const slotNfts = transactionsRef.current.stateNfts[txIndex] || [];

      // 3. Iterate over each nft
      for (let i = 0; i < slotNfts.length; i += 1) {
        let foundNft = false;
        const nft = slotNfts[i];
        // 4. If nft match is found mark as not deposited
        if (nft.tokenId === tokenId.toString()) {
          nft.deposited = false;
          foundNft = true;

          // If we've processed all withdrawn nfts --> hide loading
          if (withdrawCountRef.current - 1 === 0) {
            setShowLoading(false);
          }

          // Decrement the count of nfts waiting for event processing
          setWithdrawCount(withdrawCountRef.current - 1);

          // 5. If all nfts have been withdraw, pop the approved tx index
          const hasDepositedNfts = slotNfts.some((slotNft) => slotNft.deposited);
          if (!hasDepositedNfts) {
            const newTxs = [...approvedTxsRef.current];
            newTxs.splice(approvedTxsRef.current.indexOf(txIndex), 1);

            setApprovedTxs(newTxs);
            setShowLoading(false);
          }
        }
      }
    }

    setTransactions(transactionsRef.current);

    // 7. If all nfts have been withdrawn set the auction deposited nfts status to false
    if (hasWithdrawnAll) {
      setAuction((upToDate) => ({ ...upToDate, depositedNfts: false }));
    }
  };

  useEffect(() => {
    if (auction?.id) {
      // Ready & Tested
      subscribeTo({
        auctionId: auction.id,
        eventName: auctionEvents.CREATED,
        cb: handleAuctionCreatedEvent,
      });

      // Ready & Tested
      subscribeTo({
        auctionId: auction.id,
        eventName: auctionEvents.CANCELED,
        cb: handleAuctionCanceledEvent,
      });

      // Ready & Tested
      subscribeTo({
        auctionId: auction.id,
        eventName: auctionEvents.DEPOSITED_NFTS,
        cb: handlerErc721DepositedEvent,
      });

      // Ready & Tested
      subscribeTo({
        auctionId: auction.id,
        eventName: auctionEvents.WITHDRAWN_NFTS,
        cb: handlerErc721WithdrawnEvent,
      });
    }
  }, [auction?.id]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (auction?.id) {
      return () => {
        unsubscribeFrom({
          auctionId: auction.id,
        });
      };
    }
  }, [auction?.id]);

  const completedAuctionCreationStep = auction.onChainId && !auction.canceled;

  const completedCollectionsStep =
    completedAuctionCreationStep && approvedCollections.length === collections.length;

  const completedDepositStep =
    completedCollectionsStep && approvedTxs.length === transactions?.finalSlotIndices.length;

  const validateNftOwnership = async () => {
    const invalidNfts = [];
    for (let q = 0; q < auction.rewardTiers.length; q += 1) {
      const tier = auction.rewardTiers[q];
      for (let i = 0; i < tier.nfts.length; i += 1) {
        const nft = tier.nfts[i];
        const collection = auction.collections.find((c) => c.id === nft.collectionId);
        if (collection) {
          const nftContract = new Contract(collection.address, ERC721ABI, signer);
          const nftOwnerAddress = await nftContract.ownerOf(nft.tokenId);
          if (nftOwnerAddress.toLowerCase() !== address.toLowerCase()) {
            invalidNfts.push({
              tokenId: nft.tokenId,
              owner: nftOwnerAddress,
              collection: collection.address,
            });
          }
        }
      }
    }

    if (invalidNfts.length) {
      setShowError(true);
      setErrorTitle('Invalid NFTs');
      const map = invalidNfts.map((nft) => `${nft.tokenId}`);
      const tokenString = map.join(', ');
      setErrorBody(
        `You don't have owner permissions over some of the nfts in order to deposit them to the auction. You might have staked or locked them in other protocols. Token Ids: ${tokenString}`
      );
    }
  };

  const setupPage = async () => {
    if (!auction.depositedNfts) {
      validateNftOwnership();
    }
    const transactionsConfig = calculateTransactions(auction);
    setTransactions(transactionsConfig);

    const apprTxs = [];
    transactionsConfig.stateNfts.forEach((slotNfts, index) => {
      const areNftsDeposited = slotNfts.some((nft) => nft.deposited);
      if (areNftsDeposited) {
        apprTxs.push(index);
      }
    });
    setApprovedTxs(apprTxs);

    if (auction.collections) {
      setCollections(auction.collections);
      const approvedColls = [];
      for (let i = 0; i < auction.collections.length; i += 1) {
        const collection = auction.collections[i];
        const contract = new Contract(collection.address, ERC721ABI, signer);
        const isApproved = await contract.isApprovedForAll(
          address,
          universeAuctionHouseContract?.address
        );

        if (isApproved && approvedCollections.indexOf(collection.address) < 0) {
          approvedColls.push(collection.address);
        }
      }
      setApprovedCollections(approvedColls);
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
    try {
      let numberOfSlots = 0;
      let paymentSplits = [];
      const minimumReserveValues = [];

      auction.rewardTiers
        .sort((a, b) => a.tierPosition - b.tierPosition)
        .forEach((tier) => {
          tier.slots.forEach((slot) => {
            minimumReserveValues.push(utils.parseEther(slot.minimumBid.toString()));
            numberOfSlots += 1;
          });
        });

      if (auction.royaltySplits) {
        paymentSplits = auction.royaltySplits.map((royalty) => [
          royalty.address,
          royalty.percentAmount * 100,
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
      setLoadingText(defaultLoadingText);
      setActiveTxHashes([tx.hash]);
      setShowLoading(true);
      const txResult = await tx.wait();

      if (txResult.status === TX_STATUSES.SUCCESS) {
        setLoadingText(verificationLoadingText);
        await patchAuction(auction.id, {
          createAuctionTxHash: tx.hash,
        });
      } else {
        setErrors();
      }
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

  const handleApproveCollection = async (collectionAddress) => {
    try {
      const contract = new Contract(collectionAddress, ERC721ABI, signer);

      const tx = await contract.setApprovalForAll(
        process.env.REACT_APP_UNIVERSE_AUCTION_HOUSE_ADDRESS,
        true
      );
      setApprovingCollections((colls) => [...colls, collectionAddress]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === TX_STATUSES.SUCCESS) {
        setApprovedCollections((colls) => [...colls, collectionAddress]);
        setApprovingCollections((colls) => {
          const newApprovingCollections = [...colls];
          newApprovingCollections.splice(newApprovingCollections.indexOf(collectionAddress), 1);
          return newApprovingCollections;
        });
      } else {
        setErrors();
      }
    } catch (err) {
      setErrors(err);
    }
  };

  const handleDepositTier = async (txIndex) => {
    try {
      const tx = await universeAuctionHouseContract.batchDepositToAuction(
        auction.onChainId,
        transactions.finalSlotIndices[txIndex],
        transactions.finalNfts[txIndex]
      );
      setLoadingText(defaultLoadingText);
      setActiveTxHashes([tx.hash]);
      setShowLoading(true);

      const txReceipt = await tx.wait();
      if (txReceipt.status === TX_STATUSES.SUCCESS) {
        setLoadingText(verificationLoadingText);
        setDepositVerifyingTxIndex(txIndex);
      } else {
        setErrors();
      }
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

  const handleWithdraw = async (txIndex) => {
    try {
      setWithdrawCount(0);
      // We need to withdraw each slot at a time
      // Calculate all count of deposited nfts at a slot
      const nftsCountMap = {};

      // Take only nfts that are deposited
      const nfts = transactions.stateNfts[txIndex].filter((nft) => nft.deposited);

      // We distinct because of the filter below. We get wrong count of nfts if there are repeating indices
      const uniqueIndices = [...new Set(transactions.finalSlotIndices[txIndex])];

      uniqueIndices.forEach((slot) => {
        const slotNfts = nfts.filter((nft) => nft.slot === Number(slot));
        if (!nftsCountMap[slot]) {
          if (slotNfts.length) {
            nftsCountMap[slot] = slotNfts.length;
          }
        } else {
          nftsCountMap[slot] += slotNfts.length;
        }
      });
      const txHashes = [];
      const withdrawPromises = Object.keys(nftsCountMap).map(async (slot) => {
        // Wrapped in try catch to handle the case where user doesn't accept all txs
        setLoadingText(defaultLoadingText);
        setActiveTxHashes([]);
        setShowLoading(true);

        try {
          const tx = await universeAuctionHouseContract.withdrawDepositedERC721(
            auction.onChainId,
            slot,
            nftsCountMap[slot]
          );

          setWithdrawCount(withdrawCountRef.current + nftsCountMap[slot]);
          setWithdrawVerifyingTokenIds(txIndex);

          txHashes.push(tx.hash);
          setActiveTxHashes([...txHashes]);

          const txReceipt = await tx.wait();
          return txReceipt.status;
        } catch (err) {
          // TODO: handle this case
          // This means user rejected the transaction
          if (err?.code === 4001) {
            // This status is used below to show error
            return TX_STATUSES.USER_REJECTED;
          }
          // This status means the tx failed
          return TX_STATUSES.FAILED;
        }
      });
      const txResults = await Promise.all(withdrawPromises);

      if (!txResults.some((status) => status !== TX_STATUSES.USER_REJECTED)) {
        setShowLoading(false);
        return;
      }

      // Failed transactions are not successful or not rejected by the users
      const failedTxs = txResults.filter(
        (status) => status !== TX_STATUSES.SUCCESS && status !== TX_STATUSES.USER_REJECTED
      );
      setLoadingText(verificationLoadingText);
      if (failedTxs.length) {
        setShowError(true);
        setErrorBody(
          `${failedTxs.length} withdraw transactions failed. After the successfull ones are processed, you can retry the failed ones by pressing the withdraw button`
        );
        setWithdrawCount((count) => count - failedTxs.length);
      }
    } catch (err) {
      setShowLoading(false);
      setErrors(err);
    }
  };

  const handleCancelAuction = async () => {
    try {
      const tx = await universeAuctionHouseContract.cancelAuction(auction.onChainId);
      setLoadingText(defaultLoadingText);
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === TX_STATUSES.SUCCESS) {
        setLoadingText(verificationLoadingText);
      } else {
        setErrors();
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setShowLoading(false);
      setActiveTxHashes([]);
      const { title, body } = setErrors(error);
      setErrorTitle(title);
      setErrorBody(body);
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
            if (!auction.onChain || !auction.depositedNfts) {
              setShowGoBackPopup(true);
            } else {
              history.push('/my-auctions');
            }
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
              {!completedAuctionCreationStep ? (
                <div className="warning__div">
                  <img src={warningIcon} alt="Warning" />
                  <p>
                    You will not be able to make any changes to the auction settings if you proceed
                  </p>
                </div>
              ) : (
                <></>
              )}
              {completedAuctionCreationStep ? (
                <Button
                  style={{ marginLeft: 0 }}
                  onClick={handleCancelAuction}
                  className="light-border-button attention-button"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  disabled={approvedTxs.length}
                  className="light-button"
                  onClick={handleCreateAuction}
                >
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
                  <img alt="Completed" src={doneIcon} />
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
              {!completedCollectionsStep ? (
                <div className="warning__div">
                  <img src={warningIcon} alt="Warning" />
                  <p>
                    Depending on the gas fee cost, you may need to have a significant amount of ETH
                    to proceed
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="collections">
                {collections.length ? (
                  collections.map((collection, index) => (
                    <ApproveCollection
                      key={collection.id}
                      collection={collection}
                      approveCollection={handleApproveCollection}
                      isApproved={
                        !!approvedCollections.find(
                          (collAddress) => collAddress === collection.address
                        )
                      }
                      isApproving={
                        !!approvingCollections.find(
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
            approvedTxs={approvedTxs}
            isCanceledAuction={auction.canceled}
            completedAuctionCreationStep={completedAuctionCreationStep}
          />
        </div>
      </div>
      <Popup open={showLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text={loadingText}
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showSuccessPopup}>
        <SuccessPopup onClose={() => setShowSuccessPopup(false)} onAuction={auction} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showGoBackPopup}>
        <GoBackPopup
          onLeave={() => {
            setShowGoBackPopup(false);
            history.push('/my-auctions');
          }}
          closePopup={() => {
            setShowGoBackPopup(false);
          }}
        />
      </Popup>
    </div>
  );
};

export default FinalizeAuction;
