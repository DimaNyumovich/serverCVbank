var Persons = require('../models/persons');
const db = require('../db');

exports.all = function (req, res) {
    Persons.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};

// app.get('/persons', (req, res) => {
//     db.get().collection('persons').find().toArray((err, docs) => {
//             if (err) {
//                 console.log(err);
//                 return req.sendStatus(500);
//             }
//             res.send(docs);
//         }
//     )
// });

exports.findById = function (req, res) {
    Persons.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
};

exports.create = function (req, res) {
    const person = {
        name: req.body.name
    };
    Persons.create(person, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        res.send(person);

    })
};

exports.update = function (req, res) {
    Persons.update(req.params.id, {$set: {name: req.body.name}}, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.delete = function (req, res) {
    Persons.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};