import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import infoIcon from '../../assets/images/icon.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import defaultImage from '../../assets/images/default-img.svg';
import backgroundDef from '../../assets/images/background.svg';
import backgroundTransparent from '../../assets/images/background1.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { auctionPageImageErrorMessage } from '../../utils/helpers.js';

const PROMO_IMAGE = 'promo-image';
const BACKGROUND_IMAGE = 'background-image';

const DomainAndBranding = ({
  values,
  onChange,
  editButtonClick,
  setEditButtonClick,
  invalidPromoImage,
  invalidBackgroundImage,
  setInvalidPromoImage,
  setInvalidBackgroundImage,
}) => {
  const { loggedInArtist } = useAuthContext();
  const [promoInfo, setPromoInfo] = useState(false);
  const [blurInfo, setBlurInfo] = useState(false);
  const [auctionLink, setAuctionLink] = useState(values.link.split('/')[2] || '');

  const inputPromo = useRef(null);
  const inputBackground = useRef(null);
  const [validLink, setValidLink] = useState(true);
  const [validHeadline, setValidHeadline] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [inputStyle, setInputStyle] = useState('');

  useEffect(() => {
    if (!values.promoImage) {
      setInvalidPromoImage(false);
    }
  }, [values?.promoImage]);

  useEffect(() => {
    if (!values.backgroundImage) {
      setInvalidBackgroundImage(false);
    }
  }, [values?.backgroundImage]);

  const handleLink = (e) => {
    setAuctionLink(e.target.value.split(' ').join('-'));
    onChange((prevValues) => ({
      ...prevValues,
      link: `universe.xyz/${loggedInArtist.name.split(' ')[0].toLowerCase()}/${e.target.value}`,
      status: e.target.value.length > 0 ? 'filled' : 'empty',
    }));
    setValidLink(e.target.value.trim().length !== 0);
  };

  const handleHeadline = (e) => {
    if (e.target.value.length <= 150) {
      onChange((prevValues) => ({ ...prevValues, headline: e.target.value }));
      setValidHeadline(e.target.value.trim().length !== 0);
    }
  };

  const uploadFile = (file, imageType) => {
    if (imageType === PROMO_IMAGE) {
      onChange((prevValues) => ({ ...prevValues, promoImage: file }));
    } else if (imageType === BACKGROUND_IMAGE) {
      onChange((prevValues) => ({ ...prevValues, backgroundImage: file }));
    }
  };

  const handleImageError = (imageType, fileValid) => {
    if (imageType === PROMO_IMAGE) {
      if (fileValid) {
        setInvalidPromoImage(false);
      } else {
        setInvalidPromoImage(true);
      }
    } else if (imageType === BACKGROUND_IMAGE) {
      if (fileValid) {
        setInvalidBackgroundImage(false);
      } else {
        setInvalidBackgroundImage(true);
      }
    }
  };

  const validateFile = (file, imageType) => {
    const fileValid =
      (file.type === 'image/jpeg' || file.type === 'image/png') && file.size / 1048576 < 30;

    handleImageError(imageType, fileValid);
    // always show an image preview, so the user is able to remove an incorrect image
    uploadFile(file, imageType);
  };

  const onDrop = (e, imageType) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    validateFile(files[0], imageType);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const promoImageSrc =
    values.promoImage instanceof File ? URL.createObjectURL(values.promoImage) : values.promoImage;

  const bgImageSrc =
    values.backgroundImage instanceof File
      ? URL.createObjectURL(values.backgroundImage)
      : values.backgroundImage;

  return (
    <div>
      <div className="domain__branding">
        <h3>Domain & Branding</h3>
      </div>
      <div className="headline__link">
        <div className="auction__headline__link">
          <div className="auction__headline__input">
            <div className="auction__headline__title">
              <h5>Auction headline</h5>
              <p>{values.headline.length}/150</p>
            </div>

            <Input
              type="text"
              placeholder="Enter the auction headline"
              className={
                (editButtonClick || !validHeadline) && values.headline.length === 0
                  ? 'inp error-inp'
                  : 'inp'
              }
              value={values.headline}
              onChange={handleHeadline}
              hoverBoxShadowGradient
            />
            {(editButtonClick || !validHeadline) && !values.headline && (
              <p className="error__text">&quot;Auction headline&quot; is not allowed to be empty</p>
            )}
          </div>
          <div className="auction__link__input">
            <h5>Auction link</h5>
            <div
              className={
                (editButtonClick || !validLink) &&
                (values.link ===
                  `universe.xyz/${loggedInArtist.universePageAddress
                    .split(' ')[0]
                    .toLowerCase()}/` ||
                  auctionLink.length === 0)
                  ? 'auction--link--div error-inp'
                  : `auction--link--div ${inputStyle}`
              }
            >
              <span>
                universe.xyz/{loggedInArtist.universePageAddress.split(' ')[0].toLowerCase()}/
              </span>
              <input
                type="text"
                placeholder="auctionname"
                value={auctionLink}
                onFocus={() => setInputStyle('active')}
                onBlur={() => setInputStyle('')}
                onChange={(e) => handleLink(e)}
              />
            </div>
            {(editButtonClick || !validLink) &&
              (values.link ===
                `universe.xyz/${loggedInArtist.universePageAddress.split(' ')[0].toLowerCase()}/` ||
                auctionLink.length === 0) && (
                <p className="error__text">
                  &quot;Auction website link&quot; is not allowed to be empty
                </p>
              )}
          </div>
        </div>

        <div className="auction__uploads">
          <div className="upload__promo">
            <div
              className="dropzone"
              onDrop={(e) => onDrop(e, PROMO_IMAGE)}
              onDragOver={(e) => onDragOver(e)}
            >
              <div className="upload__promo__title">
                <h4>
                  Upload promo image{' '}
                  <span>
                    (optional){' '}
                    <img
                      onMouseOver={() => setPromoInfo(true)}
                      onFocus={() => setPromoInfo(true)}
                      onMouseLeave={() => setPromoInfo(false)}
                      onBlur={() => setPromoInfo(false)}
                      src={infoIcon}
                      alt="Info"
                    />
                  </span>
                </h4>
                {promoInfo && (
                  <Animated animationIn="zoomIn">
                    <div className="promo-info">
                      <p>The promo image is an image on hero screen</p>
                    </div>
                  </Animated>
                )}
              </div>
              <div className={`upload__promo__body ${invalidPromoImage ? 'error-inp' : ''}`}>
                <img className="cloud__icon" src={cloudIcon} alt="Cloud" />
                <h5>Drop your file here</h5>
                <p>(min 1080x1080px, 1:1 square ratio, PNG/JPEG, max 3mb)</p>
                <Button className="light-border-button" onClick={() => inputPromo.current.click()}>
                  Choose file
                </Button>
                <input
                  type="file"
                  className="inp-disable"
                  ref={inputPromo}
                  onChange={(e) => validateFile(e.target.files[0], PROMO_IMAGE)}
                />
                <div className="promo__preview">
                  <h6>Preview</h6>
                  <div className="preview-div">
                    {values.promoImage ? (
                      <>
                        <img className="preview__image" src={promoImageSrc} alt="Promo" />
                        <img
                          className="close"
                          src={closeIcon}
                          alt="Close"
                          aria-hidden="true"
                          onClick={() =>
                            onChange((prevValues) => ({ ...prevValues, promoImage: null }))
                          }
                        />
                      </>
                    ) : (
                      <img className="default__promo__image" src={defaultImage} alt="Default" />
                    )}
                  </div>
                </div>
                {invalidPromoImage && (
                  <p className="error-message">{auctionPageImageErrorMessage}</p>
                )}
              </div>
            </div>
          </div>
          <div className="upload__background">
            <div
              className="dropzone"
              onDrop={(e) => onDrop(e, BACKGROUND_IMAGE)}
              onDragOver={(e) => onDragOver(e)}
            >
              <div className="upload__background__title">
                <h4>Upload background image (optional)</h4>
                <div className="background__blur">
                  Blur
                  <img
                    onMouseOver={() => setBlurInfo(true)}
                    onFocus={() => setBlurInfo(true)}
                    onMouseLeave={() => setBlurInfo(false)}
                    onBlur={() => setBlurInfo(false)}
                    src={infoIcon}
                    alt="Info"
                  />
                  {blurInfo && (
                    <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                      <div className="blur-info">
                        <p>
                          Background blur can help to focus user&apos;s attention on the most
                          important elements of the page. We recommend using it when your background
                          image has lots of small details.
                        </p>
                      </div>
                    </Animated>
                  )}
                  <div className="toggle-switch">
                    <input
                      id="toggleSwitch"
                      type="checkbox"
                      className="toggle-switch-checkbox"
                      name="toggleSwitch"
                      value={values.backgroundImageBlur}
                      checked={values.backgroundImageBlur}
                      onChange={(e) =>
                        onChange((prevValues) => ({
                          ...prevValues,
                          backgroundImageBlur: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="toggleSwitch" className="toggle-switch-label">
                      <span className="toggle-switch-inner" />
                      <span className="toggle-switch-switch" />
                    </label>
                  </div>
                </div>
              </div>
              <div
                className={`upload__background__body ${invalidBackgroundImage ? 'error-inp' : ''}`}
              >
                <img className="cloud__icon" src={cloudIcon} alt="Cloud" />
                <h5>Drop your file here</h5>
                <p>(min 1280x720px, 16:9 square ratio, PNG/JPEG, max 1mb)</p>
                <div className="upload__background__buttons">
                  <Button
                    className="light-border-button"
                    onClick={() => inputBackground.current.click()}
                  >
                    Choose file
                  </Button>
                  {backgroundImage && (
                    <Button
                      className="light-border-button remove"
                      onClick={() => setBackgroundImage(null)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  className="inp-disable"
                  ref={inputBackground}
                  onChange={(e) => validateFile(e.target.files[0], BACKGROUND_IMAGE)}
                />
                <div className="background__preview">
                  <h6>Preview</h6>
                  <div className="preview-div">
                    {values.backgroundImageBlur && <div className="blur" />}
                    {values.backgroundImage ? (
                      <>
                        <img className="background__image" src={bgImageSrc} alt="background" />
                        <img
                          className="close"
                          src={closeIcon}
                          alt="Close"
                          aria-hidden="true"
                          onClick={() =>
                            onChange((prevValues) => ({ ...prevValues, backgroundImage: null }))
                          }
                        />
                      </>
                    ) : (
                      <img
                        className="background__default__image"
                        src={backgroundDef}
                        alt="background"
                      />
                    )}
                  </div>
                </div>
                {invalidBackgroundImage && (
                  <p className="error-message">{auctionPageImageErrorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DomainAndBranding.propTypes = {
  values: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  editButtonClick: PropTypes.bool,
  setEditButtonClick: PropTypes.func,
  invalidPromoImage: PropTypes.bool.isRequired,
  invalidBackgroundImage: PropTypes.bool.isRequired,
  setInvalidPromoImage: PropTypes.func.isRequired,
  setInvalidBackgroundImage: PropTypes.func.isRequired,
};

DomainAndBranding.defaultProps = {
  values: {
    promoImage: '',
    backgroundImage: '',
    backgroundImageBlur: false,
  },
  editButtonClick: false,
  setEditButtonClick: () => {},
};
export default DomainAndBranding;
