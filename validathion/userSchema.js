const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let instances = {};
const skillsSchema = new Schema({
    value: {type: String, index: true, unique: true, required: true}
});

const userSchema = new Schema({
    username: {type: String, index: true, unique: true, required: true},
    password: {type: String, required: true},
    person: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'persons', required: true
    } | null
});

const personSchema = new Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    experience: {
        position: {type: String},
        years: {type: Number},
        totalYears: {type: Number}
    },
    contact: {
        residence: {type: String},
        birthday: {type: String},
        phone: {type: Number},
        email: {type: String}
    },
    description: {type: String},
    minSalary: {type: Number},
    maxSalary: {type: Number},
    skills: {
        type: [
            {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'skills'
            }
        ]
    }
});

userSchema.plugin(uniqueValidator);
skillsSchema.plugin(uniqueValidator);
personSchema.plugin(uniqueValidator);

instances.users = userSchema;
instances.skills = skillsSchema;
instances.persons = personSchema;

let instancesModel = {};

instancesModel['users'] = mongoose.model('users', instances['users']);
instancesModel['skills'] = mongoose.model('skills', instances['skills']);
instancesModel['persons'] = mongoose.model('persons', instances['persons']);

exports.checkUser = function (object, instanceName, cb) {

    let user = new instancesModel[instanceName](object);
    user.save(function (err, result) {
        cb(err, result);
    });
};