import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import AppContext from '../../ContextAPI';
import instagramLogo from '../../assets/images/instagram-outlined.svg';
import twitterLogo from '../../assets/images/icons_twitter.svg';
import pencilIcon from '../../assets/images/edit.svg';
import errorIcon from '../../assets/images/red-msg.svg';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';

const Social = ({
  showSocial,
  setShowSocial,
  twitterLink,
  setTwitterLink,
  instagramLink,
  setInstagramLink,
  saveChanges,
  cancelChanges,
}) => {
  const { loggedInArtist } = useContext(AppContext);
  // const [showSocial, setShowSocial] = useState(true);

  return (
    <div className="account-grid-social">
      {/* <div className="social">
            <h5>Social</h5>
            <label className="switch">
              <input
                type="checkbox"
                checked={showSocial}
                onChange={(e) => setShowSocial(e.target.checked)}
              />
              <span className="slider round" />
            </label>
          </div> */}
      {/* {socialEditing ? (
            <div className="account-grid-social-edit">
              <div className="social-sites">
                {!loggedInArtist.instagramLink ? (
                  <div className="site">
                    <img alt="" src={instagramLogo} />
                    <p className="site-link">instagram.com/</p>
                    <p className="site-default-address">youraddress</p>
                  </div>
                ) : (
                  <div className="site">
                    <img alt="" src={instagramLogo} />
                    <p className="site-link">instagram.com/</p>
                    <p className="site-link">{loggedInArtist.instagramLink}</p>
                  </div>
                )}
                {!loggedInArtist.twitterLink ? (
                  <div className="site">
                    <img alt="" src={twitterLogo} />
                    <p className="site-link">twitter.com/</p>
                    <p className="site-default-address">youraddress</p>
                  </div>
                ) : (
                  <div className="site">
                    <img alt="" src={twitterLogo} />
                    <p className="site-link">twitter.com/</p>
                    <p className="site-link">{loggedInArtist.twitterLink}</p>
                  </div>
                )}
              </div>
              <Button className="light-border-button" onClick={() => setSocialEditing(false)}>
                <span className="hide__on__mobile">Edit</span>
                <img src={pencilIcon} alt="Edit Icon" />
              </Button>
            </div>
          ) : ( */}
      {/* <Animated animationIn="zoomIn"> */}
      <div className="account-grid-social-editing">
        <h3>
          Social media <span>(optional)</span>
        </h3>
        <div className="instagram">
          <h5>Instagram profile</h5>
          <img alt="" src={instagramLogo} />
          <Input
            placeholder="Instagram handle"
            className="inp"
            hoverBoxShadowGradient
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
        </div>
        <div className="twitter">
          <h5>Twitter profile</h5>
          <img alt="" src={twitterLogo} />
          <Input
            placeholder="Twitter handle"
            className="inp"
            hoverBoxShadowGradient
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
          />
        </div>
        {/* <div className="display__error">
          <img alt="Error" src={errorIcon} />
          <p>
            Something went wrong. Please fix the errors in the field above and try again. The
            buttons will be enabled after information has been entered into the fields.
          </p>
        </div>

        <div className="account-display-buttons">
          <Button className="light-button" onClick={() => saveChanges()}>
            Save changes
          </Button>
          <Button className="light-border-button" onClick={() => cancelChanges()}>
            Cancel
          </Button>
        </div> */}
      </div>
      {/* </Animated> */}
      {/* )} */}
    </div>
  );
};

Social.propTypes = {
  twitterLink: PropTypes.string,
  setTwitterLink: PropTypes.func,
  instagramLink: PropTypes.string,
  setInstagramLink: PropTypes.func,
  showSocial: PropTypes.bool,
  setShowSocial: PropTypes.func,
  saveChanges: PropTypes.func,
  cancelChanges: PropTypes.func,
};

Social.defaultProps = {
  twitterLink: '',
  setTwitterLink: () => {},
  instagramLink: '',
  setInstagramLink: () => {},
  showSocial: null,
  setShowSocial: () => {},
  saveChanges: () => {},
  cancelChanges: () => {},
};

export default Social;
