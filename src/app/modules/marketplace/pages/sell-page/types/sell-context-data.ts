import { FormikProps } from 'formik';

import { SellAmountType, SellMethod } from '../enums';
import { ISellForm } from './sell-form';
import { INFT } from '../../../../nft/types';
import { Status } from '../components/tab-summary/compoents/posting-popup/enums';

export interface IMarketplaceSellContextData {
  nft: INFT;
  isPosted: boolean;
  amountType: SellAmountType;
  sellMethod: SellMethod;
  form: FormikProps<ISellForm>;
  selectAmount: (amountType: SellAmountType) => void;
  selectMethod: (amountType: SellMethod) => void;
  goBack: () => void;
  goContinue: () => void;
  postingPopupStatus: Status;
  setPostingPopupStatus: React.Dispatch<React.SetStateAction<Status>>

}
