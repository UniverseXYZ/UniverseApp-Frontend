import { BoxProps } from '@chakra-ui/react';

export const HeroSectionWrapperStyle: BoxProps = {
  background: 'rgba(0, 0, 0, 0.03)',
  overflow: 'hidden',
  position: 'relative',
  padding: {
    base: '20px',
    lg: '40px 60px',
  },
  sx: {
    '.chakra-button__icon': {
      marginRight: {
        base: '0 !important',
        xl: '6px !important'
      }
    }
  }
}

export const HeroSectionBackgroundStyle: BoxProps = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  opacity: '0.15',
  filter: 'blur(24px)',
  transform: 'scale(1.05)'
};

export const HeroSectionContainerStyle: BoxProps = {
  alignItems: {
    base: 'center',
    lg: 'flex-start',
  },
  display: 'flex',
  justifyContent:'space-between',
  maxWidth:'1110px',
  margin: '0 auto',
};

export const AvatarStyle: BoxProps = {
  borderRadius: '50%',
  display: 'block',
  width: {
    xl: '160px',
    lg: '136px',
    base: '90px',
  },
  height: {
    xl: '160px',
    lg: '136px',
    base: '90px',
  },
};

export const AvatarEmptyStyle: BoxProps = {
  ...AvatarStyle,
  background: 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)'
};

export const InfoStyle: BoxProps = {
  marginLeft: {
    xl: '40px',
    lg: '24px',
    base: '16px',
  },
  flex: '1',
};

export const InfoTopStyle: BoxProps = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  // flexGrow: '1',
};

export const MainInfoStyle: BoxProps = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  // flexGrow: '1',
};

export const AdditionalOptionsStyle: BoxProps = {
  display: 'flex',
};

export const SocialsWrapperStyle: BoxProps = {
  display: 'flex',
  alignItems: 'center',
  sx: {
    '.c-social-item': {
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      borderRadius: '12px',
      padding: '8px',
      marginRight: '10px',
      boxShadow: 'none',
      _hover: {
        background: 'linear-gradient(175deg, rgba(188, 235, 0, 0.2), rgba(0, 234, 234, 0.2))',
      }
    }
  }
};
