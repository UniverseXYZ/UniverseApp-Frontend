import { useContext, useState } from 'react';
import AppContext from '../../ContextAPI';
import instagramLogo from '../../assets/images/instagram-outlined.svg';
import twitterLogo from '../../assets/images/icons_twitter.svg';
import pencilIcon from '../../assets/images/edit.svg';
import Button from '../button/Button';
import Input from '../input/Input';

const Social = () => {
  const { loggedInArtist, setLoggedInArtist } = useContext(AppContext);
  const [socialEditing, setSocialEditing] = useState(true);
  const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);

  const saveSocialChanges = () => {
    setLoggedInArtist({
      ...loggedInArtist,
      instagramLink,
      twitterLink,
    });
    setSocialEditing(true);
  };

  const cancelSocialChanges = () => {
    setTwitterLink(loggedInArtist.twitterLink);
    setInstagramLink(loggedInArtist.instagramLink);
    setSocialEditing(true);
  };

  return (
    <div className="my-account container">
      <div className="account-grid-container">
        <div className="account-grid-social">
          <h5>Social</h5>
          {socialEditing ? (
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
                Edit <img src={pencilIcon} alt="Edit Icon" />
              </Button>
            </div>
          ) : (
            <div className="account-grid-social-editing">
              <div className="instagram">
                <h5>Instagram profile</h5>
                <img alt="" src={instagramLogo} />
                <Input
                  placeholder="instagram.com/username"
                  className="inp"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                />
              </div>
              <div className="twitter">
                <h5>Twitter profile</h5>
                <img alt="" src={twitterLogo} />
                <Input
                  placeholder="twitter.com/username"
                  className="inp"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                />
              </div>

              <div className="account-display-buttons">
                <Button className="light-button" onClick={() => saveSocialChanges()}>
                  Save changes
                </Button>
                <Button className="light-border-button" onClick={() => cancelSocialChanges()}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Social;
