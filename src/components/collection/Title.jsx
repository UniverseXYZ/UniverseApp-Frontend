import React from 'react';
import PropTypes from 'prop-types';
import pencilIcon from '../../assets/images/edit.svg';
import Button from '../button/Button.jsx';

const Title = ({ selectedCollection }) => (
  <div className="collection__info">
    <div className="collection__name__desc">
      <h1>{selectedCollection.name}</h1>
    </div>
    <div className="collection__edit">
      <Button className="light-border-button">
        <span className="hide__on__mobile">Edit</span>
        <img src={pencilIcon} alt="Edit Icon" />
      </Button>
    </div>
  </div>
);

Title.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Title;
