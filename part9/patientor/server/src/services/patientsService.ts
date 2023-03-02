import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { PublicPatient, Patient, NewPatient, Entry } from '../types';

const getAll = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }
  ));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id: string = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = ( id: string ): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addEntry = (patient: Patient, entry: Entry ): Patient => {
  patient.entries.push(entry);
  return patient;
};

export default {
  getAll,
  addPatient,
  getPatient,
  addEntry
};