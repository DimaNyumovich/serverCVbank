const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const personController = require('./controllers/persons');

const personTemplate = require('./validathion/personTamplate');
const paperwork = require('paperwork');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.get('/:nameObj', personController.all);
// app.get('/persons', personController.all);

app.get('/persons/:id', personController.findById);

// app.post('/persons', function (req, res) {
//
//     let skills_body = req.body.skills;
//     let skillsArr = [];
//     for (let key in skills_body) {
//         skillsArr.push(skills_body[key]);
//     }
//
//     req.body.skills = skillsArr;
//     paperwork(personTemplate.personTemplate, req.body, function (err, validated) {
//         if (err) {
//             res.json(err)
//         } else {
//             personController.create(req, res)
//         }
//     })
// })



// app.post('/persons', personTemplate.checkInput, personController.create);

// app.post('/persons', personTemplate.checkInput, personController.create);
// app.post('/persons', function (req, res) {
//     let person = {
//         name: req.body.name
//     };
//
//     db.get().collection('persons').insert(person, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(person);
//     })
// });

app.post('/persons', function (req, res) {
    getPerson(req, res);
});
function getPerson(req, res) {
    let person = {
        name: req.body.name
    };

    db.get().collection('persons').insert(person,function (err, result)  {
        create777(res, err, result, person);
    })
}
function create777(res, err, result) {
    if (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    res.send(result);
}

app.put('/persons/:id/', personController.update);

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

