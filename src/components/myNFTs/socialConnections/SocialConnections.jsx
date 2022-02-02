import React, { useState } from 'react';
import './SocialConnections.scss';
import PropTypes from 'prop-types';
import { ReactComponent as InfoIcon } from '../../../assets/images/info-icon.svg';
import { ReactComponent as CloseIcon } from '../../../assets/images/close-menu.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/images/social-icons/twitter.svg';
import { ReactComponent as SiteIcon } from '../../../assets/images/social-icons/site.svg';
import { ReactComponent as DiscordIcon } from '../../../assets/images/social-icons/discord.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/images/social-icons/instagram.svg';
import { ReactComponent as MediumIcon } from '../../../assets/images/social-icons/medium.svg';
import { ReactComponent as TelegramIcon } from '../../../assets/images/social-icons/telegram.svg';
import Button from '../../button/Button';
import SocialInput from './SocialInput';

const MAX_FIELD_CHARS_LENGTH = {
  site: 100,
  discord: 100,
  instagram: 100,
  medium: 100,
  telegram: 100,
};

const SocialConnections = (props) => {
  const {
    siteLink,
    setSiteLink,
    discordLink,
    setDiscordLink,
    instagramLink,
    setInstagramLink,
    mediumLink,
    setMediumLink,
    telegramLink,
    setTelegramLink,
  } = props;
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);

  return (
    <div className="social--connections">
      <div className="title">
        <h4>Social connections</h4>
        <div className="social--connections--info">
          <InfoIcon />
          <div className="social--connections--info--text">
            <p>Help collectors verify your collection by connecting Twitter</p>
          </div>
        </div>
      </div>
      <div className="social--items--grid">
        <div className="twitter--section">
          <div className="title--icon">
            <TwitterIcon /> Twitter
          </div>
          <div className="connect--btn">
            {!isTwitterConnected ? (
              <Button className="light-button" onClick={() => setIsTwitterConnected(true)}>
                Connect
              </Button>
            ) : (
              <div className="twitter--connected">
                <Button
                  className="light-border-button"
                  onClick={() => setIsTwitterConnected(false)}
                >
                  <CloseIcon /> fluffworld
                </Button>
                <span className="tooltiptext">Disconnect</span>
              </div>
            )}
          </div>
        </div>
        <SocialInput
          title="Your site"
          Icon={SiteIcon}
          placeholder="yoursite.io"
          value={siteLink}
          setValue={setSiteLink}
          maxLength={MAX_FIELD_CHARS_LENGTH.site}
        />
        <SocialInput
          title="Discord"
          Icon={DiscordIcon}
          url="discord.gg/"
          placeholder="yourdiscord"
          customClassName="pl-135"
          value={discordLink}
          setValue={setDiscordLink}
          maxLength={MAX_FIELD_CHARS_LENGTH.discord}
        />
        <SocialInput
          title="Instagram profile"
          Icon={InstagramIcon}
          url="instagram.com/"
          placeholder="yourinstagram"
          customClassName="pl-167"
          value={instagramLink}
          setValue={setInstagramLink}
          maxLength={MAX_FIELD_CHARS_LENGTH.instagram}
        />
        <SocialInput
          title="Medium"
          Icon={MediumIcon}
          url="medium.com/@"
          placeholder="yourmedium"
          customClassName="pl-167"
          value={mediumLink}
          setValue={setMediumLink}
          maxLength={MAX_FIELD_CHARS_LENGTH.medium}
        />
        <SocialInput
          title="Telegram"
          Icon={TelegramIcon}
          url="t.me/"
          placeholder="yourtelegram"
          customClassName="pl-87"
          value={telegramLink}
          setValue={setTelegramLink}
          maxLength={MAX_FIELD_CHARS_LENGTH.telegram}
        />
      </div>
    </div>
  );
};

SocialConnections.propTypes = {
  siteLink: PropTypes.string.isRequired,
  setSiteLink: PropTypes.func.isRequired,
  discordLink: PropTypes.string.isRequired,
  setDiscordLink: PropTypes.func.isRequired,
  instagramLink: PropTypes.string.isRequired,
  setInstagramLink: PropTypes.func.isRequired,
  mediumLink: PropTypes.string.isRequired,
  setMediumLink: PropTypes.func.isRequired,
  telegramLink: PropTypes.string.isRequired,
  setTelegramLink: PropTypes.func.isRequired,
};

export default SocialConnections;
