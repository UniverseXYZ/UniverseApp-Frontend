import React from 'react';
import PropTypes from 'prop-types';
import bubbleIcon from '../../assets/images/text-bubble.png';

const EmptyData = ({ text }) => (
  <div className="empty__nfts">
    <div className="tabs-empty">
      <div className="image-bubble">
        <img src={bubbleIcon} alt="bubble-icon" />
      </div>
      <h3>{text}</h3>
    </div>
  </div>
);

EmptyData.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptyData;
