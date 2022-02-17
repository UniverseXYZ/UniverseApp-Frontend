import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ButtonProps, Box, Flex, Link,
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
              '--button-lg-padding-y': '16px',
              '--button-md-padding-x': '12px',
              '--button-md-padding-y': '11px',
              '.chakra-button__icon:nth-of-type(1)': {
                marginRight: '10px',
              },
            }}
            minWidth={'fit-content'}
            padding={`var(--button-${buttonProps?.size || 'md'}-padding-y) var(--button-${buttonProps?.size || 'md'}-padding-x)`}
            position={'relative'}
            zIndex={1}
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
            <Box
              as={'span'}
              flex={1}
              textAlign={'left'}
            >
              <Box
                as={'span'}
                sx={{
                  '--padding': '4px',
                  '--opened-label-font-size': '11px',
                }}
                bg={value ? 'white' : 'transparent'}
                borderRadius={'4px'}
                fontSize={value ? '11px' : 'inherit'}
                padding={value ? 'var(--padding)' : ''}
                position={value ? 'absolute' : 'relative'}
                display={'inline-block'}
                transform={value ? `translate(
                  ${buttonProps?.leftIcon ? '-24px' : '0px'}, 
                  calc((var(--button-${buttonProps?.size || 'md'}-padding-y) + var(--padding) + (var(--opened-label-font-size) / 2)) * -1)
                )` : ''}
                transition={'200ms'}
              >{label}</Box>
              {value || ''}
            </Box>
          </Button>
        </PopoverTrigger>
        <PopoverContent width={'fit-content'}>
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};

interface IDropdownFilterContainerProps {
  children: React.ReactNode;
  onSave: () => void;
  onClear: () => void;
}

export const DropdownFilterContainer = (
  {
    children = null,
    onSave,
    onClear,
  }: IDropdownFilterContainerProps) => {
  return (
    <>
      <Box width={'405px'} p={'30px'}>
        {children}
      </Box>
      <Flex
        borderTop={'1px solid rgba(0, 0, 0, 0.1)'}
        justifyContent={'space-between'}
        p={'14px 30px'}
        alignItems={'center'}
      >
        <Link
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'underline',
            _hover: {
              textDecoration: 'none',
            },
          }}
          onClick={onClear}
        >Clear</Link>
        <Button boxShadow={'lg'} onClick={onSave}>Save</Button>
      </Flex>
    </>
  );
};
