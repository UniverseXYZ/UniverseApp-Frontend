/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import Button from '../button/Button.jsx';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import doneIcon from '../../assets/images/Completed.svg';
import searchIconGray from '../../assets/images/search-gray.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import Input from '../input/Input.jsx';
import Pagination from '../pagination/SimplePaginations';
import { isAfterNow, isBeforeNow } from '../../utils/dates';
import FutureCardSkeleton from './skeleton/FutureCardSkeleton';
import { getFutureAuctions, deleteFutureAuction } from '../../utils/api/auctions';
import NoAuctionsFound from './NoAuctionsFound';
import SortBySelect from '../input/SortBySelect';
import SuccessPopup from '../popups/AuctionCanceledSuccessPopup.jsx';
import FutureAuctionDateTooltip from './FutureAuctionDateTooltip.jsx';
import FutureAuctionTierInfo from './FutureAuctionTierInfo.jsx';

const FutureAuctions = ({ myAuctions, setMyAuctions, setAuction }) => {
  const sortOptions = ['Newest', 'Oldest'];
  const [shownActionId, setshownActionId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [futureAuctions, setFutureAuctions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [removedAuction, setRemovedAuction] = useState(false);
  const history = useHistory();
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  useEffect(async () => {
    try {
      const response = await getFutureAuctions();
      if (!response.auctions?.length) {
        setNotFound(true);
        setLoading(false);
      } else {
        setFutureAuctions(response.auctions);
        setFilteredAuctions(response.auctions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    setFutureAuctions(myAuctions);
  }, [myAuctions]);

  useEffect(() => {
    const newFilteredAuctions = [...futureAuctions].filter((auction) =>
      auction.name.toLowerCase().includes(searchByName.toLowerCase())
    );
    if (sortOption === 'Newest') {
      newFilteredAuctions.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortOption === 'Oldest') {
      newFilteredAuctions.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    setFilteredAuctions(newFilteredAuctions);
  }, [searchByName, sortOption]);

  const handleRemove = async (id) => {
    const auctionToDelete = futureAuctions.find((auction) => auction.id === id);
    const canDeleteAuction =
      (auctionToDelete.canceled && !auctionToDelete.depositedNfts) || !auctionToDelete.onChainId;

    if (canDeleteAuction) {
      try {
        const response = await deleteFutureAuction(id);
        if (response) {
          setMyAuctions((auctions) => auctions.filter((item) => item.id !== id));
          setFilteredAuctions((auctions) => auctions.filter((item) => item.id !== id));
          setRemovedAuction(auctionToDelete);
        }
      } catch (error) {
        // TODO: error handling
        console.info(error);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const handleAuctionExpand = (futureAuctionId) => {
    const canExpandAuction = !futureAuctionId || futureAuctionId !== shownActionId;
    if (canExpandAuction) {
      setshownActionId(futureAuctionId);
    } else {
      setshownActionId(null);
    }
  };

  const getTotalNFTSperAuction = (auction) => {
    let nftsCount = 0;
    auction?.rewardTiers?.forEach((tier) => {
      nftsCount += tier.nfts.length;
    });
    return nftsCount;
  };

  const completedConfigureStep = (auction) => isAfterNow(auction.startDate);

  const completedLandingPageStep = (auction) => completedConfigureStep(auction) && auction.link;

  const completedFinalizeStep = (auction) =>
    completedLandingPageStep(auction) && auction.onChain && auction.depositedNfts;

  const renderStep1Cirle = (auction, mobile = false) => {
    const completed = completedConfigureStep(auction);
    if (mobile) {
      return (
        <>
          <div className="circle">
            {completed ? (
              <img src={doneIcon} alt="Done" />
            ) : (
              <img src={emptyMark} alt="Empty mark" />
            )}
          </div>
          {completed ? <div className="hz-line2" /> : <div className="hz-line1" />}
        </>
      );
    }

    return (
      <div className="circle">
        {completed ? (
          <>
            <img src={doneIcon} alt="Done" />
            <div className="hz-line1" />
          </>
        ) : (
          <>
            <img src={emptyMark} alt="Empty mark" />
            <div className="hz-line2" />
          </>
        )}
      </div>
    );
  };

  const renderStep1Button = (auction) => (
    <Button
      className="light-border-button"
      disabled={auction.onChain && !auction.canceled}
      onClick={() => {
        setAuction(auction);
        history.push({
          pathname: '/setup-auction/auction-settings',
          state: 'edit',
        });
      }}
    >
      Edit
    </Button>
  );

  const renderStep2Circle = (auction, mobile) => {
    const configreStepDone = completedConfigureStep(auction);
    const landingStepDone = completedLandingPageStep(auction);

    if (mobile) {
      return (
        <>
          <div className="circle">
            {configreStepDone ? (
              <img src={doneIcon} alt="Done" />
            ) : landingStepDone ? (
              <img src={emptyMark} alt="Empty mark" />
            ) : (
              <img src={emptyWhite} alt="Empty white" />
            )}
          </div>
          {configreStepDone ? <div className="hz-line1" /> : <div className="hz-line2" />}
        </>
      );
    }
    return (
      <div className="circle">
        {configreStepDone ? (
          <>
            <img src={doneIcon} alt="Done" />
            <div className="hz-line1" />
          </>
        ) : (
          <>
            {landingStepDone ? (
              <img src={emptyMark} alt="Empty mark" />
            ) : (
              <img src={emptyWhite} alt="Empty white" />
            )}
            <div className="hz-line2" />
          </>
        )}
      </div>
    );
  };

  const renderStep2Button = (auction) => {
    const configureStepDone = completedConfigureStep(auction);
    const landingStepDone = completedLandingPageStep(auction);
    return (
      <Button
        className={configureStepDone && !landingStepDone ? 'light-button' : 'light-border-button'}
        onClick={() => {
          setAuction(auction);
          history.push('/customize-auction-landing-page', auction.id);
        }}
        disabled={isBeforeNow(auction.startDate)}
      >
        {configureStepDone && landingStepDone ? 'Edit' : 'Start'}
      </Button>
    );
  };

  const renderStep3Circle = (auction) => (
    <div className="circle">
      {completedFinalizeStep(auction) ? (
        <img alt="landing_page" src={doneIcon} />
      ) : completedLandingPageStep(auction) ? (
        <img alt="landing_page" src={emptyMark} />
      ) : (
        <img alt="landing_page" src={emptyWhite} />
      )}
    </div>
  );

  const renderStep3Button = (auction) =>
    completedLandingPageStep(auction) ? (
      <Button
        className={completedFinalizeStep(auction) ? 'light-border-button' : 'light-button'}
        onClick={() => {
          setAuction(auction);
          history.push('/finalize-auction', auction.id);
        }}
        disabled={isBeforeNow(auction.startDate)}
      >
        {!auction.onChain ? 'Start' : !auction.depositedNfts ? 'Continue' : 'Edit'}
      </Button>
    ) : (
      <Button className="light-border-button" disabled>
        Start
      </Button>
    );

  return (
    <div className="future-auctions">
      <div className="search-sort-section">
        <div className="input-search">
          <div className="input--section">
            <Input
              className="searchInp"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByName}
              placeholder="Search by name"
              hoverBoxShadowGradient
            />
            <img src={searchIconGray} alt="search" />
          </div>
        </div>
        <SortBySelect
          id="sort--select"
          defaultValue={sortOptions[0]}
          sortData={sortOptions}
          setSort={setSortOption}
        />
      </div>
      {loading ? (
        <FutureCardSkeleton />
      ) : (
        filteredAuctions.slice(offset, offset + perPage).map((futureAuction) => {
          const removeButtonDisabled =
            futureAuction.depositedNfts || (!futureAuction.canceled && futureAuction.onChain);
          return (
            <div className="auction" key={futureAuction.id}>
              <div
                className={`left-border-effect ${
                  isBeforeNow(futureAuction.startDate) ? 'datePassed' : ''
                } ${
                  futureAuction.onChain && !futureAuction.canceled && futureAuction.depositedNfts
                    ? 'readyForLaunch'
                    : ''
                }`}
              />
              <div className="auction-header">
                <div className="auction-header-button">
                  <h3>{futureAuction.name}</h3>
                </div>
                <div
                  aria-hidden
                  onClick={() => handleAuctionExpand(futureAuction.id)}
                  role="button"
                  tabIndex={0}
                  className="launch-auction"
                >
                  <div className="arrow">
                    {shownActionId === futureAuction.id ? (
                      <>
                        <span className="tooltiptext">Show less</span>
                        <img src={arrowUp} alt="Arrow up" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <span className="tooltiptext">Show more</span>
                        <img src={arrowDown} alt="Arrow down" aria-hidden="true" />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="auctions-launch-dates">
                <div className="total-dates">
                  <p>
                    Total NFTs: <b>{getTotalNFTSperAuction(futureAuction)}</b>
                  </p>
                </div>
                <FutureAuctionDateTooltip date={futureAuction.startDate} dateType="Launch date: " />
                <FutureAuctionDateTooltip date={futureAuction.endDate} dateType="End date: " />
              </div>
              <div className="auctions-steps">
                <div className="step-1">
                  <h6>Step 1</h6>
                  <h4>Configure auction</h4>
                  {renderStep1Cirle(futureAuction)}
                  {renderStep1Button(futureAuction)}
                </div>
                <div className="step-2">
                  <h6>Step 2</h6>
                  <h4>Customize landing page</h4>
                  {renderStep2Circle(futureAuction)}
                  {renderStep2Button(futureAuction)}
                </div>
                <div className="step-3">
                  <h6>Step 3</h6>
                  <h4>Finalize auction</h4>
                  {renderStep3Circle(futureAuction)}
                  {renderStep3Button(futureAuction)}
                </div>
              </div>

              <div className="auction-steps-mobile">
                <div className="auction-steps-moves">
                  {renderStep1Cirle(futureAuction, true)}
                  {renderStep2Circle(futureAuction, true)}
                  {renderStep3Circle(futureAuction, true)}
                </div>
                <div className="steps">
                  <div className="step-1">
                    <h6>Step 1</h6>
                    <h4>Configure auction</h4>
                    {renderStep1Button(futureAuction)}
                  </div>
                  <div className="step-2">
                    <h6>Step 2</h6>
                    <h4>Customize landing page</h4>
                    {renderStep2Button(futureAuction)}
                  </div>
                  <div className="step-3">
                    <h6>Step 3</h6>
                    <h4>Finalize auction</h4>
                    {renderStep3Button(futureAuction)}
                  </div>
                </div>
              </div>

              <div hidden={shownActionId !== futureAuction.id} className="auctions-tier">
                {futureAuction.rewardTiers.length &&
                  futureAuction.rewardTiers.map((tier) => (
                    <FutureAuctionTierInfo key={tier.id} tier={tier} />
                  ))}
                <Button
                  className="light-border-button"
                  onClick={() => handleRemove(futureAuction.id)}
                  disabled={removeButtonDisabled}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })
      )}
      {notFound && <NoAuctionsFound title="No scheduled auctions found" />}
      {filteredAuctions?.length ? (
        <div className="pagination__container">
          <Pagination
            data={myAuctions}
            perPage={perPage}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
          />
        </div>
      ) : null}
      <Popup closeOnDocumentClick={false} open={!!removedAuction}>
        <SuccessPopup
          onClose={() => setRemovedAuction(false)}
          onAuction={removedAuction}
          auctionRemoved
        />
      </Popup>
    </div>
  );
};

FutureAuctions.propTypes = {
  myAuctions: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setMyAuctions: PropTypes.func.isRequired,
  setAuction: PropTypes.func.isRequired,
};

export default FutureAuctions;
