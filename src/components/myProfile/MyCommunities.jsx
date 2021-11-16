import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommunitieItem from './CommunitieItem';
// import './styles/MyCommunities.scss';

const MyCommunities = (props) => {
  const { communities } = props;
  const [showCount, setShowCount] = useState(3);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) setShowCount(communities.length);
    else setShowCount(3);
  }, [toggle]);

  return (
    <div className="my--profile--communities" style={toggle ? { height: '350px' } : {}}>
      <div className="title--section">
        <h5>My communities </h5>
        <p aria-hidden="true" onClick={() => setToggle(!toggle)}>
          Show all
        </p>
      </div>
      <div className="communities--content">
        {communities.slice(0, showCount).map((elem, ind) => {
          const key = ind.toString();
          return <CommunitieItem key={key} {...elem} />;
        })}
      </div>
    </div>
  );
};

MyCommunities.propTypes = {
  communities: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, image: PropTypes.string, members: PropTypes.number })
  ),
};

MyCommunities.defaultProps = {
  communities: [],
};

export default MyCommunities;
