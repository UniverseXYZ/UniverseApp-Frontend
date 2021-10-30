import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory, Switch, Redirect, Route } from 'react-router-dom';
import './NewTabs.scss';
import arrowBlackDesktop from '../../assets/images/arrow-tabs/arrow-black-desktop.png';
import arrowBlackTablet from '../../assets/images/arrow-tabs/arrow-black-tablet.png';
import arrowBlackMobile from '../../assets/images/arrow-tabs/arrow-black-mobile.png';
import arrowGreyDesktop from '../../assets/images/arrow-tabs/arrow-grey-desktop.png';
import arrowGreyTablet from '../../assets/images/arrow-tabs/arrow-grey-tablet.png';
import arrowGreyMobile from '../../assets/images/arrow-tabs/arrow-grey-mobile.png';
import arrowWhiteDesktop from '../../assets/images/arrow-tabs/arrow-white-desktop.png';
import arrowWhiteTablet from '../../assets/images/arrow-tabs/arrow-white-tablet.png';
import arrowWhiteMobile from '../../assets/images/arrow-tabs/arrow-white-mobile.png';
import arrowHoverDesktop from '../../assets/images/arrow-tabs/arrow-hover-desktop.png';
import arrowHoverTablet from '../../assets/images/arrow-tabs/arrow-hover-tablet.png';
import arrowHoverMobile from '../../assets/images/arrow-tabs/arrow-hover-mobile.png';
import { useAuctionContext } from '../../contexts/AuctionContext';

const NewTabs = (props) => {
  const { tabData } = props;
  const tabHeaderElemWidth = 100 / tabData.length;
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const [routesArray, setRoutesArray] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [hover, setHover] = useState(-1);
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

            winnersData[index] = { slot: index, nftsData: slotNFTs, nftIds };
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

  useEffect(() => {
    if (Number(window.innerWidth) <= 768) setMobile(true);
    else setMobile(false);

    if (Number(window.innerWidth) > 768 && Number(window.innerWidth) <= 1230) setTablet(true);
    else setTablet(false);
  }, []);

  return (
    <div className="new--tab--parent--block">
      <div className="new--tab--container">
        <div className="new--tab--header">
          <div className="tabs--wrapper">
            <ul className="tabs">
              {tabData.map((elem, index) => {
                const { labelText, icon, iconActive, route } = elem;
                const className =
                  pathname === route
                    ? 'active'
                    : routesArray.includes(route) || location.state === 'edit'
                    ? 'verification--step--tab'
                    : 'disabled';
                const arrowBlack = mobile
                  ? arrowBlackMobile
                  : tablet
                  ? arrowBlackTablet
                  : arrowBlackDesktop;
                const arrowGrey = mobile
                  ? arrowGreyMobile
                  : tablet
                  ? arrowGreyTablet
                  : arrowGreyDesktop;
                const arrowWhite = mobile
                  ? arrowWhiteMobile
                  : tablet
                  ? arrowWhiteTablet
                  : arrowWhiteDesktop;
                const arrowHover = mobile
                  ? arrowHoverMobile
                  : tablet
                  ? arrowHoverTablet
                  : arrowHoverDesktop;
                const srcArrowTab =
                  pathname === route
                    ? arrowBlack
                    : routesArray.includes(route)
                    ? arrowWhite
                    : arrowGrey;
                let src;
                const leftPosition = 6;
                return (
                  <div
                    className={`tab--item--parent--element ${
                      className === 'verification--step--tab' ? 'verif--tab--parent' : ``
                    }${className === 'active' ? 'active--tab--parent' : ``}`}
                    aria-hidden="true"
                    onClick={() => {
                      if (className !== 'disabled') {
                        history.push({
                          pathname: route,
                          state: location.state === 'edit' ? location.state : true,
                        });
                      }
                    }}
                    key={index.toString()}
                    style={{
                      width: `${tabHeaderElemWidth}%`,
                      left: '0',
                    }}
                    onMouseOver={() => {
                      if (srcArrowTab === arrowWhite) setHover(index);
                    }}
                    onFocus={() => {
                      if (srcArrowTab === arrowWhite) setHover(index);
                    }}
                    onMouseOut={() => {
                      setHover(-1);
                    }}
                    onBlur={() => {
                      setHover(-1);
                    }}
                  >
                    <img
                      className="arrow--tab"
                      src={hover !== index ? srcArrowTab : arrowHover}
                      alt="Arrow Tab"
                    />
                    <li className={className}>
                      <div>
                        <img src={route === pathname ? iconActive : icon} alt={labelText} />
                        {labelText}
                      </div>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="new--tab--content">
          <Switch>
            {tabData.map((elem, index) => {
              const { route, content } = elem;
              return <Route exact path={route} component={() => content} key={index.toString()} />;
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
