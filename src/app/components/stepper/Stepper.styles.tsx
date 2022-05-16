import { BoxProps } from '@chakra-ui/react';

import { StepState } from './types';

export const getStepWrapperStyle: (s: StepState, circleOffsetTop: number) => BoxProps =
  (state, circleOffsetTop) => {
  return {
    sx: {
      '--circle-size': '20px',
      '--spacing': {
        base: '0px',
        lg: '10px',
      },
    },

    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    textAlign: 'center',

    _notLast: {
      _after: {
        content: '""',
        position: 'relative',
        top: `calc(${circleOffsetTop}px + var(--circle-size) / 2)`,
        width: 'calc(100% - var(--circle-size) - calc(var(--spacing) * 2))',
        left: 'calc(50% + calc(var(--circle-size) / 2 + var(--spacing)))',
        height: '1px',
        backgroundColor: state === 'done' ? '#BCEB00' : 'rgba(0, 0, 0, 0.1)',
        order: '-1',
      }
    }
  };
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
      borderColor: 'rgba(0, 0, 0, 0.1)',
    }
  };

  return {
    border: '1px solid transparent',
    borderRadius: '50%',
    boxSize: '20px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...stateStyles[state]
  }
};
