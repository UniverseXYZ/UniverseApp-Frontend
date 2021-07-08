import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination/Pagionation';
import Button from '../button/Button';
import hrefIcon from '../../assets/images/href.svg';
import listingWhiteIcon from '../../assets/images/my-profile/types-icons/listings-white-icon.svg';
import saleWhiteIcon from '../../assets/images/my-profile/types-icons/sales-white-icon.svg';
import transferWhiteIcon from '../../assets/images/my-profile/types-icons/transferrs-white-icon.svg';
import offerWhiteIcon from '../../assets/images/my-profile/types-icons/offer-white-icon.svg';
import burnWhiteIcon from '../../assets/images/my-profile/types-icons/burn-white-icon.svg';
import './styles/Transactions.scss';

const icons = [
  { name: 'listing', icon: listingWhiteIcon, text: 'Listed by' },
  { name: 'sale', icon: saleWhiteIcon, text: 'Sold to' },
  { name: 'transfer', icon: transferWhiteIcon, text: 'Transferred to' },
  { name: 'offer', icon: offerWhiteIcon, text: 'Offer from' },
  { name: 'burn', icon: burnWhiteIcon, text: 'Burnt by' },
];

const Transactions = (props) => {
  const { transactions, types, emptyContentText, btnText, btnOnClick } = props;
  const [filterType, setFilterType] = useState(null);
  const [filtersTransactions, setFiltersTransactions] = useState(transactions);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (filterType) {
      const filterTransactions = transactions.filter((elem) => elem.type === filterType);
      setFiltersTransactions(filterTransactions);
    } else {
      setFiltersTransactions(transactions);
    }
    setOffset(0);
  }, [filterType]);

  return (
    <div className="transactions--tab--content">
      {!!transactions.length && (
        <>
          <div className="filters--section">
            {types?.map((elem, index) => {
              const key = index.toString();
              return (
                <div
                  className={`filter--item ${
                    filterType === elem.type ? `active--${elem.className}` : ''
                  }`}
                  key={key}
                  aria-hidden="true"
                  onClick={() => {
                    if (filterType !== elem.type) setFilterType(elem.type);
                    else setFilterType(null);
                  }}
                >
                  <h5>
                    <span className="icon">
                      <img
                        src={
                          elem.type === filterType
                            ? icons.find((el) => el.name === elem.type).icon
                            : elem.icon
                        }
                        alt="img"
                      />
                    </span>
                    {elem.name}
                  </h5>
                </div>
              );
            })}
          </div>
          <div className="table--transactions--parent">
            {filtersTransactions?.slice(offset, offset + 4).map((elem, index) => {
              const key = index.toString();
              const { type, name, price, priceType, hoursAgo, image, userName } = elem;
              const findType = icons.find((el) => el.name === type);
              return (
                <div className="table--item--transactions" key={key}>
                  <div className="img--block">
                    <img src={image} alt="img" />
                  </div>
                  <div className="transactions--right--block">
                    <div className="transactions--description--block">
                      <h5>{name}</h5>
                      <div className="center--row">
                        <div className={`icon icon--${type}`}>
                          <img src={findType.icon} alt="img" />
                        </div>
                        <p>
                          {findType.text}
                          <span className="user--name">{userName}</span>
                          for
                          <span className="price">
                            {price} {priceType}
                          </span>
                        </p>
                      </div>
                      <p className="hours--ago">{hoursAgo} hours ago</p>
                    </div>
                    <div className="view--on--etherscan">
                      <img src={hrefIcon} alt="img" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination__container">
            <Pagination data={filtersTransactions} perPage={4} setOffset={setOffset} />
          </div>
        </>
      )}
      {!transactions.length && (
        <div className="empty--transactions--content">
          <h3>{emptyContentText}</h3>
          <Button type="button" className="light-button" onClick={btnOnClick}>
            {btnText}
          </Button>
        </div>
      )}
    </div>
  );
};

Transactions.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      className: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      price: PropTypes.number,
      priceTypes: PropTypes.string,
      hoursAgo: PropTypes.number,
      image: PropTypes.string,
      userName: PropTypes.string,
    })
  ),
  emptyContentText: PropTypes.string,
  btnText: PropTypes.string,
  btnOnClick: PropTypes.func,
};

Transactions.defaultProps = {
  transactions: [],
  emptyContentText: '',
  btnText: 'Add',
  btnOnClick: () => {},
};

export default Transactions;
