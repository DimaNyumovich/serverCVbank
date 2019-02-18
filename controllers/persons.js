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
        name: req.body.name,
        experience: req.body.experience,
        contact: req.body.contact,
        description: req.body.description,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        skills: req.body.skills
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
    Persons.update(req.params.id, {$set: {name: req.body}}, function (err, result) {
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