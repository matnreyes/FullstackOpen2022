import express from 'express';
const router = express.Router();

import patientService from '../services/patientsService';
import { Entry, Gender } from '../types';
import toNewPatient from '../utils/helpers';

interface PatientFields {
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
}

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const patientInfo = req.body as PatientFields;
    const newPatient = toNewPatient(patientInfo);
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

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);

  if (!patient) {
    return res.status(404).json({ error: 'patient not found'});
  }

  const entry = req.body.entry as Entry;
  const updatedPatient = patientService.addEntry(patient, entry);

  return res.json(updatedPatient);
});

export default router;