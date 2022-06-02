import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as PlusSVG } from '@assets/icons/plus.svg';
import { ReactComponent as MinusSVG } from '@assets/icons/minus.svg';
import { ReactComponent as EyeSVG } from '@assets/icons/eye.svg';
import { ReactComponent as LabelSVG } from '@assets/icons/label.svg';
import { ReactComponent as SettingsSVG } from '@assets/icons/settings.svg';
import { ReactComponent as TrashSVG } from '@assets/icons/trash.svg';
import { ReactComponent as DownSVG } from '@assets/icons/down.svg';
import { ReactComponent as InfoSVG } from '@assets/icons/info.svg';
import { ReactComponent as CheckSVG } from '@assets/icons/check.svg';
import { ReactComponent as FilterArtistSVG } from '@assets/icons/filter-artist.svg';
import { ReactComponent as FilterCollectionSVG } from '@assets/icons/filter-collection.svg';
import { ReactComponent as FilterNFTTypeSVG } from '@assets/icons/filter-nft-type.svg';
import { ReactComponent as FilterPriceRangeSVG } from '@assets/icons/filter-price-range.svg';
import { ReactComponent as FilterPropertiesSVG } from '@assets/icons/filter-properties.svg';
import { ReactComponent as FilterSaleTypeSVG } from '@assets/icons/filter-sale-type.svg';
import { ReactComponent as FiltersSVG } from '@assets/icons/filters.svg';

export type Icons =
  | 'plus'
  | 'minus'
  | 'eye'
  | 'label'
  | 'settings'
  | 'trash'
  | 'down'
  | 'info'
  | 'check'
  | 'filterArtist'
  | 'filterCollection'
  | 'filterNftType'
  | 'filterPriceRange'
  | 'filterProperties'
  | 'filterSaleType'
  | 'filters'
;

const icons: Record<Icons, React.FC> = {
  plus: PlusSVG,
  minus: MinusSVG,
  eye: EyeSVG,
  label: LabelSVG,
  settings: SettingsSVG,
  trash: TrashSVG,
  down: DownSVG,
  info: InfoSVG,
  check: CheckSVG,
  filterArtist: FilterArtistSVG,
  filterCollection: FilterCollectionSVG,
  filterNftType: FilterNFTTypeSVG,
  filterPriceRange: FilterPriceRangeSVG,
  filterProperties: FilterPropertiesSVG,
  filterSaleType: FilterSaleTypeSVG,
  filters: FiltersSVG,
};

interface IIconProps extends BoxProps {
  name: Icons,
  viewBox?: string;
}

export const Icon: React.FC<IIconProps> = (props) => {
  const { name, ...rest } = props;
  return (
    <Box as={icons[name]} {...rest}></Box>
  );
}
