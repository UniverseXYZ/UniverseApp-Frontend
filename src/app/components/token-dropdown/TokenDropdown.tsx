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
  value: IToken;
  onChange?: (token: IToken) => void;
}

export const TokenDropdown = React.forwardRef<HTMLButtonElement, ITokenDropdownProps>((props, ref) => {
  const {
    size = "md",
    placement,
    tokens = TOKENS,
    value,
    onChange,
  } = props;

  return (
    <Menu placement={placement}>
      <MenuButton as={Button} {...s.MenuButton} {...s.MenuButtonSized[size]} ref={ref}>
        <HStack spacing={"8px"}>
          <TokenIcon ticker={value.ticker} boxSize={"20px"} />
          <HStack spacing={"4px"}>
            <Box as={"span"}>{value.ticker}</Box>
            <Icon name={"down"} data-arrow {...s.MenuButtonArrow} />
          </HStack>
        </HStack>
      </MenuButton>
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
    </Menu>
  );
});
