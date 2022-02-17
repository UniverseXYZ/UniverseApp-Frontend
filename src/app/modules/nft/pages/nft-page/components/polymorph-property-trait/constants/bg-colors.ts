import { colors } from './colors';
import { PropertyTraitVariant } from '../enums';

export const bgColor: Record<PropertyTraitVariant, string> = {
  [PropertyTraitVariant.pink]: `${colors.pink[1]}`,
  [PropertyTraitVariant.orange]: `${colors.orange[1]}`,
  [PropertyTraitVariant.blue]: `${colors.blue[1]}`,
  [PropertyTraitVariant.mix]: `linear-gradient(90deg, ${colors.pink[1]} 0%, ${colors.pink[1]} 50%, ${colors.orange[1]} 50%, ${colors.orange[1]} 100%)`,
  [PropertyTraitVariant.default]: `${colors.grey[1]}`,
};
