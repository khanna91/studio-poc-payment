/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const { APIError } = require('@utils/APIError');
const util = require('./helper.util');

describe('Utility - helper', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should return same APIError', () => {
    const err = util.handleExternalServiceError(APIError.withCode('TESTING'));
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
    expect(err.errors[0].errorCode).toBe('TESTING');
  });

  it('should return EXTERNAL_SERVICE_DOWN error', () => {
    const err = util.handleExternalServiceError({ code: 'ECONNABORTED' });
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('errors');
    expect(err).toHaveProperty('status');
    expect(err).toHaveProperty('errors');
    expect(err).toHaveProperty('isPublic');
    expect(err).toHaveProperty('route');
    expect(err).toHaveProperty('isOperational');
    expect(err.name).toBe('APIError');
    expect(err.status).toBe(httpStatus.GATEWAY_TIMEOUT);
    expect(err.errors).toBeArray();
    expect(err.errors).not.toHaveLength(0);
    expect(err.errors[0]).toHaveProperty('errorCode');
    expect(err.errors[0].errorCode).toBe('EXTERNAL_SERVICE_DOWN');
  });

  it('should return INTERNAL_SERVICE_NOT_RESPONDING error', () => {
    const err = util.handleExternalServiceError({ code: 'UNKNOWN' });
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('errors');
    expect(err).toHaveProperty('status');
    expect(err).toHaveProperty('errors');
    expect(err).toHaveProperty('isPublic');
    expect(err).toHaveProperty('route');
    expect(err).toHaveProperty('isOperational');
    expect(err.name).toBe('APIError');
    expect(err.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(err.errors).toBeArray();
    expect(err.errors).not.toHaveLength(0);
    expect(err.errors[0]).toHaveProperty('errorCode');
    expect(err.errors[0].errorCode).toBe('INTERNAL_SERVICE_NOT_RESPONDING');
  });

  it('should return UNKNOWN error', () => {
    const err = util.handleExternalServiceError({ response: { data: { response: { errors: [{ errorCode: 'UNKNOWN' }] } } } });
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
