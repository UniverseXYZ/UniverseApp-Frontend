import { PropertyTraitVariant } from '../enums';

import PuzzlePink from './../../../../../../../../../../assets/images/v2/puzzle-pink.svg'
import PuzzleOrange from './../../../../../../../../../../assets/images/v2/puzzle-orange.svg'
import PuzzleBlue from './../../../../../../../../../../assets/images/v2/puzzle-blue.svg'
import PuzzleMix from './../../../../../../../../../../assets/images/v2/puzzle-mix.svg'

export const icons: Record<PropertyTraitVariant, string> = {
  [PropertyTraitVariant.pink]: PuzzlePink,
  [PropertyTraitVariant.orange]: PuzzleOrange,
  [PropertyTraitVariant.blue]: PuzzleBlue,
  [PropertyTraitVariant.mix]: PuzzleMix,
  [PropertyTraitVariant.default]: '',
};
