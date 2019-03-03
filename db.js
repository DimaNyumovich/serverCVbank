// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const state = {
    db: null
};

exports.connect = function (url, dbName, cb) {
    if (state.db) {
        cb({data: 'already connected'});
        // return state.db;
    } else {
        //return
        mongoose.connect(url + dbName, function (err, client) {
            if (err) {
                cb({error: err});
            } else {
                // state.db = client.db(dbName);
                state.db = client;
                cb({data: 'connected'});
                // return state.db = client.db(dbName);
            }
        });
    }
};

exports.get = () => {
    return state.db;
};


// const MongoClient = require('mongodb').MongoClient;
//
// const state = {
//     db: null
// };
//
// exports.connect = function (url, dbName, cb) {
//     if (state.db) {
//         cb({data: 'already connected'});
//         // return state.db;
//     } else {
//         //return
//         MongoClient.connect(url + dbName, function (err, client) {
//             if (err) {
//                 cb({error: err});
//             } else {
//                 state.db = client.db(dbName);
//                 cb({data: 'connected'});
//                 // return state.db = client.db(dbName);
//             }
//         });
//     }
// };
//
// exports.get = () => {
//     return state.db;
// };