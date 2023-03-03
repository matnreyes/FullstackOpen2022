import express from 'express';
const router = express.Router();

import patientService from '../services/patientsService';
import { Entry, Gender } from '../types';
import { toNewEntry, toNewPatient } from '../utils/helpers';

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
  try {
    const formattedEntry = toNewEntry(entry);
    const updatedPatient = patientService.addEntry(patient, formattedEntry);
    return res.json(updatedPatient);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
      return res.status(400).json(e.message);
    }
  }
  return;
});

export default router;