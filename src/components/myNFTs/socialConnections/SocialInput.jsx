import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../input/Input';

const SocialInput = (props) => {
  const { title, Icon, url, placeholder, customClassName, value, setValue, maxLength } = props;
  return (
    <div className="social--links--item">
      <h5>{title}</h5>
      <Icon />
      {url ? <div className="pre">{url}</div> : <></>}
      <Input
        placeholder={placeholder}
        className={`inp ${customClassName}`}
        hoverBoxShadowGradient
        value={value}
        onChange={(e) => {
          if (e.target.value.length > maxLength) return;
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

SocialInput.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.oneOfType([PropTypes.object]).isRequired,
  url: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  customClassName: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};

SocialInput.defaultProps = {
  url: null,
  customClassName: '',
};

export default SocialInput;
