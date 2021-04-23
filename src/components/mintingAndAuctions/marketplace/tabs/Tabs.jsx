import { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab';

const Tabs = (props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (props.location.pathname === '/minting-and-auctions/marketplace/active-auctions') {
      setSelectedTabIndex(0);
    } else if (props.location.pathname === '/minting-and-auctions/marketplace/future-auctions') {
      setSelectedTabIndex(1);
    }
  }, []);

  return (
    <div className="tabs__section">
      <div className="tabs__section__container">
        <div className="tabs">
          <button
            onClick={() => {
              setSelectedTabIndex(0);
              history.push('/minting-and-auctions/marketplace/active-auctions');
            }}
            className={selectedTabIndex === 0 ? 'active' : ''}
          >
            Active auctions
          </button>
          <button
            onClick={() => {
              setSelectedTabIndex(1);
              history.push('/minting-and-auctions/marketplace/future-auctions');
            }}
            className={selectedTabIndex === 1 ? 'active' : ''}
          >
            Future auctions
          </button>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 ? <ActiveAuctionsTab /> : <FutureAuctionsTab />}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tabs);
