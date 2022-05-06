import { Box, Button, TabProps, useMultiStyleConfig, useTab } from '@chakra-ui/react';
import React from 'react';

import * as componentStyles from './BadgedTab.styles';

interface IBadgedTabProps extends TabProps {
  amount?: number;
}

export const BadgedTab = React.forwardRef<HTMLDivElement, IBadgedTabProps>((props, ref) => {
  const { amount } = props;

  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button __css={styles.tab} {...tabProps}>
      {tabProps.children}
      {amount !== undefined && (
        <Box
          as={'span'}
          {...componentStyles.Badge}
          data-selected={isSelected || undefined}
        >{amount}</Box>
      )}
    </Button>
  )
})
