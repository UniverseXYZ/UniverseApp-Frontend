import React from 'react';
import PropTypes from 'prop-types';

const FullScreenImage = ({ onClose, selectedNFT }) => {
  const name = '';
  return (
    <div className="full--screen--image" onClick={onClose} aria-hidden="true">
      <img src={selectedNFT.optimized_url} alt={selectedNFT.name} />
    </div>
  );
};

FullScreenImage.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedNFT: PropTypes.oneOfType([PropTypes.any]),
};

FullScreenImage.defaultProps = {
  selectedNFT: null,
};
export default FullScreenImage;
