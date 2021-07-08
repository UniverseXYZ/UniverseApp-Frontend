import React from 'react';
import PropTypes from 'prop-types';
import './PopupStyle.scss';
import twitter from '../../assets/images/twitter.svg';
import facebook from '../../assets/images/facebook.svg';
import telegram from '../../assets/images/telegram.svg';
import hh from '../../assets/images/hh.svg';
import message from '../../assets/images/message.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import { shareFriends } from '../../utils/fixtures/ShareWithFriendsDummyData';
import Button from '../button/Button.jsx';

const SharePopup = (props) => {
  const {
    close,
    // handleConnectWallet,
    // showInstallWalletPopup,
    // setShowInstallWalletPopup,
    // selectedWallet,
    // setSelectedWallet,
  } = props;

  return (
    <div className="share--popup">
      <img className="close-popup" onClick={close} src={closeIcon} alt="Close" aria-hidden="true" />
      <div className="title">
        <h1>Share this page</h1>
      </div>
      <div className="share--list">
        <div className="share--box">
          <div>
            <img src={twitter} alt="twitter" />
          </div>
          <p>Twitter</p>
        </div>
        <div className="share--box">
          <div>
            <img src={facebook} alt="fb" />
          </div>
          <p>Facebook</p>
        </div>
        <div className="share--box">
          <div>
            <img src={telegram} alt="tg" />
          </div>
          <p>Telegram</p>
        </div>
        <div className="share--box">
          <div>
            <img src={hh} alt="hh" />
          </div>
          <p>Copy Link</p>
        </div>
        <div className="share--box">
          <div>
            <img src={message} alt="message" />
          </div>
          <p>Email</p>
        </div>
      </div>
      <hr />
      <div className="scroller">
        <div className="search--box">
          <div className="search--title">
            <h1>Send to a friend</h1>
          </div>
          <div className="search--input">
            <input type="text" placeholder="Search for people" />
          </div>
        </div>
        <div className="recent">
          <h1>Recent</h1>
        </div>
        <div className="friend--list">
          {shareFriends.map((elm) => (
            <div className="friend--box" key={elm.value}>
              <div className="friend--avatar">
                <img src={elm.userAvatar.url} alt="avatar" />
                <h1>{elm.name}</h1>
              </div>
              <div className="friend--send">
                <Button className="light-button">Send</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
SharePopup.propTypes = {
  close: PropTypes.func.isRequired,
};
export default SharePopup;
