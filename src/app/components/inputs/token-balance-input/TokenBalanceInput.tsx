import { Box, Input, InputProps } from '@chakra-ui/react';
import { Contract, utils } from 'ethers';
import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';

import { TokenDropdown } from '@app/components';
import { IToken } from '@app/types';
import Contracts from '@legacy/contracts.json';

import scss from './TokenBalanceInput.module.scss';
import { useAuthStore } from '../../../../stores/authStore';
import axios from 'axios';

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

interface ITokenBalanceInputProps extends Omit<InputProps, 'onChange'> {
  availableTokens?: IToken[];
  token: IToken;

  onChange?: (value: string) => void;
  onTokenChange?: (token: IToken) => void;

  onBalanceLoaded?: (balance: number) => void;
}

export const TokenBalanceInput: React.FC<ITokenBalanceInputProps> = (props) => {
  const {
    availableTokens,
    token,
    onChange,
    onTokenChange,
    onBalanceLoaded,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const { signer, address } = useAuthStore();

  const { data: balance, isLoading: isLoadingBalance } = useQuery(
    ['user', address, 'token', token.ticker, 'balance'],
    async () => {
      if (!signer) {
        return undefined;
      }

      const address = await signer.getAddress();

      const contract = new Contract(
        contractsData[token.contractName]?.address,
        contractsData[token.contractName]?.abi,
        signer
      );

      const balance = await contract.balanceOf(address);

      const balanceFormatted = utils.formatUnits(balance, token.decimals);

      return parseFloat(balanceFormatted) !== 0 ? balanceFormatted : undefined;
    },
    {
      enabled: !!signer
    }
  );

  const { data: tokenPriceUSD } = useQuery(
    ["token", token.ticker, "rate", "usd"],
    async () => {
      // FOR FUTURE: use data from MongoDB
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token.coingeckoId}&vs_currencies=usd`);
      return data[token.coingeckoId]["usd"];
    },
  );

  useEffect(() => {
    onBalanceLoaded && onBalanceLoaded(+(balance ?? 0));
  }, [balance, onBalanceLoaded]);

  return (
    <Box className={scss.Wrapper}>
      <Input
        ref={inputRef}
        height={'auto'}
        padding={rest.value ? '12px 16px 60px' : '20px 16px 52px'}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...rest}
      />

      <Box className={scss.TokenDropdownWrapper}>
        <TokenDropdown
          placement={"bottom-end"}
          tokens={availableTokens}
          value={token}
          onChange={onTokenChange}
        />
      </Box>

      {(tokenPriceUSD && rest.value) && (
        <Box className={scss.TokenPriceUSD}>
          ≈ ${(tokenPriceUSD * +rest.value).toFixed(2)}
        </Box>
      )}

      <Box className={scss.BalanceWrapper}>
        Balance: {(!balance || isLoadingBalance) ? '0.0' : (
        <>
          {balance}{" "}
          <Box
            as={'strong'}
            className={scss.Max}
            onClick={() => onChange && onChange(balance)}
          >Max</Box>
        </>
      )}
      </Box>
    </Box>
  );
}
