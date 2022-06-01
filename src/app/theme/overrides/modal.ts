import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

const baseStyleDialog: SystemStyleObject = {
  borderRadius: '12px',
}

const baseStyleCloseButton: SystemStyleObject = {
  background: 'white',
  borderRadius: '50%',
  boxShadow: '0px 10px 20px rgba(136, 120, 172, 0.2)',
  height: '26px',
  position: 'absolute',
  right: '-13px',
  top: '-13px',
  width: '26px',

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

const baseStyleHeader: SystemStyleObject = {
  fontFamily: 'Sharp Grotesk SemiBold',
  fontSize: '20px',
  padding: '32px',
}

const baseStyleBody: SystemStyleObject = {
  padding: '0 32px',
}

const baseStyleFooter: SystemStyleObject = {
  gap: '15px',
  justifyContent: 'center',
  padding: '32px',
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  dialog: baseStyleDialog,
  header: baseStyleHeader,
  footer: baseStyleFooter,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody,
})

export const Modal = {
  parts: parts.keys,
  baseStyle,
}
