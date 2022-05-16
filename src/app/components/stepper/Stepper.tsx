import { Box, BoxProps, Icon, Stack, StackProps, useBreakpointValue, useRadio, useRadioGroup } from '@chakra-ui/react';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import useMeasureDirty from 'react-use/lib/useMeasureDirty';

import { ReactComponent as CheckSVG } from '@assets/images/check-black.svg';

import { StepDirection, StepState } from './types';
import * as s from './Stepper.styles';

interface IStepperContext {
  direction: StackProps['direction'];
  getStepState: (index:  number) => StepState;
}

const StepperContext = createContext<IStepperContext>({
  direction: 'row',
  getStepState: () => 'future',
});

export interface IStepProps extends Omit<BoxProps, 'children'> {
  renderAbove?: (state: StepState) => React.ReactNode;
  renderIcon?: (state: StepState) => React.ReactNode;
  children?: React.ReactNode | ((state: StepState) => React.ReactNode);
}

export const Step = (props: IStepProps) => {
  const {
    children,
    renderAbove,
    renderIcon,
    ...rest
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const { getInputProps } = useRadio(props);

  const { direction: dir, getStepState } = useContext(StepperContext);

  const direction = useBreakpointValue(!dir || typeof dir === 'string'
    ? { base: dir }
    : { ...dir } as Record<string, StepDirection>
  ) as StepDirection;

  const input = getInputProps() as { value: number; };

  const state: StepState = getStepState(input.value);

  const { height } = useMeasureDirty(wrapperRef);

  const iconOffsetTop = useMemo(() => {
    const circleTop = circleRef.current?.getBoundingClientRect().top ?? 0;
    const wrapperTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;
    return circleTop - wrapperTop;
  }, [height]);

  return (
    <Box ref={wrapperRef} {...s.getStepWrapperStyle(state, direction, iconOffsetTop - 1)} {...rest}>
      <input {...input} />

      {renderAbove ? renderAbove(state) : null}

      <Box ref={circleRef} {...s.getStepIconStyle(direction)}>
        {renderIcon ? renderIcon(state) : (
          <Box {...s.getStepCircleStyles(state)}>
            {state === 'done' && (
              <Icon viewBox={'0 0 10 7'} w={'10px'}>
                <CheckSVG />
              </Icon>
            )}
          </Box>
        )}
      </Box>
      {!children ? null : typeof children === 'function' ? children(state) : children}
    </Box>
  );
}

interface IStepperProps extends StackProps {
  activeStep: number;
}

export const Stepper = (props: IStepperProps) => {
  const {
    activeStep,
    direction,
    children,
    ...rest
  } = props;

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: activeStep,
    onChange: console.log
  });

  const group = getRootProps();

  const value: IStepperContext = {
    direction,
    getStepState: (idx) => {
      switch (true) {
        case idx === activeStep: return 'current';
        case idx < activeStep: return 'done';
        default: return 'future';
      }
    }
  };

  return (
    <StepperContext.Provider value={value}>
      <Stack direction={direction} spacing={0} {...group} {...rest}>
        {React.Children.map(children, (child: any, i) => {
          const radio = getRadioProps({ value: i });
          return React.cloneElement(child, { ...child.props, ...radio })
        })}
      </Stack>
    </StepperContext.Provider>
  );
}
