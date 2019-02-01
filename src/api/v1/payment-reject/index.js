const express = require('express');
const validate = require('express-validation');
const controller = require('./payment-reject.controller');
const validator = require('./payment-reject.validator');

const router = express.Router();

/**
 * @api {delete} api/v1/paymentReject paymentReject
 * @apiDescription description
 * @apiVersion 1.0.0
 * @apiName paymentReject
 * @apiPermission public
 *
 * @apiParam  {String} [param]  Put some parameter schema here
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/:paymentId')
  .delete(validate(validator.joiSchema), controller.paymentReject);

module.exports = router;
