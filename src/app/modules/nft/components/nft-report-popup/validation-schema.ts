import * as Yup from 'yup';

export const ReportPopupValidationSchema = Yup.object().shape({
  reason: Yup.string().required().min(1).max(4096),
  description: Yup.string().required().min(1).max(4096),
  captchaResponse: Yup.string().required().min(1),
});
