import { FormikProps } from 'formik';

import { SellAmountType, SellMethod } from '../enums';
import { ISellForm } from './sell-form';

export interface IMarketplaceSellContextData {
  amountType: SellAmountType;
  sellMethod: SellMethod;
  form: FormikProps<ISellForm>;
  selectAmount: (amountType: SellAmountType) => void;
  selectMethod: (amountType: SellMethod) => void;
  goBack: () => void;
  goContinue: () => void;
}
