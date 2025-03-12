"use strict";
const Models = require("../models");

const getWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getWhateverByWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const keyToFilterBy = req.params.key
    const filterBy = req.query.filterBy
    const Model = Models[modelName]
    const ModelKeys = Object.keys(Models[modelName].rawAttributes);
    console.log('key',keyToFilterBy)
    if (!ModelKeys.includes(keyToFilterBy)) {
        return res.status(400).send({ result: 400, error: 'Invalid key to filter by.' });
    }

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.findAll({ where: { [keyToFilterBy]: filterBy } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getWhateverByID = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.findAll({ where: { id: req.params.id } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getWhateverByUserID = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.findAll({ where: { result: !null } }).then(function (data) {
        console.log(data)
        Models.update({completed: true}, {
            where: {
                id:
                    data[0].sample_id
            }.then(function (data) {
            res.send({ result: 200, data: data })
        }).catch(err => {
            throw err
        })
    })})
    .catch(err => {
        throw err
    })
}

const createWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(req.body)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.create(req.body).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
} 

const updateWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.update(req.body, {
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

const deleteWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const deleteWhateverByUserID = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.destroy({ where: { userid: req.params.userid } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const lockWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined.' });
    }
    Model.findAll({

        // const [results, metadata] = await sequelize.query(
        //     "SELECT c.*, u.id AS userId FROM comments c JOIN users u ON c.userId = u.id"
        //   );
        // transaction: t1,
        lock: {
            // level: t1.LOCK,
            of: Models.modelName
        }
    });
}

const unlockWhatever = (req, res) => {
    const modelName = req.query.model.charAt(0).toUpperCase() + req.query.model.slice(1)
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'No model defined' });
    }
    Model.findAll({
        unlock: {
            // level: t1.LOCK,
            of: Models.modelName
        }
    });
}

module.exports = {
    getWhatever, createWhatever, updateWhatever, deleteWhatever, getWhateverByID, getWhateverByUserID, lockWhatever, unlockWhatever, deleteWhateverByUserID, getWhateverByWhatever
}