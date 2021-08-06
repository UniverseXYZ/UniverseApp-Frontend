import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import Button from '../button/Button.jsx';
import SubscribePopup from '../popups/SubscribePopup.jsx';
import animationData from '../../utils/animations/cards_animation.json';
import circleImg from '../../assets/images/circle.svg';
import blockOne from '../../assets/images/homepage-block1.png';
import blockThree from '../../assets/images/homepage-block3.png';
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
import topmorphs from '../../assets/images/topmorph.png';

const About = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      const config = {
        headers: { 'Access-Control-Allow-Origin': '*' },
        params: {
          email,
        },
      };
      axios
        .get('https://shielded-sands-48363.herokuapp.com/addContact', config)
        .then((response) => {
          if (response.status === 200) {
            setEmail('');
            document.getElementById('sub-hidden-btn').click();
          } else {
            alert('OOPS! Something went wrong.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Email address is invalid.');
    }
  };

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
    const squareOneEl = document.querySelector('#squareOne');
    const squareTwoEl = document.querySelector('#squareTwo');
    const squareThreeEl = document.querySelector('#squareThree');
    const squareFourEl = document.querySelector('#squareFour');
    const squareFiveEl = document.querySelector('#squareFive');
    const squareSixEl = document.querySelector('#squareSix');
    const squareSevenEl = document.querySelector('#squareSeven');

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
        squareOneEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareTwoEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareThreeEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareFourEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareFiveEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareSixEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareSevenEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;

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
              <h1 className="title">Universe Protocol and the xyzDAO</h1>
              <p className="info">
                Meta: To create a system that doesn’t live off the backs of artists and creates a
                sustainable ecosystem for artists and fans alike.
              </p>
              <p className="desc">
                The Universe is forever expanding at an accelerated rate, all while the xyzDAO
                controls the future and the fate of this project. Starting with an array of tools
                and a mission to empower artists, with a DAO that will be governed by the $XYZ token
                and its community. xyzDAO will be guided by the stars and the carbon that surrounds
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
                In the Universe, an NFT is minted for each item in a Collection. Each collection of
                art can include a variety of digital formats including video formats, music, and
                more. Collections can also hold sub-collections in them. This allows for the
                creation of additional NFTs such as layers of art, shows, merchandise, music. etc.
                that can evolve over time under one umbrella community structure. <br />
                <div>
                  In this way the Universe Protocol allows content to grow over time with community
                  input, yet retain programmatic links back to its origins and the original
                  creators. <br />
                  <br /> In future build outs we hope to enable the ability to turn collections into
                  mini DAOs along with an integrated social network.
                </div>
              </p>
              <Button
                className="light-button"
                // onClick={() => history.push('/about')}
                disabled
              >
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
                We are developing a trustless decentralized auction house for NFTs. You can use
                existing NFTs or mint new collections and create a multi-tier auction with multiple
                winners. At its simplest, you can set up a single tier reserve price english auction
                that is well known.
                <div>
                  There will be <b>ZERO FEES</b> for initial auctions, with all revenue going to the
                  creator - we are here to empower artists at our core. However, the xyzDAO will
                  take a 2% fee on every resale on the Universe platform to support continued
                  innovation.
                </div>
              </p>
              <Button
                className="light-button"
                // onClick={() => history.push('/about')}
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
                <div className="squares__container">
                  <img id="gradient-bg" src={bgImage} alt="Block" />
                  <img id="hummer" src={hummerImage} alt="Hummer" />
                  <img id="squareOne" src={squareOne} alt="Square" />
                  <img id="squareTwo" src={squareTwo} alt="Square" />
                  <img id="squareThree" src={squareThree} alt="Square" />
                  <img id="squareFour" src={squareFour} alt="Square" />
                  <img id="squareFive" src={squareFive} alt="Square" />
                  <img id="squareSix" src={squareSix} alt="Square" />
                  <img id="squareSeven" src={squareSeven} alt="Square" />
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>
      </div>
      <div className="polymorphs__universe__section">
        <div className="polymorphs__universe__section__container">
          <div className="blocks">
            {/* Block 3 */}
            <AnimatedOnScroll animationIn="fadeIn">
              {/* <img src={blockThree} alt="Block" /> */}
              <img src={topmorphs} alt="top" />
            </AnimatedOnScroll>
            <AnimatedOnScroll animationIn="fadeIn">
              {/* <span className="new">COMING SOON</span> */}
              <div className="soon">
                <h1>COMING SOON</h1>
              </div>
              <h1 className="title--section">Polymorph Rarity Chart</h1>
              <p className="text--section">
                Mirror, mirror on the wall, who has the rarest
                <br /> Polymorph of them all?
              </p>
              <Button className="light-button" onClick={() => history.push('/polymorphs')}>
                Rarity chart
              </Button>
            </AnimatedOnScroll>
          </div>
        </div>
      </div>
      <div className="about__section">
        <div className="about__section__container">
          <div className="blocks diff">
            {/* Block 4 */}
            <AnimatedOnScroll animationIn="fadeIn">
              <span className="coming__soon">Coming soon</span>
              <h1 className="title">Universe Original Characters and Lore</h1>
              <p className="desc">
                The initial Core Collection will be released to showcase the ease of use for
                aspiring artists to build and release their own NFT franchise using the features of
                the Universe Protocol. The Core Collection provides an example for aspiring artists
                for how to build out your franchise using the features of the Universe Protocol.
              </p>
              <div className="subscribe__form">
                <span htmlFor="subscribeInp">Subscribe to stay updated on the latest news</span>
                <div className="form__group">
                  <input
                    id="subscribeInp"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="button" className="light-button" onClick={handleSubscribe}>
                    Subscribe
                  </button>
                  <Popup
                    trigger={
                      <button
                        type="button"
                        id="sub-hidden-btn"
                        aria-label="hidden"
                        style={{ display: 'none' }}
                      />
                    }
                  >
                    {(close) => <SubscribePopup close={close} showCongrats />}
                  </Popup>
                </div>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll
              animationIn="fadeIn"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Lottie options={defaultOptions} />
            </AnimatedOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
