import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router-dom';
import ProfileForm from '../../components/myAccount/ProfileForm.jsx';
import './MyAccount.scss';
import Head from '../../components/myAccount/Head.jsx';
import CongratsProfilePopup from '../../components/popups/CongratsProfilePopup.jsx';
import LoadingPopup from '../../components/popups/LoadingPopup.jsx';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile.js';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const MyAccount = () => {
  const { isWalletConnected, loggedInArtist, setLoggedInArtist } = useAuthContext();
  const { editProfileButtonClick, setEditProfileButtonClick } = useAuctionContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const { setDarkMode } = useThemeContext();

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [about, setAbout] = useState(loggedInArtist.about);
  const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);

  const placeholderText = 'your-address';
  const [accountName, setAccountName] = useState(loggedInArtist.name);
  const [accountPage, setAccountPage] = useState(
    `universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`
  );
  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
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
        const saveImageRequest = await saveUserImage(accountImage);
        if (!saveImageRequest.ok) {
          setShowLoading(false);
          setShowError(true);
          return;
        }
        if (saveImageRequest.profileImageUrl) {
          artistData.avatar = saveImageRequest.profileImageUrl;
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
  console.log(accountPage);
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
      />
      <Popup closeOnDocumentClick={false} open={showCongrats}>
        <CongratsProfilePopup onClose={() => setShowCongrats(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup text="Saving your profile changes" onClose={() => setShowLoading(false)} />
      </Popup>
    </div>
  );
  // );
};

export default MyAccount;
