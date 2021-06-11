import React, { useState, useLayoutEffect, useEffect } from 'react';
import Pagination from '../pagination/Pagionation';
import WrapperCenter from './WrapperCenter';
import PolymorphsActivityTable from './PolymorphsActivityTable';
import PolymorphsActivityTableRow from './PolymorphsActivityTableRow';
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

const PolymorphsActivity = () => {
  const [offset, setOffset] = useState(0);
  const [mobile, setMobile] = useState(false);
  const dataKeys = Object.keys(mockData);

  return (
    <WrapperCenter className="polymorphs--activity--wrapper--center">
      <h2>Recent Polymorphs activity</h2>
      <PolymorphsActivityTable
        className="table--polymorphs--activity"
        tableHead={!mobile ? tableHead : []}
        rows={getRows(mockData, dataKeys.slice(offset, offset + 5))}
      />
      <div className="pagination__container">
        <Pagination data={dataKeys} perPage={5} setOffset={setOffset} />
      </div>
    </WrapperCenter>
  );
};

export default PolymorphsActivity;
