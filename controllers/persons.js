const Persons = require('../models/persons');
const db = require('../db');

const routes = ["persons", "skills"];

exports.all = function (req, res) {
    if (routes.indexOf(req.params.nameObj) > -1) {
        Persons.all(req.params.nameObj, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        });
    } else {
        res.json({error: "something wrong"})
    }
};

exports.findById = function (req, res) {
    if (routes.indexOf(req.params.nameObj) > -1) {
        Persons.all(req.params.nameObj, function (err, docs) {
            Persons.findById(req.params.nameObj, req.params.id, function (err, doc) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(doc);
            })
        });
    } else {
        res.json({error: "something wrong"});
    }
};

exports.create = function (req, res) {
    if (routes.indexOf(req.params.nameObj) > -1) {
        let object = req.body;
        let way = req.params.nameObj;
        Persons.create(way, object, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            res.send(object);
        })
    } else {
        res.json({error: "something wrong"});
    }
};

exports.update = function (req, res) {
    if (req.params.nameObj === "persons") {
        Persons.update(req.params.nameObj, req.params.id, {
            $set: {
                name: {
                    firstName: req.body.name.firstName,
                    lastName: req.body.name.lastName
                },
                experience: {
                    position: req.body.experience.position,
                    years: req.body.experience.years,
                    totalYears: req.body.experience.totalYears
                },
                contact: {
                    residence: req.body.contact.residence,
                    birthday: req.body.contact.birthday,
                    phone: req.body.contact.phone,
                    email: req.body.contact.email
                },
                description: req.body.description,
                minSalary: req.body.minSalary,
                maxSalary: req.body.maxSalary,
                skills: req.body.skills
            },
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    } else if (req.params.nameObj === "skills") {
        Persons.update(req.params.nameObj, req.params.id, {$set: {value: req.body}}, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    } else {
        res.json({error: "something wrong"});
    }
};


exports.delete = function (req, res) {
    Persons.delete(req.params.nameObj, req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.deleteAll = function (req, res) {
    Persons.deleteAll(req.params.nameObj, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        // res.sendStatus(200);
        res.send("collection dropped")
    })
};