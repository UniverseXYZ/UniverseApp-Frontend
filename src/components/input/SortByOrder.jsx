import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SortDownIcon from '../../assets/images/rarity-charts/sortDownIcon.svg';
import SortUpIcon from '../../assets/images/rarity-charts/sortUpIcon.svg';
import './SortByOrder.scss';

const SortByOrder = (props) => {
  const { data, getData, getDesc } = props;
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    const sortedData = desc ? data.sort((a, b) => b.id - a.id) : data.sort((a, b) => a.id - b.id);
    getData([...sortedData]);
    getDesc(desc);
  }, [desc]);

  return (
    <div className="sort--by--order" aria-hidden="true" onClick={() => setDesc(!desc)}>
      <div className="sort--by--order--icon">
        <img src={desc ? SortDownIcon : SortUpIcon} alt={desc ? 'Arrow Down' : 'Arrow Up'} />
      </div>
      <div className="box--shadow--effect--block" />
    </div>
  );
};

SortByOrder.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  getData: PropTypes.func,
  getDesc: PropTypes.func,
};

SortByOrder.defaultProps = {
  data: [],
  getData: () => {},
  getDesc: () => {},
};

export default SortByOrder;
