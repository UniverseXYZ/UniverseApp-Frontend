import uuid from 'react-uuid';
import React from 'react';
import PropTypes from 'prop-types';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import tabArrow from '../../assets/images/tab-arrow.svg';
import './Tabs.scss';

const Tabs = ({ items }) => (
  <div className="container tabs__wrapper">
    <div className="tab__left__arrow">
      <img
        onClick={handleTabLeftScrolling}
        aria-hidden="true"
        src={tabArrow}
        alt="Tab left arrow"
      />
    </div>
    <div className="tabs">
      <ul className="tab_items">
        {items.map((tab, index) =>
          tab.name !== 'Hidden' && tab.name !== 'Liked' ? (
            <li
              key={uuid()}
              className={tab.active ? 'active' : ''}
              aria-hidden="true"
              onClick={() => tab.handler && tab.handler(index, tab.name)}
            >
              {tab.label ? (
                <div className="notification">
                  {tab.name}
                  <span>{tab.label}</span>
                </div>
              ) : (
                <>
                  {tab.name} {tab.length && `(${tab.length})`}
                </>
              )}
            </li>
          ) : tab.length ? (
            <li
              key={uuid()}
              className={tab.active ? 'active' : ''}
              aria-hidden="true"
              onClick={() => tab.handler && tab.handler(index, tab.name)}
            >
              {tab.label ? (
                <div className="notification">
                  {tab.name}
                  <span>{tab.label}</span>
                </div>
              ) : (
                <>
                  {tab.name} {tab.length && `(${tab.length})`}
                </>
              )}
            </li>
          ) : (
            <></>
          )
        )}
      </ul>
    </div>
    <div className="tab__right__arrow">
      <img
        onClick={handleTabRightScrolling}
        aria-hidden="true"
        src={tabArrow}
        alt="Tab right arrow"
      />
    </div>
  </div>
);

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      handler: PropTypes.func,
      active: PropTypes.bool.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default Tabs;
