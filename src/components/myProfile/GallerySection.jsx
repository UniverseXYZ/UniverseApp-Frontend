import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GalleryPhotoItem from './GalleryPhotoItem';
import './styles/GallerySection.scss';

const GallerySection = (props) => {
  const { gallery, className, title, actionText } = props;
  const [expand, setExpand] = useState(false);
  const [showItems, setShowItems] = useState(5);

  useEffect(() => {
    if (expand) setShowItems(gallery.length);
    else setShowItems(5);
  }, [expand]);

  return (
    <div className={`gallery--section ${className}`}>
      <div className="title--section">
        <h2 className="title">{title}</h2>
        {gallery.length > 5 && (
          <span aria-hidden="true" className="section--action" onClick={() => setExpand(!expand)}>
            {actionText}
          </span>
        )}
      </div>
      <div className="gallery--content">
        {gallery.slice(0, showItems).map((elem, index) => (
          <GalleryPhotoItem {...elem} key={index.toString()} index={index} />
        ))}
      </div>
    </div>
  );
};

GallerySection.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  actionText: PropTypes.string,
};

GallerySection.defaultProps = {
  className: '',
  actionText: '',
};

export default GallerySection;
