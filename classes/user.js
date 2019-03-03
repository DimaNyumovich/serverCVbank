class Name {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Experience {
    constructor(position, years, totalYears){
        this.position = position;
        this.years = years;
        this.totalYears = totalYears;
    }
}

class Contact {
    constructor(residence, birthday, phone, email){
        this.residence = residence;
        this.birthday = birthday;
        this.phone = phone;
        this.email = email;
    }
}

class User{
    constructor(userName, password, name, experience, contact,
                description, minSalary, maxSalary, skills){
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.experience = experience;
        this.contact = contact;
        this.description = description;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.skills = skills;
    }
}

module.exports = { Name, Experience, Contact, User};

