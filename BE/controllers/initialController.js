"use strict";
const axios = require('axios');
const Models = require('../models');
const { Op } = require("sequelize");

// const storeData = async (table, body, res) => {
    const storeData = async (table, res) => {
    // console.log(body)
    let response = await axios.get(`http://localhost:3000/${table}/`);
    // let response = await axios.get(`http://localhost:3000/Debts/`);
    try {
        const array = response.data;
        console.log(array)

        for(let i of array) {
        //     for (let key in i) {
        //         if (i[key] === null) {
        //             i[key] = ''
        //         }
        //     }
        console.log(i.createdAt, i.updatedAt)

        const formatObj ={
            id: i.id,
            userID: i.userID,
            debtID: i.debtID,
            amount: i.amount
        };

        let [newi, created ] = await Models[table].findOrCreate({
            where: {id: i.id},
            defaults: formatObj
        })
    }

    console.log({message:'Data import complete.'})
}
    catch (err) {
        res.send(err.message)
    }
}

module.exports = {
    storeData
}