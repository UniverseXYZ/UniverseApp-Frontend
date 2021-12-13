/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Social from './Social';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import defaultImage from '../../assets/images/default-img.svg';
import infoIcon from '../../assets/images/icon.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import errorIcon from '../../assets/images/red-msg.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import { MAX_FIELD_CHARS_LENGTH } from '../../containers/myAccount/useProfileForm';
import { useErrorContext } from '../../contexts/ErrorContext';
import ErrorPopup from '../popups/ErrorPopup';

const ProfileForm = ({
  accountImage,
  setAccountImage,
  editProfileButtonClick,
  saveChanges,
  cancelChanges,
  values,
  handleChange,
  handleSubmit,
  errors,
  setValues,
  setShowCongrats,
  setShowLoading,
}) => {
  const { loggedInArtist, setLoggedInArtist } = useAuthContext();
  const [hideIcon, setHideIcon] = useState(false);
  const accountInput = useRef(null);
  // const [accountNameExists, setAccountNameExist] = useState(false);
  // const [accountPageExists, setAccountPageExist] = useState(false);
  const { showError, setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const { accountName, accountPage, about, twitterLink, instagramLink } = values;

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

  return (
    <form
      onSubmit={(event) =>
        handleSubmit(
          event,
          setErrorTitle,
          setErrorBody,
          setShowError,
          loggedInArtist,
          setShowLoading,
          setShowCongrats,
          setLoggedInArtist
        )
      }
      className="account-grid-container container"
    >
      <div className="account-grid-name1">
        <div className="account-picture">
          <div
            className={`${
              !accountImage && editProfileButtonClick ? 'error-img' : ''
            } account-image`}
          >
            <img
              className={getProfileImage === defaultImage ? 'default-img' : 'account-img'}
              src={getProfileImage}
              alt="Avatar"
            />
          </div>
          <div className="account-picture-editing">
            <p>We recomend an image of at least 400x400.</p>
            {errors.avatar && <p className="error__text">{errors.avatar}</p>}
            <Button className="light-border-button" onClick={() => accountInput.current.click()}>
              Choose file
            </Button>
            <input
              type="file"
              className="inp-disable"
              ref={accountInput}
              name="avatar"
              onChange={(e) => handleChange(e, setAccountImage)}
            />
          </div>
        </div>
        <div className="account-grid-name-editing">
          <div className="about__artist__warning">
            <img src={warningIcon} alt="Warning" />
            <p>
              This information is unified across all Universe.xyz. Any edits made below will be
              visible in other Universe products and sections, e.g. My Account
            </p>
          </div>
          <h3 className="account-info">Account info</h3>
          <h5>
            <span>Display name</span>
            <p className="input-max-chars">
              {accountName?.length}/{MAX_FIELD_CHARS_LENGTH.name}
            </p>
          </h5>
          <Input
            placeholder="Enter your display name"
            className="inp"
            name="accountName"
            value={accountName}
            onChange={handleChange}
          />

          {errors.accountName && <p className="error__text">{errors.accountName}</p>}
          {/* {accountNameExists && <p className="error__text">Sorry this user name is taken</p>} */}
          <h5 onMouseEnter={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)}>
            <span>
              Universe page address
              <div className="universe__page__address">
                <img src={infoIcon} alt="Info Icon" />
                {hideIcon && (
                  <div className="info-text1">
                    <p>
                      Universe page is your own brand landing page within the Universe ecosystem. It
                      can contain your logo, description, and social links.
                    </p>
                  </div>
                )}
              </div>
            </span>
            <p className="input-max-chars">
              {accountPage?.length}/{MAX_FIELD_CHARS_LENGTH.pageAddress}
            </p>
          </h5>
          <div className="account-grid-address">
            <Input
              placeholder="your-address"
              className="inp"
              pageLink
              name="accountPage"
              value={`${accountPage}`}
              onChange={handleChange}
            />
            <span className="page-address-placeholder">universe.xyz/</span>
            {errors.accountPage && <p className="error__text">{errors.accountPage}</p>}
            {/* {accountPageExists && <p className="error__text">Sorry, this page address is taken</p>} */}
          </div>

          <div className="account-grid-about-editing">
            <h5>
              <span>Your bio</span>
              <p className="input-max-chars">
                {about?.length}/{MAX_FIELD_CHARS_LENGTH.bio}
              </p>
            </h5>
            <textarea
              placeholder="Please write a few lines about yourself"
              className="inp"
              name="about"
              value={about}
              onChange={handleChange}
            />
            {!about && editProfileButtonClick ? null : (
              <div className="box--shadow--effect--block" />
            )}
            {errors.about && <p className="error__text">{errors.about}</p>}
          </div>

          <div className="display-warning">
            <img alt="" src={warningIcon} />
            <p>
              Your edits will be visible on the My Universe landing page but will not be displayed
              on the current running auctions landing pages.
            </p>
          </div>
          <Social
            twitterLink={twitterLink}
            instagramLink={instagramLink}
            handleChange={handleChange}
            saveChanges={saveChanges}
            cancelChanges={cancelChanges}
          />
          {genericErrorMessage && (
            <div className="display__error">
              <img alt="Error" src={errorIcon} />
              <p>
                Something went wrong. Please fix the errors in the field above and try again. The
                buttons will be enabled after information has been entered into the fields.
              </p>
            </div>
          )}
          <div className="account-display-buttons">
            <Button disabled={buttonDisabled} type="submit" className="light-button">
              Save changes
            </Button>
            <Button className="light-border-button" onClick={cancelChanges}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {showError && <ErrorPopup />}
    </form>
  );
};

ProfileForm.propTypes = {
  accountName: PropTypes.string,
  accountPage: PropTypes.string,
  accountImage: PropTypes.oneOfType([PropTypes.any]),
  setAccountImage: PropTypes.func,
  editProfileButtonClick: PropTypes.bool,
  about: PropTypes.string,
  twitterLink: PropTypes.string,
  instagramLink: PropTypes.string,
  saveChanges: PropTypes.func,
  cancelChanges: PropTypes.func,
};

ProfileForm.defaultProps = {
  accountName: '',
  accountPage: '',
  accountImage: null,
  setAccountImage: () => {},
  about: '',
  editProfileButtonClick: false,
  twitterLink: '',
  instagramLink: '',
  saveChanges: () => {},
  cancelChanges: () => {},
};

export default ProfileForm;
