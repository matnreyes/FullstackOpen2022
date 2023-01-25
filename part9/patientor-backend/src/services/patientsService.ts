import { Patient } from '../types';
import patients from '../../data/patients';

const getAll = (): Array<Patient> => {
  return patients;
};

export default {
  getAll
};