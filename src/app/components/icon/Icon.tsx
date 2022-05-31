import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as PlusSVG } from '@assets/icons/plus.svg';
import { ReactComponent as MinusSVG } from '@assets/icons/minus.svg';
import { ReactComponent as EyeSVG } from '@assets/icons/eye.svg';
import { ReactComponent as LabelSVG } from '@assets/icons/label.svg';
import { ReactComponent as SettingsSVG } from '@assets/icons/settings.svg';
import { ReactComponent as TrashSVG } from '@assets/icons/trash.svg';

type Icons =
  | 'plus'
  | 'minus'
  | 'eye'
  | 'label'
  | 'settings'
  | 'trash'
;

const icons: Record<Icons, React.FC> = {
  plus: PlusSVG,
  minus: MinusSVG,
  eye: EyeSVG,
  label: LabelSVG,
  settings: SettingsSVG,
  trash: TrashSVG,
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
