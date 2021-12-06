import { Flex, FlexProps, Image } from '@chakra-ui/react';
import React from 'react';

import audioIcon from '../../../../../../../assets/images/marketplace/audio-icon.svg';
import videoIcon from '../../../../../../../assets/images/marketplace/video-icon.svg';

interface IMediaIconProps extends FlexProps {
  icon: any;
}

const MediaLabel = ({ icon, ...rest }: IMediaIconProps) => (
  <Flex
    bg={'rgba(0, 0, 0, 0.1)'}
    borderRadius={'4px'}
    ml={'4px'}
    p={'5px'}
    h={'20px'}
    w={'20px'}
    {...rest}
  >
    <Image src={icon} />
  </Flex>
);



export const AudioLabel = () => <MediaLabel icon={audioIcon} />;
export const VideoLabel = () => <MediaLabel icon={videoIcon} />;
