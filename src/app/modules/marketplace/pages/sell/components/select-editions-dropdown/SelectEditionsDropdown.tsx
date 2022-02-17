import { Box, Text } from '@chakra-ui/react';

import { INft } from '../../../../../nft/types';
import { Dropdown, Checkbox } from '../../../../../../components';

interface ISelectEditionsDropdownItemProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const EditionItem = ({ isChecked, label, onChange }: ISelectEditionsDropdownItemProps) => {
  return (
    <Box
      fontSize={'12px'}
      fontWeight={400}
      borderTop={'1px solid rgba(0, 0, 0, 0.1)'}
      _hover={{
        background: '#F6FAF3',
        cursor: 'pointer',
      }}
      sx={{
        label: {
          padding: '5px 20px',
          width: '100%',
        }
      }}
    >
      <Checkbox
        isChecked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      >{label}</Checkbox>
    </Box>
  );
}

interface ISelectEditionsDropdownProps {
  nft: INft;
  selectedEditions: string[];
  onChange: (editions: string[] | false) => void;
}

export const SelectEditionsDropdown = ({ nft, selectedEditions, onChange }: ISelectEditionsDropdownProps) => {
  return (
    <Dropdown
      label={'Editions #'}
      buttonProps={{
        fontSize: '12px',
        padding: '4px 10px',
        height: 'fit-content',
        color: 'black',
        fontWeight: 400,
        sx: {
          '.chakra-button__icon': {
            _last: {
              ml: '5px',
            },
          },
        }
      }}
    >
      <Box color={'black'} w={'235px'} position={'relative'} zIndex={11}>
        <Box p={'18px 20px 14px 20px'}>
          <Text fontSize={'14px'} fontWeight={700}>Choose edition number</Text>
        </Box>
        <EditionItem
          label={'Select All'}
          isChecked={nft.tokenIds.length === selectedEditions.length}
          onChange={(isChecked) => {
            onChange(isChecked ? [...nft.tokenIds] : false);
          }}
        />
        {nft.tokenIds.map((tokenId, i) => (
          <EditionItem
            key={i}
            label={`#${tokenId}`}
            isChecked={selectedEditions.includes(tokenId)}
            onChange={(isChecked) => {
              const newEditions = isChecked
                ? [...selectedEditions, tokenId]
                : selectedEditions.filter(_tokenId => _tokenId !== tokenId);

              onChange(newEditions.length ? newEditions : false);
            }}
          />
        ))}
      </Box>
    </Dropdown>
  );
};
