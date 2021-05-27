import React from 'react';
import Button from '../button/Button.jsx';
import About from '../myAccount/About.jsx';
import Main from '../myAccount/Main.jsx';
import PersonalLogo from '../myAccount/PersonalLogo.jsx';
import Social from '../myAccount/Social.jsx';
import warningIcon from '../../assets/images/Exclamation.svg';

const AboutArtistAuction = () => (
  <div className="about__artist">
    <div className="about__artist__header">
      <h3>About Artist</h3>
      <div className="about__artist__warning">
        <img src={warningIcon} alt="Warning" />
        <p>
          This information is unified across all Universe.xyz. Any edits made below will be visible
          in other Universe products and sections, e.g. My Account
        </p>
      </div>
    </div>
    <Main />
    <About />
    <PersonalLogo />
    <Social />
  </div>
);
export default AboutArtistAuction;
