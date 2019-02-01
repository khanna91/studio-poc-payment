/* eslint-disable arrow-body-style */
const Service = require('./http.service');

jest.mock('axios');
const axios = require('axios'); // eslint-disable-line

describe('Service - http', () => {
  let successResponse;
  let mockFunction;

  beforeEach(() => {
    mockFunction = null;
    successResponse = {
      responseCode: 200,
      responseMessage: 'External Service',
      response: {
        randomKey: 'randomValue'
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should execute axios successfully', () => {
    axios.request = jest.fn(async () => successResponse);

    return Service.createRequest('post', '/google', null, null).then((response) => {
      expect(response).toBeObject();
      expect(response).toContainAllKeys(['responseCode', 'responseMessage', 'response']);
    });
  });

  it('should execute axios and throws error', () => {
    axios.request = jest.fn(() => Promise.reject(new Error('Something went wrong')));

    return Service.createRequest('post', '/google', null, mockFunction).catch((err) => {
      expect(err.message).toBe('Something went wrong');
    });
  });
});
