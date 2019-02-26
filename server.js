const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const objectController = require('./controllers/persons');

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

app.get('/:nameObj', objectController.all);

app.get('/:nameObj/:id', objectController.findById);

app.post('/:nameObj', function (req, res) {

    let template = undefined;

    if (req.params.nameObj === "persons") {
        console.log(req.body)
        let skills_body = req.body.skills;
        let skillsArr = [];
        for (let key in skills_body) {
            skillsArr.push(skills_body[key]);
        }

        req.body.skills = skillsArr;
        template = personTemplate.personTemplate
    } else {

        template = {value: String}
        req.body = {value: req.body.value}
    }
    paperwork(template, req.body, function (err, validated) {
        if (err) {
            res.json(err)
        } else {
            objectController.create(req, res)
        }
    })
})

app.put('/:nameObj/:id/', objectController.update);

app.delete('/:nameObj/:id', objectController.delete);

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
//             objectController.create(req, res)
//         }
//     })
// })

