import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from './Tabs';
import Transactions from './Transactions';
import listingsIcon from '../../assets/images/my-profile/types-icons/listings-icon.svg';
import salesIcon from '../../assets/images/my-profile/types-icons/sales-icon.svg';
import transferrsIcon from '../../assets/images/my-profile/types-icons/transferrs-icon.svg';
import offersIcon from '../../assets/images/my-profile/types-icons/offer-icon.svg';
import burnsIcon from '../../assets/images/my-profile/types-icons/burn-icon.svg';
import './styles/RecentActivity.scss';

const headerLabels = [
  { text: 'Posts', className: 'posts' },
  { text: 'Transactions', className: 'transactions' },
  { text: 'Liked', className: 'liked' },
];

const types = [
  { name: 'listings', type: 'listing', className: 'listings', icon: listingsIcon },
  { name: 'sales', type: 'sale', className: 'sales', icon: salesIcon },
  { name: 'transferrs', type: 'transfer', className: 'transferrs', icon: transferrsIcon },
  { name: 'offers', type: 'offer', className: 'offers', icon: offersIcon },
  { name: 'burns', type: 'burn', className: 'burns', icon: burnsIcon },
];

const RecentActivity = (props) => {
  const { posts, transactions, liked } = props;
  const [activeTab, setActiveTab] = useState(1);
  const contents = [
    { index: 0, content: <h5>coming soon posts</h5> },
    { index: 1, content: <Transactions types={types} transactions={transactions} /> },
    { index: 2, content: <h5>coming soon liked</h5> },
  ];
  return (
    <div className="recent--activity--section">
      <h1 className="title">Recent activity</h1>
      <Tabs
        headerLabels={headerLabels}
        active={activeTab}
        onChange={setActiveTab}
        content={contents.find((elem) => elem.index === activeTab).content}
      />
    </div>
  );
};

RecentActivity.propTypes = {
  posts: PropTypes.string,
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
  liked: PropTypes.string,
};

RecentActivity.defaultProps = {
  posts: '',
  transactions: [],
  liked: '',
};

export default RecentActivity;
