"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (str) => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing value');
    }
    return str;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender option:' + gender);
    }
    return gender;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect of missing date: ${date}`);
    }
    return date;
};
const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn }) => {
    const newPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        ssn: parseString(ssn)
    };
    return newPatient;
};
exports.default = toNewPatient;
