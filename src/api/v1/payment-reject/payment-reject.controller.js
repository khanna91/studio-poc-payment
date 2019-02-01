const PaymentService = require('@services/payment');
const OrderService = require('@services/order');
const { PAYMENT_STATUS, ORDER_STATUS, OK } = require('@utils/helper');
const { logger } = require('@utils/logger');

/**
 * paymentReject
 * @public
 */
exports.paymentReject = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await PaymentService.updatePaymentStatus(paymentId, PAYMENT_STATUS.REJECTED, null);
    OrderService.updateStatus(payment.orderId, ORDER_STATUS.CANCELLED).then(() => {
      logger.info('Order status updated successfully');
    }).catch((err) => {
      logger.error('Order status failed to update successfully', err);
    });
    return OK(res, 'Payment Rejected');
  } catch (error) {
    return next(error);
  }
};
