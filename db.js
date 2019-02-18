const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
};

exports.connect = function (url, dbName, cb) {
    if (state.db) {
        cb({data: 'already connected'});
        // return state.db;
    } else {
        return MongoClient.connect(url + dbName, function (err, client) {
            if (err) {
                cb({error: err});
            } else {
                state.db = client.db(dbName);
                cb({data: 'connected'});
                // return state.db = client.db(dbName);
            }
        });
    }
};

exports.get = () => {
    return state.db;
};