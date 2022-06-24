import { BoxProps } from '@chakra-ui/react';

import { StepDirection, StepState } from './types';

export const getStepWrapperStyle: (s: StepState, d: StepDirection, iconOffsetTop: number) => BoxProps =
  (state, direction, iconOffsetTop) => {
  const directionStyle: Record<StepDirection, BoxProps> = {
    row: {
      textAlign: 'center',
    },
    column: {
      paddingLeft: 'calc(var(--icon-size) + var(--spacing))',
      justifyContent: 'flex-start',
    },
  };

  const lineDirectionStyle: Record<StepDirection, BoxProps['_after']> = {
    row: {
      top: `calc(${iconOffsetTop}px + var(--icon-size) / 2)`,
      width: 'calc(100% - var(--icon-size) - calc(var(--spacing) * 2))',
      left: 'calc(50% + calc(var(--icon-size) / 2 + var(--spacing)))',
      height: '2px',
    },
    column: {
      position: 'absolute',
      top: `calc(var(--icon-size) + var(--spacing))`,
      left: 'calc(var(--icon-size) / 2)',
      transform: 'translateX(-50%)',
      width: '2px',
      height: 'calc(100% - var(--icon-size) - (var(--spacing) * 2))',
    }
  };

  return {
    sx: {
      '--icon-size': '20px',
      '--spacing': {
        base: '10px',
        md: '0px',
        lg: '10px',
      },
    },

    ...directionStyle[direction],

    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    pos: 'relative',

    _notLast: {
      _after: {
        backgroundColor: state === 'done' ? '#BCEB00' : 'rgba(0, 0, 0, 0.1)',
        content: '""',
        position: 'relative',
        order: '-1',
        ...lineDirectionStyle[direction],
      }
    }
  };
};

export const getStepIconStyle: (d: StepDirection) => BoxProps = (d) => {
  if (d === 'column') {
    return {
      pos: 'absolute',
      top: 0,
      left: 0,
    };
  }
  return {};
};

export const getStepCircleStyles: (s: StepState) => BoxProps = (state) => {
  const stateStyles: Record<StepState, BoxProps> = {
    done: {
      background: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
      sx: {
        backgroundOrigin: 'border-box',
      },
    },
    current: {
      background: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
      boxShadow: 'inset 2px 1000px 1px #fff',
      sx: {
        backgroundOrigin: 'border-box',
      },
    },
    future: {
      bg: 'white',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    }
  };

  return {
    border: '2px solid transparent',
    borderRadius: '50%',
    boxSize: '20px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...stateStyles[state]
  }
};
