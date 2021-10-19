import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import subscribeIcon from '../../assets/images/subscribe.png';
import Button from '../button/Button.jsx';
import Input from '../input/Input';
import { handleMailSubscribe } from '../../utils/api/mailSubscribe';

const SubscribePopup = ({ close, showCongrats }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    const response = await handleMailSubscribe(email);
    if (response?.status === 200) {
      setSubscribed(true);
      document.getElementById('sub-hidden-btn').click();
    } else {
      alert(response);
    }
  };

  return (
    <div className="subscribe__popup">
      <img
        className="close__popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      <div className="w-50">
        <img src={subscribeIcon} alt="Subscribe" />
      </div>
      <div className="w-50">
        {!subscribed && !showCongrats ? (
          <>
            <h1 className="title">Subscribe for news & updates</h1>
            <p className="desc">Don’t miss the updates from us!</p>
            <div className="subscribe__form">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                hoverBoxShadowGradient
              />
              <Button className="light-button w-100" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="title">Thank you for subscribing!</h1>
            <p className="desc">You have successfully signed up for our newsletter.</p>
            <Button className="light-button" onClick={close}>
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

SubscribePopup.propTypes = {
  close: PropTypes.func.isRequired,
  showCongrats: PropTypes.bool,
};

SubscribePopup.defaultProps = {
  showCongrats: false,
};

export default SubscribePopup;
