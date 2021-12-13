import { useState } from 'react';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile.js';

export const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
  pageAddress: 50,
  bio: 400,
  instagram: 100,
  twitter: 100,
};

/**
 *
 * @param {*} validate
 * @returns
 */
const useProfileForm = (validate) => {
  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});

  /**
   *
   * @param {*} e
   * @param {*} setState
   * @returns
   */
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

  /**
   *
   * @param {*} setErrorTitle
   * @param {*} setErrorBody
   * @param {*} setShowError
   * @param {*} loggedInArtist
   * @param {*} setShowLoading
   * @param {*} setShowCongrats
   * @param {*} setLoggedInArtist
   * @returns
   */
  const handleSubmit = async (
    setErrorTitle,
    setErrorBody,
    setShowError,
    loggedInArtist,
    setShowLoading,
    setShowCongrats,
    setLoggedInArtist
  ) => {
    setErrors(validate(values));
    setShowLoading(true);

    //  TEST CASES:
    //  1. both image and data are changed and correct - send both requests
    //  2. only image is changed and it is correct but the data is not not changed - send only image request
    //  3. only data is changed and it is correct but the image is not changed - send only data request
    //  4. both image and data are changed and incorrect - stop execution, show error messages
    //  5. only image is changed and it is incorrect but the data is not not changed - stop execution, show error messages
    //  6. only data is changed and it is incorrect but the image is not changed - stop execution, show error messages
    //  7. both image and data are changed, the image is incorrect and the data is correct - stop execution, show error messages
    //  8. both image and data are changed, the image is correct but the data is incorrect - stop execution, show error messages

    const { accountName, accountPage, about, instagramLink, twitterLink, avatar } = values;

    // construct artist object that is going to be send to the API
    const artistData = {
      name: accountName,
      universePageAddress: accountPage,
      about,
      instagramLink: instagramLink.replace('@', ''),
      twitterLink: twitterLink.replace('@', ''),
      avatar: loggedInArtist.avatar,
    };

    // send request to /save-profile-info only if the values differ from the client side values
    const canSetProfileInfo =
      loggedInArtist.name !== accountName ||
      loggedInArtist.universePageAddress !== accountPage ||
      loggedInArtist.about !== about ||
      loggedInArtist.twitterLink !== twitterLink ||
      loggedInArtist.instagramLink !== instagramLink;

    // send request to  /upload-profile-image only if image is in the correct format and size
    const canSetProfileImage =
      (avatar?.type === 'image/webp' ||
        avatar?.type === 'image/jpeg' ||
        avatar?.type === 'image/png') &&
      avatar?.size / 1048576 < 30;

    // set loading to false and stop further execution if any of the required values are not set
    if (!accountName || !accountPage || !about || !avatar) {
      setShowLoading(false);
      return;
    }

    // set loading to false and stop further execution if image is changed but it is incorrect
    if (typeof avatar === 'object' && !canSetProfileImage) {
      setShowLoading(false);
      return;
    }
    if (canSetProfileInfo) {
      try {
        const response = await saveProfileInfo(artistData);
        if (response.error) {
          setErrorTitle('Unexpexted error');
          setErrorBody(response.message);
          setShowError(true);
          setShowLoading(false);
          // eslint-disable-next-line consistent-return
          return response;
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
      try {
        const response = await saveUserImage(avatar);
        if (response.error) {
          setErrorTitle('Unexpexted error');
          setErrorBody(response.message);
          setShowError(true);
          setShowLoading(false);
          // eslint-disable-next-line consistent-return
          return response;
        }
        if (response.profileImageUrl) {
          artistData.avatar = response.profileImageUrl;
          setShowLoading(false);
          setShowCongrats(true);
          setLoggedInArtist(artistData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setShowLoading(false);
  };

  return { values, handleChange, handleSubmit, errors, setValues };
};

export default useProfileForm;
