/**
 * Http Service
 *
 */
const axios = require('axios');
const { logger } = require('@utils/logger');
const { http } = require('@config/vars');

/* istanbul ignore next */
axios.interceptors.request.use((request) => {
  request.time = new Date().toISOString() // eslint-disable-line
  logger.info('Axios External API Request', request);
  return request;
});

/* istanbul ignore next */
axios.interceptors.response.use((response) => {
  const {
    request, status, headers, data
  } = response;
  logger.info('Axios External API Response', {
    url: request.path,
    time: new Date().toISOString(),
    status,
    headers,
    data
  });
  return response;
});

const createRequest = async (method, url, data, headers) => {
  const before = Date.now();
  try {
    const result = await axios.request({
      method,
      url,
      data,
      headers,
      timeout: http.timeout
    });
    logger.info('Axios External API Success Response Time', {
      url,
      method,
      time: (Date.now() - before) + 'ms' // eslint-disable-line
    });
    return result;
  } catch (err) {
    logger.error('Axios External API Failure Response Time', {
      url,
      method,
      time: (Date.now() - before) + 'ms' // eslint-disable-line
    });
    throw err;
  }
};
exports.createRequest = createRequest;
