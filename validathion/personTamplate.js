const paperwork = require('paperwork');

const nameTemplate = {
    firstName: String,
    lastName: paperwork.optional(String)
};

const experienceTemplate = {
    position: String,
    years: Number,
    totalYears: Number,

};

const contactTemplate = {
    residence: String,
    birthday: String,
    phone: Number,
    email: String
};

const personTemplate = {
    name: paperwork.optional(nameTemplate),
    experience: paperwork.optional(experienceTemplate),
    contact: paperwork.optional(contactTemplate),
    minSalary: paperwork.optional(Number),
    maxSalary: paperwork.optional(Number),
    skills: paperwork.optional([String])
};

exports.personTemplate = personTemplate;

// exports.checkInput = paperwork.accept(personTemplate);

