import React, { useEffect, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import Main from '../../components/myAccount/Main.jsx';
import './MyAccount.scss';
import About from '../../components/myAccount/About.jsx';
import PersonalLogo from '../../components/myAccount/PersonalLogo.jsx';
import Social from '../../components/myAccount/Social.jsx';
import Head from '../../components/myAccount/Head.jsx';
import AppContext from '../../ContextAPI';
import Button from '../../components/button/Button.jsx';
import CongratsProfilePopup from '../../components/popups/CongratsProfilePopup.jsx';

const MyAccount = () => {
  const { setWebsite, loggedInArtist, setLoggedInArtist } = useContext(AppContext);
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

  useEffect(() => {
    setWebsite(false);
    document.title = 'Universe Minting - My Profile';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

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
    });
    setTimeout(() => {
      if (accountName && accountImage && accountPage !== 'universe.xyz/your-address') {
        document.getElementById('congrats-hidden-btn').click();
      }
    }, 500);
  };

  const cancelChanges = () => {
    setAccountName(loggedInArtist.name);
    if (loggedInArtist.universePageAddress) {
      setAccountPage(`universe.xyz/${loggedInArtist.universePageAddress}`);
    } else {
      setAccountPage('universe.xyz/your-address');
    }
    setAccountImage(loggedInArtist.avatar);
    setAbout(loggedInArtist.about);
    setLogo(loggedInArtist.personalLogo);
    setTwitterLink(loggedInArtist.twitterLink);
    setInstagramLink(loggedInArtist.instagramLink);
  };

  return (
    <div>
      <Popup
        trigger={
          <button
            type="button"
            id="congrats-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <CongratsProfilePopup onClose={close} />}
      </Popup>
      <Head />
      <Main
        accountName={accountName}
        setAccountName={setAccountName}
        accountPage={accountPage}
        setAccountPage={setAccountPage}
        accountImage={accountImage}
        setAccountImage={setAccountImage}
      />
      <About about={about} setAbout={setAbout} />
      <PersonalLogo logo={logo} setLogo={setLogo} />
      <Social
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        saveChanges={saveChanges}
        cancelChanges={cancelChanges}
      />
      {/* <div className="my-account container">
        <div className="account-grid-container">
          <div className="account-display-buttons">
            <Button className="light-button" onClick={() => saveChanges()}>
              Save changes
            </Button>
            <Button className="light-border-button" onClick={() => cancelChanges()}>
              Cancel
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyAccount;
