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
import * as Yup from 'yup';

import calendarIcon from '../../../assets/images/calendar-small.svg';
import { HeaderArrowButton } from './components';
import { months } from './constants';

dayjs.extend(UTC);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

const styles = {
  button: {
    background: 'white',
    border: '1px solid #D4D4D4',
    borderRadius: '12px',
    color: 'black',
    fontWeight: '400',
    justifyContent: 'space-between',
    height: 'auto',
    padding: 0,
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    'span': {
      _first: {
        p: '14px',
      },
      _last: {
        borderLeft: '1px solid #D4D4D4',
        padding: '16px',
      }
    },
    _before: {
      content: '" "',
      display: 'none',
      background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
      borderRadius: 'inherit',
      filter: 'blur(4px)',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1,
    },
    _hover: {
      background: 'white',
      _before: {
        display: 'block',
      },
    },
    _focus: {
      background: 'white',
    },
    _active: {
      background: 'white',
    },
  }
};

interface IDateTimePickerProps {
  modalName: string;
  value: Date | null,
  onChange?: (val: Date) => void,
}

const TimeSchema = Yup.object().shape({
  hours: Yup.number()
    .required()
    .min(0, '')
    .max(23, ''),
  minutes: Yup.number()
    .required()
    .min(0, '')
    .max(59, ''),
});

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
    validationSchema: TimeSchema,
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
        sx={styles.button}
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
          <ModalCloseButton sx={{
            borderRadius: '50%',
            position: 'absolute',
            width: '26px',
            height: '26px',
            top: '-13px',
            right: '-13px',
            background: 'white',
            boxShadow: '0px 10px 20px rgba(136, 120, 172, 0.2)',
            _hover: {
              background: 'white',
            },
            _focus: {
              boxShadow: 0,
            },
            _active: {
              background: 'white',
              boxShadow: '0px 5px 10px rgba(136, 120, 172, 0.2)',
            }
          }} />
          <ModalBody
            sx={{
              padding: 0,
              fontFamily: 'Space Grotesk',
              fontSize: '14px',
              fontWeight: 500,
              '.react-datepicker': {
                border: 0,
                borderRadius: 0,
                pb: '10px',
              },
              '.react-datepicker__day-names': {
                px: '30px',
                pt: '16px',
              },
              '.react-datepicker__day-name': {
                opacity: 0.4,
              },
              '.react-datepicker__day--outside-month': {
                opacity: 0.5,
              },
              '.react-datepicker__day, .react-datepicker__day-name': {
                borderRadius: '12px',
                lineHeight: '32px',
                margin: 0,
                width: '37px',
              },
              '.react-datepicker__day--keyboard-selected': {
                bg: 'transparent',
                color: 'black',
              },
              '.react-datepicker__day--selected': {
                bg: '#5FEA73',
                color: 'black',
                fontWeight: 700,
              },
              '.react-datepicker__header': {
                bgColor: 'transparent',
                borderBottom: 0,
              },
            }}
          >
            <DatePicker
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue('date', date)}
              inline
              calendarStartDay={1}
              useWeekdaysShort={false}
              formatWeekDay={(d) => d.charAt(0)}
              renderCustomHeader={({
                                     date,
                                     decreaseMonth,
                                     increaseMonth,
                                     prevMonthButtonDisabled,
                                     nextMonthButtonDisabled,
                                   }) => (
                <Flex p={'10px'} justifyContent={'center'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}>
                  <HeaderArrowButton
                    isReverse={true}
                    disabled={prevMonthButtonDisabled}
                    onClick={decreaseMonth}
                  />

                  <Heading as={'h4'} sx={{
                    fontFamily: 'Space Grotesk',
                    fontSize: '16px',
                    fontWeight: 700,
                    flex: 1,
                    lineHeight: '40px',
                  }}>{months[date.getMonth()]} {date.getFullYear()}</Heading>

                  <HeaderArrowButton
                    disabled={nextMonthButtonDisabled}
                    onClick={increaseMonth}
                  />
                </Flex>
              )}
            />
            <Flex sx={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              justifyContent: 'space-between',
              fontFamily: 'Space Grotesk',
              px: '30px',
              pt: '28px',
            }}>
              <Text fontSize={'14px'} fontWeight={700}>Select time</Text>
              <Text fontSize={'12px'} color={'rgba(0, 0, 0, 0.4)'}>Your time zone is UTC+3</Text>
            </Flex>

            <Flex
              sx={{
                alignItems: 'center',
                border: '1px solid',
                borderColor: formik.isValid ? 'rgba(0, 0, 0, 0.1)' : 'red',
                borderRadius: '10px',
                fontFamily: 'Space Grotesk',
                mx: '30px',
                mt: '16px',
                py: '4px',
                input: {
                  border: 0,
                  flex: 1,
                  fontSize: '28px',
                  fontWeight: 600,
                  textAlign: 'center',
                  width: '125px',
                  _invalid: {
                    border: 0,
                    boxShadow: 'none',
                  }
                }
              }}
            >
              <NumberInput
                min={0}
                max={23}
                name="hours"
                value={formik.values.hours}
              >
                <NumberInputField onChange={formik.handleChange} />
              </NumberInput>
              <Text fontSize={'16px'} fontWeight={700}>:</Text>
              <NumberInput
                min={0}
                max={59}
                name="minutes"
                value={formik.values.minutes}
              >
                <NumberInputField onChange={formik.handleChange} />
              </NumberInput>
            </Flex>
          </ModalBody>

          <ModalFooter display={'flex'} padding={'14px 30px 30px 30px'}>
            <Button flex={1} mx={'5px'} ml={0} variant="outline" onClick={onClose}>Cancel</Button>
            <Button flex={1} mx={'5px'} mr={0} boxShadow={'lg'} onClick={formik.submitForm}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
