import React from 'react';
import Tags from './Tags';
import collectionAvatar from '../../assets/images/tag-image.svg';

export default {
  title: 'Form/Tags',
  component: Tags,
};

export const Inactive = () => <Tags active={false} imgUrl={collectionAvatar} />;
export const Active = () => <Tags active imgUrl={collectionAvatar} />;
