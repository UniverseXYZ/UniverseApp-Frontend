/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Social from './Social';
import './profileForm.scss';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import defaultImage from '../../assets/images/default-img.svg';
import infoIcon from '../../assets/images/icon.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import errorIcon from '../../assets/images/red-msg.svg';
import { MAX_FIELD_CHARS_LENGTH } from '../../containers/myAccount/useProfileForm';
import ErrorPopup from '../popups/ErrorPopup';

const ProfileForm = ({
  setShowCongrats,
  setShowLoading,
  setAccountImage,
  accountName,
  accountPage,
  about,
  twitterLink,
  instagramLink,
  handleChange,
  handleSubmit,
  errors,
  cancelChanges,
  loggedInArtist,
  showError,
  setShowError,
  setErrorTitle,
  setErrorBody,
  getProfileImage,
  setLoggedInArtist,
  buttonDisabled,
  genericErrorMessage,
  customizeAuction,
  invalidAccountImage,
}) => {
  const [hideIcon, setHideIcon] = useState(false);
  const accountInput = useRef(null);

  return (
    <div className="account-grid-container container">
      <div className="account-grid-name1">
        <div className="account-picture">
          <div className={`${errors?.avatar ? 'error-img' : ''} account-image`}>
            <img
              className={getProfileImage === defaultImage ? 'default-img' : 'account-img'}
              src={getProfileImage}
              alt="Avatar"
            />
          </div>
          <div className="account-picture-editing">
            <p>We recomend an image of at least 400x400.</p>
            {customizeAuction && invalidAccountImage && (
              <p className="error__text">File format must be PNG, WEBP, JPEG (Max Size: 30mb)</p>
            )}
            {errors?.avatar && <p className="error__text">{errors.avatar}</p>}
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
          {customizeAuction && !accountName && (
            <p className="error__text">Display name is not allowed to be empty</p>
          )}
          {errors?.accountName && <p className="error__text">{errors.accountName}</p>}
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
            {customizeAuction && !accountPage && (
              <p className="error__text">Universe page address is not allowed to be empty</p>
            )}
            {errors?.accountPage && <p className="error__text">{errors.accountPage}</p>}
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
            {customizeAuction && !about && (
              <p className="error__text">Your bio is not allowed to be empty</p>
            )}
            {errors?.about && <p className="error__text">{errors.about}</p>}
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
          {!customizeAuction && (
            <div className="account-display-buttons">
              <Button
                disabled={buttonDisabled}
                type="submit"
                className="light-button"
                onClick={() =>
                  handleSubmit(
                    setErrorTitle,
                    setErrorBody,
                    setShowError,
                    loggedInArtist,
                    setShowLoading,
                    setShowCongrats,
                    setLoggedInArtist
                  )
                }
              >
                Save changes
              </Button>
              <Button className="light-border-button" onClick={cancelChanges}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      {showError && <ErrorPopup />}
    </div>
  );
};

ProfileForm.propTypes = {
  accountName: PropTypes.string,
  accountPage: PropTypes.string,
  setAccountImage: PropTypes.func,
  about: PropTypes.string,
  cancelChanges: PropTypes.func,
};

ProfileForm.defaultProps = {
  accountName: '',
  accountPage: '',
  setAccountImage: () => {},
  about: '',
  cancelChanges: () => {},
};

export default ProfileForm;
