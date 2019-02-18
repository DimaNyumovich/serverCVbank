const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = function (cb) {
    db.get().collection('persons').find().toArray(function (err, docs) {
        cb(err, docs);
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

exports.findById = function (id, cb) {
    db.get().collection('persons').findOne({_id: ObjectID(id)}, (err, doc) => {
        cb(err, doc);
    })
};

// app.get('/persons/:id', (req, res) => {
//     db.get().collection('persons').findOne({_id: ObjectID(req.params.id)}, (err, doc) => {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(doc);
//     })
// });

exports.create = function (person, cb) {
    db.get().collection('persons').insert(person, (err, result) => {
        cb(err, result);
    })
};

exports.update = function (id, newData, cb) {
    db.get().collection('persons').updateOne(
        {_id: ObjectID(id)},
        newData,
        function (err, result) {
            cb(err, result);
        }
    )
};

exports.delete = function (id, cb) {
    db.get().collection('persons').deleteOne(
        {_id: ObjectID(id)},
        function (err, result) {
            cb(err, result);
        }
    )
};
