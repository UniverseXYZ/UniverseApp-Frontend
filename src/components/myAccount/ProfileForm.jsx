import React, { useRef, useState, useEffect, useMemo } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import Social from './Social';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import defaultImage from '../../assets/images/default-img.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/info-icon.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import errorIcon from '../../assets/images/red-msg.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import { sanitizeUrlString } from '../../utils/helpers';

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
  pageAddress: 50,
  bio: 400,
  instagram: 100,
  twitter: 100,
};

const ProfileForm = ({
  accountName,
  setAccountName,
  accountPage,
  setAccountPage,
  accountImage,
  setAccountImage,
  editProfileButtonClick,
  about,
  setAbout,
  twitterLink,
  setTwitterLink,
  instagramLink,
  setInstagramLink,
  saveChanges,
  cancelChanges,
  fetchedUserData,
  accountNameExists,
  accountPageExists,
}) => {
  const disabled =
    (fetchedUserData.accountName === accountName &&
      fetchedUserData.accountPage === accountPage &&
      fetchedUserData.about === about &&
      fetchedUserData.twitterLink === twitterLink &&
      fetchedUserData.instagramLink === instagramLink &&
      fetchedUserData.accountImage === accountImage) ||
    accountPage === 'universe.xyz/' ||
    accountPage === 'universe.xyz/your-address';

  const hasError = [accountName, accountPage, about].some((e) => !e);

  const { loggedInArtist } = useAuthContext();
  const [hideIcon, setHideIcon] = useState(false);
  const [inputName, setInputName] = useState('inp empty');
  const accountInput = useRef(null);
  const [errors, setErrors] = useState({
    previewImage: '',
  });

  const [touchedDisplayNameInput, setTouchedDisplayNameInput] = useState(false);
  const [touchedLinkInput, setTouchedLinkInput] = useState(false);

  const validateFile = (file) => {
    if (!file) {
      setErrors({
        previewImage: 'File format must be PNG, WEBP, JPEG (Max Size: 30mb)',
      });
    } else if (
      (file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/png') &&
      file.size / 1048576 < 30
    ) {
      setAccountImage(file);
      setErrors({ ...errors, previewImage: '' });
    } else {
      setErrors({
        previewImage: 'File format must be PNG, WEBP, JPEG (Max Size: 30mb)',
      });
    }
  };

  const handleOnFocus = () => {
    if (!loggedInArtist.universePageAddress && accountPage === 'universe.xyz/your-address') {
      setAccountPage('universe.xyz/');
      setInputName('inp');
    }
  };

  const handleOnBlur = () => {
    if (!loggedInArtist.universePageAddress && accountPage === 'universe.xyz/') {
      setAccountPage('universe.xyz/your-address');
      setInputName('inp empty');
    }
  };

  useEffect(() => {
    if (loggedInArtist.universePageAddress) {
      setInputName('inp');
    } else {
      setInputName('inp empty');
    }
  }, [loggedInArtist]);

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

  return (
    <div className="account-grid-container">
      <div className="account-grid-name1">
        <div className="account-picture">
          <div
            className={
              !accountImage && editProfileButtonClick ? 'account-image error-img' : 'account-image'
            }
          >
            <img
              className={getProfileImage === defaultImage ? 'default-img' : 'account-img'}
              src={getProfileImage}
              alt="Avatar"
            />
          </div>
          <div className="account-picture-editing">
            <p>We recommend an image of at least 400x400.</p>
            {errors.previewImage && <p style={{ color: '#ff4949' }}>{errors.previewImage}</p>}
            <Button className="light-border-button" onClick={() => accountInput.current.click()}>
              Choose file
            </Button>
            <input
              type="file"
              className="inp-disable"
              ref={accountInput}
              onChange={(e) => validateFile(e.target.files[0])}
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
              {accountName.length}/{MAX_FIELD_CHARS_LENGTH.name}
            </p>
          </h5>
          <DebounceInput
            debounceTimeout={1000}
            placeholder="Enter your display name"
            className={
              (!accountName || accountNameExists) && touchedDisplayNameInput ? 'error-inp' : 'inp'
            }
            value={accountName}
            hoverBoxShadowGradient={
              !(!accountName && touchedDisplayNameInput) ||
              !(accountNameExists && touchedDisplayNameInput)
            }
            onChange={(e) => {
              if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.name) return;
              setAccountName(e.target.value);
              setTouchedDisplayNameInput(true);
            }}
          />

          {!accountName && touchedDisplayNameInput && (
            <p className="error__text">&quot;Display name&quot; is not allowed to be empty</p>
          )}
          {accountNameExists && touchedDisplayNameInput && (
            <p className="error__text">This display name is already taken</p>
          )}
          <h5 onMouseEnter={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)}>
            <span>
              Universe page address
              <div className="universe__page__address">
                <InfoIcon
                  onMouseEnter={() => setHideIcon(true)}
                  onMouseLeave={() => setHideIcon(false)}
                />
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
              {accountPage.length}/{MAX_FIELD_CHARS_LENGTH.pageAddress}
            </p>
          </h5>
          <div className="account-grid-address">
            <Input
              placeholder="Enter your universe page address"
              className={
                (accountPage === 'universe.xyz/' ||
                  accountPage === 'universe.xyz/your-address' ||
                  accountPageExists) &&
                touchedLinkInput
                  ? `${inputName} error-inp`
                  : inputName
              }
              value={accountPage}
              onChange={(e) => {
                if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.pageAddress) return;
                if (e.target.value.startsWith('universe.xyz/')) {
                  const splitUrl = e.target.value.split('universe.xyz/');
                  if (splitUrl.length === 2) {
                    const sanitizedUrl = sanitizeUrlString(splitUrl[1]);
                    splitUrl[0] = 'universe.xyz/';
                    splitUrl[1] = sanitizedUrl;
                    setAccountPage(splitUrl.join(''));
                  } else {
                    setAccountPage(e.target.value);
                  }
                }
              }}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              hoverBoxShadowGradient={!(!accountName && touchedLinkInput)}
            />
            {(accountPage === 'universe.xyz/' ||
              accountPage === 'universe.xyz/your-address' ||
              accountPageExists) &&
              touchedLinkInput && (
                <p className="error__text">
                  &quot;Universe page address&quot; is not allowed to be empty
                </p>
              )}

            {accountPageExists && (
              <p className="error__text">Sorry, this page address is already taken</p>
            )}

            {(accountPage === 'universe.xyz/' || accountPage === 'universe.xyz/your-address') &&
            touchedLinkInput ? null : (
              <div className="box--shadow--effect--block" />
            )}
          </div>

          <div className="account-grid-about-editing">
            <h5>
              <span>Your bio</span>
              <p className="input-max-chars">
                {about.length}/{MAX_FIELD_CHARS_LENGTH.bio}
              </p>
            </h5>
            <textarea
              placeholder="Please write a few lines about yourself"
              className={!about && editProfileButtonClick ? 'error-inp' : 'inp'}
              value={about}
              onChange={(e) => {
                if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.bio) return;
                setAbout(e.target.value);
              }}
            />
            {!about && editProfileButtonClick ? null : (
              <div className="box--shadow--effect--block" />
            )}
            {!about && editProfileButtonClick && (
              <p className="error__text">&quot;Your bio&quot; is not allowed to be empty</p>
            )}
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
            setTwitterLink={setTwitterLink}
            instagramLink={instagramLink}
            setInstagramLink={setInstagramLink}
            saveChanges={saveChanges}
            cancelChanges={cancelChanges}
          />
          {editProfileButtonClick &&
            (!accountImage ||
              !accountName ||
              accountPage === 'universe.xyz/' ||
              accountPage === 'universe.xyz/your-address' ||
              !about) && (
              <div className="display__error">
                <img alt="Error" src={errorIcon} />
                <p>
                  Something went wrong. Please fix the errors in the field above and try again. The
                  buttons will be enabled after information has been entered into the fields.
                </p>
              </div>
            )}
          <div className="account-display-buttons">
            <Button
              className="light-button"
              disabled={
                disabled ||
                hasError ||
                accountNameExists ||
                accountPageExists ||
                accountPage === 'universe.xyz/' ||
                !accountName
              }
              onClick={saveChanges}
            >
              Save changes
            </Button>
            <Button className="light-border-button" onClick={cancelChanges}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  accountName: PropTypes.string,
  setAccountName: PropTypes.func,
  accountPage: PropTypes.string,
  setAccountPage: PropTypes.func,
  accountImage: PropTypes.oneOfType([PropTypes.any]),
  setAccountImage: PropTypes.func,
  editProfileButtonClick: PropTypes.bool,
  about: PropTypes.string,
  setAbout: PropTypes.func,
  twitterLink: PropTypes.string,
  setTwitterLink: PropTypes.func,
  instagramLink: PropTypes.string,
  setInstagramLink: PropTypes.func,
  saveChanges: PropTypes.func,
  cancelChanges: PropTypes.func,
  fetchedUserData: PropTypes.oneOfType([PropTypes.object]),
  accountNameExists: PropTypes.oneOfType([PropTypes.bool]),
  accountPageExists: PropTypes.oneOfType([PropTypes.bool]),
};

ProfileForm.defaultProps = {
  accountName: '',
  setAccountName: () => {},
  accountPage: '',
  setAccountPage: () => {},
  accountImage: null,
  setAccountImage: () => {},
  about: '',
  setAbout: () => {},
  editProfileButtonClick: false,
  twitterLink: '',
  setTwitterLink: () => {},
  instagramLink: '',
  setInstagramLink: () => {},
  saveChanges: () => {},
  cancelChanges: () => {},
  fetchedUserData: {},
  accountNameExists: false,
  accountPageExists: false,
};

export default ProfileForm;
