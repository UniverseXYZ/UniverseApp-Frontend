import { Box, Text, CheckboxProps, ButtonProps, BoxProps, TextProps } from '@chakra-ui/react';
import { useCallback } from 'react';

import { INFT } from '../../../../../nft/types';
import { Dropdown, Checkbox } from '../../../../../../components';

interface IStyles {
  button: ButtonProps;
  checkbox: CheckboxProps;
  container: BoxProps;
  title: TextProps;
}

const styles: IStyles = {
  button: {
    borderRadius: '8px',
    color: 'black',
    fontSize: '12px',
    fontWeight: 500,
    height: 'fit-content',
    padding: '9px 10px',
    mr: '6px',
    sx: {
      '.chakra-button__icon': {
        _last: {
          ml: '5px',
        },
      },
    }
  },
  checkbox: {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: '12px',
    fontWeight: 400,
    padding: '5px 20px',
    width: '100%',
    _hover: {
      background: '#F6FAF3',
      cursor: 'pointer',
    }
  },
  container: {
    color: 'black',
    position: 'relative',
    w: '235px',
    zIndex: 11,
  },
  title: {
    fontSize: '14px',
    fontWeight: 700,
    p: '18px 20px 14px 20px',
  }
};

interface ISelectEditionsDropdownProps {
  NFT: INFT;
  selectedEditions: string[];
  onChange: (editions: string[]) => void;
}

export const SelectEditionsDropdown = ({ NFT, selectedEditions, onChange }: ISelectEditionsDropdownProps) => {

  const handleCheckEdition = useCallback((e, tokenId) => {
    const newEditions = e.target.checked
      ? [...selectedEditions, tokenId]
      : selectedEditions.filter(_tokenId => _tokenId !== tokenId);

    onChange(newEditions);
  }, [selectedEditions, onChange]);

  const handleCheckAllEdition = useCallback((e) => {
    onChange(e.target.checked ? [...NFT.tokenIds] : []);
  }, [NFT, onChange]);

  return (
    <Dropdown label={'Editions #'} buttonProps={styles.button}>
      <Box {...styles.container}>
        <Text {...styles.title}>Choose edition number</Text>
        <Checkbox
          {...styles.checkbox}
          isChecked={NFT.tokenIds.length === selectedEditions.length}
          onChange={handleCheckAllEdition}
        >Select All</Checkbox>
        {NFT.tokenIds.map((tokenId, i) => (
          <Checkbox
            {...styles.checkbox}
            key={i}
            isChecked={selectedEditions.includes(tokenId)}
            onChange={(e) => handleCheckEdition(e, tokenId)}
          >{`#${tokenId}`}</Checkbox>
        ))}
      </Box>
    </Dropdown>
  );
};
