import express from 'express';
const router = express.Router();

import patientService from '../services/patientsService';
import toNewPatient from '../utils/helpers';

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
  
    res.json(addedPatient).status(201);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error:' + error.message;
    }
    console.log(errorMessage);
  }
});

export default router;