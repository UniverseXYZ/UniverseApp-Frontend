import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { useMedia } from 'react-use';
import React from 'react';

import { breakpoints } from '@app/theme/constants';

import SuccessIcon from '@assets/images/illustration-success.png';
import InfoIcon from '@assets/images/illustration-info.png';
import ErrorIcon from '@assets/images/illustration-error.png';
import EmailIcon from '@assets/images/illustration-email.png';
import ClockIcon from '@assets/images/illustration-clock.png';
import SearchIcon from '@assets/images/illustration-search.png';
import SpinnerIcon from '@assets/images/spinner.png';

import * as s from './AlertPopup.styles';

type IAlertPopupIcon = 'success' | 'info' | 'error' | 'email' | 'clock' | 'search' | 'spinner';

interface IAlertPopupProps extends Omit<ModalProps, 'children'> {
  icon?: IAlertPopupIcon;
  title?: string;
  showCloseButton?: boolean;
  renderFooter?: null | (() => React.ReactNode);
  children?: React.ReactNode | null;
}

export const AlertPopup = (props: IAlertPopupProps) => {
  const {
    icon,
    title,
    showCloseButton = true,
    renderFooter,
    children,
    ...modalProps
  } = props;

  const isMobile = useMedia(`(max-width: ${breakpoints.md})`);

  const ICONS: Record<IAlertPopupIcon, [string, string]> = {
    success: [SuccessIcon, 'Success icon'],
    info: [InfoIcon, 'Info icon'],
    error: [ErrorIcon, 'Error icon'],
    email: [EmailIcon, 'Email icon'],
    clock: [ClockIcon, 'Clock icon'],
    search: [SearchIcon, 'Search icon'],
    spinner: [SpinnerIcon, 'Spinner icon'],
  };

  return (
    <Modal variant={'alert'} size={'lg'} isCentered={!isMobile} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        {showCloseButton && (<ModalCloseButton />)}

        <ModalHeader>
          {!!icon && (
            <Image
              src={ICONS[icon][0]}
              alt={ICONS[icon][1]}
              {...s.Icon}
              animation={icon !== 'spinner' ? '' : `${s.spinnerAnimationKeyframes} 1s linear infinite`}
            />
          )}
        </ModalHeader>

        <ModalBody>
          {!!title && (<Heading {...s.Title}>{title}</Heading>)}
          {!!children && (<Box>{children}</Box>)}
        </ModalBody>

        {renderFooter !== null && (
          <ModalFooter>
            {!!renderFooter ? renderFooter() : (
              <Button variant={'ghost'} {...s.CloseButton} onClick={modalProps.onClose}>Close</Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
