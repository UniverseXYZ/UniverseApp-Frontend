import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as InfoIcon } from '@assets/images/info-icon-2.svg';

import * as styles from './Badge.styles';

interface IBadgeProps {
  label: string;
  value: string | number;
  error?: string;
}

export const Badge = (props: IBadgeProps) => {
  const { label, value, error } = props;

  return (
    <HStack spacing={'10px'} {...styles.Wrapper} data-invalid={!!error || undefined}>
      <Text>{label}{': '}<strong>{value}</strong></Text>
      {!!error && (
        <Tooltip hasArrow variant={'black'} label={error} placement={'top'}>
          <Icon viewBox={'0 0 16 16'}>
            <InfoIcon />
          </Icon>
        </Tooltip>
      )}
    </HStack>
  );
}
