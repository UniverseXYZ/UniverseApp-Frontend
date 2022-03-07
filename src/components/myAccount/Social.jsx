import React from 'react';
import PropTypes from 'prop-types';
import instagramLogo from '../../assets/images/instagram-outlined.svg';
import twitterLogo from '../../assets/images/icons_twitter.svg';
import Input from '../input/Input.jsx';

const MAX_FIELD_CHARS_LENGTH = {
  instagram: 100,
  twitter: 100,
};

const Social = ({
  showSocial,
  setShowSocial,
  twitterLink,
  setTwitterLink,
  instagramLink,
  setInstagramLink,
  saveChanges,
  cancelChanges,
}) => (
  <div className="account-grid-social">
    <div className="account-grid-social-editing">
      <h3>
        Social Media <span>(Optional)</span>
      </h3>
      <div className="instagram">
        <h5>
          <span>Instagram Profile</span>
          <p className="input-max-chars">
            {instagramLink.length}/{MAX_FIELD_CHARS_LENGTH.instagram}
          </p>
        </h5>
        <img alt="" src={instagramLogo} />
        <Input
          placeholder="Instagram handle"
          className="inp"
          hoverBoxShadowGradient
          value={instagramLink}
          onChange={(e) => {
            if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.instagram) return;
            setInstagramLink(e.target.value);
          }}
        />
      </div>
      <div className="twitter">
        <h5>
          <span>Twitter Profile</span>
          <p className="input-max-chars">
            {twitterLink.length}/{MAX_FIELD_CHARS_LENGTH.twitter}
          </p>
        </h5>
        <img alt="" src={twitterLogo} />
        <Input
          placeholder="Twitter handle"
          className="inp"
          hoverBoxShadowGradient
          value={twitterLink}
          onChange={(e) => {
            if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.twitter) return;
            setTwitterLink(e.target.value);
          }}
        />
      </div>
    </div>
  </div>
);

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
