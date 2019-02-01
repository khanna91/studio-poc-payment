const Joi = require('joi');

module.exports = {
  name: 'Payment Confirm',
  path: '/v1/:paymentId',
  type: 'patch',
  JoiSchema: {
    params: Joi.object().keys({
      paymentId: Joi.string().guid().required()
    }),
    path: Joi.object().keys({
      paymentId: Joi.string().guid().required()
    }),
    body: {
      transactionId: Joi.string().required()
    },
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: Joi.object()
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
