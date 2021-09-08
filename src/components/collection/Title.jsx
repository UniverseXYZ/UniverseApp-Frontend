import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import volumeIcon from '../../assets/images/volume-icon.svg';

const Title = ({ selectedCollection, saved }) => (
  <div className="collection__info">
    <div className="collection__name__desc">
      {/* <h1>{selectedCollection.name}</h1> */}
      <h1 title={selectedCollection.name}>
        {selectedCollection.name.length > 15
          ? `${selectedCollection.name.substring(0, 15)}...`
          : selectedCollection.name}
      </h1>
    </div>
    <h2 className="token">#396430x0966...9d49</h2>
    <div className="item_info">
      <div className="bordered">
        <h1>5.0K</h1>
        <span>items</span>
      </div>
      <div className="bordered">
        <h1>354</h1>
        <span>owners</span>
      </div>
      <div>
        <h1>
          <img src={volumeIcon} alt="icom" /> 343.6
        </h1>
        <span>volume traded</span>
      </div>
    </div>
  </div>
);

Title.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
  saved: PropTypes.bool.isRequired,
};

export default Title;
