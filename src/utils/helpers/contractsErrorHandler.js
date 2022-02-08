import { SC_ERROR_CODES } from './constants';

/**
 *
 * @param {string} - the contract error message
 * @returns {string} - the last 3 chars of the error message
 */
export const getContractErrorCode = (msg) => msg?.slice(msg.length - 3);

/**
 *
 * @param {object} err - optional error object returned by metamask
 * @returns {object} - error object with title and body properties
 */
export const setErrors = (err) => {
  const errorObject = {
    title: 'Error occurred',
    body: err?.error?.message,
  };

  // case if the user denies the transaction
  if (err?.code === 4001) {
    // mutate error object
    errorObject.title = 'Transaction failed';
    errorObject.body = 'User denied transaction signature';
    return errorObject;
  }

  // case if there is s a client side error
  const errorCode = getContractErrorCode(err?.error?.message);
  // eslint-disable-next-line no-prototype-builtins
  if (errorCode && SC_ERROR_CODES.hasOwnProperty(errorCode)) {
    // mutate error object
    errorObject.title = 'Oops';
    errorObject.body = `Executuion reverted.
    ${SC_ERROR_CODES[errorCode]}.
    Error code: ${errorCode}`;
    return errorObject;
  }
  return errorObject;
};
