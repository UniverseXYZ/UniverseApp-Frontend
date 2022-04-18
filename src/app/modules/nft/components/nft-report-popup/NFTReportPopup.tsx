import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
  Box,
  Icon,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useState } from 'react';

import { ReactComponent as WarningSVG } from '@assets/images/warning.svg';

import { Select } from '../../../../components';
import { ReportPopupValidationSchema } from './constants';
import { sendReportRequest } from '../../../../../utils/api/marketplace';
import { ReportStatusPopup, Status as ReportState } from '../../pages/nft-page/components/nft-info/components/tab-offers/components/report-status-popup';
import { useAuthStore } from '../../../../../stores/authStore';
import * as styles from './NFTReportPopup.styles';

interface INFTReportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  collectionAddress?: string;
  tokenId?: string;
}

export const NFTReportPopup = ({ isOpen, onClose, collectionAddress, tokenId }: INFTReportPopupProps) => {
  const [reportStatus, setReportStatus] = useState(ReportState.HIDDEN);

  const { isAuthenticated, loginFn } = useAuthStore(s => ({
    isAuthenticated: s.isAuthenticated,
    loginFn: s.loginFn
  }));

  const submitReport = async (values: any) => {
    if (!isAuthenticated) {
      loginFn && loginFn();
      return;
    }

    try {
      setReportStatus(ReportState.PROCESSING);

      const requestData = {
        ...values,
        collectionAddress,
        tokenId,
      }
      
      const response = await sendReportRequest(requestData);

      if (response.status === 201) {
        setReportStatus(ReportState.SUCCESS);
        onModalClose();
        return;
      } else {
        setError(true);
        setReportStatus(ReportState.HIDDEN);
        console.error(response);
      }
    } catch(err) {
      setError(true);
      setReportStatus(ReportState.HIDDEN);
      console.log(err);
    }
  }

  const formik = useFormik<{
    reason: string,
    description: string,
    captchaResponse: string
  }>({
    initialValues: {
      reason: '',
      description: '',
      captchaResponse: '',
    },
    validationSchema: ReportPopupValidationSchema,
    onSubmit: submitReport,
  });

  const [error, setError] = useState(false);
  
  const clearValues = () => {
    formik.resetForm();
  }

  const onModalClose = () => {
    clearValues();
    onClose();
  }

  useEffect(() => {
    formik.validateForm();
  }, []);
  
  return reportStatus !== ReportState.HIDDEN
    ? (<ReportStatusPopup status={reportStatus} onClose={() => setReportStatus(ReportState.HIDDEN)} />)
    : (
      <Modal isOpen={isOpen} onClose={onModalClose} closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW={'480px'}>
          <ModalHeader {...styles.ModalHeaderStyle}>Report this item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={'0 !important'}>
            <Text sx={{
              textAlign: 'center',
              m: 'auto',
              mb: '30px',
              w: '300px',
            }}>Explain why you think this item should be removed from marketplace</Text>

            {error && (
              <Box {...styles.ErrorStyle}>
                <Text>
                  <Icon viewBox='0 0 25 25' color='#FF4949' boxSize={'22px'} mr={'10px'} mt={'-3px'}>
                    <WarningSVG />
                  </Icon>
                  Something went wrong! Please try again.
                </Text>
              </Box>
            )}

            <FormControl mb={'20px'}>
              <FormLabel>Reason</FormLabel>
              <Select
                matchWidth
                label={'Select a reason'}
                items={[
                  'Copyright infringement',
                  'Explict and sensitive content',
                  'Other',
                ]}
                value={formik.values.reason}
                buttonProps={{
                  size: 'lg',
                  width: '100%',
                }}
                containerProps={{
                  width: '100%',
                }}
                popoverContentProps={{
                  width: '100%',
                }}
                onSelect={(value) => {
                  formik.setFieldValue("reason", value)
                }}
              />
            </FormControl>

            <FormControl mb={'32px'}>
              <FormLabel>Message</FormLabel>
              <Input name="description"  value={formik.values.description} placeholder='Tell us some details' onChange={formik.handleChange} />
            </FormControl>

            <FormControl mb={'32px'} >
              <Flex justifyContent={'center'} style={{marginTop: 30}}>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_CAPTCHA_ID || ""}
                  onChange={(value) => formik.setFieldValue("captchaResponse", value)}
                />
              </Flex>
            </FormControl>

            <Flex justifyContent={'center'}>
              <Button variant={'outline'} mr={'15px'} onClick={onModalClose}>Cancel</Button>
              <Button boxShadow={'lg'} onClick={() => formik.submitForm()}>Report</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
}
