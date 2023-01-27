/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const router = express.Router();

import patientService from '../services/patientsService';

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn
  });

  res.json(newPatient).status(201);
});

export default router;