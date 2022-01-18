import { HistoryType } from '../../../../../enums';

import HandIcon from '../../../../../../../../../../assets/images/marketplace/v2/history/hand.svg';
import CartIcon from '../../../../../../../../../../assets/images/marketplace/v2/history/cart.svg';
import StrollerIcon from '../../../../../../../../../../assets/images/marketplace/v2/history/stroller.svg';
import LabelIcon from '../../../../../../../../../../assets/images/marketplace/v2/history/label.svg';
import OfferIcon from '../../../../../../../../../../assets/images/marketplace/v2/history/offer.svg';

export const actionIcon: Record<HistoryType, string> = {
  [HistoryType.BID]: `url(${HandIcon}) center no-repeat, #38D3E9`,
  [HistoryType.BOUGHT]: `url(${CartIcon}) center no-repeat, #6FDD6C`,
  [HistoryType.MINTED]: `url(${StrollerIcon}) center no-repeat, #6C9EFF`,
  [HistoryType.PUT_ON_SALE]: `url(${CartIcon}) center no-repeat, #6FDD6C`,
  [HistoryType.LISTED]: `url(${LabelIcon}) center no-repeat, #FFB23E`,
  [HistoryType.OFFER]: `url(${OfferIcon}) center no-repeat, #F05ABD`,
};
