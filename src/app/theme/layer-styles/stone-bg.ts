import { SystemStyleObject } from '@chakra-ui/theme-tools';

import BGImage from '../../../assets/images/v2/stone_bg.jpg';

export const StoneBG: SystemStyleObject = {
  _before: {
    bg: `url(${BGImage}) center / cover`,
    content: '""',
    position: 'fixed',
    left: 0,
    top: 0,
    h: '100%',
    w: '100%',
    zIndex: -1,
  }
}
