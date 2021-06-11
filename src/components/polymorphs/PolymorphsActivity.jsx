import React, { useState, useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination/Pagionation';
import WrapperCenter from './WrapperCenter';
import PolymorphsActivityTable from './PolymorphsActivityTable';
import PolymorphsActivityTableRow from './PolymorphsActivityTableRow';
import PolymorphsActivityTableRowMobile from './PolymorphsActivityTableRowMobile';
import './styles/PolymorphsActivity.scss';
import mockData from '../../__mockData/recentPolymorphsActivity';

const tableHead = [
  { labelText: '', className: '' },
  { labelText: 'Name', className: '' },
  { labelText: 'Base Skin', className: '' },
  { labelText: 'Event', className: '' },
  { labelText: 'Price', className: '' },
];

const getRows = (dataObject, dataKeys) =>
  dataKeys.map((elem, index) => {
    const item = dataObject[elem];
    return <PolymorphsActivityTableRow data={item} key={index.toString()} />;
  });

const PolymorphsActivity = (props) => {
  const { mobile } = props;
  const [offset, setOffset] = useState(0);
  const dataKeys = Object.keys(mockData);

  return (
    <WrapperCenter className="polymorphs--activity--wrapper--center">
      <h2>Recent Polymorphs activity</h2>
      {!mobile && (
        <PolymorphsActivityTable
          className="table--polymorphs--activity"
          tableHead={!mobile ? tableHead : []}
          rows={getRows(mockData, dataKeys.slice(offset, offset + 5))}
        />
      )}
      {mobile && (
        <div className="mobile--table--polymorphs--activity">
          {dataKeys.slice(offset, offset + 5).map((elem, index) => {
            const item = mockData[elem];
            return <PolymorphsActivityTableRowMobile data={item} key={index.toString()} />;
          })}
        </div>
      )}
      <div className="pagination__container">
        <Pagination data={dataKeys} perPage={5} setOffset={setOffset} />
      </div>
    </WrapperCenter>
  );
};

PolymorphsActivity.propTypes = {
  mobile: PropTypes.bool,
};

PolymorphsActivity.defaultProps = {
  mobile: false,
};

export default PolymorphsActivity;
