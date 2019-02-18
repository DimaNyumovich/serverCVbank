const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const personController = require('./controllers/persons');



const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.get('/persons', personController.all);

app.get('/persons/:id', personController.findById);

app.post('/persons', personController.create);

app.put('/persons/:id', personController.update);

app.delete('/persons/:id', personController.delete);

db.connect('mongodb://localhost:27017/', 'cvbank', (cbData) => {
    if (cbData.error) {
        console.error(err);
    } else {
        app.listen(PORT, function () {
            console.log("Server running on localhost:  " + PORT)
        });
    }
})

