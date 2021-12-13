import React, { useEffect, useState } from 'react';
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
import useProfileForm from './useProfileForm';
import { validateData } from './validate';

const MyAccount = () => {
  const { isWalletConnected, loggedInArtist } = useAuthContext();
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

  const cancelChanges = () => history.goBack();

  return (
    <div className="my-account">
      <Head />
      <ProfileForm
        setShowCongrats={setShowCongrats}
        setShowLoading={setShowLoading}
        accountImage={accountImage}
        setAccountImage={setAccountImage}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        setValues={setValues}
        cancelChanges={cancelChanges}
        editProfileButtonClick={editProfileButtonClick}
        loggedInArtist={loggedInArtist}
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
