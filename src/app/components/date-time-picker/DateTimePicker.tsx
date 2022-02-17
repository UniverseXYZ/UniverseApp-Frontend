import {
  Box,
  Button, Flex, Heading,
  Image,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ButtonProps, Text, Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import arrowIcon from '../../../assets/images/arrow.svg';
import calendarIcon from '../../../assets/images/calendar-small.svg';

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

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonth = (date: Date) => date.getMonth();

interface IHeaderArrowButtonProps extends ButtonProps {
  isReverse?: boolean;
}

const HeaderArrowButton = ({ isReverse = false, ...props }: IHeaderArrowButtonProps) => {
  return (
    <Button
      sx={{
        background: 'white',
        _hover: {
          background: 'white',
        },
        _focus: {
          background: 'white',
        },
        _active: {
          background: 'white',
        }
      }}
      {...props}
    >
      {isReverse
        ? <Image src={arrowIcon} />
        : <Image src={arrowIcon} transform={'rotate(180deg)'} />
      }
    </Button>
  );
};

interface IDateTimePickerProps {
  modalName: string;
}

export const DateTimePicker = (props: IDateTimePickerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [date, setDate] = useState(new Date());
  const onChange = (date: any) => {
    console.log('date', date);
    setDate(date);
  };

  return (
    <>
      <Button
        rightIcon={<Image src={calendarIcon} width={'16px'} />}
        sx={styles.button}
        onClick={onOpen}
      >
        <Box as={'span'}>
          <strong>Mar 14, 2021,</strong> 12:00 EST
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
              selected={date}
              onChange={onChange}
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
                  }}>{months[getMonth(date)]} {date?.getFullYear()}</Heading>

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
                border: '1px solid rgba(0, 0, 0, 0.1)',
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
                }
              }}
            >
              <Input />
              <Text fontSize={'16px'} fontWeight={700}>:</Text>
              <Input />
            </Flex>
          </ModalBody>

          <ModalFooter display={'flex'} padding={'14px 30px 30px 30px'}>
            <Button flex={1} mx={'5px'} ml={0} variant="outline" onClick={onClose}>Cancel</Button>
            <Button flex={1} mx={'5px'} mr={0} boxShadow={'lg'} onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
