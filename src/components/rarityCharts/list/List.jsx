import React from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import uuid from 'react-uuid';
import PolymorphCard from './PolymorphCard';

const List = ({ data, perPage, offset }) => {
  const sliceData = data.slice(offset, offset + perPage);

  return (
    <div className="rarity-charts--list">
      <div className="grid">
        {sliceData.map((item) => (
          <PolymorphCard key={uuid()} item={item} />
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

export default List;
