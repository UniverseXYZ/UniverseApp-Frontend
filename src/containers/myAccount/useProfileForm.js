import { useState } from 'react';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile.js';

export const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
  pageAddress: 50,
  bio: 400,
  instagram: 100,
  twitter: 100,
};

const useProfileForm = (validate) => {
  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    if (name === 'accountName') {
      if (value.length > MAX_FIELD_CHARS_LENGTH.name) return;
    }
    if (name === 'accountPage') {
      if (value.length > MAX_FIELD_CHARS_LENGTH.pageAddress) return;
    }
    if (name === 'about') {
      if (value.length > MAX_FIELD_CHARS_LENGTH.bio) return;
    }
    if (name === 'twitterLink') {
      if (value.length > MAX_FIELD_CHARS_LENGTH.twitter) return;
    }
    if (name === 'instagramLink') {
      if (value.length > MAX_FIELD_CHARS_LENGTH.instagram) return;
    }
    if (name === 'avatar') {
      const file = e.target.files[0];
      setValues({
        ...values,
        avatar: file,
      });
      setState(file);
    } else if (name === 'accountPage') {
      setValues({
        ...values,
        accountPage: value.replace(' ', '-'),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (
    e,
    setErrorTitle,
    setErrorBody,
    setShowError,
    loggedInArtist,
    setShowLoading,
    setShowCongrats,
    setLoggedInArtist
  ) => {
    e.preventDefault();
    setErrors(validate(values));
    setShowLoading(true);

    const { accountName, accountPage, about, instagramLink, twitterLink, avatar } = values;
    if (!accountName || !accountPage || !about || !avatar) {
      return;
    }

    const artistData = {
      name: accountName,
      universePageAddress: accountPage,
      about,
      instagramLink: instagramLink.replace('@', ''),
      twitterLink: twitterLink.replace('@', ''),
      avatar: loggedInArtist.avatar,
    };

    const canSetProfileInfo =
      loggedInArtist.name !== accountName ||
      loggedInArtist.universePageAddress !== accountPage ||
      loggedInArtist.about !== about ||
      loggedInArtist.twitterLink !== twitterLink ||
      loggedInArtist.instagramLink !== instagramLink;
    const canSetProfileImage = typeof avatar === 'object';

    if (canSetProfileInfo) {
      try {
        const response = await saveProfileInfo(artistData);
        if (response.error) {
          setErrorTitle('Unexpexted error');
          setErrorBody(response.message);
          setShowError(true);
          setShowLoading(false);
          return;
        }
        if (response.ok) {
          setShowLoading(false);
          setShowCongrats(true);
          setLoggedInArtist(artistData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (canSetProfileImage) {
      artistData.avatar = avatar;
      try {
        const response = await saveUserImage(avatar);
        if (response.error) {
          setErrorTitle('Unexpexted error');
          setErrorBody(response.message);
          setShowError(true);
          setShowLoading(false);
          return;
        }
        if (response.ok) {
          setShowLoading(false);
          setShowCongrats(true);
          setLoggedInArtist(artistData);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { values, handleChange, handleSubmit, errors, setValues };
};

export default useProfileForm;
