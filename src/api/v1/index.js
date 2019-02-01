const express = require('express');

const router = express.Router();
const createRequestRoute = require('./create-request');
const paymentConfirmRoute = require('./payment-confirm');
const paymentRejectRoute = require('./payment-reject');


router.use('/request', createRequestRoute);
router.use('/', paymentConfirmRoute);
router.use('/', paymentRejectRoute);


module.exports = router;
