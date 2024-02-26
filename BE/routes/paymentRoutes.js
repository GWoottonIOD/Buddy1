
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const rateLimit = require('express-rate-limit');

// Create a rate limiter that allows one request per second
const getLimiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // 1 request per windowMs
  });

const postLimiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // 1 request per windowMs
  }); 

router.get('/', getLimiter, (req, res) => { 
    Controllers.paymentController.getPayments(req, res);
    console.log(res.err)
})

router.get('/test', getLimiter, (req, res) => { 
    Controllers.dynamicController.getWhatever(req, res);
})

router.get('/:id', (req, res) => {
    Controllers.paymentController.getPaymentsByID(req, res);
})

router.get('/userpayments/:userid', (req, res) => {
    Controllers.paymentController.getPaymentsByUserID(req, res);
})

router.post('/create', postLimiter, (req, res) => {
    Controllers.paymentController.createPayments(req.body, res)
})

router.put('/put/:id', (req, res) => {
    Controllers.paymentController.updatePayments(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.paymentController.deletePayments(req, res)
})

router.delete('/userpayments/:userid', (req, res) => {
    Controllers.paymentController.deletePaymentsByUserID(req, res);
})

router.lock('/', (req, res) => {  
    Controllers.paymentController.lockPayments(req, res);
})

router.unlock('/', (req, res) => {  
    Controllers.paymentController.unlockPayments(req, res);
})

module.exports = router;