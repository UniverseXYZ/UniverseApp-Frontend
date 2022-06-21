import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import type { PartsStyleFunction } from '@chakra-ui/theme-tools';

const colors: Record<string, { bg: string; border: string; text: string; }> = {
  orange: {
    bg: '#FEFCF6',
    border: 'rgba(228, 182, 19, 0.4)',
    text: '#E4B613'
  },
  blue: {
    bg: '#4F6AE50A',
    border: '#4F6AE566',
    text: '#4D66EB'
  },
};

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: colors[c]?.bg,
      borderColor: colors[c]?.border,
      border: '1px solid',
      color: colors[c]?.text,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',

      a: {
        textDecoration: 'underline',

        _hover: {
          textDecoration: 'none',
        }
      }
    },
  }
}

const variants = {
  subtle: variantSubtle,
}

export const Alert = {
  parts: parts.keys,
  variants,
}
