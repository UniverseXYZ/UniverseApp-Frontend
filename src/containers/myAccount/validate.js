/**
 *
 * @param {*} values
 * @returns
 */
export const validateData = (values) => {
  const { avatar, accountName, accountPage, about } = values;
  const errors = {};
  if (!avatar) {
    errors.avatar = 'File is required';
  }
  if (avatar && typeof avatar !== 'string') {
    if (
      (avatar.type !== 'image/webp' &&
        avatar.type !== 'image/jpeg' &&
        avatar.type !== 'image/png') ||
      avatar.size / 1048576 > 30
    ) {
      errors.avatar = 'File format must be PNG, WEBP, JPEG (Max Size: 30mb)';
    }
  }
  if (!accountName.trim()) {
    errors.accountName = 'Display name is not allowed to be empty';
  }
  if (!accountPage) {
    errors.accountPage = 'Universe page address is not allowed to be empty';
  }
  if (!about) {
    errors.about = 'Your bio is not allowed to be empty';
  }

  return errors;
};
