import * as Yup from 'yup';
import { utils } from 'ethers';

import { SellAmountType, SellMethod } from '@app/modules/marketplace/pages/sell-page/enums';

export const getListingValidationSchema = (
  amountType?: SellAmountType,
  sellMethod?: SellMethod,
  validateRoyalties: boolean = false,
) => {
  const schemas: Record<SellMethod, Yup.SchemaOf<any>> = {
    [SellMethod.FIXED]: Yup.object().shape({
      bundleName: amountType === SellAmountType.SINGLE
        ? Yup.string()
        : Yup.string().required('Required'),
      bundleDescription: amountType === SellAmountType.SINGLE
        ? Yup.string()
        : Yup.string().max(500, 'Too Long!'), // TODO: use variable maxDescriptionSymbols
      price: Yup.number()
        .typeError('Invalid price')
        .required('Required')
        .moreThan(0, 'Price must be greater than 0'),
      royalties: Yup.array()
        .of(Yup.object().shape({
          address: validateRoyalties
            ? Yup.string()
              .required('Required')
              .test('addressValidation', 'Wallet address is not valid', (value) => utils.isAddress(value ?? ''))
            : Yup.string()
          ,
          percent: validateRoyalties
            ? Yup.number()
              .typeError('Must be a number')
              .required('Required')
              .min(1, 'Out of allowed range')
              .max(100, 'Out of allowed range')
            : Yup.number()
          ,
        }))
        .test('percentSum', 'Percent\'s sum out of allowed range', (value) => {
          return (value?.reduce((acc, r) => acc + (r?.percent ?? 0), 0) ?? 0) <= 100;
        })
    }),
    [SellMethod.DUTCH]: Yup.object().shape({}),
    [SellMethod.ENGLISH]: Yup.object().shape({}),
  };

  return schemas[sellMethod || SellMethod.FIXED];
}
