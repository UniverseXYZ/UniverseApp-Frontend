import React, { useRef, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import pencilIcon from '../../assets/images/edit.svg';
import defaultImage from '../../assets/images/default-img.svg';
import infoIcon from '../../assets/images/icon.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import AppContext from '../../ContextAPI';

const Main = ({
  accountName,
  setAccountName,
  accountPage,
  setAccountPage,
  accountImage,
  setAccountImage,
  editProfileButtonClick,
}) => {
  const { loggedInArtist } = useContext(AppContext);
  const [hideIcon, setHideIcon] = useState(false);
  const [inputName, setInputName] = useState('inp empty');
  const accountInput = useRef(null);
  const [errors, setErrors] = useState({
    previewImage: '',
  });

  const validateFile = (file) => {
    if (!file) {
      setAccountImage(null);
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
      setAccountImage(null);
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

  return (
    <div className="my-account container">
      <div className="account-grid-container">
        {/* {nameEditing ? (
          <div className="account-grid-name">
            <div className="account-picture">
              <div className="account-image">
                {accountImage && (
                  <img
                    className="account-img"
                    src={
                      typeof accountImage === 'object'
                        ? URL.createObjectURL(accountImage)
                        : accountImage
                    }
                    alt="Avatar"
                  />
                )}
                {!accountImage && loggedInArtist.avatar && (
                  <img
                    className="account-img"
                    src={
                      typeof loggedInArtist.avatar === 'object'
                        ? URL.createObjectURL(loggedInArtist.avatar)
                        : loggedInArtist.avatar
                    }
                    alt="Avatar"
                  />
                )}
                {!accountImage && !loggedInArtist.avatar && (
                  <img className="default-img" src={defaultImage} alt="Avatar" />
                )}
              </div>
            </div>
            <div className="account-grid-name-edit">
              <div className="account-name">
                {loggedInArtist.name ? <h2>{loggedInArtist.name}</h2> : <h2>Your Name</h2>}
                {loggedInArtist.universePageAddress ? (
                  <div className="account-link">
                    <p className="link">universe.xyz/</p>
                    <p className="link">{loggedInArtist.universePageAddress}</p>
                  </div>
                ) : (
                  <div className="account-link">
                    <p className="link">universe.xyz/</p>
                    <p className="default-address">youraddress</p>
                  </div>
                )}
              </div>
              <Button className="light-border-button" onClick={() => setNameEditing(false)}>
                <span>Edit</span>
                <img src={pencilIcon} alt="Edit Icon" />
              </Button>
            </div>
          </div>
        ) : ( */}
        {/* <Animated animationIn="zoomIn"> */}
        <div className="account-grid-name1">
          <div className="account-picture">
            <div className="account-image">
              {accountImage && (
                <img
                  className="account-img"
                  src={
                    typeof accountImage === 'object'
                      ? URL.createObjectURL(accountImage)
                      : accountImage
                  }
                  alt="Avatar"
                />
              )}
              {!accountImage && loggedInArtist.avatar && (
                <img className="account-img" src={loggedInArtist.avatar} alt="Avatar" />
              )}
              {!accountImage && !loggedInArtist.avatar && (
                <img className="default-img" src={defaultImage} alt="Avatar" />
              )}
            </div>
            <div className="account-picture-editing">
              <p>We recomend an image of at least 400x400.</p>
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
              {!accountImage && editProfileButtonClick && (
                <p className="error__text">&quot;File&quot; is required.</p>
              )}
            </div>
          </div>
          <div className="account-grid-name-editing">
            <h5>Display name</h5>
            <Input
              placeholder="Enter your display name"
              className="inp"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            {!accountName && editProfileButtonClick && (
              <p className="error__text">&quot;Display name&quot; is not allowed to be empty</p>
            )}
            <h5 onMouseEnter={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)}>
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
            </h5>

            <Input
              placeholder="Enter your universe page address"
              className={inputName}
              value={accountPage}
              onChange={(e) =>
                e.target.value.startsWith('universe.xyz/') && setAccountPage(e.target.value)
              }
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
            />
            {(accountPage === 'universe.xyz/' || accountPage === 'universe.xyz/your-address') &&
              editProfileButtonClick && (
                <p className="error__text">
                  &quot;Universe page address&quot; is not allowed to be empty
                </p>
              )}
            {accountName !== loggedInArtist.name ||
            accountPage !== `universe.xyz/${loggedInArtist.universePageAddress}` ||
            (accountImage &&
              loggedInArtist.avatar &&
              accountImage.name !== loggedInArtist.avatar.name) ? (
              <div className="display-warning">
                <img alt="" src={warningIcon} />
                <p>
                  Your edits will be visible on the My Universe landing page but will not be
                  displayed on the current running auctions landing pages.
                </p>
              </div>
            ) : null}
            {/* <div className="account-display-buttons">
                  <Button className="light-button" onClick={() => saveDisplayChanges()}>
                    Save changes
                  </Button>
                  <Button className="light-border-button" onClick={() => cancelDisplayChanges()}>
                    Cancel
                  </Button>
                </div> */}
          </div>
        </div>
        {/* </Animated> */}
        {/* )} */}
      </div>
    </div>
  );
};

Main.propTypes = {
  accountName: PropTypes.string,
  setAccountName: PropTypes.func,
  accountPage: PropTypes.string,
  setAccountPage: PropTypes.func,
  accountImage: PropTypes.oneOfType([PropTypes.any]),
  setAccountImage: PropTypes.func,
  editProfileButtonClick: PropTypes.bool,
};

Main.defaultProps = {
  accountName: '',
  setAccountName: () => {},
  accountPage: '',
  setAccountPage: () => {},
  accountImage: null,
  setAccountImage: () => {},
  editProfileButtonClick: false,
};

export default Main;
