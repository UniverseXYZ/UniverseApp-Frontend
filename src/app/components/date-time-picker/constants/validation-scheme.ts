import * as Yup from 'yup';

export const DateTimeValidationSchema = Yup.object().shape({
  hours: Yup.number()
    .required()
    .min(0, '')
    .max(23, ''),
  minutes: Yup.number()
    .required()
    .min(0, '')
    .max(59, ''),
});
