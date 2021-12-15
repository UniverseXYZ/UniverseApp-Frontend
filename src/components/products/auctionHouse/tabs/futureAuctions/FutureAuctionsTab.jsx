import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import FutureAuctionsList from '../../../../auctionsCard/futureAuction/FutureAuctionsList.jsx';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';
import leftArrow from '../../../../../assets/images/left-arrow.svg';
import rightArrow from '../../../../../assets/images/right-arrow.svg';

const LeftArrow = () => <img src={leftArrow} alt="left arrow" />;
const RightArrow = () => <img src={rightArrow} alt="right arrow" />;

const FutureAuctionsTab = ({
  auctions,
  loading,
  handlePageClick,
  pageCount,
  perPage,
  setPerPage,
  forcePage,
  removeAuction,
}) => (
  <div className="future__auctions__tab">
    {auctions.length ? (
      <>
        <FutureAuctionsList data={auctions} loading={loading} removeAuction={removeAuction} />
        <div className="pagination__container">
          <ReactPaginate
            previousLabel={<LeftArrow />}
            nextLabel={<RightArrow />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            forcePage={forcePage}
          />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} itemsPerPage={[12, 24]} />
        </div>
      </>
    ) : (
      <div className="empty__nfts">
        <h3>No future auctions found</h3>
      </div>
    )}
  </div>
);

FutureAuctionsTab.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired,
  forcePage: PropTypes.number.isRequired,
  removeAuction: PropTypes.func,
};

FutureAuctionsTab.defaultProps = {
  removeAuction: () => {},
};

export default FutureAuctionsTab;
