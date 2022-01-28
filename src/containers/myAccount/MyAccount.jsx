import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useHistory, useLocation } from 'react-router-dom';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import ProfileForm from '../../components/myAccount/ProfileForm.jsx';
import './MyAccount.scss';
import Head from '../../components/myAccount/Head.jsx';
import CongratsProfilePopup from '../../components/popups/CongratsProfilePopup.jsx';
import LoadingPopup from '../../components/popups/LoadingPopup.jsx';
import {
  saveProfileInfo,
  saveUserImage,
  validateAccountName,
  validateAccountLink,
} from '../../utils/api/profile.js';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const MyAccount = () => {
  const { isWalletConnected, loggedInArtist, setLoggedInArtist } = useAuthContext();
  const { editProfileButtonClick, setEditProfileButtonClick } = useAuctionContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const { setDarkMode } = useThemeContext();
  const location = useLocation();

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [accountNameExists, setAccountNameExists] = useState(false);
  const [accountPageExists, setAccountPageExists] = useState(false);
  const [about, setAbout] = useState(loggedInArtist.about);
  const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);
  const debouncedValidateAccountLink = useConstant(() =>
    AwesomeDebouncePromise(validateAccountLink, 1000)
  );
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

  const handleAccountName = async (username) => {
    setAccountName(username);
    const isUsernameAvailable = await validateAccountName(username);

    if (isUsernameAvailable) {
      setAccountNameExists(false);
      return;
    }

    setShowLoading(false);
    setAccountNameExists(true);
  };

  const handleAccountLink = async (link) => {
    setAccountPage(link);

    const isLinkAvailable = await debouncedValidateAccountLink(link.substring(13));

    if (isLinkAvailable) {
      setAccountPageExists(false);
      return;
    }

    setShowLoading(false);
    setAccountPageExists(true);
  };

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
        setShowLoading(false);
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
          if (result.status === 409) {
            setErrorTitle('Universe address already taken');
            setErrorBody('Please choose another one.');
          } else {
            setErrorBody(result.message);
          }

          setShowError(true);
          return;
        }
        if (profileImageUrl) {
          artistData.avatar = profileImageUrl;
        }
      }
      try {
        if (typeof accountImage === 'object') {
          const saveImageRequest = await saveUserImage(accountImage);
          if (saveImageRequest.error) {
            setShowLoading(false);
            setErrorBody(saveImageRequest.message);
            setShowError(true);
            return;
          }
          if (saveImageRequest.profileImageUrl) {
            artistData.avatar = saveImageRequest.profileImageUrl;
          }
        }
      } catch (error) {
        console.info(error);
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
        setAccountName={handleAccountName}
        accountPage={accountPage}
        setAccountPage={handleAccountLink}
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
        accountNameExists={accountNameExists}
        accountPageExists={accountPageExists}
      />
      <Popup closeOnDocumentClick={false} open={showCongrats}>
        <CongratsProfilePopup
          onClose={() => setShowCongrats(false)}
          redirect={location.state?.redirect}
        />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup text="Saving your profile changes" onClose={() => setShowLoading(false)} />
      </Popup>
    </div>
  );
  // );
};

export default MyAccount;
