import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory, Switch, Redirect, Route } from 'react-router-dom';
import './NewTabs.scss';
import { useAuctionContext } from '../../contexts/AuctionContext';
import AuctionSetupTab from './AuctionSetupTab';

const NewTabs = ({ tabData }) => {
  const tabHeaderElemWidth = 100 / tabData.length;
  const location = useLocation();
  const { pathname } = location;
  const [routesArray, setRoutesArray] = useState([]);
  const { auction, setAuction } = useAuctionContext();

  useEffect(() => {
    const routes = tabData.map((elem) => elem.route);

    setRoutesArray(routes.splice(0, routes.indexOf(pathname) + 1));
  }, [pathname]);

  useEffect(() => {
    if (auction.id >= 0) {
      // if we are Editing Prepare RewardTiers nftSlots property here
      const tiers = auction.rewardTiers;
      if (tiers) {
        tiers.forEach((tier) => {
          // Enter the check if we haven't been here already
          if (tier.nftSlots) return;
          const winnersData = [];

          const nFTsBySlotIndexObject = tier.nfts.reduce((res, curr) => {
            if (!res[curr.slot]) res[curr.slot] = [];
            res[curr.slot].push(curr);
            return res;
          }, {});

          Object.keys(nFTsBySlotIndexObject).forEach((key, index) => {
            const slotNFTs = nFTsBySlotIndexObject[key];

            const nftIds = slotNFTs.map((data) => data.id);

            const slot = tier?.slots?.length && tier.slots.find((s) => s.index === Number(key));
            const minimumBid = slot?.minimumBid || 0;
            winnersData[index] = { slot: index, nftsData: slotNFTs, nftIds, minimumBid };
          });

          // Update the Auction object
          const auctionCopy = { ...auction };
          // Mutate the edited tear
          auctionCopy?.rewardTiers?.forEach((t) => {
            if (t.id === tier.id) {
              t.nftSlots = winnersData;
            }
          });
          // Update the auction
          setAuction(auctionCopy);
        });
      }
    }
  }, []);

  return (
    <div className="new--tab--parent--block">
      <div className="new--tab--container">
        <div className="new--tab--header">
          <div className="tabs--wrapper">
            <ul className="tabs">
              {tabData.map((elem) => (
                <AuctionSetupTab
                  key={elem.id}
                  elem={elem}
                  tabHeaderElemWidth={tabHeaderElemWidth}
                  routesArray={routesArray}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="new--tab--content">
          <Switch>
            {tabData.map((elem, index) => {
              const { route, content } = elem;
              return <Route exact path={route} component={() => content} key={elem.id} />;
            })}
            <Route path="*">
              <Redirect to={tabData.find((elem) => elem.home === true).route} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

NewTabs.propTypes = {
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      labelText: PropTypes.string,
      icon: PropTypes.string,
      iconActive: PropTypes.string,
      route: PropTypes.string,
      content: PropTypes.node,
    })
  ),
};

NewTabs.defaultProps = {
  tabData: [],
};

export default NewTabs;
