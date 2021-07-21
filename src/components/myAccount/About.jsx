import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import pencilIcon from '../../assets/images/edit.svg';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';

const About = ({ about, setAbout }) => (
  <div className="my-account container">
    <div className="account-grid-container">
      <div className="account-grid-about">
        <h5>About</h5>
        {/* {aboutEditing ? (
          <div className="account-grid-about-edit">
            {about === '' ? (
              <p className="about-default-text">Please write a few lines about yourself</p>
            ) : (
              <p className="about-text">{loggedInArtist.about}</p>
            )}

            <Button className="light-border-button" onClick={() => setAboutEditing(false)}>
              <span className="hide__on__mobile">Edit</span>
              <img src={pencilIcon} alt="Edit Icon" />
            </Button>
          </div>
        ) : ( */}
        {/* <Animated animationIn="zoomIn"> */}
        <div className="account-grid-about-editing">
          <textarea
            placeholder="Please write a few lines about yourself"
            className="inp"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          {/* <div className="account-display-buttons">
                <Button className="light-button" onClick={() => saveAboutChanges()}>
                  Save changes
                </Button>
                <Button className="light-border-button" onClick={() => cancelAboutChanges()}>
                  Cancel
                </Button>
              </div> */}
        </div>
        {/* </Animated> */}
        {/* )} */}
      </div>
    </div>
  </div>
);

About.propTypes = {
  about: PropTypes.string,
  setAbout: PropTypes.func,
};

About.defaultProps = {
  about: '',
  setAbout: () => {},
};

export default About;
