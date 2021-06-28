import React from 'react';
import PropTypes from 'prop-types';
import './Fonts.scss';

const Fonts = (props) => {
  const { variant, children } = props;
  return variant === 'heading' ? (
    <>
      <h1>{children}</h1>
      <h2>{children}</h2>
      <h3>{children}</h3>
      <h4>{children}</h4>
      <h5>{children}</h5>
      <h6>{children}</h6>
    </>
  ) : (
    <>
      <p className="paragraph_sm18">{children}</p>
      <p className="paragraph_sm16">{children}</p>
      <p className="paragraph_sm14">{children}</p>
      <p className="paragraph_sm12">{children}</p>
    </>
  );
};

Fonts.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Fonts.defaultProps = {
  variant: 'h1',
  children: "Welcome! Let's begin with your wallet",
};

export default Fonts;
