import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
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

import SuccessPopup from '../popups/SuccessPopup';
import LeavePopup from '../popups/LeavePopup';
import AppContext from '../../ContextAPI';

const FinalizeAuction = () => {
  const history = useHistory();
  const {
    auction,
    setAuction,
    loggedInArtist,
    myAuctions,
    setMyAuctions,
    activeAuctions,
    setActiveAuctions,
    futureAuctions,
    setFutureAuctions,
    savedCollections,
    deployedCollections,
  } = useContext(AppContext);
  const [proceed, setProceed] = useState(false);
  const [approvals, setApprovals] = useState(1);

  const handleProceed = () => {
    setProceed(true);
    // setAuction((prevValue) => ({
    //   ...prevValue,
    //   launch: true,
    // }));
    setApprovals(approvals + 1);
    setMyAuctions(
      myAuctions.map((item) => (item.id === auction.id ? { ...item, launch: true } : item))
    );
  };

  const handleClick = () => {
    setApprovals(approvals + 1);
  };

  return (
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
                <Button className="light-button" disabled>
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
          <div className="create__auction">
            <div className="step">
              <div className="circle">
                {proceed ? (
                  <img alt="Empty mark" src={emptyMark} />
                ) : (
                  <img alt="Empty white" src={emptyWhite} />
                )}
              </div>
              <div className="line" />
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
                {deployedCollections.length ? (
                  deployedCollections.map((collection, index) => (
                    <div className="collection__div">
                      {collection.bgImage ? (
                        <img src={URL.createObjectURL(collection.bgImage)} alt={collection.name} />
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
                      {/* <img src={collectionImg} alt="Collection" /> */}
                      <div>
                        <h3>{collection.name}</h3>
                        {approvals === index + 2 ? (
                          <Button className="light-button approve-btn" onClick={handleClick}>
                            Approve
                          </Button>
                        ) : approvals > index + 2 ? (
                          <Button className="light-border-button approve-btn" disabled>
                            Approved
                            <img className="checkmark" src={completedCheckmark} alt="Approved" />
                          </Button>
                        ) : (
                          <Button className="light-button approve-btn" disabled>
                            Approve
                          </Button>
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
          <div className="create__auction">
            <div className="step">
              <div className="circle">
                {proceed ? (
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
                    {approvals === deployedCollections.length + 2 ? (
                      <Button className="light-button">Deposit</Button>
                    ) : approvals > deployedCollections.length + 2 ? (
                      <Button className="light-button" disabled>
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
