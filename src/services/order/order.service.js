/**
 * Order Service
 *
 */
const { apiPath } = require('@config/vars');
const { handleExternalServiceError } = require('@utils/helper');
const http = require('@services/http');

const request = async (method, endpoint, payload, headers) => {
  try {
    const url = `${apiPath.domain}${apiPath.order.base}${endpoint}`;
    const { data } = await http.createRequest(method, url, payload, headers);
    return data.response;
  } catch (err) {
    throw handleExternalServiceError(err);
  }
};

/**
 * Function to update the order status
 * @param {UUID} orderId            Order unique identifier
 * @param {String} status           Status to be changed
 *
 * @public
 */
const updateStatus = async (orderId, status) => request('patch', `${apiPath.order.changeStatus}${orderId}`, { status });


module.exports = {
  request,
  updateStatus
};
