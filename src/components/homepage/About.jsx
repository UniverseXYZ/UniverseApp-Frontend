import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../utils/animations/cards_animation.json';
import circleImg from '../../assets/images/circle.svg';
import blockOne from '../../assets/images/homepage-block1.png';
import universeMintingLogo from '../../assets/images/universe-minting.svg';
import universeAuctionsLogo from '../../assets/images/universe-auctions.svg';
import bgImage from '../../assets/images/planets-bg.png';
import planetFrontImage from '../../assets/images/planet-front.png';
import planetBackImage from '../../assets/images/planet-back.png';
import planetMiddleImage from '../../assets/images/planet-middle.png';
import Button from '../button/Button';
import SubscribePopup from '../popups/SubscribePopup';

const About = () => {
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    const circleR = document.querySelector('#circle-r');
    const circleL = document.querySelector('#circle-l');
    const planetFront = document.querySelector('#planet__front');
    const planetBack = document.querySelector('#planet__back');
    const planetMiddle = document.querySelector('#planet__middle');

    const scrollLoop = () => {
      if (document.querySelector('.about__section')) {
        const yScrollPosition = window.scrollY;
        const aboutOffsetTop = document.querySelector('.about__section').offsetTop;

        circleR.style.transform = `translate3d(${yScrollPosition * -0.05}px, ${
          yScrollPosition * -0.2
        }px, 0)`;
        circleL.style.transform = `translate3d(${yScrollPosition * -0.05}px, ${
          yScrollPosition * -0.2
        }px, 0) rotate(180deg)`;
        planetFront.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.01
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.01}px, 0)`;
        planetBack.style.transform = `translate3d(${(yScrollPosition - aboutOffsetTop) * 0.02}px, ${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, 0)`;
        planetMiddle.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * -0.01
        }px, ${(yScrollPosition - aboutOffsetTop) * -0.01}px, 0)`;

        requestAnimationFrame(scrollLoop);
      }
    };

    if (document.querySelector('.about__section')) {
      requestAnimationFrame(scrollLoop);
    }

    return () => cancelAnimationFrame(scrollLoop);
  }, []);

  return (
    <div className="describe__section">
      <div className="universe__protocol__section">
        <img id="circle-r" className="circle-r" src={circleImg} alt="Circle" />
        <img id="circle-l" className="circle-l" src={circleImg} alt="Circle" />
        <div className="universe__protocol__section__container">
          <AnimatedOnScroll animationIn="fadeIn">
            <div className="universe__protocol">
              <h1 className="title">Universe Protocol and the Universe DAO</h1>
              <p className="info">
                Meta: To create a system that doesn’t live off the backs of artists and creates a
                sustainable ecosystem for artists and fans alike.
              </p>
              <p className="desc">
                The Universe is forever expanding at an accelerated rate, all while the xyzDAO
                controls the future and the fate of this project. Starting with an array of tools
                and a mission to empover artists, with a DAO that will be governed by the $XYZ token
                and its community. xyzDAO will be guided by the stars and the carbon that surraunds
                them as we travel into the cosmic unknowns.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
      <div className="about__section">
        <div className="about__section__container">
          <div className="blocks">
            {/* Block 1 */}
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
                Galaxies are a collection of minted NFT&apos;s these galaxies represent the IP of
                that particular item in the universe and its community can create art for: shows,
                merch, music festivals, etc. These Galaxies can also contain other planets within
                them, other NFT collections of art, shows, merch and music festivals. For future
                build outs, we hope to one day turn these into mini DAOs along with an integrated
                social network.
              </p>
              <Button className="light-button" onClick={() => history.push('/about')} disabled>
                Coming soon
              </Button>
            </AnimatedOnScroll>

            {/* Block 2 */}
            <AnimatedOnScroll animationIn="fadeIn">
              <img
                className="hide__on__mobile"
                src={universeAuctionsLogo}
                alt="Universe Auctions"
              />
              <p className="desc">
                We are developing a trustless and decentralized auction house for NFT&apos;s where
                anyone holding an NFT can put up the Galaxy and/or the collection of Planets up for
                auction. These auctions can also facilitate swaps of other tokens. You will be able
                to pay with specific ERC-20 and ETH. The xyzDAO will take a small fee of every
                auction.
              </p>
              <Button
                className="light-button"
                onClick={() => history.push('/about')}
                style={{ marginBottom: '60px' }}
                disabled
              >
                Coming soon
              </Button>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationIn="fadeIn">
              <img
                className="show__on__mobile"
                src={universeAuctionsLogo}
                alt="Universe Auctions"
              />
              <div className="planets__group">
                <img src={bgImage} alt="Block" />
                <img id="planet__front" src={planetFrontImage} alt="Planet Front" />
                <img id="planet__back" src={planetBackImage} alt="Planet Back" />
                <img id="planet__middle" src={planetMiddleImage} alt="Planet Middle" />
              </div>
            </AnimatedOnScroll>

            {/* Block 3 */}
            <AnimatedOnScroll
              animationIn="fadeIn"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Lottie options={defaultOptions} />
            </AnimatedOnScroll>
            <AnimatedOnScroll animationIn="fadeIn">
              <h1 className="title">Universe Original Characters and Lore</h1>
              <span className="coming__soon">Coming soon</span>
              <p className="desc">
                We are creating a whole universe of 69 original characters with stories and lore to
                lay the framework and showcase the potential for xyzDAO. We will show you how to
                create a universe of your own, build with us and help the Universe of NFTs never
                stops expanding.
              </p>
              <div className="subscribe__form">
                <span htmlFor="subscribeInp">Subscribe to stay updated on the latest news</span>
                <div className="form__group">
                  <input id="subscribeInp" type="email" placeholder="Enter your email" />
                  <Popup
                    trigger={
                      <button type="button" className="light-button">
                        Subscribe
                      </button>
                    }
                  >
                    {(close) => <SubscribePopup close={close} />}
                  </Popup>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
