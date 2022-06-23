import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import ProfileForm from '../../components/myAccount/ProfileForm.jsx';
// import './MyAccount.scss';
import Head from '../../components/myAccount/Head.jsx';
import CongratsProfilePopup from '../../components/popups/CongratsProfilePopup.jsx';
import LoadingPopup from '../../components/popups/LoadingPopup.jsx';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile.js';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../stores/authStore';
import { useErrorStore } from '../../stores/errorStore';
import { useThemeStore } from 'src/stores/themeStore';

const MyAccount = () => {
  const {
    isWalletConnected,
    loggedInArtist,
    previewUserData,
    setLoggedInArtist,
  } = useAuthStore(s => ({
    isWalletConnected: s.isWalletConnected,
    loggedInArtist: s.loggedInArtist,
    previewUserData: s.previewUserData,
    setLoggedInArtist: s.setLoggedInArtist,
  }));

  const { setShowError, setErrorTitle, setErrorBody } = useErrorStore(s => ({
    setShowError: s.setShowError,
    setErrorTitle: s.setErrorTitle,
    setErrorBody: s.setErrorBody
  }))

  const { editProfileButtonClick, setEditProfileButtonClick } = useAuctionContext();
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const history = useRouter();
  const { query: { exitedPreviewMode } } = history;
  const isFromPreviewMode = exitedPreviewMode === 'true';

  const [showLoading, setShowLoading] = useState(false);
  const [about, setAbout] = useState(isFromPreviewMode ? previewUserData.about : loggedInArtist.about);
  const [twitterLink, setTwitterLink] = useState(isFromPreviewMode ? previewUserData.twitterLink : loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(isFromPreviewMode ? previewUserData.instagramLink : loggedInArtist.instagramLink);

  const placeholderText = 'your-address';
  const [accountName, setAccountName] = useState(isFromPreviewMode ? previewUserData.name : loggedInArtist.name);
  const [accountPage, setAccountPage] = useState(
    isFromPreviewMode ? previewUserData.universePageAddress : `universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`
  );
  const [accountImage, setAccountImage] = useState(isFromPreviewMode ? previewUserData.avatar : loggedInArtist.avatar);
  const [showCongrats, setShowCongrats] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState({
    accountName,
    accountPage,
    accountImage,
    about,
    instagramLink,
    twitterLink,
  });

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
    try {
      setShowLoading(true);
      setEditProfileButtonClick(true);
      if (
        // !accountImage ||
        !accountName ||
        accountPage === 'universe.xyz/' ||
        accountPage === 'universe.xyz/your-address' ||
        !about
      ) {
        return;
      }
      let page = accountPage.substring(13);
      if (page === 'your-address') {
        page = '';
      }
      const artistData = {
        ...loggedInArtist,
        name: accountName,
        universePageAddress: page,
        avatar: accountImage,
        about,
        instagramLink: instagramLink.replace('@', ''),
        twitterLink: twitterLink.replace('@', ''),
      };

      const result = await saveProfileInfo(artistData);
      if (typeof accountImage === 'object') {
        const { profileImageUrl } = await saveUserImage(accountImage);
        if (!profileImageUrl) {
          setShowLoading(false);
          setShowError(true);
          return;
        }
        if (profileImageUrl) {
          artistData.avatar = profileImageUrl;
        }
      }

      if (!result.ok) {
        setShowLoading(false);
        if (result.status === 409) {
          setErrorTitle('Universe address already taken');
          setErrorBody('Please choose another one.');
        }
        setShowError(true);
        return;
      }
      setAccountPage(`universe.xyz/${page}`);
      setLoggedInArtist({ ...artistData });
      setFetchedUserData({
        accountPage: `universe.xyz/${page}`,
        accountName,
        accountImage,
        about,
        instagramLink: instagramLink.replace('@', ''),
        twitterLink: twitterLink.replace('@', ''),
      });

      // Clear url params
      if (isFromPreviewMode) history.replace('/my-account');

      setTimeout(() => {
        if (accountName && accountImage && accountPage !== 'universe.xyz/your-address') {
          setShowLoading(false);
          setShowCongrats(true);
        }
      }, 2000);
    } catch (err) {
      setShowLoading(false);
      setShowError(true);
    }
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
    <div className="my-account">
      <Head />
      <ProfileForm
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
        fetchedUserData={fetchedUserData}
        isFromPreviewMode={isFromPreviewMode}
      />
      <Popup closeOnDocumentClick={false} open={showCongrats}>
        <CongratsProfilePopup loggedInArtist={loggedInArtist} onClose={() => setShowCongrats(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup text="Saving your profile changes" onClose={() => setShowLoading(false)} />
      </Popup>
    </div>
  );
  // );
};

export default MyAccount;
