import React from 'react';
import PropTypes from 'prop-types';

const About = ({ about, setAbout }) => (
  <div className="my-account container">
    <div className="account-grid-container">
      <div className="account-grid-about">
        <h5>About</h5>
        <div className="account-grid-about-editing">
          <textarea
            placeholder="Please write a few lines about yourself"
            className="inp"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
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
