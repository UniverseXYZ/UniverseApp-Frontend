import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Fade,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ArrowDownIcon from '@assets/images/arrow-down.svg';
import FilterIcon from '@assets/images/marketplace/filters2.svg';
import CloseIcon from '@assets/images/close-menu.svg';

import { Dropdown, DropdownFilterContainer, Icon, Icons } from '@app/components';

import { ClearAllButton } from './clear-all-button';
import * as s from './Filters.styles';

export interface IFilterComponentsProps<T> {
  value: T;
  onChange: (value: T) => void;
}

export interface IFilter<T extends unknown> {
  name: string;
  icon: Icons;
  form: FormikProps<T>;
  getValueLabel: (value: T) => string | null;
}

// ************************************************************

interface IFiltersProps extends StackProps {
  show?: boolean;
}

export const Filters: React.FC<IFiltersProps> = (props) => {
  const {
    show = true,
    children,
    ...rest
  } = props;

  const isMobile = useBreakpointValue([true, true, false]);
  const isTablet = useBreakpointValue([false, false, true, false]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const childrenElements = React.Children.toArray(children) as React.ReactElement<IFilterProps<unknown>>[];

  const [values, setValues] = useState<Record<number, any>>();

  const openedTabs = useMemo(() => childrenElements.map((_, i) => i), [childrenElements]);

  const handleSetValue = useCallback((i: number, newValue: any) => {
    setValues((values) => ({ ...values, [i]: newValue }));
  }, []);

  const handleClearAll = useCallback(() => {
    childrenElements.forEach((child) => {
      child.props.filter.form.resetForm();
    });
  }, [childrenElements]);

  const handleSave = useCallback(() => {
    if (values) {
      childrenElements.forEach((child, i) => {
        child.props.filter.form.setValues(values[i]);
      });
      onClose();
    }
  }, [childrenElements]);

  const handleToggleAccordionItem = useCallback((e) => {
    if (!isMobile) {
      e.preventDefault();
    }
  }, [isMobile]);

  useEffect(() => {
    isOpen
      ? setValues(childrenElements.reduce<Record<number, any>>((acc, child, i) => {
        acc[i] = child.props.filter.form.values;
        return acc;
      }, {}))
      : setValues(undefined)
  }, [isOpen, children]);

  const dirtyFiltersAmount = childrenElements.map((child) => {
    return child.props.filter.form.dirty;
  }).filter(Boolean).length;

  return (
    <>
      {!isMobile && (
        <Fade in={show} unmountOnExit={true}>
          <Box alignItems={'center'} display={'flex'} gap={'10px'} {...rest}>
            {childrenElements.slice(0, isTablet ? 2 : undefined).map((child) => (
              React.cloneElement(child, child.props)
            ))}
            {isTablet && (
              <Button
                variant={"dropdown"}
                rightIcon={<Image src={ArrowDownIcon} {...s.MoreFiltersButtonArrow} />}
                {...s.MoreFiltersButton}
                onClick={onOpen}
              >
                More
              </Button>
            )}
            {!!dirtyFiltersAmount && (
              <ClearAllButton onClick={handleClearAll} />
            )}
          </Box>
        </Fade>
      )}

      <Button
        {...s.MobileFilterButton}
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpen}
      >
        <Box {...s.ActiveFilterLabel} display={!!dirtyFiltersAmount ? 'flex' : 'none'}>
          {dirtyFiltersAmount}
        </Box>
        <img src={FilterIcon} alt="Filter" />
      </Button>

      <Modal isOpen={isOpen} size={isMobile ? 'full' : 'md'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={isMobile ? 0 : 'md'}>
          {!isMobile && (<ModalCloseButton />)}
          <ModalHeader {...s.ModalHeader}>
            Filters
            <Box {...s.ModalHeaderMobileClose}>
              <ClearAllButton onClick={() => handleClearAll()} />
              <Button variant={'simpleOutline'} borderColor={'transparent'} ml={'20px'} onClick={onClose}>
                <Image src={CloseIcon} />
              </Button>
            </Box>
          </ModalHeader>
          <ModalBody {...s.ModalBody}>
            {values && (
              <Accordion allowMultiple defaultIndex={openedTabs}>
                {React.Children.map(children, (child, i) => {
                  const childElement = child as React.ReactElement<IFilterProps<unknown>>;
                  const childChildren = childElement.props.children as React.ReactElement<any>;

                  return (
                    <AccordionItem key={i} {...s.AccordionItem}>
                      <AccordionButton {...s.AccordionButton} onClick={handleToggleAccordionItem}>
                        <HStack spacing={'8px'} flex={1} textAlign='left'>
                          <Icon name={childElement.props.filter.icon} />
                          <Box as={'span'}>{childElement.props.filter.name}</Box>
                        </HStack>
                        <AccordionIcon display={{ base: 'inline-block', md: 'none' }} />
                      </AccordionButton>
                      <AccordionPanel p={'0 0 30px 0'}>
                        {React.cloneElement(childChildren, {
                          ...childChildren.props,
                          value: values[i],
                          onChange: (value: any) => handleSetValue(i, value)
                        })}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </ModalBody>

          <ModalFooter {...s.ModalFooter} borderBottomRadius={{ base: 0, md: 'md' }}>
            <Box display={{ base: 'none', md: 'flex' }} justifyContent={'space-between'} w={'100%'} alignItems={'center'}>
              <ClearAllButton onClick={handleClearAll} />
              <Button onClick={handleSave}>Save</Button>
            </Box>
            <Box display={{ base: 'block', md: 'none' }} w={'100%'}>
              <Button isFullWidth={true} onClick={handleSave}>Show results</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// *********************************************************************************************************************

export interface IFilterProps<T> {
  filter: IFilter<T>;
  children: React.ReactNode;
}

export const Filter = <T extends unknown>(props: IFilterProps<T>) => {
  const { filter, children } = props;
  const { name, icon, form, getValueLabel } = filter;

  const childElement = children as React.ReactElement<IFilterComponentsProps<T>>;

  const initialValue = childElement.props.value;

  const [value, setValue] = useState<T>(initialValue);
  const [isOpened, setIsOpened] = useState(false);

  const handleSave = useCallback(() => {
    form.setValues(value);
    setIsOpened(false);
  }, [form, value]);

  const handleClear = useCallback(() => {
    form.resetForm();
    setValue(initialValue);
  }, [form, initialValue]);

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <Dropdown
      label={name}
      value={getValueLabel(initialValue)}
      buttonProps={{ leftIcon: <Icon name={icon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(initialValue);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer onSave={handleSave} onClear={handleClear}>
        {React.cloneElement(childElement, {
          value,
          onChange: (value: T) => setValue(value),
        })}
      </DropdownFilterContainer>
    </Dropdown>
  );
};

// *********************************************************************************************************************

