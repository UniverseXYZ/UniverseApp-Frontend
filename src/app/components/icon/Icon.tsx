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
import { ReactComponent as GridSMSVG } from '@assets/icons/grid-sm.svg';
import { ReactComponent as GridMDSVG } from '@assets/icons/grid-md.svg';
import { ReactComponent as StatisticItemsSVG } from '@assets/icons/statistic-items.svg';
import { ReactComponent as StatisticOwnersSVG } from '@assets/icons/statistic-owners.svg';
import { ReactComponent as StatisticFloorPriceSVG } from '@assets/icons/statistic-floor-price.svg';
import { ReactComponent as StatisticVolumeTradedSVG } from '@assets/icons/statistic-volume-traded.svg';
import { ReactComponent as ExternalLinkSVG } from '@assets/icons/external-link.svg';
import { ReactComponent as PenSVG } from '@assets/icons/pen.svg';
import { ReactComponent as TwitterSVG } from '@assets/icons/twitter.svg';
import { ReactComponent as DiscordSVG } from '@assets/icons/discord.svg';
import { ReactComponent as GlobeSVG } from '@assets/icons/globe.svg';
import { ReactComponent as InstagramSVG } from '@assets/icons/instagram.svg';
import { ReactComponent as MediumSVG } from '@assets/icons/medium.svg';
import { ReactComponent as TelegramSVG } from '@assets/icons/telegram.svg';
import { ReactComponent as Dots3SVG } from '@assets/icons/3-dots.svg';
import { ReactComponent as UploadSVG } from '@assets/icons/upload.svg';

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
  | 'smGrid'
  | 'mdGrid'
  | 'statisticItems'
  | 'statisticOwners'
  | 'statisticFloorPrice'
  | 'statisticVolumeTraded'
  | 'externalLink'
  | 'pen'
  | 'twitter'
  | 'discord'
  | 'globe'
  | 'instagram'
  | 'medium'
  | 'telegram'
  | 'dots3'
  | 'upload'
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
  smGrid: GridSMSVG,
  mdGrid: GridMDSVG,
  statisticItems: StatisticItemsSVG,
  statisticOwners: StatisticOwnersSVG,
  statisticFloorPrice: StatisticFloorPriceSVG,
  statisticVolumeTraded: StatisticVolumeTradedSVG,
  externalLink: ExternalLinkSVG,
  pen: PenSVG,
  twitter: TwitterSVG,
  discord: DiscordSVG,
  globe: GlobeSVG,
  instagram: InstagramSVG,
  medium: MediumSVG,
  telegram: TelegramSVG,
  dots3: Dots3SVG,
  upload: UploadSVG,
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
