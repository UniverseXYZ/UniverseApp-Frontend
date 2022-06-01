import * as Yup from 'yup';
import { utils } from 'ethers';

export const getMakeOfferValidationSchema = (validateRoyalties: boolean, userBalance: number) => {
  return Yup.object().shape({
    price: Yup.number()
      .required('This field is required')
      .moreThan(0)
      .max(userBalance, `Price must be less than or equal to ${userBalance}`),
    token: Yup.string().required('This field is required'),
    expireAt: Yup.date().typeError('This field is required').required('This field is required').min(new Date()),
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
  })
}
