/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import Button from '../button/Button.jsx';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import infoIconRed from '../../assets/images/Vector.svg';
import doneIcon from '../../assets/images/Completed.svg';
import searchIconGray from '../../assets/images/search-gray.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import Input from '../input/Input.jsx';
import Pagination from '../pagination/SimplePaginations';
import { isAfterNow, isBeforeNow } from '../../utils/dates';

const FutureAuctions = ({ myAuctions, setMyAuctions, setAuction }) => {
  const [hideLaunchIcon, setHideLaunchIcon] = useState(0);
  const [hideEndIcon, setHideEndIcon] = useState(true);
  const [shownActionId, setshownActionId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');
  const [page, setPage] = useState(0);
  const history = useHistory();

  const handleRemove = (id) => {
    setMyAuctions((d) => d.filter((item) => item.id !== id));
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
      nftsCount += tier.numberOfWinners * tier.nftsPerWinner;
    });
    return nftsCount;
  };

  return (
    <div className="future-auctions">
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
      {myAuctions
        .slice(offset, offset + perPage)
        .filter((item) => item.name?.toLowerCase().includes(searchByName.toLowerCase()))
        .filter((item) => !item.launch || (item.launch && isAfterNow(item.startDate)))
        .map((futureAuction) => {
          const startDate = format(new Date(futureAuction.startDate), 'MMMM dd, HH:mm');
          const endDate = format(new Date(futureAuction.endDate), 'MMMM dd, HH:mm');
          return (
            <div className="auction" key={uuid()}>
              <div
                className={`left-border-effect ${
                  isBeforeNow(futureAuction.startDate) ? 'datePassed' : ''
                } ${
                  futureAuction.launch && isAfterNow(futureAuction.startDate)
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
                      <img src={arrowUp} alt="Arrow up" aria-hidden="true" />
                    ) : (
                      <img src={arrowDown} alt="Arrow down" aria-hidden="true" />
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
                <div
                  className={`total-dates ${
                    isBeforeNow(futureAuction.startDate) ? 'dateError' : ''
                  }`}
                >
                  <span
                    onMouseOver={() => setHideLaunchIcon(futureAuction.id)}
                    onFocus={() => setHideLaunchIcon(futureAuction.id)}
                    onMouseLeave={() => setHideLaunchIcon(0)}
                    onBlur={() => setHideLaunchIcon(0)}
                  >
                    Launch date:{' '}
                    <b>
                      <time>{startDate}</time>
                    </b>
                    {isBeforeNow(futureAuction.startDate) && (
                      <div className="launch__date__info">
                        {hideLaunchIcon === futureAuction.id && (
                          <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                            <div className="launch-info">
                              Your launch date has already passed. Go to “Edit Auction” and adjust
                              the launch and end dates.
                            </div>
                          </Animated>
                        )}
                        <img src={infoIconRed} alt="Info" />
                      </div>
                    )}
                  </span>
                </div>
                <div
                  className={`total-dates ${isBeforeNow(futureAuction.endDate) ? 'dateError' : ''}`}
                >
                  <span
                    onMouseOver={() => setHideEndIcon(futureAuction.id)}
                    onFocus={() => setHideEndIcon(futureAuction.id)}
                    onMouseLeave={() => setHideEndIcon(0)}
                    onBlur={() => setHideEndIcon(0)}
                  >
                    End date:{' '}
                    <b>
                      <time>{endDate}</time>
                    </b>
                    {isBeforeNow(futureAuction.endDate) && (
                      <div className="end__date__info">
                        {hideEndIcon === futureAuction.id && (
                          <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                            <div hidden={hideEndIcon !== futureAuction.id} className="end-info">
                              Your launch and end date has already passed. Go to “Edit Auction” and
                              adjust the launch and end dates.
                            </div>
                          </Animated>
                        )}
                        <img src={infoIconRed} alt="Info" />
                      </div>
                    )}
                  </span>
                </div>
              </div>
              <div className="auctions-steps">
                <div className="step-1">
                  <h6>Step 1</h6>
                  <h4>Configure auction</h4>
                  <div className="circle">
                    <img src={doneIcon} alt="Done" />
                    <div className="hz-line1" />
                  </div>
                  <Button
                    className="light-border-button"
                    onClick={() => {
                      setAuction(futureAuction);
                      history.push({
                        pathname: '/setup-auction/auction-settings',
                        state: 'edit',
                      });
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="step-2">
                  <h6>Step2</h6>
                  <h4>Customize landing page</h4>
                  <div className="circle">
                    <img
                      hidden={!futureAuction.headline && !futureAuction.link}
                      src={doneIcon}
                      alt="Done"
                    />
                    <img
                      hidden={futureAuction.headline || futureAuction.link}
                      src={emptyMark}
                      alt="Empty mark"
                    />
                    <div className="hz-line2" />
                  </div>
                  <Button
                    className={
                      futureAuction.headline || futureAuction.link
                        ? 'light-border-button'
                        : 'light-button'
                    }
                    onClick={() => {
                      setAuction(futureAuction);
                      history.push('/customize-auction-landing-page', futureAuction.id);
                    }}
                    disabled={isBeforeNow(futureAuction.startDate)}
                  >
                    {futureAuction.headline || futureAuction.link ? 'Edit' : 'Start'}
                  </Button>
                </div>
                <div className="step-3">
                  <h6>Step 3</h6>
                  <h4>Finalize auction</h4>
                  <div className="circle">
                    {futureAuction.headline || futureAuction.link ? (
                      <img alt="landing_page" src={emptyMark} />
                    ) : (
                      <img alt="landing_page" src={emptyWhite} />
                    )}
                  </div>
                  {futureAuction.headline || futureAuction.link ? (
                    <Button
                      className={
                        futureAuction.launch && isAfterNow(futureAuction.startDate)
                          ? 'light-border-button'
                          : 'light-button'
                      }
                      onClick={() => {
                        setAuction(futureAuction);
                        history.push('/finalize-auction', futureAuction.id);
                      }}
                      disabled={isBeforeNow(futureAuction.startDate)}
                    >
                      {futureAuction.launch && isAfterNow(futureAuction.startDate)
                        ? 'Edit'
                        : 'Start'}
                    </Button>
                  ) : (
                    <Button className="light-button" disabled>
                      Start
                    </Button>
                  )}
                </div>
              </div>

              <div className="auction-steps-mobile">
                <div className="auction-steps-moves">
                  <div className="circle">
                    <img src={doneIcon} alt="Done" />
                  </div>
                  <div className="hz-line1" />
                  <div className="circle">
                    <img
                      hidden={!futureAuction.headline && !futureAuction.link}
                      src={doneIcon}
                      alt="Done"
                    />
                    <img
                      hidden={futureAuction.headline || futureAuction.link}
                      src={emptyMark}
                      alt="Empty mark"
                    />
                  </div>
                  <div className="hz-line2" />
                  <div className="circle">
                    {futureAuction.headline || futureAuction.link ? (
                      <img alt="landing_page" src={emptyMark} />
                    ) : (
                      <img alt="landing_page" src={emptyWhite} />
                    )}
                  </div>
                </div>
                <div className="steps">
                  <div className="step-1">
                    <h6>Step 1</h6>
                    <h4>Configure auction</h4>
                    <Button
                      className="light-border-button"
                      onClick={() => {
                        setAuction(futureAuction);
                        history.push('/setup-auction/auction-settings', futureAuction.id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="step-2">
                    <h6>Step2</h6>
                    <h4>Customize landing page</h4>
                    <Button
                      className={
                        futureAuction.headline || futureAuction.link
                          ? 'light-border-button'
                          : 'light-button'
                      }
                      onClick={() => {
                        setAuction(futureAuction);
                        history.push('/customize-auction-landing-page', futureAuction.id);
                      }}
                      disabled={isBeforeNow(futureAuction.startDate)}
                    >
                      {futureAuction.headline || futureAuction.link ? 'Edit' : 'Start'}
                    </Button>
                  </div>
                  <div className="step-3">
                    <h6>Step 3</h6>
                    <h4>Finalize auction</h4>
                    {futureAuction.headline || futureAuction.link ? (
                      <Button
                        className="light-button"
                        onClick={() => {
                          setAuction(futureAuction);
                          history.push('/finalize-auction', futureAuction.id);
                        }}
                        disabled={isBeforeNow(futureAuction.startDate)}
                      >
                        Start
                      </Button>
                    ) : (
                      <Button className="light-button" disabled>
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div hidden={shownActionId !== futureAuction.id} className="auctions-tier">
                {futureAuction.rewardTiers.length &&
                  futureAuction.rewardTiers.map((tier) => (
                    <div className="tier" key={uuid()}>
                      <div className="tier-header">
                        <h3>{tier.name}</h3>
                        <div className="tier-header-description">
                          <p>
                            NFTs per winner: <b>{tier.nftsPerWinner}</b>
                          </p>
                          <p>
                            Winners: <b>{tier.numberOfWinners}</b>
                          </p>
                          <p>
                            Total NFTs: <b>{tier.numberOfWinners * tier.nftsPerWinner}</b>
                          </p>
                        </div>
                      </div>
                      <div className="tier-body">
                        {tier.nfts.map((nft) => (
                          <div className="tier-image" key={uuid()}>
                            <div className="tier-image-second" />
                            <div className="tier-image-first" />
                            <div className="tier-image-main">
                              <img src={nft?.thumbnail_url} alt={nft.name} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                <Button
                  className="light-border-button"
                  onClick={() => handleRemove(futureAuction.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      <div className="pagination__container">
        <Pagination
          data={myAuctions}
          perPage={perPage}
          setOffset={setOffset}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

FutureAuctions.propTypes = {
  myAuctions: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setMyAuctions: PropTypes.func.isRequired,
  setAuction: PropTypes.func.isRequired,
};

export default FutureAuctions;
