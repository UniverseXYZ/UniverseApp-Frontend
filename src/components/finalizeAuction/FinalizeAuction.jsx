import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import arrow from '../../assets/images/arrow.svg';
import './FinalizeAuction.scss';
import warningIcon from '../../assets/images/Exclamation.svg';
import Button from '../button/Button.jsx';
import collectionImg from '../../assets/images/collection-img.svg';
import NFT3 from '../../assets/images/ntf3.svg';
import NFT4 from '../../assets/images/ntf4.svg';
import NFT6 from '../../assets/images/ntf6.svg';
import doneIcon from '../../assets/images/Completed.svg';
import SuccessPopup from '../popups/SuccessPopup';
import LeavePopup from '../popups/LeavePopup';

const FinalizeAuction = () => {
  const history = useHistory();

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
                <img src={doneIcon} alt="Done" />
              </div>
              <div className="line colored" />
            </div>
            <div className="create__auction__body">
              <h2>Craete auction</h2>
              <p className="auction__description">
                Proceed with the transaction to create the auction instance on the blockchain
              </p>
              <div className="warning__div">
                <img src={warningIcon} alt="Warning" />
                <p>You will not be able to make any changes to the auction if you proceed</p>
              </div>
              <Popup trigger={<Button className="light-button">Proceed</Button>}>
                {(close) => <LeavePopup onClose={close} />}
              </Popup>
            </div>
          </div>
          <div className="create__auction">
            <div className="step">
              <div className="circle" />
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
                <div className="collection__div">
                  <img src={collectionImg} alt="Collection" />
                  <div>
                    <h3>Collection name</h3>
                    <Button className="light-button" disabled>
                      Approve
                    </Button>
                  </div>
                </div>
                <div className="collection__div">
                  <img src={collectionImg} alt="Collection" />
                  <div>
                    <h3>Collection name</h3>
                    <Button className="light-button" disabled>
                      Approve
                    </Button>
                  </div>
                </div>
                <div className="collection__div">
                  <img src={collectionImg} alt="Collection" />
                  <div>
                    <h3>Collection name</h3>
                    <Button className="light-button" disabled>
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="create__auction">
            <div className="step">
              <div className="circle" />
            </div>
            <div className="create__auction__body">
              <h2>Deposit NFTs</h2>
              <p className="auction__description">Deposit 55 NFTs to the auction contract</p>
              <div className="transaction">
                <div className="transaction__details">
                  <div className="transaction__header">
                    <h4>Transaction 1</h4>
                    <div className="head">
                      <p>
                        Slot: <b>5</b>
                      </p>
                      <p>
                        Total NFTs: <b>15</b>
                      </p>
                    </div>
                  </div>
                  <div className="transaction__body">
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT3} alt="NFT3" />
                      </div>
                    </div>
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT4} alt="NFT4" />
                      </div>
                    </div>
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT6} alt="NFT6" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="deposit__button">
                  <Button className="light-button" disabled>
                    Deposit
                  </Button>
                </div>
              </div>
              <div className="transaction">
                <div className="transaction__details">
                  <div className="transaction__header">
                    <h4>Transaction 2</h4>
                    <div className="head">
                      <p>
                        Slot: <b>10</b>
                      </p>
                      <p>
                        Total NFTs: <b>20</b>
                      </p>
                    </div>
                  </div>
                  <div className="transaction__body">
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT3} alt="NFT3" />
                      </div>
                    </div>
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT4} alt="NFT4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="deposit__button">
                  <Button className="light-button" disabled>
                    Deposit
                  </Button>
                </div>
              </div>
              <div className="transaction">
                <div className="transaction__details">
                  <div className="transaction__header">
                    <h4>Transaction 3</h4>
                    <div className="head">
                      <p>
                        Slot: <b>10</b>
                      </p>
                      <p>
                        Total NFTs: <b>10</b>
                      </p>
                    </div>
                  </div>
                  <div className="transaction__body">
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT3} alt="NFT3" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="deposit__button">
                  <Button className="light-button" disabled>
                    Deposit
                  </Button>
                </div>
              </div>
              <div className="transaction">
                <div className="transaction__details">
                  <div className="transaction__header">
                    <h4>Transaction 4</h4>
                    <div className="head">
                      <p>
                        Slot: <b>10</b>
                      </p>
                      <p>
                        Total NFTs: <b>10</b>
                      </p>
                    </div>
                  </div>
                  <div className="transaction__body">
                    <div className="transaction__image">
                      <div className="first" />
                      <div className="second" />
                      <div className="image-main">
                        <img src={NFT3} alt="NFT3" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="deposit__button">
                  <Button className="light-button" disabled>
                    Deposit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeAuction;
