const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const app = express();
var db;


let listPersons = require('./persons-data');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {

    res.send('Hello from server');
});

app.get('/persons', (req, res) => {
    db.collection('persons').find().toArray((err, docs) => {
            if (err) {
                console.log(err);
                return req.sendStatus(500);
            }
            res.send(docs);
        }
    )
});

app.get('/persons/:id', (req, res) => {
    db.collection('persons').findOne({_id: ObjectID(req.params.id)}, (err, doc) => {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
});

app.post('/persons', (req, res) => {
    let person = {
        name: req.body.name
    };

    db.collection('persons').insert(person, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(person);
    })
});

app.put('/persons/:id', (req, res) => {
    db.collection('persons').updateOne(
        { _id: ObjectID(req.params.id)},
        { $set: {name: req.body.name}},
        (err, result) => {
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )

});

app.delete('/persons/:id', (req, res) => {
    db.collection('persons').deleteOne(
        { _id: ObjectID(req.params.id)},
        (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200)
        }
    )

});

MongoClient.connect('mongodb://localhost:27017/cvbank',  { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
    }
    console.log("Connected successfully to server");
    db = client.db('cvbank');
    app.listen(PORT, function () {
        console.log("Server running on localhost:  " + PORT)

    });
})
