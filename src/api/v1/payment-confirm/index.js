const express = require('express');
const validate = require('express-validation');
const controller = require('./payment-confirm.controller');
const validator = require('./payment-confirm.validator');

const router = express.Router();

/**
 * @api {put} api/v1/paymentConfirm paymentConfirm
 * @apiDescription description
 * @apiVersion 1.0.0
 * @apiName paymentConfirm
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
  .patch(validate(validator.joiSchema), controller.paymentConfirm);

module.exports = router;
