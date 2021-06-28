import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DotsDropdown.scss';
import pencilIcon from '../../assets/images/edit.svg';

const DotsDropdown = (props) => {
  const { className, hide, ...rest } = props;
  const [open, setOpen] = useState(false);

  const showDropdown = () => {
    if (className === 'default') {
      setOpen(!open);
    } else {
      setOpen(!hide);
    }
  };

  return (
    <div className="dots__dropdown">
      <button type="button" className="three__dots" onClick={() => showDropdown()}>
        <span />
        <span />
        <span />
      </button>
      {(open || className === 'opened') && (
        <div className="dropdown__list">
          <button type="button">
            <img src={pencilIcon} alt="Edit" />
            Button 1
          </button>
          <button type="button">
            <img src={pencilIcon} alt="Edit" />
            Button 2
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 3
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 4
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 5
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 6
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 7
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 8
          </button>
          <button type="button">
            {' '}
            <img src={pencilIcon} alt="Edit" />
            Button 9
          </button>
        </div>
      )}
    </div>
  );
};

DotsDropdown.propTypes = {
  className: PropTypes.string,
  hide: PropTypes.bool,
};
DotsDropdown.defaultProps = {
  className: '',
  hide: null,
};

export default DotsDropdown;
