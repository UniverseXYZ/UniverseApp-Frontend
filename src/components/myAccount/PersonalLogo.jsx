import React, { useContext, useRef, useState } from 'react';
import { Animated } from 'react-animated-css';
import AppContext from '../../ContextAPI';
import pencilIcon from '../../assets/images/edit.svg';
import defaultImage from '../../assets/images/default-img.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import Button from '../button/Button.jsx';

const PersonalLogo = () => {
  const { loggedInArtist, setLoggedInArtist } = useContext(AppContext);
  const [logoEditing, setLogoEditing] = useState(true);
  const logoInput = useRef(null);
  const [logo, setLogo] = useState(loggedInArtist.personalLogo);

  const saveLogoChanges = () => {
    setLoggedInArtist({
      ...loggedInArtist,
      personalLogo: logo,
    });
    setLogoEditing(true);
  };

  const cancelLogoChanges = () => {
    setLogo(loggedInArtist.personalLogo);
    setLogoEditing(true);
  };

  return (
    <div className="my-account container">
      <div className="account-grid-container">
        <div className="account-grid-logo">
          <h5>Personal logo</h5>
          {logoEditing ? (
            <div className="account-grid-logo-edit">
              {loggedInArtist.personalLogo ? (
                <img
                  alt=""
                  className="image-logo"
                  src={URL.createObjectURL(loggedInArtist.personalLogo)}
                />
              ) : (
                <img className="default-logo" src={defaultImage} alt="Cover" />
              )}
              <Button className="light-border-button" onClick={() => setLogoEditing(false)}>
                <span className="hide__on__mobile">Edit</span>
                <img src={pencilIcon} alt="Edit Icon" />
              </Button>
            </div>
          ) : (
            <Animated animationIn="zoomIn">
              <div className="account-grid-logo-editing">
                <div className="import-logo">
                  <img alt="" className="cloud" src={cloudIcon} />
                  <h5>Drop your file here</h5>
                  <p>(min 300x300px, SVG/PNG/JPEG, max 1mb)</p>
                  <input
                    type="file"
                    className="inp-disable"
                    ref={logoInput}
                    onChange={(e) => e.target.files[0] && setLogo(e.target.files[0])}
                  />
                  <Button className="light-border-button" onClick={() => logoInput.current.click()}>
                    Choose file
                  </Button>
                  <div className="import-logo-preview">
                    <h6>Preview</h6>
                    <div className="logo-picture">
                      {logo && (
                        <img className="logo-img" src={URL.createObjectURL(logo)} alt="Cover" />
                      )}
                      {!logo && loggedInArtist.personalLogo && (
                        <img
                          className="logo-img"
                          src={URL.createObjectURL(loggedInArtist.personalLogo)}
                          alt="Cover"
                        />
                      )}
                      {!loggedInArtist.personalLogo && !logo && (
                        <img className="default-image" src={defaultImage} alt="Cover" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="account-display-buttons">
                  <Button className="light-button" onClick={() => saveLogoChanges()}>
                    Save changes
                  </Button>
                  <Button className="light-border-button" onClick={() => cancelLogoChanges()}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Animated>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalLogo;
