import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ActiveAuctionsFilters from './Filters.jsx';
import ActiveAuctionsList from '../../../../auctionsCard/activeAuction/ActiveAuctionsList.jsx';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';
import leftArrow from '../../../../../assets/images/left-arrow.svg';
import rightArrow from '../../../../../assets/images/right-arrow.svg';

const LeftArrow = () => <img src={leftArrow} alt="left arrow" />;
const RightArrow = () => <img src={rightArrow} alt="right arrow" />;

const ActiveAuctionsTab = ({
  auctions,
  loading,
  handlePageClick,
  pageCount,
  perPage,
  setPerPage,
  sort,
  setSort,
  forcePage,
}) => (
  <div className="active__auctions__tab">
    {auctions.length ? (
      <>
        <ActiveAuctionsFilters sort={sort} setSort={setSort} />
        <ActiveAuctionsList data={auctions} loading={loading} />
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
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} itemsPerPage={[4, 8]} />
        </div>
      </>
    ) : (
      <div className="empty__nfts">
        <h3>No active auctions found</h3>
      </div>
    )}
  </div>
);

ActiveAuctionsTab.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  forcePage: PropTypes.number.isRequired,
};

export default ActiveAuctionsTab;
