import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../button/Button';
import setUpAuction from '../../../../assets/images/howItWork/setUpAuction.png';
import myAuction from '../../../../assets/images/howItWork/myAuctions.png';
import landingPage from '../../../../assets/images/howItWork/landingPage.png';

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
        className="accordion__item"
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
            <img src={setUpAuction} alt="auction" />
          </div>
        </div>
      </div>
      <div
        className="accordion__item auction-middle"
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
            <img src={myAuction} alt="myAuction" />
          </div>
        </div>
      </div>
      <div
        className="accordion__item"
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
            <img src={landingPage} alt="landing" />
          </div>
        </div>
      </div>
      <div className="launch__app__btn">
        <Button className="light-button" onClick={() => history.push('/my-auctions')}>
          Set up auction
        </Button>
      </div>
    </div>
  );
};

export default AuctionsTab;
