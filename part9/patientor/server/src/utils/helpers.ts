import { NewPatient, Gender, Entry, HealthCheckRating } from "../types";
import { v4 as uuid } from "uuid";
import { assertNever } from "assert-never";

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

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || isNaN(Number(rating)) || !isRating(Number(rating))) {
    throw new Error('Incorrect or missing health rating');
  }
  return Number(rating);
};

type Fields = { name : unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

export const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseInput(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseInput(occupation),
    ssn: parseInput(ssn),
    entries: []
  };
  
  return newPatient;
};


export const toNewEntry = (entry: Entry): Entry => {
  const newEntry = {
    id: uuid(),
    description: parseInput(entry.description),
    date: parseDate(entry.date),
    specialist: parseInput(entry.specialist),
    diagnosisCodes: entry.diagnosisCodes?.map(d => parseInput(d)),
    type: parseInput(entry.type)
  };
  switch (entry.type) {
    case "Hospital":
      const parsedHospitalEntry = {
        ...newEntry,
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseInput(entry.discharge.criteria)
         }
      };
      return parsedHospitalEntry as Entry;
    case "OccupationalHealthcare":
      const parsedOccupationalEntry = {
        ...newEntry,
        employerName: parseInput(entry.employerName),
        sickLeave: {
          startDate: parseDate(entry.sickLeave?.startDate),
          endDate: parseDate(entry.sickLeave?.endDate)
        }
      };
      return parsedOccupationalEntry as Entry;
    case "HealthCheck":
      const parsedHealthEntry = {
        ...newEntry,
        healthCheckRating: parseHealthRating(entry.healthCheckRating)
      };
      return parsedHealthEntry as Entry;
    default: 
      return assertNever(entry);
  }
};