import React, { useEffect, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import { useHistory, useLocation } from 'react-router-dom';
import Main from '../../components/myAccount/Main.jsx';
import './MyAccount.scss';
import About from '../../components/myAccount/About.jsx';
import PersonalLogo from '../../components/myAccount/PersonalLogo.jsx';
import Social from '../../components/myAccount/Social.jsx';
import Head from '../../components/myAccount/Head.jsx';
import AppContext from '../../ContextAPI';
import CongratsProfilePopup from '../../components/popups/CongratsProfilePopup.jsx';
import ServerErrorPopup from '../../components/popups/ServerErrorPopup.jsx';

import { saveProfileInfo, saveUserImage, saveUserLogo } from '../../utils/api/profile.js';

const MyAccount = () => {
  const {
    isWalletConnected,
    setDarkMode,
    loggedInArtist,
    setLoggedInArtist,
    editProfileButtonClick,
    setEditProfileButtonClick,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const [about, setAbout] = useState(loggedInArtist.about);
  // const [logo, setLogo] = useState(loggedInArtist.personalLogo);
  const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);

  const placeholderText = 'your-address';
  const [accountName, setAccountName] = useState(loggedInArtist.name);
  const [accountPage, setAccountPage] = useState(
    `universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`
  );
  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  const [errorModal, showErrorModal] = useState(false);

  useEffect(() => {
    setDarkMode(false);
    document.title = 'Universe Minting - My Profile';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    if (!isWalletConnected) {
      history.push('/');
    }
  }, [isWalletConnected]);

  const saveChanges = async () => {
    setEditProfileButtonClick(true);
    let page = accountPage.substring(13);
    if (page === 'your-address') {
      page = '';
    }
    setAccountPage(page);
    const artistData = {
      ...loggedInArtist,
      name: accountName,
      universePageAddress: page,
      avatar: accountImage,
      about,
      instagramLink,
      twitterLink,
    };

    const result = await saveProfileInfo(artistData);
    if (typeof accountImage === 'object') {
      const saveImageRequest = await saveUserImage(accountImage);
      if (saveImageRequest.profileImageUrl) {
        artistData.avatar = saveImageRequest.profileImageUrl;
      }
    }

    if (!result.ok) {
      showErrorModal(true);
      return;
    }

    setLoggedInArtist({ ...artistData });

    setTimeout(() => {
      if (accountName && accountImage && accountPage !== 'universe.xyz/your-address') {
        document.getElementById('congrats-hidden-btn').click();
      }
    }, 2000);
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
    // setLogo(loggedInArtist.personalLogo);
    setTwitterLink(loggedInArtist.twitterLink);
    setInstagramLink(loggedInArtist.instagramLink);
  };

  return (
    // loggedInArtist.name &&
    //   loggedInArtist.universePageAddress &&
    //   loggedInArtist.avatar &&
    //   loggedInArtist.about &&
    //   editProfileButtonClick ? (
    //   // <Artist />
    //   <>{history.push(`/${loggedInArtist.universePageAddress}`, { id: loggedInArtist.id })}</>
    // ) : (
    <div className="my-account">
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
        about={about}
        setAbout={setAbout}
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        saveChanges={saveChanges}
        cancelChanges={cancelChanges}
        editProfileButtonClick={editProfileButtonClick}
      />
      {/* <About about={about} setAbout={setAbout} /> */}
      {/* <PersonalLogo logo={logo} setLogo={setLogo} /> */}
      {/* { <Social
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        showSocial={showSocial}
        setShowSocial={setShowSocial}
        saveChanges={saveChanges}
        cancelChanges={cancelChanges}
      /> */}
      {errorModal && <ServerErrorPopup close={() => showErrorModal(false)} />}
    </div>
  );
  // );
};

export default MyAccount;
