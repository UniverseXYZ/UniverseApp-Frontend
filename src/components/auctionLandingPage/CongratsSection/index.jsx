import React from 'react';
import PropTypes from 'prop-types';
import smallCongratsIcon from '../../../assets/images/congrats-small.png';
import './index.scss';

const DEFAULT_HEADING = 'Congratulations!';

const CongratsSection = ({ text, heading = DEFAULT_HEADING }) => (
  <div className="congrats_content">
    <div className="icon">
      <img src={smallCongratsIcon} alt="Congrats" />
    </div>
    <h2 className="title">{heading}</h2>
    <p className="desc">{text}</p>
  </div>
);

CongratsSection.propTypes = {
  text: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
};

export default CongratsSection;
