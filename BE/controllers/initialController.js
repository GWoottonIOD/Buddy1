"use strict";
const axios = require('axios');
const Models = require('../models');
const { Op } = require("sequelize");

// const storeData = async (table, body, res) => {
    const storeData = async (table, res) => {
        console.log(table.slice(0,1).toUpperCase() + table.slice(1))
    let response = await axios.get(`http://localhost:3000/${table.slice(0,1).toUpperCase() + table.slice(1)}/`); //The Models are in uppercase
    // let response = await axios.get(`http://localhost:3000/AddToPayments`)
    try {
        //response from the JSON-server
        const array = response.data; 

        for(let i of array) {

        // //Works out what the keys of the object are dynamically.
        // for (let g of Object.keys(i)) { 
        //     formatObj = {
        //         ...formatObj,
        //         g: i
        //     }
        // }
        // if (i.createdAt!==i.updatedAt && i.paid===true) {

        // }

        // const formatObj = {
        //     debtID: i.id,
        //     userID: i.userID,          
        //     amount: i.amount,
        //     updatedAt: i.updatedAt,
        // }
        // console.log(formatObj)

        //find or create an entry in the table if the entry doesn't exist.
    //     let [newi, created ] = await Models[table.slice(0,1).toUpperCase() + table.slice(1)].findOrCreate({
    //         where: {id: i.id},
    //         defaults: i
    //     })
    }

    res.send({message:'Data import complete.'})
}
    catch (err) {
        res.send(err.message)
    }
}

module.exports = {
    storeData
}