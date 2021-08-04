import React, { useState, useContext } from 'react';
import Button from '../button/Button.jsx';
import About from '../myAccount/About.jsx';
import Main from '../myAccount/Main.jsx';
import PersonalLogo from '../myAccount/PersonalLogo.jsx';
import Social from '../myAccount/Social.jsx';
import AppContext from '../../ContextAPI.js';

const AboutArtistAuction = () => {
  const { loggedInArtist, setLoggedInArtist } = useContext(AppContext);
  const [about, setAbout] = useState(loggedInArtist.about);
  const [logo, setLogo] = useState(loggedInArtist.personalLogo);
  const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);

  const placeholderText = 'your-address';
  const [accountName, setAccountName] = useState(loggedInArtist.name);
  const [accountPage, setAccountPage] = useState(
    `universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`
  );
  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  const [showSocial, setShowSocial] = useState(loggedInArtist.social);

  const saveChanges = () => {
    let page = accountPage.substring(13);
    if (page === 'your-address') {
      page = '';
    }
    setAccountPage(page);
    setLoggedInArtist({
      ...loggedInArtist,
      name: accountName,
      universePageAddress: page,
      avatar: accountImage,
      about,
      personalLogo: logo,
      instagramLink,
      twitterLink,
      social: showSocial,
    });
  };

  const cancelChanges = () => {
    setAccountName(loggedInArtist.name);
    if (loggedInArtist.universePageAddress) {
      setAccountPage(`universe.xyz/${loggedInArtist.universePageAddress}`);
    } else {
      setAccountPage(`universe.xyz/your-address`);
    }
    setAccountImage(loggedInArtist.avatar);
    setAbout(loggedInArtist.about);
    setLogo(loggedInArtist.personalLogo);
    setTwitterLink(loggedInArtist.twitterLink);
    setInstagramLink(loggedInArtist.instagramLink);
  };

  return (
    <div className="about__artist">
      <div className="about__artist__header">
        <h3>About Artist</h3>
        {/* <div className="about__artist__warning">
          <img src={warningIcon} alt="Warning" />
          <p>
            This information is unified across all Universe.xyz. Any edits made below will be
            visible in other Universe products and sections, e.g. My Account
          </p>
        </div> */}
      </div>
      <div className="my-account">
        <Main
          accountName={accountName}
          setAccountName={setAccountName}
          accountPage={accountPage}
          setAccountPage={setAccountPage}
          accountImage={accountImage}
          setAccountImage={setAccountImage}
          about={about}
          setAbout={setAbout}
          twitterLink={twitterLink}
          setTwitterLink={setTwitterLink}
          instagramLink={instagramLink}
          setInstagramLink={setInstagramLink}
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
          // editProfileButtonClick={editProfileButtonClick}
        />
      </div>
      {/* <About about={about} setAbout={setAbout} /> */}
      {/* <PersonalLogo logo={logo} setLogo={setLogo} /> */}
      {/* <Social
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        showSocial={showSocial}
        setShowSocial={setShowSocial}
        saveChanges={saveChanges}
        cancelChanges={cancelChanges}
      /> */}
      {/* <div className="landing__page__warning">
        <img src={warningIcon} alt="Warning" />
        <p>
          Your landing page will be automatically published after you successfully complete all
          transactions on the Finalize Auction step.
        </p>
      </div> */}
    </div>
  );
};
export default AboutArtistAuction;
