/**
 * Helper Utility
 *
 */
const httpStatus = require('http-status');
const { APIError } = require('@utils/APIError');

const ORDER_STATUS = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED'
};

exports.ORDER_STATUS = ORDER_STATUS;

const PAYMENT_STATUS = {
  INITIATED: 'INITIATED',
  PAID: 'PAID',
  REJECTED: 'REJECTED'
};

exports.PAYMENT_STATUS = PAYMENT_STATUS;

const OK = (res, responseMessage = 'OK', response = null, responseCode = 200) => {
  res.status(responseCode);
  return res.json({
    responseCode,
    responseMessage,
    response
  });
};

exports.OK = OK;

const handleApiException = (err) => {
  if (err && (err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED')) {
    return {
      status: httpStatus.GATEWAY_TIMEOUT,
      code: 'EXTERNAL_SERVICE_DOWN'
    };
  }
  return {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    code: 'INTERNAL_SERVICE_NOT_RESPONDING'
  };
};

exports.handleApiException = handleApiException;

const handleExternalServiceError = (err) => {
  if (err instanceof APIError) return err;
  if (!err.response) {
    const { code, status } = handleApiException(err);
    return APIError.withCode(code, null, status);
  }
  const { data } = err.response;
  const { errors } = data.response;
  return APIError.withCode(errors[0].errorCode, errors[0].errorDescription, data.response.responseCode);
};

exports.handleExternalServiceError = handleExternalServiceError;
