import {
  AvatarProps,
  BoxProps,
  HeadingProps,
  LinkProps,
  StackProps,
  TabListProps, TabPanelProps,
  TabsProps,
  TextProps,
} from '@chakra-ui/react';

export const CollectionInfoWrapper: BoxProps = {
  pos: 'relative',
  mt: ['-170px', null, '-110px'],
  px: ['16px', null, '24px', '40px'],
};

export const Avatar: AvatarProps = {
  borderRadius: '50%',
  boxSize: '72px',
  objectFit: 'cover',
  pointerEvents: 'none',
};

export const CollectionName: HeadingProps = {
  color: '#fff',
  fontSize: ['20px', null, null, '32px'],
}

export const AddressButton: StackProps = {
  borderRadius: '8px',
  color: '#4D66EB',
  overflow: 'hidden',
};

export const AddressButtonText: TextProps = {
  bg: '#0000004D',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '16px',
  padding: '6px 10px',
  userSelect: 'none',

  _hover: {
    bg: '#00000066',
  },
  _active: {
    bg: '#00000099',
  },
};

export const AddressButtonLink: LinkProps = {
  backgroundColor: '#00000066',
  padding: '6px',
  boxShadow: 'none !important',

  _hover: {
    bg: '#00000099',
  },
  _active: {
    bg: '#000000CC',
  },
};

export const FiltersWrapper: BoxProps = {
  py: '20px',
  px: ['16px', null, '24px', '40px'],
  pos: 'sticky',
  top: '-1px',
  mb: '20px',
  zIndex: 20,
};

export const Tabs: Omit<TabsProps, 'children'> = {
  py: ['58px', null, null, '64px'],
};

export const TabList: TabListProps = {
  mx: ['16px', null, '24px', '40px'],
};

export const NFTsTabPanel: TabPanelProps = {
  padding: 0,
  pt: '20px',
};

export const DescriptionTabPanel: TabPanelProps = {
  pt: '40px',
  pb: 0,
  px: ['16px', null, '24px', '40px'],
};
