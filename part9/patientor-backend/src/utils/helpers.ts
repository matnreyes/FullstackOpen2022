import { NewPatient, Gender } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseInput = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Incorrect or missing field');
  }
  return input;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender option: ' + gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseInput(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseInput(occupation),
    ssn: parseInput(ssn)
  };
  
  return newPatient;
};

export default toNewPatient;