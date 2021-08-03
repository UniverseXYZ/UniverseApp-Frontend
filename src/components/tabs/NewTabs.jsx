import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory, Switch, Redirect, Route } from 'react-router-dom';
import './NewTabs.scss';

const NewTabs = (props) => {
  const { tabData } = props;
  const tabHeaderElemWidth = 100 / tabData.length;
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const [routesArray, setRoutesArray] = useState([]);
  useEffect(() => {
    const routes = tabData.map((elem) => elem.route);
    setRoutesArray(routes.splice(0, routes.indexOf(pathname) + 1));
  }, [pathname]);
  console.log(routesArray);
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
                    : routesArray.includes(route)
                    ? 'verification--step--tab'
                    : 'disabled';
                const leftPosition = 6;
                return (
                  <div
                    className={`tab--item--parent--element ${
                      className === 'verification--step--tab' ? 'verif--tab--parent' : ``
                    }`}
                    aria-hidden="true"
                    onClick={() => {
                      if (className !== 'disabled') {
                        history.push(route);
                      }
                    }}
                    key={index.toString()}
                    style={{
                      width: `${tabHeaderElemWidth}%`,
                      left: `-${leftPosition * index}px`,
                    }}
                  >
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
