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
  Button
} from '@chakra-ui/react';
import { Select } from '../../../../components';
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from 'formik';
import { ReportPopupValidationSchema } from './validation-schema';
import { useEffect, useState } from 'react';
import { sendReportRequest } from '../../../../../utils/api/marketplace';
import { ReportStatusPopup } from '../../pages/nft-page/components/nft-info/components/tab-offers/components/report-status-popup';
import { Status } from '../../pages/nft-page/components/nft-info/components/tab-offers/components/report-status-popup/enums';

interface INFTReportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  collectionAddress?: string;
  tokenId?: string;
}

export const NFTReportPopup = ({ isOpen, onClose, collectionAddress, tokenId }: INFTReportPopupProps) => {
  const [reportStatus, setReportStatus] = useState(Status.HIDDEN);

  const submitReport = async (values: any) => {
    try {
      setReportStatus(Status.PROCESSING);

      const requestData = {
        ...values,
        collectionAddress,
        tokenId,
      }
      
      const response = await sendReportRequest(requestData);

      if (response.status === 201) {
        setReportStatus(Status.SUCCESS);
        onModalClose();
        return;
      }
    } catch(err) {
      setReportStatus(Status.HIDDEN);
      console.log(err);
    }
  }

  const formik = useFormik<{
    reason: string,
    description: string,
    captchaResponse: string
  }>({
    initialValues: {
      reason: "",
      description: "",
      captchaResponse: "",
    },
    validationSchema: ReportPopupValidationSchema,
    onSubmit: submitReport,
  });
  
  const clearValues = () => {
    formik.setValues({
      reason: "",
      description: "",
      captchaResponse: ""
    });
  }

  const onModalClose = () => {
    clearValues();
    onClose();
  }

  useEffect(() => {
    // formik.isValid is true on componentMount
    (() => formik.validateForm())();
  }, []);
  
  return (
    <>
      {
        reportStatus !== Status.HIDDEN 
          ? <ReportStatusPopup status={reportStatus} onClose={() => setReportStatus(Status.HIDDEN)} />
          : <Modal isOpen={isOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent maxW={'480px'}>
              <ModalHeader sx={{
                pt: '40px !important',
                pb: '20px !important',
                textAlign: 'center',
              }}>Report this item</ModalHeader>
              <ModalCloseButton />
              <ModalBody pt={'0 !important'}>
                <Text sx={{
                  textAlign: 'center',
                  m: 'auto',
                  mb: '30px',
                  w: '300px',
                }}>Explain why you think this item should be removed from marketplace</Text>

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
                  <Button disabled={!formik.isValid} boxShadow={'lg'} onClick={() => {
                    formik.submitForm();
                  }}>Report</Button>
                </Flex>
              </ModalBody>
            </ModalContent>
            </Modal>
      }
    </>
  );
}
