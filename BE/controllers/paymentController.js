"use strict";
const Models = require("../models");
// const redis = require("redis");
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: process.env.REDIS_PORT || 6379,
// });

const getPayments = (req, res) => {
    // const limit = JSON.parse(req.query.limit)
    // const offset = JSON.parse(req.query.offset)
    Models.Payments.findAll({
        // limit: limit,
        // offset: offset
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

// const getPayments = (req, res) => {
//     // Check if data exists in the cache
//     redisClient.get("Payments", (err, cachedData) => {
//       if (err) {
//         console.error("Error retrieving cached data:", err);
//       }
  
//       if (cachedData !== null) {
//         // Cached data exists, send cached data
//         const parsedData = JSON.parse(cachedData);
//         res.json(parsedData);
//       } else {
//         // Data not found in cache, fetch from the database
//         Models.Payments.findAll().then((data) => {
//           // Store data in the cache for 1 hour
//           redisClient.setex("Payments", 3600, JSON.stringify(data));
//           res.json(data);
//         }).catch(err => {
//           console.error("Error fetching data from database:", err);
//           res.status(500).json({ error: "Internal server error" });
//         });
//       }
//     });
//   };
  
  

const getPaymentsByID = (req, res) => {
    Models.Payments.findAll({ where: { id: req.params.id } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getPaymentsByUserID = (req, res) => {
    Models.Payments.findAll({ where: { userid: req.params.userid } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const createPayments = (data, res) => {
    Models.Payments.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
} 

const updatePayments = (req, res) => {
    Models.Payments.update(req.body, {
        where: {
            id:
                req.params.id
        }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}
const deletePaymentByID = (req, res) => {
    Models.Payments.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const deletePayments = (req, res) => {
    Models.Payments.truncate().then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const deletePaymentsByUserID = (req, res) => {
    Models.Payments.destroy({ where: { userid: req.params.userid } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const lockPayments = (req, rest) => {
    Models.Payments.findAll({
        // const [results, metadata] = await sequelize.query(
        //     "SELECT c.*, u.id AS userId FROM comments c JOIN users u ON c.userId = u.id"
        //   );
        // transaction: t1,
        lock: {
            // level: t1.LOCK,
            of: Models.Payments
        }
    });
}

const unlockPayments = (req, rest) => {
    Models.Payments.findAll({
        unlock: {
            // level: t1.LOCK,
            of: Payments
        }
    });
}

module.exports = {
    getPayments, createPayments, updatePayments, deletePayments, deletePaymentByID, getPaymentsByID, getPaymentsByUserID, lockPayments, unlockPayments, deletePaymentsByUserID
}