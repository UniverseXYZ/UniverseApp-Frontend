import { Box, BoxProps, Icon, Stack, StackProps, Text } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';

import { ReactComponent as CheckSVG } from '@assets/images/check-black.svg';

import { StepState } from './types';
import * as s from './Stepper.styles';
import useMeasureDirty from 'react-use/lib/useMeasureDirty';

export interface IStepProps extends BoxProps {
  state: StepState;
  label?: string;
  title?: string;
}

export const Step = (props: IStepProps) => {
  const { label, title, children, ...rest } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const { height } = useMeasureDirty(wrapperRef);

  const circleOffsetTop = useMemo(() => {
    const circleTop = circleRef.current?.getBoundingClientRect().top ?? 0;
    const wrapperTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;
    return circleTop - wrapperTop;
  }, [height]);

  return (
    <Box ref={wrapperRef} {...s.getStepWrapperStyle(rest.state, circleOffsetTop - 1)} {...rest}>
      {!!label && (<Text {...s.StepLabel}>{label}</Text>)}
      {!!title && (<Text {...s.StepTitle}>{title}</Text>)}
      <Box ref={circleRef} {...s.getStepCircleStyles(props.state)}>
        {props.state === 'done' && (
          <Icon viewBox={'0 0 10 7'} w={'10px'}>
            <CheckSVG />
          </Icon>
        )}
      </Box>
      <Box pt={'8px'}>{children}</Box>
    </Box>
  );
}

interface IStepperProps extends StackProps {}

export const Stepper = (props: IStepperProps) => {
  const {
    direction = 'row',
    ...rest
  } = props;

  return (<Stack direction={direction} spacing={0} {...rest} />);
}
