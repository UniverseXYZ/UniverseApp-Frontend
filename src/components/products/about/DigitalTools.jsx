import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import blockOne from '../../../assets/images/about-page-block1.png';
import blockTwo from '../../../assets/images/about-page-block2.png';
import blockThree from '../../../assets/images/about-page-block3.png';
import Button from '../../button/Button.jsx';

const DigitalTools = () => {
  const history = useHistory();
  return (
    <div className="digital__tools__section">
      <div className="digital__tools__section__container">
        <h1 className="title">Digital Tools to Empower Artists</h1>
        <div className="blocks">
          {/* Block 1 */}
          <AnimatedOnScroll animationIn="fadeIn">
            <img src={blockOne} alt="Block" />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn">
            <h2 className="title">Efficient collection curating and launching</h2>
            <p className="desc">
              Curate large collections of 100s or even 1000s of NFTs: Our tools allow you to easily
              customize and perfect your collection before you launch. Launching 100s of NFTs at a
              time can be extremely difficult, however our step by step set up and review process
              allows you to prevent mistakes and launch a beautiful and consistent collection.
            </p>
            <Button
              className="light-button"
              onClick={() =>
                history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
              }
            >
              Create NFT collection
            </Button>
          </AnimatedOnScroll>

          {/* Block 2 */}
          <AnimatedOnScroll animationIn="fadeIn">
            <h2 className="title">Easy to use UI for minting and selling NFTs</h2>
            <p className="desc">
              We have combined UI and flows from industry leaders and tweaked it slightly to make an
              easy to use system for minting and selling NFTs. <br />
              <br /> We offer step by step instructions for the entire process, so you wont get
              stuck or confused.
            </p>
            <Button
              className="light-button"
              onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })}
            >
              Create NFT
            </Button>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn">
            <img src={blockTwo} alt="Block" />
          </AnimatedOnScroll>

          {/* Block 3 */}
          <AnimatedOnScroll animationIn="fadeIn">
            <img src={blockThree} alt="Block" />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn">
            <h2 className="title">Powerful platform for auctioning NFTs</h2>
            <p className="desc">
              Sell any NFT in your collection whether you created it or bought it on the secondary
              market or another platform. You will be able to bundle an Euler beat with a Hashmask
              or a Punk then sell it to the highest bidder and the second highest gets a Hashmask
              and a Beeple. This Auction will allow you to mix and match 100s of NFTs in tiers to be
              bid on.
            </p>
            <Button className="light-button" onClick={() => history.push('/my-auctions')}>
              Set up auction
            </Button>
          </AnimatedOnScroll>
        </div>
      </div>
    </div>
  );
};

export default DigitalTools;
