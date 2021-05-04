import React from 'react';
import './Footer.scss';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/images/light.svg';
import twitter from '../../assets/images/Twitter.svg';
import discord from '../../assets/images/Discord.svg';
import Btn from '../button/Button';

const Footer = () => {
  const history = useHistory();
  return (
    <footer>
      <div className="footer">
        <div className="footer__container">
          <div className="universe">
            <div className="logo-div">
              <img src={Logo} alt="logo" />
            </div>
            <div className="subscribe">
              <p>Stay up to date with our newsletter</p>
              <input placeholder="Enter your email" />
              <Btn className="light-button">Subscribe</Btn>
            </div>
          </div>
          <div className="universe-list">
            <div className="universe-global">
              <ul>
                <li>PRODUCTS</li>
                <li
                  onClick={() => history.push('/minting-and-auctions/marketplace/active-auctions')}
                  aria-hidden="true"
                >
                  Auction house
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
                <li onClick={() => history.push('/minting-and-auctions/about')} aria-hidden="true">
                  About
                </li>
                <li>Whitepaper</li>
                <li onClick={() => history.push('/team')} aria-hidden="true">
                  Team
                </li>
              </ul>
            </div>
            <div className="coming-soon">
              <ul>
                <li>DAO</li>
                <li>Governance</li>
                <li>Yield farming</li>
                <li>Docs</li>
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
            <img src={twitter} alt="twiter" />
            <img src={discord} alt="discord" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
