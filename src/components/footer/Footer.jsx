import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import './Footer.scss';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/images/light.svg';
import twitterIcon from '../../assets/images/twitter-icon.svg';
import discordIcon from '../../assets/images/discord-icon.svg';
import coinGesco from '../../assets/images/coingecko-icon.svg';
import youtubeIcon from '../../assets/images/youtube.svg';
import mediumIcon from '../../assets/images/medium.svg';
import SubscribePopup from '../popups/SubscribePopup.jsx';

const Footer = () => {
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
            document.getElementById('subscribed-hidden-btn').click();
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
  return (
    <footer>
      <Popup
        trigger={
          <button
            type="button"
            id="subscribed-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <SubscribePopup close={close} showCongrats />}
      </Popup>
      <div className="footer">
        <div className="footer__top">
          <div className="footer__top__container">
            <div className="subscribe">
              <p>Stay up to date with our newsletter</p>
              <div className="form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="button" className="light-button" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            </div>
            <div className="join__community">
              <p>Join the community</p>
              <div className="icons">
                <div>
                  <img
                    src={twitterIcon}
                    alt="Twiter"
                    aria-hidden="true"
                    onClick={() => window.open('https://twitter.com/universe_xyz')}
                  />
                </div>
                <div>
                  <img
                    src={discordIcon}
                    alt="Discord"
                    aria-hidden="true"
                    onClick={() => window.open('https://t.co/0hQWlbElpB?amp=1')}
                  />
                </div>
                <div>
                  <img
                    src={coinGesco}
                    alt="Coin Gesko"
                    aria-hidden="true"
                    onClick={() => window.open('https://www.coingecko.com/en/coins/universe-xyz')}
                  />
                </div>
                <div>
                  <img
                    src={youtubeIcon}
                    alt="Youtube"
                    aria-hidden="true"
                    onClick={() =>
                      window.open(
                        'http://youtube.com/channel/UCWt00md9T2b4iTsHWp_Fapw?sub_confirmation=1'
                      )
                    }
                  />
                </div>
                <div>
                  <img
                    src={mediumIcon}
                    alt="Medium"
                    aria-hidden="true"
                    onClick={() => window.open('https://medium.com/universe-xyz')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__middle">
          <div className="footer__middle__container">
            <div className="universe">
              <div className="logo-div">
                <img src={Logo} alt="logo" />
              </div>
              <p>
                Launch your own community-driven NFT universe baked with social tools, media
                services, and distribution - underpinned by the native $XYZ token.
              </p>
            </div>
            <div className="universe-list">
              <div>
                <ul>
                  <li>Products</li>
                  <li
                    className="disable"
                    // onClick={() => history.push('/minting-and-auctions/marketplace/active-auctions')}
                    // aria-hidden="true"
                  >
                    Auction house
                    <span className="tooltiptext">Coming soon</span>
                  </li>
                  <li className="disable">
                    NFT Marketplace
                    <span className="tooltiptext">Coming soon</span>
                  </li>
                  <li className="disable">
                    Social Media
                    <span className="tooltiptext">Coming soon</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>NFT Drops</li>
                  <li
                    // className="disable"
                    onClick={() => history.push('/polymorphs')}
                    aria-hidden="true"
                  >
                    Polymorphs
                    {/* <span className="tooltiptext">Coming soon</span> */}
                  </li>
                  <li className="disable">
                    Core Drops
                    <span className="tooltiptext">Coming soon</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Info</li>
                  <li onClick={() => history.push('/about')} aria-hidden="true">
                    About
                  </li>
                  <li
                    onClick={() =>
                      window.open('https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper')
                    }
                    aria-hidden="true"
                  >
                    Whitepaper
                  </li>
                  <li onClick={() => history.push('/team')} aria-hidden="true">
                    Team
                  </li>
                  <li aria-hidden="true" onClick={() => window.open('https://docs.universe.xyz/')}>
                    Docs
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>DAO</li>
                  <li
                    aria-hidden="true"
                    onClick={() => window.open('https://dao.universe.xyz/governance')}
                  >
                    Governance
                  </li>
                  <li
                    aria-hidden="true"
                    onClick={() => window.open('https://dao.universe.xyz/yield-farming')}
                  >
                    Yield farming
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__container">
          <div className="op-sourced">
            <span>Universe.xyz © 2021. Open-sourced.</span>
          </div>
          <div className="powered-by">
            <span
              aria-hidden="true"
              onClick={() =>
                window.open(
                  'https://app.sushi.com/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0x618679df9efcd19694bb1daa8d00718eacfa2883'
                )
              }
            >
              Add liquidity to SushiSwap USDC/XYZ pool
            </span>
            <span
              aria-hidden="true"
              onClick={() =>
                window.open(
                  'https://app.sushi.com/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x618679df9efcd19694bb1daa8d00718eacfa2883'
                )
              }
            >
              SushiSwap USDC/XYZ market
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
