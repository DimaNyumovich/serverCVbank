const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const objectController = require('./controllers/persons');

const app = express();
const PORT = 3000;

const mongoose = require('mongoose')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.get('/:nameObj', objectController.all);

app.get('/:nameObj/:property', objectController.findByProperty);

app.post('/:nameObj', objectController.create);

app.put('/:nameObj/:property/', objectController.update);

app.delete('/:nameObj/:property', objectController.delete);

app.delete('/:nameObj', objectController.deleteAll)

db.connect('mongodb://localhost:27017/', 'cvbank', (cbData) => {
    if (cbData.error) {
        console.error(err);
    } else {
        app.listen(PORT, function () {
            console.log("Server running on localhost:  " + PORT)
        });
    }
})




