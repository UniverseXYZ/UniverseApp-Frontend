import { anatomy, PartsStyleFunction, SystemStyleObject } from "@chakra-ui/theme-tools";

type IAmountSelectorPart = "container" | "input" | "leftButton" | "rightButton";

export const amountSelectorAnatomy = anatomy("amountSelector").parts<IAmountSelectorPart>(
  "container",
  "input",
  "leftButton",
  "rightButton",
);

const parts: Array<IAmountSelectorPart> = ["container", "input", "leftButton", "rightButton"];

const baseStyle: PartsStyleFunction<typeof amountSelectorAnatomy> = (props) => {
  const BaseButtonStyle: SystemStyleObject = {
    bg: "rgba(0, 0, 0, 0.1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    _hover: {
      bg: "rgba(0, 0, 0, 0.2)",
    },
    _disabled: {
      bg: "rgba(0, 0, 0, 0.05)",
      color: "rgba(0, 0, 0, 0.2)",
      cursor: "not-allowed",

      _hover: {
        bg: "rgba(0, 0, 0, 0.05)",
      },
    },
  };

  return {
    container: {
      display: "flex",
      width: "fit-content",
    },
    input: {
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderRadius: 0,
      flex: 1,
      padding: 0,
      textAlign: "center",

      _hover: {
        borderTopColor: "rgba(0, 0, 0, 0.1)",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
      },

      _focus: {
        boxShadow: "none",
      }
    },
    leftButton: {
      ...BaseButtonStyle,
    },
    rightButton: {
      ...BaseButtonStyle,
    },
  };
}

const sizes: Record<string, SystemStyleObject> = {
  sm: {
    input: {
      boxSize: "32px",
      fontSize: "14px",
    },
    leftButton: {
      borderRadius: "8px 0px 0px 8px",
      boxSize: "32px",
    },
    rightButton: {
      borderRadius: "0px 8px 8px 0px",
      boxSize: "32px",
    },
  },
  md: {
    input: {
      boxSize: "42px",
      fontSize: "16px",
    },
    leftButton: {
      borderRadius: "12px 0px 0px 12px",
      boxSize: "42px",
    },
    rightButton: {
      borderRadius: "0px 12px 12px 0px",
      boxSize: "42px",
    },
  },
  lg: {
    input: {
      boxSize: "48px",
      fontSize: "16px",
    },
    leftButton: {
      borderRadius: "12px 0px 0px 12px",
      boxSize: "48px",
    },
    rightButton: {
      borderRadius: "0px 12px 12px 0px",
      boxSize: "48px",
    },
  },
}

const defaultProps = {
  size: "md",
}

export const AmountSelector = {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}
