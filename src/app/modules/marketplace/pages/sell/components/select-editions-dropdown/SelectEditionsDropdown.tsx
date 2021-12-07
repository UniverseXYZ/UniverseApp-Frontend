import { INft } from '../../../../../nft/types';
import { Dropdown } from '../../../../../../components';

interface ISelectEditionsDropdownProps {
  nft: INft;
}

export const SelectEditionsDropdown = ({ nft }: ISelectEditionsDropdownProps) => {
  return (
    <Dropdown
      label={'Editions #'}
    >
      <p>Select NFT editions</p>
    </Dropdown>
  );
};
