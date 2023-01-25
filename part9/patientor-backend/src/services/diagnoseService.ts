import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';


const getAll = (): Array<Diagnose> => {
  return diagnoses;
};


export default {
  getAll
};