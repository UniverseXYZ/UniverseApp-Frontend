import { useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/radio';
import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

interface IRadioCardProps extends UseRadioProps {
  children: React.ReactNode;
}

function RadioCard(props: IRadioCardProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        sx={{
          background: 'transparent',
          borderRadius: '7px',
          color: '#CCCCCC',
          cursor: 'pointer',
          padding: '8px 10px',
          lineHeight: '12px',
          _hover: {
            color: 'rgba(0 0 0 / 40%)',
          },
        }}
        _checked={{
          background: 'rgba(0, 0, 0, 0.05)',
          color: 'black !important',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

interface IToggleButtonProps {
  value: string | number;
  children: React.ReactNode;
}

export const ToggleButton = (props: IToggleButtonProps) => {
  return (<>{props.children || null}</>);
}

interface IToggleButtonGroupProps {
  name: string;
  value?: string | number;
  children: React.ReactNode;
  onChange?: (value: string | number) => void;
}
export const ToggleButtonGroup = (props: IToggleButtonGroupProps) => {
  const { name, value, children, onChange } = props;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    onChange,
  });

  const group = getRootProps()

  return (
    <HStack spacing={0} {...group} sx={{
      background: '#FFFFFF',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      padding: '3px',
    }}>
      {React.Children.map(children, (child: React.ReactNode, i) => {
        if (!React.isValidElement<IToggleButtonProps>(child)) {
          return child;
        }

        let elementChild: React.ReactElement<IToggleButtonProps> = child;

        const radio = getRadioProps({ value: elementChild.props.value });
        return (
          <RadioCard key={i} {...radio}>
            {child}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
