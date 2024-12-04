
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

router.get('/', (req, res) => { 
    Controllers.debtController.getDebts(req, res);
})

router.post('/init', (req, res) => { 
    if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json');  
        Controllers.initialController.storeData(req.query.table, res);
    // Controllers.initialController.storeData(req.query.table, req.body[0]?.key, res);
    }
})

router.get('/:id', (req, res) => {
    Controllers.debtController.getDebtsByID(req, res);
})

router.get('/userdebts/:userid', (req, res) => {
    Controllers.debtController.getDebtsByUserID(req, res);
})

router.get('/userpaid/:userid', (req, res) => {
    Controllers.debtController.getPaidDebtsByUserID(req, res);
})

router.post('/postuserpaid/:userid', (req, res) => {
    Controllers.debtController.postPaidDebtsByUserID(req, res);
})

router.post('/create', postLimiter, (req, res) => {
    Controllers.debtController.createDebts(req.body, res)
})

router.put('/put/:id', (req, res) => {
    Controllers.debtController.updateDebts(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.debtController.deleteDebts(req, res)
})

router.delete('/deleteall', (req, res) => {
    Controllers.debtController.deleteAllDebts(req, res)
})

router.delete('/userdebts/:userid', (req, res) => {
    Controllers.debtController.deleteDebtsByUserID(req, res);
})

router.lock('/', (req, res) => {  
    Controllers.debtController.lockDebts(req, res);
})

router.unlock('/', (req, res) => {  
    Controllers.debtController.unlockDebts(req, res);
})

module.exports = router;