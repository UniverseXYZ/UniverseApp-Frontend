import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useAuctionContext } from '../../../../contexts/AuctionContext';
import FutureAuctionsList from '../../../auctionsCard/futureAuction/FutureAuctionsList.jsx';
import AuctionsCardSkeleton from '../../../auctionsCard/skeleton/AuctionsCardSkeleton';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown.jsx';
import leftArrow from '../../../../assets/images/left-arrow.svg';
import rightArrow from '../../../../assets/images/right-arrow.svg';

const LeftArrow = () => <img src={leftArrow} alt="left arrow" />;
const RightArrow = () => <img src={rightArrow} alt="right arrow" />;

const FutureAuctionsTab = ({
  auctions,
  loading,
  showCreatePrompt,
  perPage,
  setPerPage,
  pageCount,
  handlePageClick,
}) => {
  const { loggedInArtist } = useAuthContext();
  const { setAuction } = useAuctionContext();
  const history = useHistory();

  return loading ? (
    <div className="future__auctions__list">
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
      <AuctionsCardSkeleton />
    </div>
  ) : auctions.length ? (
    <>
      <FutureAuctionsList data={auctions} />
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
        />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} itemsPerPage={[12, 24]} />
      </div>
    </>
  ) : showCreatePrompt ? (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No future auctions found</h3>
      {!loggedInArtist.name || !loggedInArtist.avatar ? (
        <div className="warning__div">
          <img src={Exclamation} alt="Warning" />
          <p>
            Please, fill out the profile details before you set up an auction.{' '}
            <button
              type="button"
              onClick={() => history.push('/my-account', { redirect: 'setup-auction' })}
            >
              Go to my profile
            </button>
            .
          </p>
        </div>
      ) : (
        <p className="desc">Create your first auction by clicking the button below</p>
      )}
      <button
        type="button"
        className="light-button set_up"
        onClick={() => {
          setAuction({ rewardTiers: [] });
          return loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction');
        }}
        disabled={!loggedInArtist.name || !loggedInArtist.avatar}
      >
        Set up auction
      </button>
    </div>
  ) : (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No future auctions found</h3>
    </div>
  );
};

FutureAuctionsTab.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  showCreatePrompt: PropTypes.bool,
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired,
};

FutureAuctionsTab.defaultProps = {
  showCreatePrompt: true,
};

export default FutureAuctionsTab;
