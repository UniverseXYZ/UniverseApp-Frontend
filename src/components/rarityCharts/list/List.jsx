import React from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import uuid from 'react-uuid';
import PolymorphCard from './PolymorphCard';
import loadingBg from '../../../assets/images/mint-polymorph-loading-bg.png';
import '../../../containers/rarityCharts/RarityCharsLoader.scss';
import '../../../containers/rarityCharts/RarityCharts.scss';

const List = ({ data, perPage, offset, isLastPage, renderLoaders }) => {
  const sliceData = data.slice(offset, offset + perPage) || [];
  const emptySlots = perPage - sliceData.length || 4;

  return (
    <div className="rarity-charts--list">
      <div className="grid">
        {sliceData.map((item, i) => (
          <PolymorphCard key={uuid()} item={item} index={offset + i + 1} />
        ))}
        {isLastPage ? renderLoaders(emptySlots) : <></>}
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  renderLoaders: PropTypes.func.isRequired,
};

export default List;
