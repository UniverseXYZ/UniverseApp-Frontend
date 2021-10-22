import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ReleaseRewards.scss';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import Button from '../button/Button.jsx';
import nft1 from '../../assets/images/marketplace/nfts/nft4.png';
import arrow from '../../assets/images/arrow.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import doneIcon from '../../assets/images/Completed.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import { ReleaseRewardsData } from '../../utils/fixtures/ReleaseRewardsDummyData';
import CongratsReleaseRewardsPopup from '../popups/CongratsReleaseRewardsPopup';

const ReleaseRewards = () => {
  const history = useHistory();
  const [auctionProceed, setAuctionProceed] = useState(false);
  const [data, setData] = useState([...ReleaseRewardsData]);
  const [showSuccesPopup, setShowSuccessPopup] = useState(false);

  const handleComplete = (id) => {
    const newData = [...data];
    newData.forEach((transaction) => {
      if (transaction.id === id) {
        transaction.completed = true;
      }
    });
    setData(newData);
    if (data.filter((transaction) => transaction.completed === true).length === data.length) {
      setShowSuccessPopup(true);
    }
  };

  return (
    <div className="release__rewards">
      <div className="release container">
        <div
          className="back-rew"
          aria-hidden="true"
          onClick={() => {
            history.push('/my-auctions');
          }}
        >
          <img src={arrow} alt="back" />
          <span>Auction title two</span>
          <h1 className="set-text">Release rewards</h1>
        </div>
        <p className="description">
          Without this step, the auctioneer will not be able to collect his winnings and the bidders
          will not be able to claim their NFTs
        </p>
        <div className="release__rewards__body">
          <div className="release__finalize__auction">
            <div className="step">
              <div className="circle">
                {auctionProceed ? (
                  <img src={doneIcon} alt="Done" />
                ) : (
                  <img src={emptyMark} alt="Empty mark" />
                )}
              </div>
              <div className={`line ${auctionProceed ? 'colored' : ''}`} />
            </div>
            <div className="release__auction__body">
              <h2>Finalize auction</h2>
              <p className="auction__description">
                This function will check which slots have been won, assign the winners and the bid
                ammounts
              </p>
              <div className="proceed__button">
                {auctionProceed ? (
                  <Button className="light-border-button" disabled>
                    Completed <img src={completedCheckmark} alt="completed" />
                  </Button>
                ) : (
                  <Button className="light-button" onClick={() => setAuctionProceed(true)}>
                    Proceed
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="release__finalize__auction">
            <div className="step">
              <div className="circle">
                {showSuccesPopup && auctionProceed ? (
                  <img src={doneIcon} alt="Done" />
                ) : auctionProceed ? (
                  <img src={emptyMark} alt="Empty mark" />
                ) : (
                  <img src={emptyWhite} alt="Empty white" />
                )}
              </div>
            </div>
            <div className="release__auction__body">
              <h2>Capture slot revenue</h2>
              <p className="auction__description">
                Once the auction is finalized, the revenue for each slot should be captured.
              </p>

              {data.map((transaction) => (
                <div className="transaction">
                  <div className="transaction__header">
                    <h3>{transaction.name}</h3>
                    <div className="transaction__proceed">
                      <p className="total">
                        Total NFTs: <b>{transaction.totalNFTs}</b>
                      </p>
                      {transaction.completed ? (
                        <Button className="light-border-button" disabled>
                          Completed <img src={completedCheckmark} alt="completed" />
                        </Button>
                      ) : (
                        <Button
                          className="light-button"
                          disabled={!auctionProceed}
                          onClick={() => handleComplete(transaction.id)}
                        >
                          Proceed
                        </Button>
                      )}
                    </div>
                  </div>
                  {transaction.tiers.map((tier) => (
                    <div className="transaction__tier">
                      <div className="tier__head">
                        <h4>{tier.type}</h4>
                        <p>
                          Slots: <b>{tier.slots}</b>
                        </p>
                        <p>
                          NFTs: <b>{tier.nftQuantity}</b>
                        </p>
                      </div>
                      <div className="tier__body">
                        {tier.nfts.map((nft) => (
                          <div className="tier__nft__box">
                            <img src={nft.image} alt="NFT" />
                            <div className="tier__nft__box__highlight__one" />
                            <div className="tier__nft__box__highlight__two" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="proceed__button__mobile">
                    {transaction.completed ? (
                      <Button className="light-border-button" disabled>
                        Completed <img src={completedCheckmark} alt="completed" />
                      </Button>
                    ) : (
                      <Button className="light-button" disabled={!auctionProceed}>
                        Proceed
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Popup closeOnDocumentClick={false} open={showSuccesPopup}>
        <CongratsReleaseRewardsPopup onClose={() => setShowSuccessPopup(false)} />
      </Popup>
    </div>
  );
};

export default ReleaseRewards;
