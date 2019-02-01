/**
 * Payment Service
 *
 */
const _ = require('lodash');
const { Payment } = require('@models');
const { PAYMENT_STATUS } = require('@utils/helper');
const { APIError } = require('@utils/APIError');

const create = async (body) => {
  try {
    const params = _.pick(body, ['orderId', 'currency', 'amountToPay']);
    params.status = PAYMENT_STATUS.INITIATED;
    params.transactionId = null;
    const payment = await Payment.create(params);
    return payment;
  } catch (err) {
    throw APIError.withCode('PAYMENT_NOT_CREATED');
  }
};

const get = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw APIError.withCode('INVALID_PAYMENT', 'The payment you are trying to look is not available');
  }
  return payment;
};

const updatePaymentStatus = async (paymentId, status, transactionId) => {
  let payment = await get(paymentId);
  if (payment.status !== PAYMENT_STATUS.INITIATED) {
    throw APIError.withCode('INVALID_REQUEST', 'Seems the payment is no longer editable', 422);
  }
  payment.status = status;
  payment.transactionId = transactionId;
  try {
    payment = await payment.save();
    return payment;
  } catch (err) {
    throw APIError.withCode('PAYMENT_NOT_UPDATED');
  }
};

module.exports = {
  create,
  get,
  updatePaymentStatus
};
