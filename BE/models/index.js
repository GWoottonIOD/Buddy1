'use strict'

const Debts = require('./debts') //require the model
const Users = require('./users') //require the model
const Payments = require('./payments') //require the model

async function init() {
    await Users.sync();
    await Debts.sync();
    await Payments.sync();
  
    
    //sync the model
};

init();
module.exports = {
    Debts, //export the model
    Users, //export the model
    Payments // export the model
};

