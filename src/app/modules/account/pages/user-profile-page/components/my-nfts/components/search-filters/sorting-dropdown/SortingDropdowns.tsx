import { useEffect, useState } from 'react';
import { Dropdown } from '@app/components/dropdown';
import { Box } from '@chakra-ui/react';
import { ISortByFilterValue } from './types';
interface ISortByProps {
  value: ISortByFilterValue;
  onSelect: (v: ISortByFilterValue) => void;
  onClear: () => void;
  disabled?: boolean;
}
interface ISortItem {
  [key: string]: string;
};

const SORT_ITEMS_MAP: ISortItem = {
  1: 'Ending soon',
  2: 'Lowest price first',
  3: 'Highest price first',
  4: 'Recently listed',
};

export const SortOrderOptions = {
  EndingSoon: 1,
  LowestPrice: 2,
  HighestPrice: 3,
  RecentlyListed: 4,
};

export const SortingDropdowns = (props: ISortByProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortName, setSortName] = useState('Sort by');
  const [_value, _setValue] = useState<string>('Sort By');

  useEffect(() => {
    const v: string = SORT_ITEMS_MAP[props.value.sortingIndex];
    _setValue(v);
  }, [props.value]);

  const handleSelect = (i: number) => {
    const r: ISortByFilterValue = {
      sortingIndex: i,
    };

    props.onSelect(r);
  }

  return (
    <Dropdown
      label={sortName}
      value={_value}
      isOpened={showDropdown}
      onOpen={() => setShowDropdown(true)}
      onClose={() => setShowDropdown(false)}
      >
    <Box p={'8px'} w={'225px'} >
      {Object.keys(SORT_ITEMS_MAP).map((key, i) => {
        const item = SORT_ITEMS_MAP[key];
        return (
          <Box
            key={key}
            borderRadius={'6px'}
            cursor={'pointer'}
            fontFamily={'Space Grotesk'}
            fontSize={'14px'}
            fontWeight={'500'}
            p={'15px'}
            sx={{
              opacity: props.disabled ? '0.3' : '',
              pointerEvents: props.disabled ? 'none' : '',
            }}
            _hover={{ bg: 'rgba(0, 0, 0, 0.05)' }}
            onClick={() => handleSelect(parseInt(key))}
          >
            {item}
          </Box>
        )
      })}
    </Box>
    </Dropdown>
  );
};
