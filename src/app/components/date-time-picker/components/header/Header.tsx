import { Flex, Heading } from '@chakra-ui/react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

import { HeaderArrowButton } from '../header-arrow-button';
import { months } from '../../constants';

export const DateTimePickerHeader = (
  {
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps
) => (
  <Flex p={'10px'} justifyContent={'center'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}>
    <HeaderArrowButton
      isReverse={true}
      disabled={prevMonthButtonDisabled}
      onClick={decreaseMonth}
    />

    <Heading as={'h4'} sx={{
      fontFamily: 'Space Grotesk',
      fontSize: '16px',
      fontWeight: 700,
      flex: 1,
      lineHeight: '40px',
    }}>{months[date.getMonth()]} {date.getFullYear()}</Heading>

    <HeaderArrowButton
      disabled={nextMonthButtonDisabled}
      onClick={increaseMonth}
    />
  </Flex>
);
