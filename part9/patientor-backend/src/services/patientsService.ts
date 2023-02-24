import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { PublicPatient, Patient, NewPatient } from '../types';

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = ( id: string ): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getAll,
  addPatient,
  getPatient
};