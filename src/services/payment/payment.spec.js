/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./payment.service');

jest.mock('../../models');
const { Payment } = require('../../models');

describe('Service - initiate payment', () => {
  const body = {};

  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should able to create new order', () => {
    Payment.create = jest.fn(() => Promise.resolve({ id: 1 }));
    return service.create(body).then((order) => {
      expect(order).toBeObject();
    });
  });

  it('should throw error while creating order', () => {
    Payment.create = jest.fn(() => Promise.reject(new Error('DBFAIL')));
    return service.create(body).catch((err) => {
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
});

describe('Service - get payment', () => {
  const paymentId = '04976e84-06dc-4652-a066-efea38a992e0';

  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should able to retrive order', () => {
    Payment.findById = jest.fn(() => Promise.resolve({ id: 1 }));
    return service.get(paymentId).then((payment) => {
      expect(payment).toBeObject();
    });
  });

  it('should throw error while retriving order', () => {
    Payment.findById = jest.fn(() => Promise.resolve(null));
    return service.get(paymentId).catch((err) => {
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
});

describe('Service - update payment status', () => {
  const orderId = '04976e84-06dc-4652-a066-efea38a992e0';
  const status = 'CONFIRMED';

  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should able to update payment status', () => {
    Payment.findById = jest.fn(() => Promise.resolve({ id: 1, status: 'INITIATED', save: () => Promise.resolve({ id: 1 }) }));
    return service.updatePaymentStatus(orderId, status).then((order) => {
      expect(order).toBeObject();
    });
  });

  it('should throw error while retriving payment', () => {
    Payment.findById = jest.fn(() => Promise.resolve(null));
    return service.updatePaymentStatus(orderId, status).catch((err) => {
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

  it('should throw error while updating the order', () => {
    Payment.findById = jest.fn(() => Promise.resolve({ id: 1, status: 'INITIATED', save: () => Promise.reject(new Error('DBFAIL')) }));
    return service.updatePaymentStatus(orderId, status).catch((err) => {
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
      expect(err.errors[0].errorCode).toBe('PAYMENT_NOT_UPDATED');
    });
  });

  it('should throw error if try to update payment not in initiated state', () => {
    Payment.findById = jest.fn(() => Promise.resolve({ id: 123, status: 'CONFIRMED' }));
    return service.updatePaymentStatus(orderId, status).catch((err) => {
      expect(err).toHaveProperty('name');
      expect(err).toHaveProperty('errors');
      expect(err).toHaveProperty('status');
      expect(err).toHaveProperty('errors');
      expect(err).toHaveProperty('isPublic');
      expect(err).toHaveProperty('route');
      expect(err).toHaveProperty('isOperational');
      expect(err.name).toBe('APIError');
      expect(err.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      expect(err.errors).toBeArray();
      expect(err.errors).not.toHaveLength(0);
      expect(err.errors[0]).toHaveProperty('errorCode');
      expect(err.errors[0].errorCode).toBe('INVALID_REQUEST');
    });
  });
});
