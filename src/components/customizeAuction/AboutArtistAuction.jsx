import Button from '../button/Button';
import About from '../myAccount/About';
import Main from '../myAccount/Main';
import PersonalLogo from '../myAccount/PersonalLogo';
import Social from '../myAccount/Social';
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
    <div className="customize-buttons">
      <Button className="light-button">Save and close</Button>
      <Button className="light-border-button">Save and preview</Button>
    </div>
  </div>
);
export default AboutArtistAuction;
