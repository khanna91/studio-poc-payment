/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const Service = require('./order.service');

jest.mock('@services/http');
const http = require('@services/http'); // eslint-disable-line

describe('Service - order', () => {
  let successResponse;
  let body;

  beforeEach(() => {
    body = {};
    successResponse = {
      data: {
        responseCode: 200,
        responseMessage: 'Order Service',
        response: {
          randomKey: 'randomValue'
        }
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the success response', () => {
    http.createRequest = jest.fn(async () => successResponse);

    return Service.request('post', '/dummy', { key: 'value' }, { accessToken: '123' }).then((response) => {
      expect(response).toBeObject();
      expect(response).toContainAllKeys(['randomKey']);
    });
  });

  it('should throw api error', () => {
    const errorResponse = {
      response: {
        data: {
          responseCode: 400,
          responseMessage: 'Something went wrong',
          response: {
            errors: [
              {
                errorCode: 'UNKNOWN',
                errorTitle: 'ORDER_SERVICE:UNKNOWN',
                errorDescription: 'Order service not responding',
                errorDebugDescription: null,
                errorAttributes: null
              }
            ]
          }
        }
      }
    };
    http.createRequest = jest.fn(() => Promise.reject(errorResponse));

    return Service.request('post', '/dummy', { key: 'value' }, { accessToken: '123' }).catch((err) => {
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
      expect(err.errors[0].errorCode).toBe('UNKNOWN');
    });
  });

  it('should update order status', () => {
    http.createRequest = jest.fn(async () => successResponse);

    return Service.updateStatus(body).then((response) => {
      expect(response).toBeObject();
      expect(response).toContainAllKeys(['randomKey']);
    });
  });
});
