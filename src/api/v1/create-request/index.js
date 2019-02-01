const express = require('express');
const validate = require('express-validation');
const controller = require('./create-request.controller');
const validator = require('./create-request.validator');

const router = express.Router();

/**
 * @api {post} api/v1/createRequest createRequest
 * @apiDescription description
 * @apiVersion 1.0.0
 * @apiName createRequest
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
router.route('/')
  .post(validate(validator.JoiSchema), controller.createRequest);

module.exports = router;
