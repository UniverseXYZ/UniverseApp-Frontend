/* eslint-disable no-return-assign */
import React, { useRef, useEffect } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import blockOne from '../../assets/images/homepage-block.png';
import universeMintingLogo from '../../assets/images/universe-minting.svg';
import universeAuctionsLogo from '../../assets/images/universe-auctions.svg';
import bgImage from '../../assets/images/planets-bg.png';
import hummerImage from '../../assets/images/hummer.png';
import squareOne from '../../assets/images/square1.png';
import squareTwo from '../../assets/images/square2.png';
import squareThree from '../../assets/images/square3.png';
import squareFour from '../../assets/images/square4.png';
import squareFive from '../../assets/images/square5.png';
import squareSix from '../../assets/images/square6.png';
import squareSeven from '../../assets/images/square7.png';
import arrowLeft from '../../assets/images/arrow-black.svg';

const MintingAuctionsSection = () => {
  const history = useHistory();
  const mainSectionRef = useRef(null);
  const squareOneRef = useRef(null);
  const squareTwoRef = useRef(null);
  const squareThreeRef = useRef(null);
  const squareFourRef = useRef(null);
  const squareFiveRef = useRef(null);
  const squareSixRef = useRef(null);
  const squareSevenRef = useRef(null);

  useEffect(() => {
    const squareOneEl = squareOneRef.current;
    const squareTwoEl = squareTwoRef.current;
    const squareThreeEl = squareThreeRef.current;
    const squareFourEl = squareFourRef.current;
    const squareFiveEl = squareFiveRef.current;
    const squareSixEl = squareSixRef.current;
    const squareSevenEl = squareSevenRef.current;

    const scrollLoop = () => {
      if (mainSectionRef.current) {
        const yScrollPosition = window.scrollY;
        const aboutOffsetTop = mainSectionRef.current.offsetTop;
        const translate3D = `translate3d(${(yScrollPosition - aboutOffsetTop) * 0.02}px, ${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, 0)`;

        [
          squareOneEl,
          squareTwoEl,
          squareThreeEl,
          squareFourEl,
          squareFiveEl,
          squareSixEl,
          squareSevenEl,
        ].forEach((el) => (el.style.transform = translate3D));

        requestAnimationFrame(scrollLoop);
      }
    };

    if (mainSectionRef.current) {
      requestAnimationFrame(scrollLoop);
    }

    return () => cancelAnimationFrame(scrollLoop);
  }, []);

  return (
    <div ref={mainSectionRef} className="about__section">
      <div className="about__section__container">
        <div className="blocks">
          <AnimatedOnScroll animationIn="fadeIn">
            <img
              className="show__on__mobile"
              src={universeMintingLogo}
              alt="Universe Minting"
              style={{ marginTop: 0 }}
            />
            <img
              src={blockOne}
              alt="Block"
              style={{
                filter: 'drop-shadow(0px 10px 40px rgba(136, 120, 172, 0.2))',
                borderRadius: '12px',
              }}
            />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn">
            <img className="hide__on__mobile" src={universeMintingLogo} alt="Universe Minting" />
            <p className="desc">
              In the Universe, an NFT is minted for each item in a Collection. Each collection of
              art can include a variety of digital formats including video formats, music, and more.
              Collections can also hold sub-collections in them. This allows for the creation of
              additional NFTs such as layers of art, shows, merchandise, music. etc. that can evolve
              over time under one umbrella community structure. <br />
              <div>
                In this way the Universe Protocol allows content to grow over time with community
                input, yet retain programmatic links back to its origins and the original creators.{' '}
                <br />
                <br /> In future build outs we hope to enable the ability to turn collections into
                mini DAOs along with an integrated social network.
              </div>
            </p>
            <Button className="light-button" onClick={() => history.push('/minting')}>
              Go to minting
              <img src={arrowLeft} alt="arrow-back" />
            </Button>
          </AnimatedOnScroll>

          <AnimatedOnScroll animationIn="fadeIn">
            <img className="hide__on__mobile" src={universeAuctionsLogo} alt="Universe Auctions" />
            <p className="desc">
              We are developing a trustless decentralized auction house for NFTs. You can use
              existing NFTs or mint new collections and create a multi-tier auction with multiple
              winners. At its simplest, you can set up a single tier reserve price english auction
              that is well known.
              <div>
                There will be <b>ZERO FEES</b> for initial auctions, with all revenue going to the
                creator - we are here to empower artists at our core. However, the xyzDAO will take
                a 2% fee on every resale on the Universe platform to support continued innovation.
              </div>
            </p>
            <Button
              className="light-button"
              onClick={() => history.push('/products/auction-house')}
              style={{ marginBottom: '60px' }}
            >
              Go to Auctions
              <img src={arrowLeft} alt="arrow-back" />
            </Button>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn">
            <img className="show__on__mobile" src={universeAuctionsLogo} alt="Universe Auctions" />
            <div className="planets__group">
              <div className="squares__container">
                <img id="gradient-bg" src={bgImage} alt="Block" />
                <img id="hummer" src={hummerImage} alt="Hummer" />
                <img ref={squareOneRef} id="squareOne" src={squareOne} alt="Square" />
                <img ref={squareTwoRef} id="squareTwo" src={squareTwo} alt="Square" />
                <img ref={squareThreeRef} id="squareThree" src={squareThree} alt="Square" />
                <img ref={squareFourRef} id="squareFour" src={squareFour} alt="Square" />
                <img ref={squareFiveRef} id="squareFive" src={squareFive} alt="Square" />
                <img ref={squareSixRef} id="squareSix" src={squareSix} alt="Square" />
                <img ref={squareSevenRef} id="squareSeven" src={squareSeven} alt="Square" />
              </div>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </div>
  );
};

export default MintingAuctionsSection;
