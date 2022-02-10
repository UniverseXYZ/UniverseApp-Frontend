import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './AuctionReview.scss';
import './Tiers.scss';
import { format } from 'date-fns';
import infoIcon from '../../assets/images/icon.svg';
import yellowIcon from '../../assets/images/yellowIcon.svg';
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button.jsx';
import CongratsAuctionPopup from '../popups/CongratsAuctionPopup.jsx';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import { AuctionCreate, AuctionUpdate } from '../../userFlows/AuctionCreate';
import { getFutureAuctions } from '../../utils/api/auctions';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import { getBidTypeByValue } from '../../utils/fixtures/BidOptions.js';
import { getTimezoneOffset } from '../../utils/dates';
import AuctionReviewTier from './AuctionReviewTier';

const AuctionReview = () => {
  const { auction, bidtype, options, myAuctions, setMyAuctions } = useAuctionContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const defaultLoadingText =
    'Keep this window opened. Navigating away from the page will reset the current progress.';
  const UTCHoursFromNow = getTimezoneOffset() / -60;
  const location = useLocation();
  const history = useHistory();
  const [hideIcon, setHideIcon] = useState(false);
  const [bidicon, setBidicon] = useState(null);
  const isEditingAuction = myAuctions.filter((a) => a.id === auction.id);
  const [tierOptions, setTierOption] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  useEffect(() => {
    const newTierOptions = [];
    auction.rewardTiers
      .filter((t) => !t.removed)
      .forEach((tier) => {
        const newTiers = tier.nftSlots.map((t) => ({
          value: t.slot,
          label: `Winner #${t.slot + 1}`,
          nftsCount: t.nftIds.length,
        }));
        newTierOptions.push(newTiers);
      });
    setTierOption(newTierOptions);
  }, []);

  useEffect(() => {
    if (!auction.id) {
      history.push('./my-auctions');
    } else {
      const bidIcon = getBidTypeByValue(bidtype, options).img;
      setBidicon(bidIcon);
    }
  }, []);

  const handleSetAuction = async () => {
    if (auction && auction?.rewardTiers?.length) {
      setShowLoading(true);
      let res;
      if (isEditingAuction.length) {
        try {
          res = await AuctionUpdate({ auction, bidtype, options });
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          res = await AuctionCreate({ auction, bidtype, options });
        } catch (error) {
          console.error(error);
        }
      }

      setShowLoading(false);
      if (res?.id) {
        setShowCongrats(true);
      } else if (res?.error || res?.statusCode >= 500) {
        // document.getElementById('congrats-hidden-btn').click();
        const errorMsg =
          (res?.errors?.length && res.errors[0]?.message) ||
          'Failed to update/create auction, please try again in few minutes!';

        setShowError(true);
        setErrorTitle('An error occured!');
        setErrorBody(errorMsg);
      }
    }
  };

  const handleAuctionPopupSuccess = async () => {
    const futureAuctionResponse = await getFutureAuctions();
    setMyAuctions(futureAuctionResponse?.auctions || []);
  };

  const startDate = format(new Date(auction.startDate), 'MMMM dd, yyyy, HH:mm');
  const endDate = format(new Date(auction.endDate), 'MMMM dd, yyyy, HH:mm');

  return (
    <div className="container auction-reward">
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup text={defaultLoadingText} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showCongrats}>
        <CongratsAuctionPopup onClose={handleAuctionPopupSuccess} />
      </Popup>
      <div>
        <div className="head-part">
          <h2 className="tier-title">Review auction</h2>
          <p>Review the auction settings and reward tiers</p>
        </div>

        <div className="auction-settings-head">
          <h2 className="auction-settings-title">Auction settings</h2>
          <button
            type="button"
            className="edit-auction-settings"
            onClick={() => {
              history.push('/setup-auction/auction-settings', auction.id);
            }}
          >
            Edit <img src={pencil} alt="edit-icon" />
          </button>
        </div>
        <div className="auction-inf">
          <div className="name-bid">
            <div className="tName">
              <p>Auction name</p>
              <span>{auction.name}</span>
            </div>
            <div className="startDate">
              <p>Start date</p>
              <span>
                {startDate} UTC{UTCHoursFromNow > 0 ? `+${UTCHoursFromNow}` : UTCHoursFromNow}
              </span>
            </div>
          </div>
          <div className="date-part">
            <div className="bid-part">
              <div className="bidToken">
                <p>Bid token (ERC-20)</p>
                <span className="bidtype">
                  {bidicon && <img src={bidicon} alt="icon" />}
                  {bidtype}
                </span>
              </div>
            </div>
            <div className="endDate">
              <p>End date</p>
              <span>
                {endDate} UTC{UTCHoursFromNow > 0 ? `+${UTCHoursFromNow}` : UTCHoursFromNow}
              </span>
              <span className="auction-ext">
                Ending auction extension timer: 5 minutes
                <img
                  src={infoIcon}
                  alt="Info Icon"
                  onMouseOver={() => setHideIcon(true)}
                  onFocus={() => setHideIcon(true)}
                  onMouseLeave={() => setHideIcon(false)}
                  onBlur={() => setHideIcon(false)}
                />
                {hideIcon && (
                  <div className="info-text">
                    <p>
                      Any bid in the last 5 minutes of an auction will extend the auction for an
                      additional 5 minutes.
                    </p>
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>

        {auction.royaltySplits &&
          auction.royaltySplits.length &&
          auction.royaltySplits
            .map((item) => item.address !== '' && item.percentAmount !== '')
            .find((element) => element) && (
            <div className="royalty-settings-head">
              <h2 className="royalty-settings-title">Royalty splits</h2>
            </div>
          )}

        {auction.royaltySplits && auction.royaltySplits.length && (
          <div className="royalty-inf">
            {auction.royaltySplits.map(
              (item) =>
                item.address &&
                item.percentAmount && (
                  <div key={item.address} className="royalty">
                    <p>{item.address}</p>
                    <span>{item.percentAmount}%</span>
                  </div>
                )
            )}
          </div>
        )}

        <div className="reward-tiers-head">
          <h2 className="reward-tiers-title">Reward tiers</h2>
          <button
            type="button"
            className="edit-reward-tiers"
            onClick={() => {
              history.push('/setup-auction/reward-tiers');
            }}
          >
            Edit <img src={pencil} alt="edit-icon" />
          </button>
        </div>
        {auction?.rewardTiers
          ?.filter((t) => !t.removed)
          .map((tier, index) => (
            <AuctionReviewTier
              tier={tier}
              tierOptions={tierOptions[index]}
              bidToken={bidtype.toUpperCase()}
            />
          ))}
      </div>
      <div className="message">
        <span>
          <img src={yellowIcon} alt="icon" />
        </span>
        <h1>
          Creating an auction doesn’t launch it. You will be able to deposit all the NFTs and set up
          a landing page to host your launch. Once you launch anyone can start bidding.
        </h1>
      </div>
      <div className="btn-div">
        <Button
          className="light-border-button"
          onClick={() =>
            history.push({
              pathname: '/setup-auction/reward-tiers',
              state: location.state === 'edit' ? location.state : true,
            })
          }
        >
          Back
        </Button>
        {isEditingAuction.length ? (
          <Button className="light-button" onClick={handleSetAuction}>
            Save changes
          </Button>
        ) : (
          <Button className="light-button" onClick={handleSetAuction}>
            Set up auction
          </Button>
        )}
      </div>
    </div>
  );
};
export default AuctionReview;
