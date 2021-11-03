import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import arrowUp from '../../assets/images/Arrow_Up.svg';
import arrowDown from '../../assets/images/ArrowDown.svg';
import searchIcon from '../../assets/images/search-gray.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import Input from '../input/Input.jsx';
import copyIcon from '../../assets/images/copy1.svg';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/SimplePaginations';
import { isBeforeNow } from '../../utils/dates';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPastAuctions } from '../../utils/api/auctions';
import NoAuctionsFound from './NoAuctionsFound';
import Button from '../button/Button';
import infoIcon from '../../assets/images/icon.svg';
import ActiveAndPastCardSkeleton from './skeleton/ActiveAndPastCardSkeleton';
import SortBySelect from '../input/SortBySelect';

const PastAuctions = () => {
  const { ethPrice } = useAuthContext();
  const [shownActionId, setShownActionId] = useState(null);
  const [copied, setCopied] = useState({
    state: false,
    index: null,
  });
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchByName, setSearchByName] = useState('');
  const [pastAuctions, setPastAuctions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // const filterAuctions = (auctions) => {
  //   const filteredAuctions = auctions
  //     .slice(offset, offset + perPage)
  //     .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
  //     .filter((item) => item && isBeforeNow(item.endDate));

  //   return filteredAuctions;
  // };
  const [hideLaunchIcon1, setHideLaunchIcon1] = useState(0);
  const [hideLaunchIcon2, setHideLaunchIcon2] = useState(0);

  useEffect(async () => {
    try {
      const response = await getPastAuctions();
      if (!response.auctions?.length) {
        setNotFound(true);
        setLoading(false);
      } else {
        // const auctions = filterAuctions(response.auctions);
        // setPastAuctions(auctions);
        setPastAuctions(response.auctions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const handleAuctionExpand = (id) => {
    const canExpandAuction = !id || id !== shownActionId;
    if (canExpandAuction) {
      setShownActionId(id);
    } else {
      setShownActionId(null);
    }
  };

  return (
    <div className="past-auctions">
      <div className="search-sort-section">
        <div className="input-search">
          <div className="input--section">
            <Input
              className="searchInp"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByName}
              placeholder="Search"
              hoverBoxShadowGradient
            />
            <img src={searchIcon} alt="search" />
          </div>
        </div>
        <SortBySelect
          id="sort--select"
          defaultValue="Sort by"
          sortData={['Sort by', 'Newest', 'Oldest']}
          hideFirstOption
        />
      </div>
      {!loading ? (
        pastAuctions.map((pastAuction, index) => {
          const auctionTotalNfts = pastAuction.rewardTiers
            .map((tier) => tier.nfts.length)
            .reduce((totalNfts, currentNftsCount) => totalNfts + currentNftsCount, 0);

          const startDate = format(new Date(pastAuction.startDate), 'MMMM dd, HH:mm');
          const endDate = format(new Date(pastAuction.endDate), 'MMMM dd, HH:mm');

          return (
            <>
              <div className="auction past-auction" key={pastAuction.id}>
                <div className="past-left-border-effect" />
                <div className="auction-header">
                  <div className="img_head">
                    <h3>{pastAuction.name}</h3>
                    <div className="copy-div">
                      <div className="copy" title="Copy to clipboard">
                        {copied.state && copied.index === index && (
                          <div className="copied-div">
                            URL copied!
                            <span />
                          </div>
                        )}
                        {pastAuction.artist ? (
                          <CopyToClipboard
                            text={`${pastAuction.link.replace(
                              'universe.xyz',
                              window.location.origin
                            )}`}
                            onCopy={() => {
                              setCopied({
                                state: true,
                                index,
                              });
                              setTimeout(() => {
                                setCopied({
                                  state: false,
                                  index: null,
                                });
                              }, 1000);
                            }}
                          >
                            <span>
                              <img
                                src={copyIcon}
                                alt="Copy to clipboard icon"
                                className="copyImg"
                              />
                              Copy URL
                            </span>
                          </CopyToClipboard>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="launch-auction">
                    <Button
                      className="light-border-button hide__on__mobile"
                      // onClick={() => history.push(activeAuction.link.replace('universe.xyz', ''))}
                    >
                      <span>Go to landing page</span>
                    </Button>
                    <div
                      className="arrow"
                      onClick={() => handleAuctionExpand(pastAuction.id)}
                      role="button"
                      tabIndex={0}
                      aria-hidden
                    >
                      {shownActionId === pastAuction.id ? (
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
                      Total NFTs: <b>{auctionTotalNfts}</b>
                    </p>
                  </div>
                  <div className="total-dates">
                    <p>
                      Launch date:{' '}
                      <b>
                        {' '}
                        <time>{startDate}</time>
                      </b>
                    </p>
                  </div>
                  <div className="total-dates">
                    <p>
                      End date:{' '}
                      <b>
                        <time>{endDate}</time>
                      </b>
                    </p>
                  </div>
                </div>
                <div className="bid_info">
                  <div className="boredred-div">
                    <span className="head">Total bids</span>
                    <span className="value">{pastAuction.bids?.bidsCount}</span>
                  </div>
                  <div>
                    <span className="head">Highest winning bid</span>
                    <span className="value">
                      <img src={bidIcon} alt="Highest winning bid" />
                      {pastAuction.bids.highestBid} ETH
                      <span className="dollar-val">
                        ~$
                        {(
                          pastAuction?.bids?.highestBid * ethPrice?.market_data?.current_price?.usd
                        )?.toFixed(2)}
                      </span>
                    </span>
                  </div>

                  <div className="boredred-div">
                    <span className="head">Total bids amount</span>
                    <span className="value">
                      <img src={bidIcon} alt="Total bids amount" />
                      {pastAuction.bids.totalBids} ETH
                      <span className="dollar-val">
                        ~$
                        {(
                          pastAuction?.bids?.totalBids * ethPrice?.market_data?.current_price?.usd
                        )?.toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="head">Lower winning bid</span>
                    <span className="value">
                      <img src={bidIcon} alt="Lower winning bid" />
                      {pastAuction.bids.lowestBid} ETH
                      <span className="dollar-val">
                        ~$
                        {(
                          pastAuction?.bids?.lowestBid * ethPrice?.market_data?.current_price.usd
                        )?.toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="funds-and-balance">
                  <div>
                    <div className="unreleased-funds">
                      <div className="head">
                        <span>Unreleased funds</span>
                        <span
                          onMouseOver={() => setHideLaunchIcon1(pastAuction.id)}
                          onFocus={() => setHideLaunchIcon1(pastAuction.id)}
                          onMouseLeave={() => setHideLaunchIcon1(0)}
                          onBlur={() => setHideLaunchIcon1(0)}
                        >
                          <img src={infoIcon} alt="Info Icon" />
                        </span>
                        {hideLaunchIcon1 === pastAuction.id && (
                          <div className="info-text1">
                            <p>
                              For the auctioneer to be able to collect their winnings and for the
                              users to be able to claim their NFTs the rewards need to be released
                              first.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="balance-body">
                        <span className="value-section">
                          <img src={bidIcon} alt="unreleased funds" />
                          <span className="value">
                            120.42
                            <span className="dollar-val">~$41,594</span>
                          </span>
                        </span>
                        <Button className="light-button ">
                          <span>Release rewards</span>
                        </Button>
                      </div>
                    </div>
                    <div className="available-balance">
                      <div className="head">
                        <span>Available balance</span>
                        <span
                          onMouseOver={() => setHideLaunchIcon2(pastAuction.id)}
                          onFocus={() => setHideLaunchIcon2(pastAuction.id)}
                          onMouseLeave={() => setHideLaunchIcon2(0)}
                          onBlur={() => setHideLaunchIcon2(0)}
                        >
                          <img src={infoIcon} alt="Info Icon" />
                        </span>
                        {hideLaunchIcon2 === pastAuction.id && (
                          <div className="info-text2">
                            <p>This is the released reward amount availble for claiming</p>
                          </div>
                        )}
                      </div>
                      <div className="balance-body">
                        <span className="value-section">
                          <img src={bidIcon} alt="unreleased funds" />
                          <span className="value">
                            14.24
                            <span className="dollar-val">~$41,594</span>
                          </span>
                        </span>
                        <Button className="light-button ">
                          <span>Claim funds</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="empty-section">
                  <NoAuctionsFound
                    title="The auction didn’t get bids on all the slots"
                    desc="You can withdraw your NFTs by clicking a button below."
                    btnText="Withdraw NFTs"
                  />
                </div>
                <div hidden={shownActionId !== pastAuction.id} className="auctions-tier">
                  {pastAuction.rewardTiers.map((tier) => (
                    <div className="tier" key={uuid()}>
                      <div className="tier-header">
                        <h3>{tier.name}</h3>
                        <div className="tier-header-description">
                          <p>
                            NFTs per winner: <b>{tier.nftsPerWinner}</b>
                          </p>
                          <p>
                            Winners: <b>{tier.numberOfWinners || ''}</b>
                          </p>
                          <p>
                            Total NFTs: <b>{tier.nfts?.length}</b>
                          </p>
                        </div>
                      </div>
                      <div className="tier-body">
                        {tier.nfts.map((nft) => {
                          const imageUrl = nft.thumbnail_url ? nft.thumbnail_url : '';
                          return (
                            <div className="tier-image" key={uuid()}>
                              <div className="tier-image-second" />
                              <div className="tier-image-first" />
                              <div className="tier-image-main">
                                <div className="amount-of-editions">
                                  <p>{nft.numberOfEditions}</p>
                                </div>
                                <img src={imageUrl} alt={nft.name} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })
      ) : (
        <ActiveAndPastCardSkeleton />
      )}
      {notFound && <NoAuctionsFound title="No past auctions found" />}
      {pastAuctions.length ? (
        <div className="pagination__container">
          <Pagination
            data={pastAuctions}
            perPage={perPage}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PastAuctions;
