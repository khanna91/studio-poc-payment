/* istanbul ignore file */
const { serviceName } = require('@config/vars');

exports.routes = {
  root: 'default'
};

exports.services = {
  input: 'input',
  route: 'route'
};

exports.codes = {
  validationError: 'VALIDATION_ERROR',
  notFound: 'NOT_FOUND',
  unknown: 'UNKNOWN'
};

exports.getErrorCode = (route, service, code) => {
  const result = [serviceName, route, service, code].join(':');
  return result;
};
