import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './Pagination.scss';

const LoadMore = ({ handleLoadMore, disabled }) => (
  <div className="load--more--btn">
    <Button disabled={disabled} className="light-border-button" onClick={handleLoadMore}>
      Load more
    </Button>
  </div>
);

LoadMore.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoadMore;
