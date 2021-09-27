import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/images/default-img.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import Button from '../button/Button.jsx';
import { useAuthContext } from '../../contexts/AuthContext';

const PersonalLogo = ({ logo, setLogo }) => {
  const { loggedInArtist } = useAuthContext();
  const logoInput = useRef(null);

  return (
    <div className="my-account container">
      <div className="account-grid-container">
        <div className="account-grid-logo">
          <h5>Personal logo</h5>
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
                  {logo && <img className="logo-img" src={URL.createObjectURL(logo)} alt="Cover" />}
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
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalLogo.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.any]),
  setLogo: PropTypes.func,
};

PersonalLogo.defaultProps = {
  logo: null,
  setLogo: () => {},
};

export default PersonalLogo;
