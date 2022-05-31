import { FormikProps } from 'formik';
import React, { createContext, useContext } from 'react';

import { INFT } from '@app/modules/nft/types';

import { ISellForm } from './types';
import { SellAmountType, SellMethod } from './enums';
import { Status } from './components/tab-summary/compoents/posting-popup/enums';

export interface IListingPage {
  nft: INFT;
  isPosted: boolean;
  amountType: SellAmountType;
  sellMethod: SellMethod;
  form: FormikProps<ISellForm>;
  goBack: () => void;
  goContinue: () => void;
  postingPopupStatus: Status;
  setPostingPopupStatus: React.Dispatch<React.SetStateAction<Status>>;
}

export const ListingPageContext = createContext<IListingPage>({} as IListingPage);

export const useListingPage: () => IListingPage = () => useContext(ListingPageContext);
