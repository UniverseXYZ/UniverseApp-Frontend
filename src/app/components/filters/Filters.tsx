import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMedia } from 'react-use';

import FilterIcon from '../../../assets/images/marketplace/filters2.svg';
import CloseIcon from '../../../assets/images/close-menu.svg';

import { breakpoints } from '../../theme/constants';
import { ClearAll } from './components'
import * as styles from './styles';

export interface IChildrenFnProps {
  openMobileFilters: () => void;
}

export interface IFiltersProps {
  mobileFilters: Array<{
    name: string;
    form: FormikProps<any>;
    icon: any;
    mobileComponent: any;
  }>;
  children: (props: IChildrenFnProps) => React.ReactNode;
}

export const Filters = (props: IFiltersProps) => {
  const {
    mobileFilters,
    children,
  } = props;

  const isMobile = useMedia(`(max-width: ${breakpoints.md})`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [values, setValues] = useState<Record<number, any>>();

  const handleClearAll = useCallback(() => {
    for (const filter of mobileFilters) {
      filter.form.resetForm();
    }
    onClose();
  }, [mobileFilters]);

  const handleSetValue = useCallback((i: number, newValue: any) => {
    setValues((values) => ({ ...values, [i]: newValue }));
  }, []);

  const handleSave = useCallback(() => {
    if (values) {
      mobileFilters.forEach(({ form }, i) => form.setValues(values[i]));
      onClose();
    }
  }, [values]);

  const handleToggleAccordionItem = useCallback((e) => {
    if (!isMobile) {
      e.preventDefault();
    }
  }, [isMobile]);

  const openedTabs = useMemo(() => {
    return mobileFilters.map((_, i) => i);
  }, []);

  useEffect(() => {
    isOpen
      ? setValues((mobileFilters || []).reduce<Record<number, any>>((acc, filter, i) => {
        acc[i] = filter.form.values;
        return acc;
      }, {}))
      : setValues(undefined)
  }, [isOpen, mobileFilters]);

  const countDirtyFilters = mobileFilters.reduce((acc, { form }) => form.dirty ? acc += 1 : acc, 0);

  return (
    <>
      {!isMobile ? children({
        openMobileFilters: onOpen,
      }) : null}

      <Button {...styles.ButtonStyle} onClick={onOpen}>
        <Box display={!!countDirtyFilters ? 'flex' : 'none'} {...styles.ActiveFilterLabelStyle}>{countDirtyFilters}</Box>
        <img src={FilterIcon} alt="Filter" />
      </Button>

      <Modal
        isOpen={isOpen}
        size={isMobile ? 'full' : 'md'}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={isMobile ? 0 : 'md'}>
          {!isMobile && (<ModalCloseButton />)}
          <ModalHeader
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { base: '20px !important', md: '30px !important' },
              py: '24px !important',
            }}
          >
            Filters
            <Box alignItems={'center'} display={{ base: 'flex', md: 'none' }}>
              <ClearAll onClick={() => handleClearAll()} />
              <Button variant={'simpleOutline'} borderColor={'transparent'} ml={'20px'} onClick={onClose}>
                <Image src={CloseIcon} />
              </Button>
            </Box>
          </ModalHeader>
          <ModalBody pt={'10px !important'} pb={'0 !important'} px={{ base: '20px !important', md: '30px !important' }}>
            {values && (
              <Accordion allowMultiple defaultIndex={openedTabs}>
                {mobileFilters.map(({ mobileComponent: FilterComponent, ...filter }, i) => (
                  <AccordionItem key={i} _notLast={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    mb: '10px'
                  }}>
                    <AccordionButton sx={{
                      p: '20px 0',
                      fontWeight: 'bold',
                      _hover: {
                        bg: 'transparent',
                      },
                      _focus: {
                        boxShadow: 'none',
                      },
                    }} onClick={handleToggleAccordionItem}>
                      <Box flex='1' textAlign='left'>
                        <Image src={filter.icon} display={'inline-block'} pos={'relative'} top={'-1px'} mr={'8px'} />
                        {filter.name}
                      </Box>
                      <AccordionIcon display={{ base: 'inline-block', md: 'none' }} />
                    </AccordionButton>
                    <AccordionPanel p={'0 0 30px 0'}>
                      <FilterComponent
                        value={values[i]}
                        onChange={(value: any) => handleSetValue(i, value)}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </ModalBody>

          <ModalFooter
            sx={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              borderBottomRadius: isMobile ? 0 : 'md',
              background: 'white',
              bottom: 0,
              position: {
                base: 'sticky',
                md: 'static',
              },
              width: '100%',
              zIndex: '200',
              px: { base: '20px !important', md: '30px !important' }
            }}
          >
            <Box display={{ base: 'none', md: 'flex' }} justifyContent={'space-between'} w={'100%'} alignItems={'center'}>
              <ClearAll onClick={() => handleClearAll()} />
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
};
