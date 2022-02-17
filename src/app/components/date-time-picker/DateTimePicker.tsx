import { Image, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';

import calendarIcon from '../../../assets/images/calendar-small.svg';

export const DateTimePicker = () => {
  return (
    <InputGroup>
      <Input placeholder="mysite" />
      <InputRightAddon
        children={<Image src={calendarIcon} width={'16px'} />}
        bg={'white'}
        borderColor={'#D4D4D4'}
        px={'13px'}
      />
    </InputGroup>
  );
};
