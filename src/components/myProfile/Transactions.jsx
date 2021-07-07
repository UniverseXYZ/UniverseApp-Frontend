import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import hrefIcon from '../../assets/images/href.svg';
import './styles/Transactions.scss';

const Transactions = (props) => {
  const { transactions, types } = props;
  const [filterType, setFilterType] = useState(null);
  const [filtersTransactions, setFiltersTransactions] = useState(transactions);

  useEffect(() => {
    if (filterType) {
      const filterTransactions = transactions.filter((elem) => elem.type === filterType);
      setFiltersTransactions(filterTransactions);
    } else setFiltersTransactions(transactions);
  }, [filterType]);

  return (
    <div className="transactions--tab--content">
      <div className="filters--section">
        {types?.map((elem, index) => {
          const key = index.toString();
          return (
            <div
              className={`filter--item item--${elem.className} ${
                filterType === elem.type ? 'active' : ''
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
                  <img src={elem.icon} alt="img" />
                </span>
                {elem.name}
              </h5>
            </div>
          );
        })}
      </div>
      <div className="table--transactions--parent">
        {filtersTransactions?.map((elem, index) => {
          const key = index.toString();
          const { type, name, price, priceType, hoursAgo, image } = elem;
          return (
            <div className="table--item--transactions" key={key}>
              <div className="img--block">
                <img src={image} alt="img" />
              </div>
              <div className="transactions--right--block">
                <div className="transactions--description--block">
                  <h5>{name}</h5>
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
    })
  ),
};

Transactions.defaultProps = {
  transactions: [],
};

export default Transactions;
