import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
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

const AuctionSetupTab = ({ elem, tabHeaderElemWidth, routesArray }) => {
  const { labelText, icon, iconActive, route } = elem;
  const { state, pathname } = useLocation();
  const history = useHistory();

  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (Number(window.innerWidth) <= 768) setMobile(true);
    else setMobile(false);

    if (Number(window.innerWidth) > 768 && Number(window.innerWidth) <= 1230) setTablet(true);
    else setTablet(false);
  }, []);

  const className =
    pathname === route
      ? 'active'
      : routesArray.includes(route) || state === 'edit'
      ? 'verification--step--tab'
      : 'disabled';

  const arrowBlack = mobile ? arrowBlackMobile : tablet ? arrowBlackTablet : arrowBlackDesktop;
  const arrowGrey = mobile ? arrowGreyMobile : tablet ? arrowGreyTablet : arrowGreyDesktop;
  const arrowWhite = mobile ? arrowWhiteMobile : tablet ? arrowWhiteTablet : arrowWhiteDesktop;
  const arrowHover = mobile ? arrowHoverMobile : tablet ? arrowHoverTablet : arrowHoverDesktop;
  const srcArrowTab =
    pathname === route ? arrowBlack : routesArray.includes(route) ? arrowWhite : arrowGrey;
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
            state: state === 'edit' ? state : true,
          });
        }
      }}
      key={elem.id}
      style={{
        width: `${tabHeaderElemWidth}%`,
        left: '0',
      }}
      onMouseOver={() => {
        if (srcArrowTab === arrowWhite) setHover(true);
      }}
      onFocus={() => {
        if (srcArrowTab === arrowWhite) setHover(true);
      }}
      onMouseOut={() => setHover(false)}
      onBlur={() => setHover(false)}
    >
      <img className="arrow--tab" src={!hover ? srcArrowTab : arrowHover} alt="Arrow Tab" />
      <li className={className}>
        <div>
          <img src={route === pathname ? iconActive : icon} alt={labelText} />
          {labelText}
        </div>
      </li>
    </div>
  );
};

AuctionSetupTab.propTypes = {
  elem: PropTypes.oneOfType([PropTypes.object]).isRequired,
  routesArray: PropTypes.oneOfType([PropTypes.array]).isRequired,
  tabHeaderElemWidth: PropTypes.number.isRequired,
};
export default AuctionSetupTab;
