import { Checkbox as ChakraCheckbox, CheckboxProps, Image } from '@chakra-ui/react';

import checkIcon from './../../../assets/images/check-vector.svg';

const CheckboxIcon = (props: CheckboxProps) => props.isChecked ? <Image src={checkIcon} /> : null;

export const Checkbox = (props: CheckboxProps) =>
  <ChakraCheckbox icon={<CheckboxIcon />} {...props} />
