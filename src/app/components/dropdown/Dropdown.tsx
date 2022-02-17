import {
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ButtonProps, Box,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import arrowDownIcon from '../../../assets/images/arrow-down.svg';

const paddings: Record<string, string | number> = {
  'xl': '15px 16px',
  'md': '11px',
}

export interface IDropdownProps {
  children?: React.ReactNode;
  label: string;
  isOpened?: boolean;
  buttonProps?: ButtonProps;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Dropdown = (
  {
    label,
    children,
    isOpened: isOpenedProp,
    buttonProps,
    onOpen,
    onClose,
    ...rest
  }: IDropdownProps
) => {

  const [isOpened, setIsOpened] = useState<boolean>(!!isOpenedProp);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
    onOpen && onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setIsOpened(false);
    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    setIsOpened(!!isOpenedProp);
  }, [isOpenedProp]);

  return (
    <>
      <Popover
        placement={'bottom-start'}
        variant={'dropdown'}
        isOpen={isOpened}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <PopoverTrigger>
          <Button
            variant={'dropdown'}
            isActive={isOpened}
            justifyContent={'space-between'}
            minWidth={'fit-content'}
            padding={paddings[buttonProps?.size || 'md']}
            rightIcon={
              <Image
                src={arrowDownIcon}
                width={'10px'}
                transition={'200ms'}
                transform={isOpened ? 'rotate(180deg)' : 'rotate(0deg)'}
              />
            }
            {...buttonProps}
          >
            <Box as={'span'} flex={1} textAlign={'left'}>{label}</Box>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};
