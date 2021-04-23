import { useState } from 'react';
import auctionsAccordionOne from '../../../../assets/images/auctions-accordion1.png';
import auctionsAccordionTwo from '../../../../assets/images/auctions-accordion2.png';
import auctionsAccordionThree from '../../../../assets/images/auctions-accordion3.png';
import auctionsAccordionFour from '../../../../assets/images/auctions-accordion4.png';
import Button from '../../../button/Button';

const AuctionsTab = () => {
  const [isFirstAccordionOpened, setIsFirstAccordionOpened] = useState(false);
  const [isSecondAccordionOpened, setIsSecondAccordionOpened] = useState(false);
  const [isThirdAccordionOpened, setIsThirdAccordionOpened] = useState(false);
  const [isFourthAccordionOpened, setIsFourthAccordionOpened] = useState(false);

  return (
    <div className="accordion">
      <div
        className="accordion__item"
        onClick={() => setIsFirstAccordionOpened(!isFirstAccordionOpened)}
      >
        <div className="accordion__item__header">
          <h2 className="title">1. Set Up Reward Tiers</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isFirstAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isFirstAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            Reward tiers are what makes this auction type unique, it allows you to place multiple
            NFTs into a reward. For instance, Justin’s Tier One aka Platinum gave you all 11 song
            NFTs and Gold Tier gave you 7 song NFTs. <br />
            <br /> You can do it like Justin or put different NFTs in every slot. It is completely
            customizable and up to you.
          </p>
          <img src={auctionsAccordionOne} alt="Set Up Reward Tiers" />
        </div>
      </div>
      <div
        className="accordion__item"
        onClick={() => setIsSecondAccordionOpened(!isSecondAccordionOpened)}
      >
        <div className="accordion__item__header">
          <h2 className="title">2. Mint NFT Collectibles and Collections</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isSecondAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isSecondAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            Create a single NFT or an entire collections on our minting platform. You can also use a
            collection you already minted or own. We did not want to limit creators to platforms so
            we allow you to use any NFTs for your collection. One place view all is important to us
            and our collectibles so we wanted to share this tool with you.
          </p>
          <img src={auctionsAccordionTwo} alt="Mint NFT Collectibles and Collections" />
        </div>
      </div>
      <div
        className="accordion__item"
        onClick={() => setIsThirdAccordionOpened(!isThirdAccordionOpened)}
      >
        <div className="accordion__item__header">
          <h2 className="title">3. Create Universe Auction</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isThirdAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isThirdAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            This is a new style of auction that is in very popular demand sense Justin Blau had a
            blow out auction featuring this style. We wanted to create a user-friendly interface to
            allow anyone to easily launch a tiered out auction.
          </p>
          <img src={auctionsAccordionThree} alt="Create Universe Auction" />
        </div>
      </div>
      <div
        className="accordion__item last"
        onClick={() => setIsFourthAccordionOpened(!isFourthAccordionOpened)}
      >
        <div className="accordion__item__header">
          <h2 className="title">4. Customize Auction Landing Page</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isFourthAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isFourthAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            We know creating websites can get tricky so we have created an easy way to set up an
            auction landing page with a subdomain of your choosing. <br />
            <br /> You are able to put your own logo, images, copy and we will handle all the hard
            coding work for you.
          </p>
          <img src={auctionsAccordionFour} alt="Customize Auction Landing Page" />
        </div>
      </div>

      <div className="launch__app__btn">
        <Button className="light-button">Set up auction</Button>
      </div>
    </div>
  );
};

export default AuctionsTab;
