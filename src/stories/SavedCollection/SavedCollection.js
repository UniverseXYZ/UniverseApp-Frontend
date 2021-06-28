import React from 'react';
import PropTypes from 'prop-types';
import './SavedCollection.scss';
import picture from '../../assets/images/image.svg';

const SavedCollection = (props) => {
  const { ...rest } = props;
  return (
    <div className="saved__collection__box">
      <div className="saved__collection__box__header">
        <img src={picture} alt="Collection" />
      </div>
      <div className="saved__collection__box__body">
        <img className="collection__avatar" src={picture} alt="Collection" />
      </div>
      <h3 className="collection__name">Collection name</h3>
      <button type="button" className="three__dots">
        <span />
        <span />
        <span />
      </button>
    </div>
  );
};

export default SavedCollection;
