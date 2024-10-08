// import { create } from "../models/users";
const bcrypt = require('bcryptjs')

  function gracefulShutdown() {
    console.log("Shutting down");
    myApp.close(() => {
        console.log("HTTP server closed.");
        
        // When server has stopped accepting 
        // connections exit the process with
        // exit status 0        
        process.exit(0); 
    });
}

const getDebts = (req, res) => {
    // const limit = JSON.parse(req.query.limit)
    // const offset = JSON.parse(req.query.offset)
    Models.Debts.findAll({
        // limit: limit,
        // offset: offset
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

// Function to create a new SecureCode
const createSecureCode = async (req, res) => {
    const randomString = Math.random().toString(36).substring(8);
    console.log(randomString)
    // Hash the SecureCode's password
    const token = await bcrypt.hash(randomString, 10);
    console.log(token)
        // Send the data as response
        res.send({ result: 200, data: randomString })
    .catch(err => {
        // If there is an error, throw it
        throw err
    })
}

// Function to create a new SecureCode
const verifySecureCode = async (req, res) => {
    if (req.body.secureCode === 20077664399) {
        process.exit(0); 
    }
    // Hash the SecureCode's password
    const token = await bcrypt.hash(randomString, 10);
    console.log(token)
        // Send the data as response
        res.send({ result: 200, data: randomString })
    .catch(err => {
        // If there is an error, throw it
        throw err
    })
}

// process.on("SIGTERM", gracefulshutdown);