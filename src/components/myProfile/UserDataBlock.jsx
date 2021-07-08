import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Button from '../button/Button';
import editIcon from '../../assets/images/pencil.svg';
import copyIcon from '../../assets/images/copy1.svg';
import shareIcon from '../../assets/images/share-arrow.svg';
import instagramIcon from '../../assets/images/instagram-outlined.svg';
import twitterIcon from '../../assets/images/icons_twitter.svg';
import './styles/UserDataBlock.scss';

const lookTextUid = (text) => {
  const lengthText = text.length;
  const txt = text;
  return `${txt.substring(0, 10)}...${txt.substring(lengthText - 4, lengthText)}`;
};

const UserDataBlock = (props) => {
  const { name, avatar, uid, about, following, followers, color } = props;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  }, [copied]);
  return (
    <div className="user--data--block">
      <div className="dots--section">
        <div className="dots--block">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="avatar--block--section">
        <div className="avatar--img--bock" style={!avatar ? { background: color } : {}}>
          {!!avatar && <img src={avatar} alt="img" />}
          {!avatar && <h1>{name[0]}</h1>}
          <div className="edit--avatar">
            <label htmlFor="avatar--upload">
              <div className="edit--avatar--child">
                <img src={editIcon} alt="img" />
              </div>
            </label>
            <input id="avatar--upload" type="file" accept="image/png, image/gif, image/jpeg" />
          </div>
        </div>
        <div className="report--profile--block">
          <div className="report--profile--child">
            <p>Report Profile</p>
          </div>
        </div>
      </div>
      <div className="user--name--section">
        <h5>{name}</h5>
        <p aria-hidden="true">
          #{lookTextUid(uid)}
          <span
            className="copy--icon"
            aria-hidden="true"
            onClick={() => {
              navigator.clipboard.writeText(uid);
              setCopied(true);
            }}
          >
            <img src={copyIcon} alt="img" />
            {copied && (
              <Animated animationIn="fadeIn">
                <span className="copied">Copied</span>
              </Animated>
            )}
          </span>
        </p>
      </div>
      <div className="buttons--group">
        <Button className="light-border-button edit--profile" type="button">
          Edit Profile
          <span className="edit--icon">
            <img src={editIcon} alt="img" />
          </span>
        </Button>
        <Button className="light-border-button share" type="button">
          <span className="share--icon">
            <img src={shareIcon} alt="img" />
          </span>
        </Button>
      </div>
      <div className="follow--section">
        <div className="following--block">
          <p className="follow--number">{following}</p>
          <p className="label--follow">following</p>
        </div>
        <div className="followers--block">
          <p className="follow--number">{followers}</p>
          <p className="label--follow">followers</p>
        </div>
      </div>
      <div className="about--section">
        <h3>About</h3>
        <p className="about--text">{about}</p>
      </div>
      <div className="social--section">
        <div className="instagram--block">
          <img src={instagramIcon} alt="img" />
        </div>
        <div className="twitter--block">
          <img src={twitterIcon} alt="img" />
        </div>
      </div>
    </div>
  );
};

UserDataBlock.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  uid: PropTypes.string,
  about: PropTypes.string,
  following: PropTypes.number,
  followers: PropTypes.number,
  color: PropTypes.string,
};

UserDataBlock.defaultProps = {
  name: '',
  avatar: '',
  uid: '',
  about: '',
  followers: 0,
  following: 0,
  color: '#D7CCC8',
};

export default UserDataBlock;
