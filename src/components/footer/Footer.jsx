import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import './Footer.scss';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/images/light.svg';
import twitterIcon from '../../assets/images/Twitter.svg';
import discordIcon from '../../assets/images/Discord.svg';
import mediumIcon from '../../assets/images/medium-icon.svg';
import youtubeIcon from '../../assets/images/youtube-icon.svg';
import SubscribePopup from '../popups/SubscribePopup.jsx';

const Footer = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        <div className="footer__container">
          <div className="universe">
            <div className="logo-div">
              <img src={Logo} alt="logo" />
            </div>
            <div className="subscribe">
              <p>Stay up to date with our newsletter</p>
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
          <div className="universe-list">
            <div className="universe-global">
              <ul>
                <li>PRODUCTS</li>
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
            <div className="minting-auctions">
              <ul>
                <li>INFO</li>
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
              </ul>
            </div>
            <div className="coming-soon">
              <ul>
                <li>DAO</li>
                <li
                  aria-hidden="true"
                  onClick={() => window.open('https://dao.universe.xyz/governance/overview')}
                >
                  Governance
                </li>
                <li
                  aria-hidden="true"
                  onClick={() => window.open('https://dao.universe.xyz/yield-farming')}
                >
                  Yield farming
                </li>
                <li aria-hidden="true" onClick={() => window.open('https://docs.universe.xyz/')}>
                  Docs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-links">
            <div className="op-sourced">
              <span>Universe.xyz © 2021. Open-sourced.</span>
            </div>
          </div>
          <div className="powered-by">
            <span>Powered by xyzDAO.</span>
          </div>
          <div className="icons">
            <img
              src={twitterIcon}
              alt="Twiter"
              aria-hidden="true"
              onClick={() => window.open('https://twitter.com/universe_xyz')}
            />
            <img
              src={discordIcon}
              alt="Discord"
              aria-hidden="true"
              onClick={() => window.open('https://t.co/0hQWlbElpB?amp=1')}
            />
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
            <img
              src={mediumIcon}
              alt="Medium"
              aria-hidden="true"
              onClick={() => window.open('https://medium.com/universe-xyz')}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
