const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = function (nameObj, cb) {
    db.get().collection(nameObj).find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

exports.findById = function (way, id, cb) {
    db.get().collection(way).findOne({_id: ObjectID(id)}, (err, doc) => {
        cb(err, doc);
    })
};

exports.create = function (way, object, cb) {
    if(way === "skills"){
        db.get().collection(way).findOne({value: object.value}, (err, doc) => {
            if (err) {
                console.log(err);
            } else if (doc) {
                console.log("Skill is already in DB")
            } else {
                db.get().collection(way).insertOne(object, function (err, result) {
                    cb(err, result);
                })
            }
        });
    }else if(way === "persons"){
        db.get().collection(way).findOne({name: object.name}, (err, doc) => {
            if (err) {
                console.log(err);
            } else if (doc) {
                console.log("Person is already in DB")
            } else {
                db.get().collection(way).insertOne(object, function (err, result) {
                    cb(err, result);
                })
            }
        });
    }
};

exports.update = function (way, id, newData, cb) {
    db.get().collection(way).updateOne(
        {_id: ObjectID(id)},
        newData,
        function (err, result) {
            cb(err, result);
        }
    )
};

exports.delete = function (way, id, cb) {
    db.get().collection(way).deleteOne(
        {_id: ObjectID(id)},
        function (err, result) {
            cb(err, result);
        }
    )
};

exports.deleteAll = function (way, cb) {
    db.get().collection(way).drop(function (err, result) {
        cb(err, result);
    })
};
