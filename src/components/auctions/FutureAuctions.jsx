/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Button from '../button/Button';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import infoIconRed from '../../assets/images/Vector.svg';
import doneIcon from '../../assets/images/Completed.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import { FUTURE_ACTIONS_DATA } from '../../utils/fixtures/AuctionsDummyData';
import Input from '../input/Input';
import MintNftsPopup from '../popups/MintNftsPopup';
import MintCongratsPopup from '../popups/MintCongratsPopup';
import SetUpPopup from '../popups/SetUpPopup';

import Pagination from '../pagination/Pagionation';

const FutureAuctions = ({ myAuctions, setMyAuctions, setAuction }) => {
  const [hideLaunchIcon, setHideLaunchIcon] = useState(0);
  const [hideEndIcon, setHideEndIcon] = useState(true);
  const [shownActionId, setshownActionId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');
  const history = useHistory();
  const [mintCongratsPopupOpen, setMintCongratsPopupOpen] = useState(false);

  const handleRemove = (id) => {
    setMyAuctions((d) => d.filter((item) => item.id !== id));
  };

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const clearInput = () => {
    setSearchByName('');
  };

  const handleMintCongratsPopupOpen = () => {
    setMintCongratsPopupOpen(true);
  };

  const handleMintCongratsPopupClose = () => {
    setMintCongratsPopupOpen(false);
  };

  return (
    <div className="future-auctions">
      <div className="input-search">
        <button type="button" onClick={clearInput} className="clear-input">
          Clear
        </button>
        <img src={searchIcon} alt="search" />
        <Input
          className="searchInp"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchByName}
          placeholder="Search by name"
        />
      </div>
      {myAuctions
        .slice(offset, offset + perPage)
        .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
        .filter(
          (item) =>
            !(moment(item.endDate).isBefore(moment.now()) && item.launch) &&
            !(
              moment(item.endDate).isAfter(moment.now()) &&
              (moment(item.endDate).diff(moment(item.startDate)) > 0 &&
                moment(item.startDate).isBefore(moment.now())) > 0 &&
              item.launch
            )
        )
        .map((futureAuction) => (
          <div className="auction" key={futureAuction.id}>
            <div className="auction-header">
              <div className="auction-header-button">
                <h3>{futureAuction.name}</h3>
                <Popup trigger={<Button className="light-button">Set up auction</Button>}>
                  {(close) => <SetUpPopup onClose={close} onAuctionId={futureAuction.id} />}
                </Popup>
              </div>
              <div className="launch-auction">
                {/* <Button className="light-button" disabled>Set up auction</Button> */}
                <div className="line" />
                {shownActionId === futureAuction.id ? (
                  <img
                    src={arrowUp}
                    onClick={() => setshownActionId(null)}
                    alt="Arrow up"
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    src={arrowDown}
                    onClick={() => setshownActionId(futureAuction.id)}
                    alt="Arrow down"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            <div className="auctions-launch-dates">
              <div className="total-dates">
                <p>
                  Total NFTs: <b>{futureAuction.totalNFTs}</b>
                </p>
              </div>
              <div
                className={`total-dates ${
                  moment(futureAuction.startDate).isBefore(moment.now()) ? 'dateError' : ''
                }`}
              >
                <p
                  onMouseOver={() => setHideLaunchIcon(futureAuction.id)}
                  onFocus={() => setHideLaunchIcon(futureAuction.id)}
                  onMouseLeave={() => setHideLaunchIcon(0)}
                  onBlur={() => setHideLaunchIcon(0)}
                >
                  Launch date:{' '}
                  <b>
                    <Moment format="MMMM DD, hh:mm">{futureAuction.startDate}</Moment>
                  </b>
                  {moment(futureAuction.startDate).isBefore(moment.now()) && (
                    <div className="launch__date__info">
                      {hideLaunchIcon === futureAuction.id && (
                        <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                          <div className="launch-info">
                            Your launch date has already passed. Go to “Edit Auction” and adjust the
                            launch and end dates.
                          </div>
                        </Animated>
                      )}
                      <img src={infoIconRed} alt="Info" />
                    </div>
                  )}
                </p>
              </div>
              <div
                className={`total-dates ${
                  moment(futureAuction.endDate).isBefore(moment.now()) ? 'dateError' : ''
                }`}
              >
                <p
                  onMouseOver={() => setHideEndIcon(futureAuction.id)}
                  onFocus={() => setHideEndIcon(futureAuction.id)}
                  onMouseLeave={() => setHideEndIcon(0)}
                  onBlur={() => setHideEndIcon(0)}
                >
                  End date:{' '}
                  <b>
                    <Moment format="MMMM DD, hh:mm">{futureAuction.endDate}</Moment>
                  </b>
                  {moment(futureAuction.endDate).isBefore(moment.now()) && (
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
                </p>
              </div>
            </div>
            <div className="auctions-steps">
              <div className="step-1">
                <h6>Step 1</h6>
                <h4>Auction set up</h4>
                <div className="circle">
                  <img src={doneIcon} alt="Done" />
                  <div className="hz-line1" />
                </div>
                <Button
                  className="light-border-button"
                  onClick={() => {
                    setAuction(futureAuction);
                    history.push('/auction-settings', futureAuction.id);
                  }}
                >
                  Edit auction
                </Button>
              </div>
              <div className="step-2">
                <h6>Step2</h6>
                <h4>NFT minting</h4>
                <div className="circle">
                  <img hidden={!futureAuction.mint} src={doneIcon} alt="Done" />
                  <img hidden={futureAuction.mint} src={emptyMark} alt="Empty mark" />
                  <div className="hz-line2" />
                </div>
                {futureAuction.mint === true ? (
                  <Button disabled className="light-button">
                    Mint NFTs
                  </Button>
                ) : (
                  <>
                    <Popup trigger={<Button className="light-button">Mint NFTs</Button>}>
                      {(close) => (
                        <MintNftsPopup
                          onClose={close}
                          onAuctionId={futureAuction.id}
                          handleMintCongratsPopupOpen={handleMintCongratsPopupOpen}
                        />
                      )}
                    </Popup>
                    <Popup open={mintCongratsPopupOpen}>
                      <MintCongratsPopup
                        onClose={handleMintCongratsPopupClose}
                        onAuctionId={futureAuction.id}
                      />
                    </Popup>
                  </>
                )}
              </div>
              <div className="step-3">
                <h6>Step 3</h6>
                <h4>Landing page customization</h4>
                <div className="circle">
                  {!futureAuction.landingCustom && !futureAuction.mint && (
                    <img alt="landing_page" src={emptyWhite} />
                  )}
                  {futureAuction.mint && !futureAuction.landingCustom && (
                    <img alt="landing_page" src={emptyMark} />
                  )}
                  {futureAuction.mint && futureAuction.landingCustom && (
                    <img alt="landing_page" src={doneIcon} />
                  )}
                </div>
                {futureAuction.mint === true ? (
                  <Button
                    className="light-border-button"
                    onClick={() => {
                      setAuction(futureAuction);
                      history.push('/customize-auction-landing-page', futureAuction.id);
                    }}
                  >
                    Set up landing page
                  </Button>
                ) : (
                  <Button className="light-border-button" disabled>
                    Set up landing page
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
                  <img hidden={!futureAuction.mint} src={doneIcon} alt="Done" />
                  <img hidden={futureAuction.mint} src={emptyMark} alt="Empty mark" />
                </div>
                <div className="hz-line2" />
                <div className="circle">
                  {!futureAuction.landingCustom && !futureAuction.mint && (
                    <img alt="landing_page" src={emptyWhite} />
                  )}
                  {futureAuction.mint && !futureAuction.landingCustom && (
                    <img alt="landing_page" src={emptyMark} />
                  )}
                  {futureAuction.mint && futureAuction.landingCustom && (
                    <img alt="landing_page" src={doneIcon} />
                  )}
                </div>
              </div>
              <div className="steps">
                <div className="step-1">
                  <h6>Step 1</h6>
                  <h4>Auction set up</h4>
                  <Button
                    className="light-border-button"
                    onClick={() => {
                      setAuction(futureAuction);
                      history.push('/auction-settings', futureAuction.id);
                    }}
                  >
                    Edit auction
                  </Button>
                </div>
                <div className="step-2">
                  <h6>Step2</h6>
                  <h4>NFT minting</h4>
                  {futureAuction.mint === true ? (
                    <Button disabled className="light-button">
                      Mint NFTs
                    </Button>
                  ) : (
                    <>
                      <Popup trigger={<Button className="light-button">Mint NFTs</Button>}>
                        {(close) => (
                          <MintNftsPopup
                            onClose={close}
                            onAuctionId={futureAuction.id}
                            handleMintCongratsPopupOpen={handleMintCongratsPopupOpen}
                          />
                        )}
                      </Popup>
                      <Popup open={mintCongratsPopupOpen}>
                        <MintCongratsPopup
                          onClose={handleMintCongratsPopupClose}
                          onAuctionId={futureAuction.id}
                        />
                      </Popup>
                    </>
                  )}
                </div>
                <div className="step-3">
                  <h6>Step 3</h6>
                  <h4>Landing page customization</h4>
                  {futureAuction.mint === true && futureAuction.landingCustom === false ? (
                    <Button
                      className="light-border-button"
                      onClick={() => {
                        setAuction(futureAuction);
                        history.push('/customize-auction-landing-page', futureAuction.id);
                      }}
                    >
                      Set up landing page
                    </Button>
                  ) : (
                    <Button className="light-border-button" disabled>
                      Set up landing page
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div hidden={shownActionId !== futureAuction.id} className="auctions-tier">
              {futureAuction.tiers &&
                futureAuction.tiers.map((tier) => (
                  <div className="tier">
                    <div className="tier-header">
                      <h3>{tier.name}</h3>
                      <div className="tier-header-description">
                        <p>
                          NFTs per winner: <b>{tier.nftsPerWinner}</b>
                        </p>
                        <p>
                          Winners: <b>{tier.winners}</b>
                        </p>
                        <p>
                          Total NFTs: <b>{tier.winners * tier.nftsPerWinner}</b>
                        </p>
                      </div>
                    </div>
                    <div className="tier-body">
                      {tier.nfts.map((nft) => (
                        <div className="tier-image" key={uuid()}>
                          <div className="tier-image-second" />
                          <div className="tier-image-first" />
                          <div className="tier-image-main">
                            <img src={nft} alt="NFT" />
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
        ))}
      <div className="pagination__container">
        <Pagination data={myAuctions} perPage={perPage} setOffset={setOffset} />
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
