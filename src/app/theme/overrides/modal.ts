import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { PartsStyleInterpolation } from '@chakra-ui/theme-tools';

const baseStyleHeader: SystemStyleObject = {
  fontFamily: 'Sharp Grotesk SemiBold',
  fontSize: '20px',
  padding: '30px',
}
const baseStyleCloseButton: SystemStyleObject = {
  '--box-size': '26px',

  background: 'white',
  borderRadius: '50%',
  boxShadow: '0px 10px 20px rgba(136, 120, 172, 0.2)',
  boxSize: 'var(--box-size)',
  position: 'absolute',
  right: 'calc(var(--box-size) / -2)',
  top: 'calc(var(--box-size) / -2)',

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
}
const baseStyleBody: SystemStyleObject = {
  padding: '30px',
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody,
});

const variantAlert: PartsStyleObject<typeof parts> = {
  dialog: {
    gap: {
      base: '24px',
      md: '32px'
    },
    padding: {
      base: '32px 24px 24px',
      md: '40px 30px 30px',
    },
  },
  header: {
    padding: 0,
  },
  body: {
    display: 'flex',
    flexDir: 'column',
    gap: '8px',
    padding: 0,
    textAlign: 'center',

    p: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: {
        base: '14px',
        md: '16px'
      },
      fontWeight: 400,
    },

    strong: {
      color: 'black',
      fontWeight: 'bold',
    },
  },
  footer: {
    flexDir: {
      base: 'column',
      md: 'row'
    },
    gap: '16px',
    justifyContent: 'center',
    padding: 0,

    button: {
      w: {
        base: '100%',
        md: 'fit-content',
      }
    },
  },
};

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  alert: variantAlert,
}

export const Modal = {
  baseStyle,
  variants,
};
