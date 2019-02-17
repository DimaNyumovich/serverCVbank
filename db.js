// const MongoClient = require('mongodb').MongoClient;
//
// const state = {
//     db: null
// };
//
// exports.connect = (url, done) => {
//     if(state.db) {
//         return done();
//     }
//
//     MongoClient.connect(url, (err, db) => {
//         if(err) {
//             return done(err);
//         }
//         state.db = db;
//         done();
//     })
// }
//
// // MongoClient.connect('mongodb://localhost:27017/cvbank', {useNewUrlParser: true}, (err, client) => {
// //     if (err) {
// //         console.log(err);
// //     }
// //
// //     db = client.db('cvbank');
// //     });
// // })
//
// exports.get = () => {
//     return state.db;
// }