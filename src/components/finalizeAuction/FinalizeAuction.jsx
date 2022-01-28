/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
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
import { withdrawNfts, patchAuction } from '../../utils/api/auctions';
import LoadingPopup from '../popups/LoadingPopup';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { calculateTransactions } from '../../utils/helpers/depositNfts';
import DepositNftsSection from './DepositNftsSection';
import ERC721ABI from '../../contracts/ERC721.json';
import GoBackPopup from './GoBackPopup';
import {
  disconnectAuctionSocket,
  initiateAuctionSocket,
  removeAllListeners,
  subscribeToCancelation,
  subscribeToDepositNfts,
  subscribeToOnChainCreation,
  subscribeToWithdrawNfts,
} from '../../utils/websockets/auctionEvents';
import { useErrorContext } from '../../contexts/ErrorContext';

const FinalizeAuction = () => {
  const defaultLoadingText =
    'The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress.';
  const verificationLoadingText =
    'The transaction is being verified. This will take a few seconds.';

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
  const [approvedTxs, setApprovedTxs] = useState([]);
  const [loadingText, setLoadingText] = useState(defaultLoadingText);
  const [depositVerifyingTxIndex, setDepositVerifyingTxIndex] = useState([]);
  const [withdrawVerifyingTokenIds, setWithdrawVerifyingTokenIds] = useState([]);
  const [approvingCollections, setApprovingCollections] = useState([]);

  useEffect(() => {
    if (auction.id) {
      initiateAuctionSocket();

      subscribeToOnChainCreation(auction.id, (err, data) => {
        if (err) return;
        const { onChainId } = data;
        setAuction((upToDateAuction) => ({ ...upToDateAuction, onChainId, canceled: false }));
        setShowLoading(false);
      });

      subscribeToCancelation(auction.id, (err, data) => {
        if (err) return;
        setAuction((upToDateAuction) => ({ ...upToDateAuction, canceled: true }));
        setShowLoading(false);
      });

      subscribeToDepositNfts(auction.id, (err, { tokenId, collectionAddress }) => {
        if (err) return;
        let newAuction = null;
        let newVerifyTxs = [];

        setDepositVerifyingTxIndex((upToDate) => {
          newVerifyTxs = [...upToDate];
          return upToDate;
        });

        const txIndex = newVerifyTxs.pop();

        if (txIndex !== undefined) {
          setTransactions((txs) => {
            const txsConfig = txs;
            const slotNfts = txsConfig.displayNfts[txIndex] || [];
            const collectionMatch = auction.collections.find(
              (c) => c.address.toLowerCase() === collectionAddress.toLowerCase()
            );
            for (let i = 0; i < slotNfts.length; i += 1) {
              const nft = slotNfts[i];
              const hasNftMatch = !!(nft.tokenId === tokenId && collectionMatch);
              if (hasNftMatch) {
                nft.deposited = true;

                const hasNotDepositedNfts = slotNfts.some((slotNft) => !slotNft.deposited);
                if (!hasNotDepositedNfts) {
                  setApprovedTxs((upToDate) => {
                    if (upToDate.indexOf(txIndex) < 0) {
                      return [...upToDate, txIndex];
                    }
                    return upToDate;
                  });
                  setDepositVerifyingTxIndex(newVerifyTxs);
                  setAuction((auct) => {
                    newAuction = { ...auct, depositedNfts: true };
                    return newAuction;
                  });

                  if (!newVerifyTxs.length) {
                    setShowLoading(false);
                    setShowSuccessPopup(true);
                  }
                }
              }
              if (hasNftMatch) {
                break;
              }
            }

            return txsConfig;
          });
        }
      });

      subscribeToWithdrawNfts(auction.id, (err, { hasWithdrawnAll, tokenId }) => {
        if (err) return;

        let apprTxss = null;

        setApprovedTxs((txs) => {
          apprTxss = txs;
          return txs;
        });

        let newVerifyTokenIds = null;
        setWithdrawVerifyingTokenIds((upToDate) => {
          newVerifyTokenIds = [...upToDate];
          newVerifyTokenIds.splice(newVerifyTokenIds.indexOf(tokenId.toString()), 1);
          return newVerifyTokenIds;
        });

        let txsConfig = [];
        setTransactions((txs) => {
          let foundNft = false;
          txsConfig = txs;
          for (let slotIndex = 0; slotIndex < txsConfig.displayNfts.length; slotIndex += 1) {
            const slotNfts = txsConfig.displayNfts[slotIndex] || [];
            for (let i = 0; i < slotNfts.length; i += 1) {
              const nft = slotNfts[i];
              if (nft.tokenId === tokenId.toString()) {
                nft.deposited = false;
                foundNft = true;

                const hasDepositedNfts = slotNfts.some((slotNft) => slotNft.deposited);
                if (!hasDepositedNfts) {
                  apprTxss.splice(apprTxss.indexOf(slotIndex), 1);
                  setApprovedTxs(apprTxss);
                }
              }
              if (foundNft) {
                break;
              }
            }
            if (foundNft) {
              break;
            }
          }

          return txsConfig;
        });

        if (hasWithdrawnAll) {
          setAuction((upToDate) => ({ ...upToDate, depositedNfts: false }));
        }

        if (!newVerifyTokenIds.length) {
          setShowLoading(false);
        }
      });
    }

    return () => {
      removeAllListeners(auction.id);
      disconnectAuctionSocket();
    };
  }, [auction.id]);

  const completedAuctionCreationStep = auction.onChainId && !auction.canceled;

  const completedCollectionsStep =
    completedAuctionCreationStep && approvedCollections.length === collections.length;

  const completedDepositStep =
    completedCollectionsStep && approvedTxs.length === transactions?.finalSlotIndices.length;

  const setupPage = async () => {
    const transactionsConfig = calculateTransactions(auction);
    setTransactions(transactionsConfig);

    transactionsConfig.displayNfts.forEach((slotNfts, index) => {
      const areNftsDeposited = slotNfts.some((nft) => nft.deposited);
      if (areNftsDeposited) {
        setApprovedTxs([...approvedTxs, index]);
      }
    });

    if (auction.collections) {
      setCollections(auction.collections);
      const approvedColls = [];
      for (let i = 0; i < auction.collections.length; i += 1) {
        const collection = auction.collections[i];
        const contract = new Contract(collection.address, ERC721ABI, signer);
        // eslint-disable-next-line no-await-in-loop
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

  const setErrors = (err, contractError) => {
    if (contractError) {
      setErrorTitle('Transaction failed');
    } else {
      setErrorTitle('Error occurred');
    }

    if (err?.code === 4001) {
      setErrorBody('User denied transaction signature');
    } else if (err.error?.message) {
      setErrorBody(err.error?.message);
    }
    setShowError(true);
  };

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

      if (txResult.status === 1) {
        setLoadingText(verificationLoadingText);
        await patchAuction(auction.id, {
          createAuctionTxHash: tx.hash,
        });
      } else {
        setErrors();
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      setErrors(err);
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
      if (txReceipt.status === 1) {
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
      if (txReceipt.status === 1) {
        setLoadingText(verificationLoadingText);
        setDepositVerifyingTxIndex([...depositVerifyingTxIndex, txIndex]);
      } else {
        setErrors();
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      setErrors(err);

      console.error(err);
    }
  };

  const handleWithdraw = async (txIndex) => {
    try {
      // We need to withdraw each slot at a time
      // Calculate all count of deposited nfts at a slot
      const nftsCountMap = {};
      const nftTokenidsMap = {};
      // Take only nfts that are deposited
      const nfts = transactions.displayNfts[txIndex].filter((nft) => nft.deposited);
      transactions.finalSlotIndices[txIndex].forEach((slot) => {
        if (!nftsCountMap[slot]) {
          const slotNfts = nfts.filter((nft) => nft.slot === Number(slot));
          if (slotNfts.length) {
            nftsCountMap[slot] = slotNfts.length;
            nftTokenidsMap[slot] = slotNfts.map((nft) => nft.tokenId);
          }
        } else {
          const slotNfts = nfts.filter((nft) => nft.slot === Number(slot));
          nftTokenidsMap.push(slotNfts.map((nft) => nft.tokenId));
        }
      });
      const txHashes = [];
      const txs = [];
      const withdrawTokens = [];
      Object.keys(nftsCountMap).forEach(async (slot) => {
        // Wrapped in try catch to handle the case where user doesn't accept all txs
        try {
          const tx = await universeAuctionHouseContract.withdrawDepositedERC721(
            auction.onChainId,
            slot,
            nftsCountMap[slot]
          );
          txs.push(tx);
          setLoadingText(defaultLoadingText);
          setShowLoading(true);

          txHashes.push(tx.hash);
          setActiveTxHashes(txHashes);

          withdrawTokens.push(...nftTokenidsMap[slot]);
          setWithdrawVerifyingTokenIds(withdrawTokens);
          const txReceipt = await tx.wait();
          return txReceipt.status;
        } catch (err) {
          return null;
        }
      });

      setActiveTxHashes(txHashes);

      const results = await Promise.all(txs);

      if (!results.find((status) => status !== 1)) {
        setLoadingText(verificationLoadingText);
      } else {
        console.log('error ocurred');
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
      if (txReceipt.status === 1) {
        setLoadingText(verificationLoadingText);
      } else {
        setErrors();
      }
    } catch (error) {
      console.error(error);
      setShowLoading(false);
      setActiveTxHashes([]);
      setErrors(error);
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
