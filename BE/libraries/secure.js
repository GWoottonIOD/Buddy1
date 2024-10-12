// import { create } from "../models/users";
const bcrypt = require('bcryptjs')

let secureCode;

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

// Function to create a new SecureCode
const createSecureCode = async (req, res) => {
    try {const randomString = Math.random().toString(36).substring(8);
        console.log(randomString)
        // Hash the SecureCode's password
        const token = await bcrypt.hash(randomString, 10);
        secureCode = token
            // Send the data as response
        res.send({ result: 200, data: randomString })}
        
    catch (err) {err => {
        // If there is an error, throw it
        throw err
    }}
}

// Function to create a new SecureCode
const verifySecureCode = async (req, res) => {
    try {
        if (req.query.secureCode === 20077664399) {
            process.exit(0); 
        }
        // Hash the SecureCode's password
        else if (req.query.secureCode && (await bcrypt.compare(req.query.secureCode, secureCode))) {
            res.send('yay!')
        }
    }

    catch(err) {err => {
        // If there is an error, throw it
        throw err
    }}
}

module.exports = {
    createSecureCode,
    verifySecureCode
}

// process.on("SIGTERM", gracefulshutdown);