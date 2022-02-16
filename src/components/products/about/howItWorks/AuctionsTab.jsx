import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../button/Button';
import setupAuctionSettings from '../../../../assets/images/howItWork/setup-auction-settings.png';
import setupAuctionRewardTiers from '../../../../assets/images/howItWork/setup-auction-reward-tiers.png';
import activeAuctions from '../../../../assets/images/howItWork/active-auctions.png';
import customizeAuction1 from '../../../../assets/images/howItWork/customize-auction1.png';
import customizeAuction2 from '../../../../assets/images/howItWork/customize-auction2.png';

const AuctionsTab = () => {
  const [isFirstAccordionOpened, setIsFirstAccordionOpened] = useState(true);
  const [isSecondAccordionOpened, setIsSecondAccordionOpened] = useState(false);
  const [isThirdAccordionOpened, setIsThirdAccordionOpened] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelectorAll('.accordion__item__body')) {
        const elems = document.querySelectorAll('.accordion__item__body');
        elems.forEach((el, i) => {
          el.style.animationDuration = '.5s';
        });
      }
    }, 500);
  }, []);

  return (
    <div className="accordion">
      <div
        className={`accordion__item ${isFirstAccordionOpened ? 'opened' : ''}`}
        onClick={() => setIsFirstAccordionOpened(!isFirstAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <div className="toggle">
            <span className="horizontal" />
            {!isFirstAccordionOpened && <span className="vertical" />}
          </div>
          <h2 className="title">Set up reward tiers</h2>
        </div>
        <div className={`accordion__item__body ${isFirstAccordionOpened ? 'open' : ''}`}>
          <div className="auction-dropdown">
            <p>
              Reward tiers are what makes this auction type unique, it allows you to place multiple
              NFTs into a reward. For instance, Justin’s Tier One aka Platinum gave you all 11 song
              NFTs and Gold Tier gave you 7 song NFTs. You can do it like Justin or put different
              NFTs in every slot. It is completely customizable and up to you.
            </p>
            <div className="image-section">
              <div>
                <img src={setupAuctionSettings} alt="setupAuctionSettings" />
              </div>
              <div>
                <img src={setupAuctionRewardTiers} alt="setupAuctionRewardTiers" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`accordion__item auction-middle ${isSecondAccordionOpened ? 'opened' : ''}`}
        onClick={() => setIsSecondAccordionOpened(!isSecondAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <div className="toggle">
            <span className="horizontal" />
            {!isSecondAccordionOpened && <span className="vertical" />}
          </div>
          <h2 className="title">Set up Universe auction</h2>
        </div>
        <div className={`accordion__item__body ${isSecondAccordionOpened ? 'open' : ''}`}>
          <div className="auction-dropdown">
            <p>
              This is a new style of auction that is in extremely popular demand since Justin Blau
              had a blowout auction featuring this style. We wanted to create a user-friendly
              interface to allow anyone to easily launch a tiered-out auction.
            </p>
            <img src={activeAuctions} alt="myAuction" />
          </div>
        </div>
      </div>
      <div
        className={`accordion__item ${isThirdAccordionOpened ? 'opened' : ''}`}
        onClick={() => setIsThirdAccordionOpened(!isThirdAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <div className="toggle">
            <span className="horizontal" />
            {!isThirdAccordionOpened && <span className="vertical" />}
          </div>
          <h2 className="title">Customize Auction Landing Page</h2>
        </div>
        <div className={`accordion__item__body ${isThirdAccordionOpened ? 'open' : ''}`}>
          <div className="auction-dropdown">
            <p>
              We know creating websites can get tricky, so we have created an easy way to set up an
              auction landing page with a subdomain of your choosing. You can put your own logo,
              images, copy and we will handle all the hard coding work for you.
            </p>
            <div className="image-section">
              <div>
                <img src={customizeAuction1} alt="customizeAuction1" />
              </div>
              <div>
                <img src={customizeAuction2} alt="customizeAuction2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="launch__app__btn">
        <Button
          className="light-button"
          onClick={() => history.push('/setup-auction/auction-settings')}
        >
          Set up auction
        </Button>
      </div>
    </div>
  );
};

export default AuctionsTab;
