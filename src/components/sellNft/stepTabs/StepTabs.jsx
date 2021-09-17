import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import './StepTabs.scss';

const StepTabs = (props) => {
  const { tabData, verificationSteps, required } = props;
  const [activeTabIndex, setActiveTabIndex] = useState(-1);
  const history = useHistory();
  const location = useLocation();
  const [homeTabIndex] = useState(tabData.find((elem) => elem.home).index);

  useEffect(() => {
    const activeTab = tabData.find((elem) => elem.link === location.pathname);
    if (activeTab) {
      setActiveTabIndex(activeTab.index);
      if (required && activeTab.index > verificationSteps) {
        setActiveTabIndex(verificationSteps);
        history.push(tabData[verificationSteps].link);
      }
    }
  }, []);
  return (
    <div className="step--tabs--container--parent">
      <WrapperCenter className="step--tabs--container">
        <div className="tabs__section">
          <div className="tabs container">
            <div className="tabs__wrapper">
              <div className="tabs">
                <div className="tab_items">
                  {tabData.map((item) => {
                    const { label, link, index, icon, activeIcon } = item;
                    return (
                      <div
                        style={{ width: `${Math.floor(100 / tabData.length)}%` }}
                        key={index.toString()}
                        id="tabsdiv"
                        aria-hidden="true"
                        onClick={() => {
                          if (required) {
                            if (verificationSteps >= index) history.push(link);
                          } else {
                            history.push(link);
                          }
                        }}
                        className={
                          activeTabIndex === index
                            ? 'active'
                            : verificationSteps >= index && required
                            ? ''
                            : 'disabled'
                        }
                      >
                        <span className="first-triangle" />
                        <button type="button">
                          <img src={activeTabIndex === index ? activeIcon : icon} alt="img" />
                          {label}
                        </button>
                        <span className="last-triangle third" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="tab__content">
              <Switch>
                {tabData.map((elem) => {
                  const { link, content } = elem;
                  return <Route path={link} component={() => content} key={link} />;
                })}
                <Route path="*">
                  <Redirect to={tabData[homeTabIndex].link} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </WrapperCenter>
    </div>
  );
};

StepTabs.propTypes = {
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      activeIcon: PropTypes.string,
      link: PropTypes.string,
      index: PropTypes.number,
      label: PropTypes.string,
      content: PropTypes.node,
      home: PropTypes.bool,
    })
  ).isRequired,
  verificationSteps: PropTypes.number,
  required: PropTypes.bool,
};

StepTabs.defaultProps = {
  verificationSteps: 0,
  required: false,
};

export default StepTabs;
