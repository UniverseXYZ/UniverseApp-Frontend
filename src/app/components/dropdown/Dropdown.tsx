import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ButtonProps, Box, Flex, Link, BoxProps, PopoverContentProps, PopoverProps,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import arrowDownIcon from '../../../assets/images/arrow-down.svg';

const getButtonPadding = (size: string = 'md') => {
  const paddings: Record<string, [string, string]> = {
    lg: ['16px', '16px'],
    md: ['11px', '12px'],
  }

  if (!['lg', 'md'].includes(size)) {
    size = 'md';
  }

  return paddings[size];
};

export interface IDropdownProps {
  children?: React.ReactNode;
  label?: string;
  value?: any;
  renderValue?: (value: any) => React.ReactNode;
  isOpened?: boolean;
  buttonProps?: ButtonProps;
  popoverProps?: PopoverProps;
  popoverContentProps?: PopoverContentProps;
  matchWidth?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Dropdown = (
  {
    children,
    label,
    value,
    renderValue,
    isOpened: isOpenedProp,
    buttonProps,
    popoverProps,
    popoverContentProps,
    onOpen,
    onClose,
    matchWidth,
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
        matchWidth={matchWidth}
        {...popoverProps}
      >
        <PopoverTrigger>
          <Button
            variant={'dropdown'}
            isActive={isOpened}
            rightIcon={
              <Image src={arrowDownIcon} sx={{
                width: '10px',
                transition: '200ms',
                transform: isOpened ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />
            }
            sx={{
              '.chakra-button__icon:nth-of-type(1)': {
                marginRight: '10px',
              },
            }}
            fontSize={'14px'}
            minWidth={'fit-content'}
            padding={getButtonPadding(buttonProps?.size).join(' ')}
            position={'relative'}
            zIndex={1}
            {...buttonProps}
          >
            <Box as={'span'} flex={1} textAlign={'left'}>
              <Box
                as={'span'}
                sx={{
                  bg: value ? 'white' : 'transparent',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: value ? '11px' : 'inherit',
                  left: value ? getButtonPadding(buttonProps?.size)[1] : 0,
                  padding: value ? '4px' : '',
                  position: value ? 'absolute' : 'relative',
                  top: 0,
                  transform: value ? 'translateY(-50%)' : '',
                  visibility: !!label ? 'visible' : 'hidden',
                  zIndex: 20,
                }}
              >{label}</Box>
              {renderValue ? renderValue(value) : (value || '')}
            </Box>
          </Button>
        </PopoverTrigger>
        <PopoverContent width={'fit-content'} {...popoverContentProps}>
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};

interface IDropdownFilterContainerProps extends BoxProps {
  children: React.ReactNode;
  onSave: () => void;
  onClear: () => void;
}

export const DropdownFilterContainer = (
  {
    children = null,
    onSave,
    onClear,
    ...rest
  }: IDropdownFilterContainerProps) => {
  return (
    <>
      <Box width={'405px'} p={'30px'} {...rest}>
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
