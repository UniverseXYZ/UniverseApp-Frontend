import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './Pagination.scss';

const LoadMore = ({ quantity, setQuantity, perPage, pageAndSize, page, setPage }) => {
  // this handleClick function depends if a pageAndSize param is passed as a property to the component
  // if yes it handles the new datascraper page and size pagination
  // else it handles our legacy offset pagination
  const handleClick = () => {
    if (pageAndSize) {
      // page and size pagination
      setPage(page + 1);
    } else {
      // offset pagination
      setQuantity(quantity + perPage);
    }
  };

  return (
    <div className="load--more--btn">
      <Button className="light-border-button" onClick={handleClick} style={{ width: '100%' }}>
        Load more
      </Button>
    </div>
  );
};

LoadMore.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  pageAndSize: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
};

LoadMore.defaultProps = {
  pageAndSize: false,
  page: 0,
  setPage: () => {},
};

export default LoadMore;
