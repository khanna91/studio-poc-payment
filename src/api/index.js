const express = require('express');

const router = express.Router();
const v1 = require('./v1');

/**
 * GET /status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));


/**
 * GET v1
 */
router.use('/v1', v1);

module.exports = router;
