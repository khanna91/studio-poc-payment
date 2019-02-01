const PaymentService = require('@services/payment');
const OrderService = require('@services/order');
const { PAYMENT_STATUS, ORDER_STATUS, OK } = require('@utils/helper');
const { logger } = require('@utils/logger');

/**
 * paymentConfirm
 * @public
 */
exports.paymentConfirm = async (req, res, next) => {
  try {
    const { transactionId } = req.body;
    const payment = await PaymentService.updatePaymentStatus(req.params.paymentId, PAYMENT_STATUS.PAID, transactionId);
    OrderService.updateStatus(payment.orderId, ORDER_STATUS.CONFIRMED).then(() => {
      logger.info('Order status updated successfully');
    }).catch((err) => {
      logger.error('Order status failed to update successfully', err);
    });
    return OK(res, 'Payment Confirmed');
  } catch (error) {
    return next(error);
  }
};
