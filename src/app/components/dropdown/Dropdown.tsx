import {
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  ButtonProps, Box,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import arrowDownIcon from '../../../assets/images/arrow-down.svg';

export interface IDropdownProps {
  children?: React.ReactNode;
  label?: string;
  value?: string;
  isOpened?: boolean;
  buttonProps?: ButtonProps;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Dropdown = (
  {
    children,
    label,
    value,
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
            sx={{
              '--button-lg-padding-x': '16px',
              '--button-lg-padding-y': '15px',
              '--button-md-padding-x': '12px',
              '--button-md-padding-y': '11px',
            }}
            justifyContent={'space-between'}
            minWidth={'fit-content'}
            paddingX={`var(--button-${buttonProps?.size || 'md'}-padding-x) !important`}
            paddingY={`var(--button-${buttonProps?.size || 'md'}-padding-y) !important`}
            position={'relative'}
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
            <Box as={'span'} flex={1} textAlign={'left'}>
              <Box
                as={'span'}
                bg={'white'}
                sx={{'--padding': '4px'}}
                fontSize={value ? '11px' : 'inherit'}
                left={`calc(var(--button-${buttonProps?.size || 'md'}-padding-x) - var(--padding) + ${!value && buttonProps?.leftIcon ? '22px' : '0px'})`}
                padding={'var(--padding)'}
                position={'absolute'}
                top={value ? '-11px' : `calc(var(--button-${buttonProps?.size || 'md'}-padding-y) - var(--padding))`}
                transition={'300ms'}
                zIndex={-1}
              >{label}</Box>
              {value || ''}
            </Box>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};
