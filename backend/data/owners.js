const House = require("../models/House")
const Owner = require("../models/Owner")

const bcrypt = require("bcryptjs")

let houses = require("./houses")


function getRandomIranianPhoneNumber() {
    // Define mobile operator codes in Iran
    const operatorCodes = [
        '910', '911', '912', '913', '914', '915', '916', '917', '918', '919',
        '920', '921', '922', '930', '931', '932', '933', '934', '935', '936',
        '937', '938', '939', '990', '991', '992', '993', '994', '995', '996',
        '997', '998'
    ];

    // Pick a random operator code
    const randomOperatorCode = operatorCodes[Math.floor(Math.random() * operatorCodes.length)];

    // Generate the rest of the number (7 digits)
    let randomNumber = '';
    for (let i = 0; i < 7; i++) {
        randomNumber += Math.floor(Math.random() * 10);  // Generate random digit from 0 to 9
    }

    // Combine country code, operator code, and the random number
    const iranianPhoneNumber = `0${randomOperatorCode}${randomNumber}`;

    return iranianPhoneNumber;
}

let owners = []

for (let i = 0; i < houses.length; i++) {
    let data = {
        "owner": houses[i].owner,
        "phone": getRandomIranianPhoneNumber(),
        "password": bcrypt.hashSync('12345678', 12),
        "username":`username ${i}`,
        "email":`owner${i}@owenr${i}.com`
    }

    owners.push(data)
}

module.exports = owners

