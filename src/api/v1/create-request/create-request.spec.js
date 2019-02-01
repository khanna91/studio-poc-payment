/* eslint-disable arrow-body-style */
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');
const httpStatus = require('http-status');
const { APIError } = require('@utils/APIError');
const controller = require('./create-request.controller');

jest.mock('@services/payment');
const PaymentService = require('@services/payment'); // eslint-disable-line

describe('Test createRequest', () => {
  let body;
  let req;
  let res;

  beforeEach(() => {
    body = {
      userId: '04976e84-06dc-4652-a066-efea38a992e0',
      currency: 'USD',
      orderItems: [
        { sku: 'PR12', quantity: 2 },
        { sku: 'PR13', quantity: 1 }
      ]
    };
    req = new MockReq({ body });
    res = new MockRes();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should failed to create order', () => {
    PaymentService.create = jest.fn(() => Promise.reject(APIError.withCode('PAYMENT_NOT_CREATED')));
    return controller.createRequest(req, res, (err) => {
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
      expect(err.errors[0].errorCode).toBe('PAYMENT_NOT_CREATED');
    });
  });

  test('should create new payment request', () => {
    PaymentService.create = jest.fn(() => Promise.resolve({ id: 1, status: 'INITIATED' }));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');

    return controller.createRequest(req, res)
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
