import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
// import './Pagination.scss';

const LoadMore = ({ quantity, setQuantity, perPage }) => (
  <div className="load--more--btn">
    <Button className="light-border-button" onClick={() => setQuantity(quantity + perPage)}>
      Load more
    </Button>
  </div>
);

LoadMore.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default LoadMore;
