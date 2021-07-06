import uuid from 'react-uuid';
import userCoverPhoto from '../../assets/images/my-profile-cover-photo.png';
import userAvatar from '../../assets/images/my-profile-avatar.png';
import CryptoPunks from '../../assets/images/my-profile/my-communities/communitie1.png';
import CommunityVerified from '../../assets/images/my-profile/my-communities/communitie2.png';
import MeetCommunityVerified from '../../assets/images/my-profile/my-communities/communitie3.png';

export default {
  coverPhoto: userCoverPhoto,
  name: 'Justin 3LAU',
  avatar: userAvatar,
  uid: uuid(),
  following: 58,
  followers: 79,
  about: `
  Cras vel eget vitae quis scelerisque arcu ut. Tristique velit nec sed sit massa. Odio molestie velit purus at blandit. Lacus.`,
  communities: [
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'Meet Community Verified', image: CommunityVerified, members: 10622 },
    { name: 'Meet Community Verified', image: MeetCommunityVerified, members: 10622 },
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'Meet Community Verified', image: CommunityVerified, members: 10622 },
    { name: 'Meet Community Verified', image: MeetCommunityVerified, members: 10622 },
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'Meet Community Verified', image: MeetCommunityVerified, members: 10622 },
  ],
};
