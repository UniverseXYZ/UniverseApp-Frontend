import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Pagination from '../../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown.jsx';
import FutureAuctionsList from './FutureAuctionsList.jsx';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../../../utils/fixtures/FutureAuctionsDummyData';
import bubleIcon from '../../../../assets/images/text-bubble.png';
import Exclamation from '../../../../assets/images/Exclamation.svg';
import AppContext from '../../../../ContextAPI.js';

const FutureAuctionsTab = ({ onArtist }) => {
  const { loggedInArtist, myAuctions } = useContext(AppContext);
  const history = useHistory();

  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(6);

  const artistFutureAuctions =
    loggedInArtist.id === onArtist?.id
      ? myAuctions.filter((item) => !item.launch && !moment(item.endDate).isBefore(moment.now()))
      : PLACEHOLDER_FUTURE_AUCTIONS;

  return artistFutureAuctions.length ? (
    <>
      <FutureAuctionsList data={PLACEHOLDER_FUTURE_AUCTIONS} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={PLACEHOLDER_FUTURE_AUCTIONS} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </>
  ) : (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>No future auctions found</h3>
      {!loggedInArtist.name || !loggedInArtist.avatar ? (
        <div className="warning__div">
          <img src={Exclamation} alt="Warning" />
          <p>
            Please, fill out the profile details before you set up an auction.{' '}
            <button type="button" onClick={() => history.push('/my-account')}>
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
        onClick={() =>
          loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
        }
        disabled={!loggedInArtist.name || !loggedInArtist.avatar}
      >
        Set up auction
      </button>
    </div>
  );
};

FutureAuctionsTab.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default FutureAuctionsTab;
