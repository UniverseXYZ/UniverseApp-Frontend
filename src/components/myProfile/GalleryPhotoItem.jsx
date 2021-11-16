import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import './styles/GalleryPhotoItem.scss';

const GalleryPhotoItem = (props) => {
  const { image, name, index } = props;
  const [itemWidth, setItemWidth] = useState(null);
  const [marginElem, setMarginElem] = useState(false);

  useEffect(() => {
    const parentContentWidth = document.querySelector('.gallery--content').clientWidth;
    setItemWidth(Math.floor(parentContentWidth / 5 - 20 + 20 / 5));
    if (index % 5 === 0) setMarginElem(true);
  }, []);

  return (
    <div
      className="gallery--photo--item--parent"
      style={
        !itemWidth
          ? {}
          : {
              width: itemWidth,
              height: itemWidth,
              marginLeft: marginElem ? '0px' : '20',
            }
      }
    >
      <div
        className="image--block"
        style={!itemWidth ? {} : { width: itemWidth, height: itemWidth }}
      >
        <img src={image} alt="img" />
      </div>
      <div
        className="name--block"
        style={!itemWidth ? {} : { width: itemWidth, height: itemWidth, top: itemWidth }}
      >
        <p>{name}</p>
      </div>
    </div>
  );
};

GalleryPhotoItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default GalleryPhotoItem;
