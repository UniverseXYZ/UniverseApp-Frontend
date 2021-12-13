import React, { useEffect, useState, useMemo } from 'react';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router-dom';
import ProfileForm from '../../components/myAccount/ProfileForm.jsx';
import './MyAccount.scss';
import Head from '../../components/myAccount/Head.jsx';
import CongratsProfilePopup from '../../components/popups/CongratsProfilePopup.jsx';
import LoadingPopup from '../../components/popups/LoadingPopup.jsx';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';
import { useErrorContext } from '../../contexts/ErrorContext';
import useProfileForm from './useProfileForm';
import defaultImage from '../../assets/images/default-img.svg';
import { validateData } from './validate';

const MyAccount = () => {
  const { isWalletConnected, loggedInArtist, setLoggedInArtist } = useAuthContext();
  const { editProfileButtonClick } = useAuctionContext();
  const { setDarkMode } = useThemeContext();

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  const [showCongrats, setShowCongrats] = useState(false);

  const { values, handleChange, handleSubmit, errors, setValues } = useProfileForm(validateData);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    if (!isWalletConnected) {
      history.push('/');
    }
  }, [isWalletConnected]);

  const { showError, setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const { accountName, accountPage, about, twitterLink, instagramLink } = values;
  console.log(values);

  useEffect(() => {
    setValues({
      avatar: loggedInArtist.avatar,
      accountName: loggedInArtist.name,
      accountPage: loggedInArtist.universePageAddress,
      about: loggedInArtist.about,
      instagramLink: loggedInArtist.instagramLink,
      twitterLink: loggedInArtist.twitterLink,
    });
  }, []);

  const getProfileImage = useMemo(() => {
    const userUploadImageURL =
      accountImage && typeof accountImage === 'object' && URL.createObjectURL(accountImage);
    const alreadyUploadedImageURL = loggedInArtist && loggedInArtist.avatar;

    let image;
    if (userUploadImageURL) {
      image = userUploadImageURL;
    } else if (alreadyUploadedImageURL) {
      image = alreadyUploadedImageURL;
    } else {
      image = defaultImage;
    }
    console.log(image);
    return image;
  }, [accountImage]);

  let genericErrorMessage = false;
  if (Object.keys(errors).length) {
    genericErrorMessage = true;
  }

  const buttonDisabled =
    loggedInArtist.name === accountName &&
    loggedInArtist.universePageAddress === accountPage &&
    loggedInArtist.about === about &&
    loggedInArtist.twitterLink === twitterLink &&
    loggedInArtist.instagramLink === instagramLink &&
    loggedInArtist.avatar === accountImage;

  const cancelChanges = () => history.goBack();

  return (
    <div className="my-account">
      <Head />
      <ProfileForm
        setShowCongrats={setShowCongrats}
        setShowLoading={setShowLoading}
        accountImage={accountImage}
        setAccountImage={setAccountImage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        cancelChanges={cancelChanges}
        editProfileButtonClick={editProfileButtonClick}
        loggedInArtist={loggedInArtist}
        showError={showError}
        setShowError={setShowError}
        setErrorTitle={setErrorTitle}
        setErrorBody={setErrorBody}
        getProfileImage={getProfileImage}
        setLoggedInArtist={setLoggedInArtist}
        buttonDisabled={buttonDisabled}
        accountName={accountName}
        accountPage={accountPage}
        about={about}
        twitterLink={twitterLink}
        instagramLink={instagramLink}
        myAccountPage
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
