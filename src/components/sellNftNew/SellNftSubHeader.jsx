import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WrapperCenter from '../polymorphs/WrapperCenter';
import backPageIcon from '../../assets/images/arrow.svg';
import './styles/SellNftSubHeader.scss';

const SellNftSubHeader = (props) => {
  const { title, backPageName, backPageLink } = props;

  return (
    <div className="sell--nft--page--header">
      <WrapperCenter>
        <div className="back--page--section">
          <Link to="/my-nfts">
            <img src={backPageIcon} alt="img" />
            <span className="back--page--name">{backPageName}</span>
          </Link>
        </div>
        <div className="subheader--title--section">
          <p>{title}</p>
        </div>
      </WrapperCenter>
    </div>
  );
};

SellNftSubHeader.propTypes = {
  title: PropTypes.string,
  backPageLink: PropTypes.string,
  backPageName: PropTypes.string,
};

SellNftSubHeader.defaultProps = {
  title: '',
  backPageName: '',
  backPageLink: undefined,
};

export default SellNftSubHeader;
