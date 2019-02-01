const _ = require('lodash');
const PaymentService = require('@services/payment');
const { OK } = require('@utils/helper');

/**
 * createRequest
 * @public
 */
exports.createRequest = async (req, res, next) => {
  try {
    const body = _.pick(req.body, ['orderId', 'amountToPay', 'currency']);
    const { id } = await PaymentService.create(body);
    return OK(res, 'Payment Initiated', { paymentId: id });
  } catch (error) {
    return next(error);
  }
};
