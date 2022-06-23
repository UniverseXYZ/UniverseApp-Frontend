import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from "@chakra-ui/react";
import React from "react";

import { Icon, TokenIcon } from "@app/components";
import { TOKENS } from "@app/constants";
import { IToken } from "@app/types";

import * as s from "./TokenDropdown.styles";

interface ITokenDropdownProps {
  size?: s.IMenuButtonSize;
  placement?: MenuProps["placement"];
  tokens?: IToken[];
  showTicker?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  value: IToken;
  onChange?: (token: IToken) => void;
}

export const TokenDropdown = React.forwardRef<HTMLButtonElement, ITokenDropdownProps>((props, ref) => {
  const {
    size = "md",
    placement,
    tokens = TOKENS,
    showTicker = true,
    readonly = false,
    disabled = false,
    value,
    onChange,
  } = props;

  return (
    <Menu placement={placement}>
      <MenuButton
        ref={ref}
        as={Button}
        {...s.MenuButton}
        {...s.MenuButtonSized[size]}
        gap={showTicker || !readonly ? '8px' : 0}
        disabled={disabled}
      >
        <HStack spacing={"8px"} justifyContent={'center'}>
          <TokenIcon ticker={value.ticker} boxSize={"20px"} data-icon />
          {(showTicker || !readonly) && (
            <HStack spacing={"4px"}>
              {showTicker && (<Box as={"span"}>{value.ticker}</Box>)}
              {!readonly && (<Icon name={"down"} data-arrow {...s.MenuButtonArrow} />)}
            </HStack>
          )}
        </HStack>
      </MenuButton>
      {!readonly && (
        <MenuList {...s.MenuList}>
          {tokens.map((token) => (
            <MenuItem
              key={token.ticker}
              {...s.CurrencyItemStyle}
              onClick={() => onChange && onChange(token)}
            >
              <TokenIcon ticker={token.ticker} boxSize={"20px"} />
              <Box as={'span'} flex={1}>{token.ticker}</Box>
              {value === token && (
                <Icon name={'check'} />
              )}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
});
