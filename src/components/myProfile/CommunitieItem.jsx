import React from 'react';
import PropTypes from 'prop-types';
// import './styles/CommunitieItem.scss';

const CommunitieItem = (props) => {
  const { name, image, members } = props;
  return (
    <div className="communitie--item">
      <div className="img--column">
        <img src={image} alt="img" />
      </div>
      <div className="description--column">
        <p className="name">{name}</p>
        <p className="members">{members} members</p>
      </div>
    </div>
  );
};

CommunitieItem.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  members: PropTypes.number,
};

CommunitieItem.defaultProps = {
  name: '',
  image: '',
  members: 0,
};

export default CommunitieItem;
