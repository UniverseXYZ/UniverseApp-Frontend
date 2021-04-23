import { useRef, useState, useContext } from 'react';
import { Animated } from 'react-animated-css';
import Button from '../button/Button';
import Input from '../input/Input';
import pencilIcon from '../../assets/images/edit.svg';
import defaultImage from '../../assets/images/default-img.svg';
import infoIcon from '../../assets/images/icon.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import AppContext from '../../ContextAPI';

const Main = () => {
  const { loggedInArtist, setLoggedInArtist } = useContext(AppContext);

  const [hideIcon, setHideIcon] = useState(false);
  const [nameEditing, setNameEditing] = useState(true);

  const accountInput = useRef(null);

  const [accountName, setAccountName] = useState(loggedInArtist.name);
  const [accountPage, setAccountPage] = useState(
    `universe.xyz/${loggedInArtist.universePageAddress}`
  );
  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);

  const saveDisplayChanges = () => {
    const page = accountPage.substring(13);
    setAccountPage(page);
    setLoggedInArtist({
      ...loggedInArtist,
      name: accountName,
      universePageAddress: page,
      avatar: accountImage,
    });
    setNameEditing(true);
  };
  const cancelDisplayChanges = () => {
    setAccountName(loggedInArtist.name);
    setAccountPage(`universe.xyz/${loggedInArtist.universePageAddress}`);
    setAccountImage(loggedInArtist.avatar);
    setNameEditing(true);
  };

  return (
    <div className="my-account container">
      <div className="account-grid-container">
        {nameEditing ? (
          <div className="account-grid-name">
            <div className="account-picture">
              <div className="account-image">
                {accountImage && (
                  <img
                    className="account-img"
                    src={URL.createObjectURL(accountImage)}
                    alt="Avatar"
                  />
                )}
                {!accountImage && loggedInArtist.avatar && (
                  <img
                    className="account-img"
                    src={URL.createObjectURL(loggedInArtist.avatar)}
                    alt="Avatar"
                  />
                )}
                {!accountImage && !loggedInArtist.avatar && (
                  <img className="default-img" src={defaultImage} alt="Avatar" />
                )}
              </div>
            </div>
            <div className="account-grid-name-edit">
              <div className="account-name">
                {loggedInArtist.name ? <h2>{loggedInArtist.name}</h2> : <h2>Your Name</h2>}
                {loggedInArtist.universePageAddress ? (
                  <div className="account-link">
                    <p className="link">universe.xyz/</p>
                    <p className="link">{loggedInArtist.universePageAddress}</p>
                  </div>
                ) : (
                  <div className="account-link">
                    <p className="link">universe.xyz/</p>
                    <p className="default-address">youraddress</p>
                  </div>
                )}
              </div>
              <Button className="light-border-button" onClick={() => setNameEditing(false)}>
                <span>Edit</span>
                <img src={pencilIcon} alt="Edit Icon" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="account-grid-name1">
            <div className="account-picture">
              <div className="account-image">
                {accountImage && (
                  <img
                    className="account-img"
                    src={URL.createObjectURL(accountImage)}
                    alt="Avatar"
                  />
                )}
                {!accountImage && loggedInArtist.avatar && (
                  <img
                    className="account-img"
                    src={URL.createObjectURL(loggedInArtist.avatar)}
                    alt="Avatar"
                  />
                )}
                {!accountImage && !loggedInArtist.avatar && (
                  <img className="default-img" src={defaultImage} alt="Avatar" />
                )}
              </div>
              <div className="account-picture-editing">
                <p>We recomend an image of at least 400x400.</p>
                <Button
                  className="light-border-button"
                  onClick={() => accountInput.current.click()}
                >
                  Choose file
                </Button>
                <input
                  type="file"
                  className="inp-disable"
                  ref={accountInput}
                  onChange={(e) => e.target.files[0] && setAccountImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="account-grid-name-editing">
              <h5>Display name</h5>
              <Input
                placeholder="Enter your display name"
                className="inp"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <h5 onMouseEnter={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)}>
                Universe page address
                <div className="universe__page__address">
                  <img src={infoIcon} alt="Info Icon" />
                  {hideIcon && (
                    <Animated animationIn="zoomIn">
                      <div className="info-text1">
                        <p>
                          Universe page is your own brand landing page within the Universe
                          ecosystem. It can contain your logo, description, and social links.
                        </p>
                      </div>
                    </Animated>
                  )}
                </div>
              </h5>

              <Input
                placeholder="Enter your universe page address"
                className="inp"
                value={accountPage}
                onChange={(e) =>
                  e.target.value.startsWith('universe.xyz/') && setAccountPage(e.target.value)
                }
              />
              {accountName !== loggedInArtist.name ||
              accountPage !== `universe.xyz/${loggedInArtist.universePageAddress}` ||
              (accountImage &&
                loggedInArtist.avatar &&
                accountImage.name !== loggedInArtist.avatar.name) ? (
                <div className="display-warning">
                  <img alt="" src={warningIcon} />
                  <p>
                    Your edits will be visible on the My Universe landing page but will not be
                    displayed on the current running auctions landing pages.
                  </p>
                </div>
              ) : null}
              <div className="account-display-buttons">
                <Button className="light-button" onClick={() => saveDisplayChanges()}>
                  Save changes
                </Button>
                <Button className="light-border-button" onClick={() => cancelDisplayChanges()}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
