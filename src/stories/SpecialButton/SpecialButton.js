import React from 'react';
import PropTypes from 'prop-types';
import './SpecialButton.scss';
import plusIcon from '../../assets/images/Union.svg';
import plusDis from '../../assets/images/plus-dis.svg';

const SpecialButton = (props) => {
  const { className, ...rest } = props;
  return (
    <div className={`${className}`}>
      {className === 'active' ? (
        <img src={plusIcon} alt="Plus" />
      ) : (
        <img src={plusDis} alt="Plus" />
      )}
      <p>Button</p>
    </div>
  );
};

SpecialButton.propTypes = {
  className: PropTypes.string,
};

SpecialButton.defaultProps = {
  className: 'active',
};
export default SpecialButton;
