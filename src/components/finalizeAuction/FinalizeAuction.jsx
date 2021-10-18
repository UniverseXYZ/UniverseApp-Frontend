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

const FinalizeAuction = () => {
  const history = useHistory();
  const { auction, myAuctions, setMyAuctions, bidExtendTime } = useAuctionContext();
  const { setActiveTxHashes } = useMyNftsContext();
  const {
    signer,
    universeERC721CoreContract,
    universeERC721FactoryContract,
    address,
    universeAuctionHouseContract,
  } = useAuthContext();

  const [hasDeployedAuction, setHasDeployedAuction] = useState(false);
  const [approvals, setApprovals] = useState(1);
  const [loadingApproval, setLoadingApproval] = useState(undefined);
  const [collections, setCollections] = useState([]);
  const [approvedCollections, setApprovedCollections] = useState([]);
  const [showAuctionDeployLoading, setShowAuctionDeployLoading] = useState(false);
  const [auctionId, setAuctionId] = useState(0);
  // TODO: if auction is null -> redirect to my auctions page
  // console.log(approvals);
  console.log(auction);
  useEffect(() => {
    const setupPage = async () => {
      // TODO: Check if auction is deployed
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
          const isApproved = await contract.isApprovedForAll(contract.address, address);
          console.log(`isApproved result:`);
          console.log(isApproved);
          if (isApproved) {
            setApprovedCollections([...approvedCollections, collection.address]);
          }
        }
      }
    };
    setupPage();
  }, [auction]);

  useEffect(() => {
    if (loadingApproval !== undefined) {
      setTimeout(() => {
        setApprovals(loadingApproval + 1);
        setLoadingApproval(undefined);
      }, 1000);
    }
  }, [loadingApproval]);
  console.log(universeAuctionHouseContract);

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
        setAuctionId(+auctionid);
        setHasDeployedAuction(true);

        // TODO: Call api to save auction
        // This will be temporary while the scraper isn't ready
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

      const tx = await contract.setApprovalForAll(collectionAddress, true);
      const result = await tx.wait();
      setApprovedCollections([...approvedCollections, collectionAddress]);
      setLoadingApproval(approvals);
      setIsApproving(false);
    } catch (err) {
      console.log(err);
      setIsApproving(false);
    }
  };

  const handleDepositTier = async () => {
    setApprovals(approvals + 1);
    // TODO: Deposit tier
    const depositResult = await universeAuctionHouseContract.batchDepositToAuction(
      auctionId,
      [],
      []
    );
    // TODO: If last tier show success modal
  };

  return (
    <div className="finalize__auction">
      <Popup
        trigger={
          <button
            type="button"
            id="success-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <SuccessPopup onClose={close} onAuction={auction} />}
      </Popup>
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
                {hasDeployedAuction ? (
                  <img src={doneIcon} alt="Done" />
                ) : (
                  <img src={emptyMark} alt="Empty mark" />
                )}
              </div>
              <div className={`line ${hasDeployedAuction ? 'colored' : ''}`} />
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
              {hasDeployedAuction ? (
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
                {hasDeployedAuction && approvals - 2 !== collections.length ? (
                  <img alt="Empty mark" src={emptyMark} />
                ) : hasDeployedAuction && approvals - 2 === collections.length ? (
                  <img alt="Empty mark" src={doneIcon} />
                ) : (
                  <img alt="Empty white" src={emptyWhite} />
                )}
              </div>
              <div
                className={`line ${
                  hasDeployedAuction && approvals - 2 === collections.length ? 'colored' : ''
                }`}
              />
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
                      hasDeployedAuction={hasDeployedAuction}
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

          <div className="create__auction">
            <div className="step">
              <div className="circle">
                {hasDeployedAuction && approvals - 2 === collections.length ? (
                  <img alt="Empty mark" src={emptyMark} />
                ) : (
                  <img alt="Empty white" src={emptyWhite} />
                )}
              </div>
            </div>
            <div className="create__auction__body">
              <h2>Deposit NFTs</h2>
              <p className="auction__description">Deposit 55 NFTs to the auction contract</p>
              {auction.rewardTiers.map((tier, tierIndex) => (
                <div className="transaction" key={uuid()}>
                  <div className="transaction__details">
                    <div className="transaction__header">
                      <h4>{tier.name}</h4>
                      <div className="head">
                        <p>
                          Slots: <b>{tier.numberOfWinners}</b>
                        </p>
                        <p>
                          Total NFTs: <b>{tier.numberOfWinners * tier.nftsPerWinner}</b>
                        </p>
                      </div>
                    </div>
                    <div className="transaction__body">
                      {tier.nfts.map((nft, index) => (
                        <div className="transaction__image" key={nft.id}>
                          <div className="first" />
                          <div className="second" />
                          <div className="image-main">
                            <img src={nft.thumbnail_url} alt={nft.name} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="deposit__button">
                    <Button className="light-button" onClick={handleDepositTier}>
                      Deposit
                    </Button>

                    <Button className="light-border-button">Withdraw</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Popup open={showAuctionDeployLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress."
          onClose={() => setShowAuctionDeployLoading(false)}
          contractInteraction
        />
      </Popup>
    </div>
  );
};

export default FinalizeAuction;
