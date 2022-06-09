import { mode, cssVar, SystemStyleFunction } from "@chakra-ui/theme-tools";

const $arrowBg = cssVar('popper-arrow-bg');

const baseStyle: SystemStyleFunction = (props) => {
  return {
    background: mode('black', 'white')(props),
    [$arrowBg.variable]: mode('black', 'white')(props),
    borderRadius: '8px',
    boxShadow: '0px 10px 20px rgba(136, 120, 172, 0.2)',
    color: mode('white', 'black')(props),
    fontFamily: '"Space Grotesk"',
    fontSize: '14px',
    fontWeight: 400,
    padding: '12px 16px',
  }
}

export const Tooltip = {
  baseStyle,
};
