import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../button/Button';
import Loading from './Loading';

const Step2 = ({ close }) => (
  <div className="step2">
    <Loading />
    <p className="desc">To continue send transaction with your wallet</p>
    <div className="btn--actions">
      <Button className="light-border-button" onClick={close}>
        Cancel
      </Button>
    </div>
  </div>
);

Step2.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Step2;
