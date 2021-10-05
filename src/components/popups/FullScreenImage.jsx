import React from 'react';
import PropTypes from 'prop-types';

const FullScreenImage = ({ onClose, selectedNFT }) => (
  <div className="full--screen--image" onClick={onClose} aria-hidden="true">
    <img src={selectedNFT.optimized_url} alt={selectedNFT.name} />
  </div>
);

FullScreenImage.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedNFT: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default FullScreenImage;
