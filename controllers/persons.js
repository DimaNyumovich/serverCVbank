const currentObj = require('../models/persons');
const db = require('../db');

const routes = ["persons", "skills", "users"];

let instancesSetsUpdate = {};
function getInstancesSetsUpdate(req) {

    let x = req.params.nameObj;
    let result;
    switch (x) {
        case 'persons':
            break;
        case 'skills':
            result = {$set: {value: req.body}};
            break;
        case 'users':
            result = {
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
            };
            break;
    }

    return result;
}

exports.all = function (req, res) {
    if (routes.indexOf(req.params.nameObj) > -1) {
        currentObj.all(req.params.nameObj, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        });
    } else {
        res.json({error: "something wrong"});
    }
};

exports.findByProperty = function (req, res) {
    if (routes.indexOf(req.params.nameObj) > -1) {
        currentObj.findByProperty(req.params.nameObj, req.params.property, function (err, doc) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(doc);
        });
    } else {
        res.json({error: "something wrong"});
    }
};

exports.create = function (req, res) {
    if (routes.indexOf(req.params.nameObj) > -1) {
        let object = req.body;
        let way = req.params.nameObj;
        currentObj.create(way, object, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            res.send(result);
        })
    } else {
        res.json({error: "something wrong"});
    }
};

exports.update = function (req, res) {

     // return instancesSetsUpdate;
    // }

    instancesSetsUpdate = getInstancesSetsUpdate(req);
    console.log(instancesSetsUpdate);
    let way = req.params.nameObj;
    let property = req.params.property;

    currentObj.update(way, property, instancesSetsUpdate, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};
//     if (req.params.nameObj === "persons") {
//         currentObj.update(req.params.nameObj, req.params.id, {
//             $set: {
//                 name: {
//                     firstName: req.body.name.firstName,
//                     lastName: req.body.name.lastName
//                 },
//                 experience: {
//                     position: req.body.experience.position,
//                     years: req.body.experience.years,
//                     totalYears: req.body.experience.totalYears
//                 },
//                 contact: {
//                     residence: req.body.contact.residence,
//                     birthday: req.body.contact.birthday,
//                     phone: req.body.contact.phone,
//                     email: req.body.contact.email
//                 },
//                 description: req.body.description,
//                 minSalary: req.body.minSalary,
//                 maxSalary: req.body.maxSalary,
//                 skills: req.body.skills
//             },
//         }, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 return res.sendStatus(500);
//             }
//             res.sendStatus(200);
//         })
//     } else if (req.params.nameObj === "skills") {
//         currentObj.update(req.params.nameObj, req.params.id, {$set: {value: req.body}}, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 return res.sendStatus(500);
//             }
//             res.sendStatus(200);
//         })
//     } else {
//         res.json({error: "something wrong"});
//     }
// };


exports.delete = function (req, res) {
    currentObj.delete(req.params.nameObj, req.params.property, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.deleteAll = function (req, res) {
    currentObj.deleteAll(req.params.nameObj, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        // res.sendStatus(200);
        res.send("collection dropped")
    })
};