import React from 'react';
import MyProfileContainer from '../../components/myProfile/MyProfileContainer';
import userMockData from '../../utils/fixtures/myProfileUserMockData';
import './MyProfile.scss';

const MyProfile = () => (
  <div className="my--profile--page">
    <MyProfileContainer user={userMockData} />
  </div>
);

export default MyProfile;
