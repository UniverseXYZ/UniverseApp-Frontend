import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const DEFAULT_HEADING = 'Unfortunately, your bid didn’t win!';

const UnfortunatelySection = ({ text, heading = DEFAULT_HEADING }) => (
  <div className="congrats_content">
    <h2 className="title">{heading}</h2>
    <p className="desc">{text}</p>
  </div>
);

UnfortunatelySection.propTypes = {
  text: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
};

export default UnfortunatelySection;
