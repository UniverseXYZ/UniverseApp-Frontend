import React from 'react';
import PropTypes from 'prop-types';
import './styles/Tabs.scss';

const Tabs = (props) => {
  const { headerLabels, content, active, onChange } = props;
  return (
    <div className="tabs--parent">
      <div className="tabs--header--labels">
        {headerLabels.map((elem, index) => {
          const key = index.toString();
          return (
            <div
              className={`tab--header--item item--${elem.className} ${
                active === index ? 'active' : ''
              }`}
              aria-hidden="true"
              onClick={() => onChange(index)}
              key={key}
            >
              <h5>{elem.text}</h5>
            </div>
          );
        })}
      </div>
      <div className="tabs--content--section">{content}</div>
    </div>
  );
};

Tabs.propTypes = {
  headerLabels: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      className: PropTypes.string,
    })
  ).isRequired,
  active: PropTypes.number,
  content: PropTypes.node,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  active: 0,
  content: null,
  onChange: () => {},
};

export default Tabs;
