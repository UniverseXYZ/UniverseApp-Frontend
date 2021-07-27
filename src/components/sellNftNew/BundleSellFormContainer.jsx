import React from 'react';
import PropTypes from 'prop-types';
import BundleSellForm from './BundleSellForm';
import SelectNfts from './SelectNfts';
import './styles/BundleSellFormContainer.scss';

const BundleSellFormContainer = (props) => {
  console.log(props);
  return (
    <div className="bundle--sell--container">
      <BundleSellForm />
      <SelectNfts />
    </div>
  );
};

export default BundleSellFormContainer;
