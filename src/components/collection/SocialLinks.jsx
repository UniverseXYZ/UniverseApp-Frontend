import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DiscordIcon from '../svgs/DiscordIcon';
import InstagramIcon from '../svgs/InstagramIcon';
import MediumIcon from '../svgs/Medium';
import TelegramIcon from '../svgs/TelegramIcon';
import TwitterIcon from '../svgs/TwitterIcon';
import WebsiteIcon from '../svgs/WebsiteIcon';

const SocialLinks = ({
  instagramLink,
  siteLink,
  mediumLink,
  discordLink,
  telegramLink,
  twitterLink,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="social--icons--wrapper">
      <div className="social--icons--grid">
        {!!twitterLink && (
          <div className="social--icons--grid--item">
            <span className="tooltiptext">Twitter</span>
            <TwitterIcon width="18" height="14" fillColor="rgba(0, 0, 0, 0.4)" />
          </div>
        )}
        {!!discordLink && (
          <div
            className="social--icons--grid--item"
            onClick={() => window.open(`https://discord.gg/${discordLink}`, '_blank').focus()}
            aria-hidden
          >
            <span className="tooltiptext">Discord</span>
            <DiscordIcon width="18" height="14" fillColor="rgba(0, 0, 0, 0.4)" />
          </div>
        )}
        {!!siteLink && (
          <div
            className="social--icons--grid--item"
            onClick={() => window.open(siteLink, '_blank').focus()}
            aria-hidden
          >
            <span className="tooltiptext">Website</span>
            <WebsiteIcon width="16" height="16" fillColor="rgba(0, 0, 0, 0.4)" />
          </div>
        )}
        {!!instagramLink && (
          <div
            className="social--icons--grid--item"
            onClick={() => window.open(`https://instagram.com/${instagramLink}`, '_blank').focus()}
            aria-hidden
          >
            <span className="tooltiptext">Instagram</span>
            <InstagramIcon width="16" height="16" fillColor="rgba(0, 0, 0, 0.4)" />
          </div>
        )}
        {!!mediumLink && (
          <div
            className="social--icons--grid--item"
            onClick={() => window.open(`https://medium.com/@${mediumLink}`, '_blank').focus()}
            aria-hidden
          >
            <span className="tooltiptext">Medium</span>
            <MediumIcon width="18" height="14" fillColor="rgba(0, 0, 0, 0.4)" />
          </div>
        )}
        {!!telegramLink && (
          <div
            className="social--icons--grid--item"
            onClick={() => window.open(`https://t.me/${telegramLink}`, '_blank').focus()}
            aria-hidden
          >
            <span className="tooltiptext">Telegram</span>
            <TelegramIcon width="19" height="15" fillColor="rgba(0, 0, 0, 0.4)" />
          </div>
        )}
      </div>
      <div className="social--icons--dropdown--wrapper">
        <div className="three--dots" aria-hidden="true" onClick={handleClick}>
          <div className="dots--grid">
            <span />
            <span />
            <span />
          </div>
        </div>
        {showDropdown ? (
          <div ref={ref} className="social--icons--dropdown">
            <button type="button">
              <TwitterIcon width="18" height="14" />
              <span>Twitter</span>
            </button>
            <button type="button">
              <DiscordIcon width="18" height="14" />
              <span>Discord</span>
            </button>
            <button type="button">
              <WebsiteIcon width="16" height="16" />
              <span>Website</span>
            </button>
            <button type="button">
              <InstagramIcon width="16" height="16" />
              <span>Instagram</span>
            </button>
            <button type="button">
              <MediumIcon width="18" height="14" />
              <span>Medium</span>
            </button>
            <button type="button">
              <TelegramIcon width="19" height="15" />
              <span>Telegram</span>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

SocialLinks.propTypes = {
  instagramLink: PropTypes.string,
  siteLink: PropTypes.string,
  mediumLink: PropTypes.string,
  discordLink: PropTypes.string,
  telegramLink: PropTypes.string,
  twitterLink: PropTypes.string,
};

SocialLinks.defaultProps = {
  instagramLink: '',
  siteLink: '',
  mediumLink: '',
  discordLink: '',
  telegramLink: '',
  twitterLink: '',
};
export default SocialLinks;
