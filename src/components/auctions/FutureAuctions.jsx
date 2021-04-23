import { Animated } from 'react-animated-css';
import { useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
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

import Pagination from '../pagination/Pagionation';

const FutureAuctions = () => {
  const [hideLaunchIcon, setHideLaunchIcon] = useState(0);
  const [hideEndIcon, setHideEndIcon] = useState(true);
  const [shownActionId, setshownActionId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(FUTURE_ACTIONS_DATA);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');

  const handleRemove = (id) => {
    setData((d) => d.filter((item) => item.id !== id));
  };

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const clearInput = () => {
    setSearchByName('');
  };

  return (
    <div className="future-auctions">
      <div className="input-search">
        <button onClick={clearInput} className="clear-input">
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
      {data
        .slice(offset, offset + perPage)
        .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
        .map((futureAuction) => (
          <div className="auction" key={futureAuction.id}>
            <div className="auction-header">
              <div className="auction-header-button">
                <h3>{futureAuction.name}</h3>
                <Button className="light-button" disabled>
                  Set up auction
                </Button>
              </div>
              <div className="launch-auction">
                {/* <Button className="light-button" disabled>Set up auction</Button> */}
                <div className="line" />
                {shownActionId === futureAuction.id ? (
                  <img src={arrowUp} onClick={() => setshownActionId(null)} alt="Arrow up" />
                ) : (
                  <img
                    src={arrowDown}
                    onClick={() => setshownActionId(futureAuction.id)}
                    alt="Arrow down"
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
                  moment(futureAuction.launchDate).isBefore(moment.now()) ? 'dateError' : ''
                }`}
              >
                <p
                  onMouseOver={() => setHideLaunchIcon(futureAuction.id)}
                  onMouseLeave={() => setHideLaunchIcon(0)}
                >
                  Launch date:{' '}
                  <b>
                    <Moment format="MMMM DD, hh:mm">{futureAuction.launchDate}</Moment>
                  </b>
                  {moment(futureAuction.launchDate).isBefore(moment.now()) && (
                    <div className="launch__date__info">
                      {hideLaunchIcon === futureAuction.id && (
                        <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                          <div className="launch-info">
                            Your launch date has already passed. Go to Edit Auction and adjust the
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
                  onMouseLeave={() => setHideEndIcon(0)}
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
                            Your launch and end date has already passed. Go to Edit Auction and
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
                <h4>Auction Set Up</h4>
                <div className="circle">
                  <img src={doneIcon} alt="Done" />
                  <div className="hz-line1" />
                </div>
                <Button className="light-border-button">Edit auction</Button>
              </div>
              <div className="step-2">
                <h6>Step2</h6>
                <h4>NFT Minting</h4>
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
                  <Button className="light-button">Mint NFTs</Button>
                )}
              </div>
              <div className="step-3">
                <h6>Step 3</h6>
                <h4>Landing Page Customization</h4>
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
                {futureAuction.mint === true && futureAuction.landingCustom === false ? (
                  <Button className="light-border-button">Set up landing page</Button>
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
                  <h4>Auction Set Up</h4>
                  <Button className="light-border-button">Edit auction</Button>
                </div>
                <div className="step-2">
                  <h6>Step2</h6>
                  <h4>NFT Minting</h4>
                  {futureAuction.mint === true ? (
                    <Button disabled className="light-button">
                      Mint NFTs
                    </Button>
                  ) : (
                    <Button className="light-button">Mint NFTs</Button>
                  )}
                </div>
                <div className="step-3">
                  <h6>Step 3</h6>
                  <h4>Landing Page Customization</h4>
                  {futureAuction.mint === true && futureAuction.landingCustom === false ? (
                    <Button className="light-border-button">Set up landing page</Button>
                  ) : (
                    <Button className="light-border-button" disabled>
                      Set up landing page
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div hidden={shownActionId !== futureAuction.id} className="auctions-tier">
              <div className="tier">
                <div className="tier-header">
                  <h3>{futureAuction.platinumTier.name}</h3>
                  <div className="tier-header-description">
                    <p>
                      NFTs per winner: <b>{futureAuction.platinumTier.nftsPerWinner}</b>
                    </p>
                    <p>
                      Winners: <b>{futureAuction.platinumTier.winners}</b>
                    </p>
                    <p>
                      Total NFTs: <b>{futureAuction.platinumTier.totalNFTs}</b>
                    </p>
                  </div>
                </div>
                <div className="tier-body">
                  {futureAuction.platinumTier.nfts.map((nft, index) => (
                    <div className="tier-image" key={index}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tier">
                <div className="tier-header">
                  <h3>{futureAuction.goldTier.name}</h3>
                  <div className="tier-header-description">
                    <p>
                      NFTs per winner: <b>{futureAuction.goldTier.nftsPerWinner}</b>
                    </p>
                    <p>
                      Winners: <b>{futureAuction.goldTier.winners}</b>
                    </p>
                    <p>
                      Total NFTs: <b>{futureAuction.goldTier.totalNFTs}</b>
                    </p>
                  </div>
                </div>
                <div className="tier-body">
                  {futureAuction.goldTier.nfts.map((nft, index) => (
                    <div className="tier-image" key={index}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tier">
                <div className="tier-header">
                  <h3>{futureAuction.silverTier.name}</h3>
                  <div className="tier-header-description">
                    <p>
                      NFTs per winner: <b>{futureAuction.silverTier.nftsPerWinner}</b>
                    </p>
                    <p>
                      Winners: <b>{futureAuction.silverTier.winners}</b>
                    </p>
                    <p>
                      Total NFTs: <b>{futureAuction.silverTier.totalNFTs}</b>
                    </p>
                  </div>
                </div>
                <div className="tier-body">
                  {futureAuction.silverTier.nfts.map((nft, index) => (
                    <div className="tier-image" key={index}>
                      <div className="tier-image-second" />
                      <div className="tier-image-first" />
                      <div className="tier-image-main">
                        <img src={nft} alt="NFT" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        <Pagination data={data} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default FutureAuctions;
