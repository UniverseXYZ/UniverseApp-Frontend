import React from 'react';
import PropTypes from 'prop-types';
import WrapperCenter from '../polymorphs/WrapperCenter';
import CoverPhoto from './CoverPhoto';
import UserDataBlock from './UserDataBlock';
import MyCommunities from './MyCommunities';
import './styles/MyProfileContainer.scss';

const MyProfileContainer = (props) => {
  const { user } = props;
  const { coverPhoto, name, avatar, uid, following, followers, about, communities } = user;
  console.log(user);
  return (
    <div className="my--profile--container">
      <CoverPhoto coverPhoto={coverPhoto} />
      <WrapperCenter className="my--profile--wrapper">
        <div className="left--column">
          <UserDataBlock
            name={name}
            avatar={avatar}
            uid={uid}
            following={following}
            followers={followers}
            about={about}
          />
          <MyCommunities communities={communities} />
        </div>
        <div className="right--column">
          <h1>right</h1>
        </div>
      </WrapperCenter>
    </div>
  );
};

MyProfileContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
    following: PropTypes.number,
    followers: PropTypes.number,
    about: PropTypes.string,
    avatar: PropTypes.string,
    coverPhoto: PropTypes.string,
    communities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        members: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default MyProfileContainer;
