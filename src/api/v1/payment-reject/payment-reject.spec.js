/* eslint-disable arrow-body-style */
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');
const httpStatus = require('http-status');
const { APIError } = require('@utils/APIError');

jest.mock('@services/payment');
const PaymentService = require('@services/payment'); // eslint-disable-line

jest.mock('@services/order');
const OrderService = require('@services/order'); // eslint-disable-line

const controller = require('./payment-reject.controller');

describe('Test paymentReject', () => {
  const req = new MockReq({
    params: {
      paymentId: '04976e84-06dc-4652-a066-efea38a992e0'
    }
  });
  const res = new MockRes();

  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should failed to cancel the payment', () => {
    PaymentService.updatePaymentStatus = jest.fn(() => Promise.reject(APIError.withCode('INVALID_PAYMENT')));
    return controller.paymentReject(req, res, (err) => {
      expect(err).toHaveProperty('name');
      expect(err).toHaveProperty('errors');
      expect(err).toHaveProperty('status');
      expect(err).toHaveProperty('errors');
      expect(err).toHaveProperty('isPublic');
      expect(err).toHaveProperty('route');
      expect(err).toHaveProperty('isOperational');
      expect(err.name).toBe('APIError');
      expect(err.status).toBe(httpStatus.BAD_REQUEST);
      expect(err.errors).toBeArray();
      expect(err.errors).not.toHaveLength(0);
      expect(err.errors[0]).toHaveProperty('errorCode');
      expect(err.errors[0].errorCode).toBe('INVALID_PAYMENT');
    });
  });

  test('should able to cancel the payment', () => {
    PaymentService.updatePaymentStatus = jest.fn(() => Promise.resolve({ id: 1, status: 'CANCELLED' }));
    OrderService.updateStatus = jest.fn(() => Promise.resolve(true));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');

    return controller.paymentReject(req, res)
      .then(() => {
        expect(status).toBeCalledWith(httpStatus.OK);
        expect(json).toBeCalledWith(expect.objectContaining({
          responseCode: httpStatus.OK,
          responseMessage: expect.any(String),
          response: expect.any(Object)
        }));
      });
  });

  test('should able to cancel the payment but not order', () => {
    PaymentService.updatePaymentStatus = jest.fn(() => Promise.resolve({ id: 1, status: 'CANCELLED' }));
    OrderService.updateStatus = jest.fn(() => Promise.reject(APIError.withCode('INVALID_ORDER')));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');

    return controller.paymentReject(req, res)
      .then(() => {
        expect(status).toBeCalledWith(httpStatus.OK);
        expect(json).toBeCalledWith(expect.objectContaining({
          responseCode: httpStatus.OK,
          responseMessage: expect.any(String),
          response: expect.any(Object)
        }));
      });
  });
});
