import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import downIcon from '../../assets/images/browse-nft-arrow-down.svg';
import './styles/RightBlockTopLinks.scss';

const RightBlockTopLinks = (props) => {
  const { links } = props;
  const [itemWidth, setItemWidth] = useState(100);

  useEffect(() => {
    const linkLength = links.length;
    const widthItem = 100 / linkLength - (linkLength - 1) * 20;
    setItemWidth(widthItem);
  }, []);

  return (
    <div className="links--section">
      {links.map((elem, index) => {
        const key = index.toString();
        return (
          <div key={key} className="links--item--parent" style={{ width: `${itemWidth}%` }}>
            <div className={`links--item item--${elem.className}`}>
              <Link to={elem.href}>
                <span className="icon">
                  {!!elem.icon.length && <img src={elem.icon} alt="img" />}
                </span>
                {elem.text}
              </Link>
              <span className="right--icon">
                <img src={downIcon} alt="img" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

RightBlockTopLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      className: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
};

RightBlockTopLinks.defaultProps = {
  links: [],
};

export default RightBlockTopLinks;
