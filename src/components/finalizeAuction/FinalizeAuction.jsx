import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import Skeleton from 'react-loading-skeleton';
import SuccessPopup from '../popups/SuccessPopup';
import arrow from '../../assets/images/arrow.svg';
import './FinalizeAuction.scss';
import warningIcon from '../../assets/images/Exclamation.svg';
import Button from '../button/Button.jsx';
import collectionImg from '../../assets/images/collection-img.svg';
import NFT3 from '../../assets/images/ntf3.svg';
import NFT4 from '../../assets/images/ntf4.svg';
import NFT6 from '../../assets/images/ntf6.svg';
import doneIcon from '../../assets/images/Completed.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import LeavePopup from '../popups/LeavePopup';
import AppContext from '../../ContextAPI';

const FinalizeAuction = () => {
  const history = useHistory();
  const {
    auction,
    myAuctions,
    setMyAuctions,
    loggedInArtist,
    deployedCollections,
    setDeployedCollections,
  } = useContext(AppContext);
  const [proceed, setProceed] = useState(false);
  const [approvals, setApprovals] = useState(1);
  const [loadingApproval, setLoadingApproval] = useState(undefined);
  const [collections, setCollections] = useState([]);
  const [approvedCollections, setApprovedCollections] = useState([]);

  useEffect(() => {
    let arr = [];
    deployedCollections.forEach((item) => {
      auction.tiers.forEach((tier) => {
        if (tier.nfts.filter((nft) => nft.collectionId === item.id && !item.approved).length) {
          arr.push(item);
        }
      });
    });
    arr = arr.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    setCollections(arr);
    setApprovedCollections(deployedCollections);
  }, []);

  useEffect(() => {
    if (loadingApproval !== undefined) {
      setTimeout(() => {
        setApprovals(loadingApproval + 1);
        setLoadingApproval(undefined);
      }, 1000);
    }
  }, [loadingApproval]);

  const handleProceed = () => {
    setProceed(true);
    setApprovals(approvals + 1);
  };

  const handleClick = (id) => {
    setApprovedCollections(
      approvedCollections.map((item) => (item.id === id ? { ...item, approved: true } : item))
    );
    setLoadingApproval(approvals);
  };

  const handleDeposit = () => {
    setApprovals(approvals + 1);
  };

  const handleLastDeposit = () => {
    setApprovals(approvals + 1);
    setTimeout(() => {
      setDeployedCollections(approvedCollections);
      setMyAuctions(
        myAuctions.map((item) => (item.id === auction.id ? { ...item, launch: true } : item))
      );
      setTimeout(() => {
        document.getElementById('success-hidden-btn').click();
      }, 1000);
    }, 1000);
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
                {proceed ? (
                  <img src={doneIcon} alt="Done" />
                ) : (
                  <img src={emptyMark} alt="Empty mark" />
                )}
              </div>
              <div className={`line ${proceed ? 'colored' : ''}`} />
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
              {proceed ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button className="light-button" onClick={handleProceed}>
                  Proceed
                </Button>
              )}
              {/* <Popup trigger={<Button className="light-button">Proceed</Button>}>
                {(close) => <LeavePopup onClose={close} />}
              </Popup> */}
            </div>
          </div>
          {collections.length ? (
            <div className="create__auction">
              <div className="step">
                <div className="circle">
                  {proceed && approvals - 2 !== collections.length ? (
                    <img alt="Empty mark" src={emptyMark} />
                  ) : proceed && approvals - 2 === collections.length ? (
                    <img alt="Empty mark" src={doneIcon} />
                  ) : (
                    <img alt="Empty white" src={emptyWhite} />
                  )}
                </div>
                <div
                  className={`line ${
                    proceed && approvals - 2 === collections.length ? 'colored' : ''
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
                    Depending on the gas fee cost, you may need to have a significant amount of ETH
                    to proceed
                  </p>
                </div>
                <div className="collections">
                  {collections.length ? (
                    collections.map((collection, index) => (
                      <div className="collection__div">
                        {collection.bgImage ? (
                          <img
                            src={URL.createObjectURL(collection.bgImage)}
                            alt={collection.name}
                          />
                        ) : typeof collection.previewImage === 'string' &&
                          collection.previewImage.startsWith('#') ? (
                          <div
                            className="random__bg__color"
                            style={{ backgroundColor: collection.previewImage }}
                          />
                        ) : (
                          <img
                            className="blur"
                            src={URL.createObjectURL(collection.previewImage)}
                            alt={collection.name}
                          />
                        )}
                        <div>
                          <h3>{collection.name}</h3>
                          {loadingApproval !== index + 2 ? (
                            <Button
                              className={`${
                                approvals > index + 2 ? 'light-border-button' : 'light-button'
                              } approve-btn`}
                              disabled={approvals !== index + 2}
                              onClick={() => handleClick(collection.id)}
                            >
                              {approvals > index + 2 ? (
                                <>
                                  Approved
                                  <img
                                    src={completedCheckmark}
                                    className="checkmark"
                                    alt="Approved"
                                  />
                                </>
                              ) : (
                                'Approve'
                              )}
                            </Button>
                          ) : (
                            <div className="loading-ring">
                              <div />
                              <div />
                              <div />
                              <div />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty__nfts">
                      <h3>No Collections found</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="create__auction">
            <div className="step">
              <div className="circle">
                {proceed && approvals - 2 === collections.length ? (
                  <img alt="Empty mark" src={emptyMark} />
                ) : (
                  <img alt="Empty white" src={emptyWhite} />
                )}
              </div>
            </div>
            <div className="create__auction__body">
              <h2>Deposit NFTs</h2>
              <p className="auction__description">Deposit 55 NFTs to the auction contract</p>
              {auction.tiers.map((tier, tierIndex) => (
                <div className="transaction">
                  <div className="transaction__details">
                    <div className="transaction__header">
                      <h4>{tier.name}</h4>
                      <div className="head">
                        <p>
                          Slot: <b>{tier.winners}</b>
                        </p>
                        <p>
                          Total NFTs: <b>{tier.winners * tier.nftsPerWinner}</b>
                        </p>
                      </div>
                    </div>
                    <div className="transaction__body">
                      {tier.nfts.map(
                        (nft, index) =>
                          index < 3 && (
                            <div className="transaction__image" key={nft.id}>
                              <div className="first" />
                              <div className="second" />
                              <div className="image-main">
                                <img src={URL.createObjectURL(nft.previewImage)} alt={nft.name} />
                                {tier.nfts.length > 3 && (
                                  <span className="show__more">{`+${
                                    tier.nfts.length - 3
                                  } more`}</span>
                                )}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="deposit__button">
                    {approvals === collections.length + 2 + tierIndex &&
                    auction.tiers.length !== tierIndex + 1 ? (
                      <Button className="light-button" onClick={handleDeposit}>
                        Deposit
                      </Button>
                    ) : approvals === collections.length + 2 + tierIndex &&
                      auction.tiers.length === tierIndex + 1 ? (
                      <button type="button" className="light-button" onClick={handleLastDeposit}>
                        Deposit
                      </button>
                    ) : approvals > collections.length + 2 + tierIndex ? (
                      <Button className="light-border-button" disabled>
                        Deposited
                        <img className="checkmark" src={completedCheckmark} alt="Deposited" />
                      </Button>
                    ) : (
                      <Button className="light-button" disabled>
                        Deposit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeAuction;
