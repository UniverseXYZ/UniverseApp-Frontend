import { Animated } from 'react-animated-css';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import Input from '../input/Input';
import infoIcon from '../../assets/images/icon.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import defaultImage from '../../assets/images/default-img.svg';
import backgroundDef from '../../assets/images/background.svg';
import backgroundTransparent from '../../assets/images/background1.svg';

const DomainAndBranding = ({ values, onChange }) => {
  const [promoInfo, setPromoInfo] = useState(false);
  const [blurInfo, setBlurInfo] = useState(false);
  const [blur, setBlur] = useState(false);
  const [auctionHeadline, setAuctionHeadline] = useState('');
  const [auctionLink, setAuctionLink] = useState('universe.xyz/3LAU/auction1');

  const inputPromo = useRef(null);
  const inputBackground = useRef(null);

  const [promoImage, setPromoImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  return (
    <div>
      <div className="domain__branding">
        <h3>Domain & Branding</h3>
      </div>
      <div className="headline__link">
        <div className="auction__headline">
          <div className="auction__headline__input">
            <h5>Auction headline</h5>
            <Input
              type="text"
              placeholder="Enter the auction name"
              value={values.headline}
              onChange={(e) =>
                onChange((prevValues) => ({ ...prevValues, headline: e.target.value }))
              }
            />
            <p className="error__text">
              &quot;Auction website link&quot; is not allowed to be empty
            </p>
          </div>
          <div className="upload__promo">
            <div className="upload__promo__title">
              <h4>
                Upload promo image (optional){' '}
                <img
                  onMouseOver={() => setPromoInfo(true)}
                  onFocus={() => setPromoInfo(true)}
                  onMouseLeave={() => setPromoInfo(false)}
                  onBlur={() => setPromoInfo(false)}
                  src={infoIcon}
                  alt="Info"
                />
              </h4>
              {promoInfo && (
                <Animated animationIn="zoomIn">
                  <div className="promo-info">
                    <p>The promo image is an image on hero screen</p>
                  </div>
                </Animated>
              )}
            </div>
            <div className="upload__promo__body">
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
                onChange={(e) =>
                  onChange((prevValues) => ({ ...prevValues, promoImage: e.target.files[0] }))
                }
              />
              <div className="promo__preview">
                <h6>Preview</h6>
                <div className="preview-div">
                  {values.promoImage ? (
                    <img
                      className="preview__image"
                      src={URL.createObjectURL(values.promoImage)}
                      alt="Promo"
                    />
                  ) : (
                    <img className="default__promo__image" src={defaultImage} alt="Default" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auction__link">
          <div className="auction__link__input">
            <h5>
              Auction link <img src={infoIcon} alt="Info" />
            </h5>
            <Input
              type="text"
              value={values.link}
              onChange={(e) => onChange((prevValues) => ({ ...prevValues, link: e.target.value }))}
            />
            <p className="error__text">&quot;Auction headline&quot; is not allowed to be empty</p>
          </div>
          <div className="upload__background">
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
                    onChange={() => setBlur(!blur)}
                  />
                  <label htmlFor="toggleSwitch" className="toggle-switch-label">
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                  </label>
                </div>
              </div>
            </div>
            <div className="upload__background__body">
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
                onChange={(e) =>
                  onChange((prevValues) => ({ ...prevValues, backgroundImage: e.target.files[0] }))
                }
              />
              <div className="background__preview">
                <h6>Preview</h6>
                <div className="preview-div">
                  {values.backgroundImage && (
                    <img
                      className="background__image"
                      src={URL.createObjectURL(values.backgroundImage)}
                      alt="background"
                    />
                  )}
                  <img
                    className="background__default__image"
                    src={backgroundDef}
                    alt="background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DomainAndBranding.propTypes = {
  values: PropTypes.exact({
    headline: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    promoImage: PropTypes.oneOfType([PropTypes.any]),
    backgroundImage: PropTypes.oneOfType([PropTypes.any]),
  }),
  onChange: PropTypes.func.isRequired,
};

DomainAndBranding.defaultProps = {
  values: {
    promoImage: '',
    backgroundImage: '',
  },
};
export default DomainAndBranding;
