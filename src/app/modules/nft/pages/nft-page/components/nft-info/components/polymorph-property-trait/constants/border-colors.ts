import { colors } from './colors';
import { PropertyTraitVariant } from '../enums';

export const borderColor: Record<PropertyTraitVariant, string> = {
  [PropertyTraitVariant.pink]: `${colors.pink[0]}`,
  [PropertyTraitVariant.orange]: `${colors.orange[0]}`,
  [PropertyTraitVariant.blue]: `${colors.blue[0]}`,
  [PropertyTraitVariant.mix]: `linear-gradient(90deg, ${colors.pink[0]} 0%, ${colors.pink[0]} 50%, ${colors.orange[0]} 50%, ${colors.orange[0]} 100%)`,
  [PropertyTraitVariant.default]: `${colors.grey[0]}`,
};
