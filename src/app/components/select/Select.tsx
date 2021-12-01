import { Dropdown, IDropdownProps } from '../dropdown';
import { Box } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

interface ISelectProps extends Omit<IDropdownProps, 'isOpened'> {
  items: any[];
  value: any;
  onSelect?: (value: any) => void;
}

export const Select = ({ items, value, label, onSelect, ...props }: ISelectProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const handleSelect = useCallback((item) => {
    onSelect && onSelect(item);
    handleClose();
  }, [onSelect]);

  return (
    <Dropdown
      label={value || label}
      isOpened={isOpened}
      onOpen={handleOpen}
      onClose={handleClose}
      {...props}
    >
      <Box p={'8px'}>
        {items.map((item, i) => (
          <Box
            key={i}
            borderRadius={'6px'}
            cursor={'pointer'}
            fontFamily={'Space Grotesk'}
            fontSize={'14px'}
            fontWeight={'500'}
            p={'15px'}
            _hover={{ bg: 'rgba(0, 0, 0, 0.05)' }}
            onClick={() => handleSelect(item)}
          >
            {item}
          </Box>
        ))}
      </Box>
    </Dropdown>
  );
};
