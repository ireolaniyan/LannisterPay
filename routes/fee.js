const express = require('express');
const Fee = require('../app/controller/fee.js');

const router = express.Router();

router.post('/fees', Fee.createFeeConfiguration);
router.post('/compute-transaction-fee', Fee.computeFee);

module.exports = router;