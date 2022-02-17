import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { default as dayjs } from 'dayjs';
import { default as UTC } from 'dayjs/plugin/utc';
import { default as Timezone } from 'dayjs/plugin/timezone';
import { default as AdvancedFormat } from 'dayjs/plugin/advancedFormat';

import calendarIcon from '../../../assets/images/calendar-small.svg';
import { DateTimePickerHeader } from './components';
import { DateTimeValidationSchema } from './constants';
import * as styles from './styles';

dayjs.extend(UTC);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

interface IDateTimePickerProps {
  // TODO: add possibility to use only date or time or date&time together
  // TODO: add nowAsDefault(boolean)
  modalName: string;
  value: Date | null,
  onChange?: (val: Date) => void,
}

export const DateTimePicker = ({ value, onChange,  ...props }: IDateTimePickerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik<{
    date?: Date | null,
    hours?: string | number;
    minutes?: string | number;
  }>({
    initialValues: {
      date: value,
      hours: undefined,
      minutes: undefined,
    },
    validationSchema: DateTimeValidationSchema,
    onSubmit: (values) => {
      const result = new Date(values.date as Date);
      result.setHours(values.hours as number);
      result.setMinutes(values.minutes as number);

      onChange && onChange(result);
      onClose();
    }
  });

  const handleOpen = useCallback(() => {
    formik.setValues({
      date: value,
      hours: value ? value?.getHours().toString().padStart(2, '0') : undefined,
      minutes: value ? value?.getMinutes().toString().padStart(2, '0') : undefined,
    });
    onOpen();
  }, [value]);

  return (
    <>
      <Button
        rightIcon={<Image src={calendarIcon} width={'16px'} />}
        sx={styles.dateTimeInput}
        onClick={handleOpen}
      >
        <Box as={'span'}>
          {value
            ? (
              <><strong>{dayjs(value).format('MMM DD, YYYY,')}</strong> {dayjs(value).format('HH:mm z')}</>
            )
            : 'Select date...'
          }
        </Box>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={'auto'}>
          <ModalHeader p={'34px 30px 0 30px'}>
            <Heading as={'h2'} fontSize={'20px'}>{props.modalName}</Heading>
          </ModalHeader>
          <ModalCloseButton sx={styles.modalCloseButton} />
          <ModalBody sx={styles.modalBody}>
            <DatePicker
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue('date', date)}
              inline
              calendarStartDay={1}
              useWeekdaysShort={false}
              formatWeekDay={(d) => d.charAt(0)}
              renderCustomHeader={DateTimePickerHeader}
            />
            <Flex sx={styles.timeLabels}>
              <Text fontSize={'14px'} fontWeight={700}>Select time</Text>
              <Text fontSize={'12px'} color={'rgba(0, 0, 0, 0.4)'}>Your time zone is UTC+3</Text>
            </Flex>

            <Flex
              sx={styles.timeInput}
              borderColor={
                !formik.isValid && (formik.touched.hours || formik.touched.minutes)
                  ? 'red !important'
                  : 'rgba(0, 0, 0, 0.1) !important'
              }
            >
              <NumberInput min={0} max={23} name="hours" value={formik.values.hours}>
                <NumberInputField onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </NumberInput>
              <Text fontSize={'16px'} fontWeight={700}>:</Text>
              <NumberInput min={0} max={59} name="minutes" value={formik.values.minutes}>
                <NumberInputField onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </NumberInput>
            </Flex>
          </ModalBody>

          <ModalFooter sx={styles.modalFooter}>
            <Button ml={0} variant="outline" onClick={onClose}>Cancel</Button>
            <Button mr={0} boxShadow={'lg'} onClick={formik.submitForm}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
