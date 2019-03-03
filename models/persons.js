const ObjectID = require('mongodb').ObjectID;
const db = require('../db');
const userschema = require('../validathion/userSchema');


let instancesProperty = {};

function getInstancesProperty(property) {

    try {
        instancesProperty['users'] = {username: property};
        instancesProperty['skills'] = {_id: ObjectID(property)};
        instancesProperty['persons'] = {_id: ObjectID(property)};
    }catch (e) {
        instancesProperty['users'] = {username: property};
    }
    return instancesProperty;
}

exports.all = function (nameObj, cb) {
    db.get().collection(nameObj).find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

exports.findByProperty = function (way, property, cb) {

    instancesProperty = getInstancesProperty(property);

    db.get().collection(way).findOne(instancesProperty[way], (err, doc) => {
        cb(err, doc);
    })
};

exports.create = function (way, object, cb) {
    userschema.checkUser(object, way, (err, result) => {
        cb(err, result);
    })
};

exports.update = function (way, property, newData, cb) {
    instancesProperty = getInstancesProperty(property);
    db.get().collection(way).updateOne(
        instancesProperty[way],
        newData,
        function (err, result) {
            cb(err, result);
        }
    )
};

exports.delete = function (way, property, cb) {
    instancesProperty = getInstancesProperty(property);
    db.get().collection(way).deleteOne(
        instancesProperty[way],
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
