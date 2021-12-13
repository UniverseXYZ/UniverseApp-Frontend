import React from 'react';
import PropTypes from 'prop-types';
import instagramLogo from '../../assets/images/instagram-outlined.svg';
import twitterLogo from '../../assets/images/icons_twitter.svg';
import Input from '../input/Input.jsx';
import { MAX_FIELD_CHARS_LENGTH } from '../../containers/myAccount/useProfileForm';

const Social = ({ twitterLink, instagramLink, handleChange }) => (
  <div className="account-grid-social">
    <div className="account-grid-social-editing">
      <h3>
        Social media <span>(optional)</span>
      </h3>
      <div className="instagram">
        <h5>
          <span>Instagram profile</span>
          <p className="input-max-chars">
            {instagramLink.length}/{MAX_FIELD_CHARS_LENGTH.instagram}
          </p>
        </h5>
        <img alt="" src={instagramLogo} />
        <Input
          placeholder="Instagram handle"
          className="inp"
          hoverBoxShadowGradient
          name="instagramLink"
          value={instagramLink}
          onChange={handleChange}
        />
      </div>
      <div className="twitter">
        <h5>
          <span>Twitter profile</span>
          <p className="input-max-chars">
            {twitterLink.length}/{MAX_FIELD_CHARS_LENGTH.twitter}
          </p>
        </h5>
        <img alt="" src={twitterLogo} />
        <Input
          placeholder="Twitter handle"
          className="inp"
          name="twitterLink"
          hoverBoxShadowGradient
          value={twitterLink}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);

Social.propTypes = {
  twitterLink: PropTypes.string,
  instagramLink: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

Social.defaultProps = {
  twitterLink: '',
  instagramLink: '',
};

export default Social;
