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
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);

  if (!patient) {
    return res.status(404).json({ error: 'patient not found' });
  }

  return res.json(patient);
});

export default router;