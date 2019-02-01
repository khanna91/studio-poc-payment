const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(process.cwd(), '.env'),
  sample: path.join(process.cwd(), '.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  serviceName: 'studio-payment-service',
  http: {
    timeout: 5000,
    responseType: 'json',
    responseEncoding: 'utf8',
    retries: 3
  },
  apiPath: {
    domain: process.env.API_GATEWAY,
    order: {
      serviceName: 'ORDER_SERVICE',
      base: '/api/v1',
      changeStatus: '/'
    }
  }
};
