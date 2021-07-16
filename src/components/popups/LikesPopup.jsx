import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import closeIcon from '../../assets/images/close-menu.svg';
import userPic from '../../assets/images/marketplace/users/user2.png';

const LikesPopup = ({ onClose }) => {
  const users = [
    { name: 'User name 1', photo: userPic },
    { name: 'User name 2', photo: userPic },
    { name: 'User name 3', photo: userPic },
    { name: 'User name 4', photo: userPic },
    { name: 'User name 5', photo: userPic },
    { name: 'User name 6', photo: userPic },
    { name: 'User name 7', photo: userPic },
    { name: 'User name 8', photo: userPic },
    { name: 'User name 9', photo: userPic },
    { name: 'User name 10', photo: userPic },
    { name: 'User name 11', photo: userPic },
    { name: 'User name 12', photo: userPic },
    { name: 'User name 13', photo: userPic },
    { name: 'User name 14', photo: userPic },
    { name: 'User name 15', photo: userPic },
    { name: 'User name 16', photo: userPic },
    { name: 'User name 17', photo: userPic },
    { name: 'User name 18', photo: userPic },
    { name: 'User name 19', photo: userPic },
    { name: 'User name 20', photo: userPic },
    { name: 'User name 21', photo: userPic },
    { name: 'User name 22', photo: userPic },
    { name: 'User name 23', photo: userPic },
    { name: 'User name 24', photo: userPic },
  ];
  return (
    <div className="likes__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <div className="liked__users">
        <h2>Likes:24</h2>
        <div className="liked__users__list">
          {users.map((user, i) => (
            <div className="liked__user" key={uuid()}>
              <img src={user.photo} alt="User" />
              <h4>{user.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

LikesPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default LikesPopup;
