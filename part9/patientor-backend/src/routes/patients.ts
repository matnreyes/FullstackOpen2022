import express from 'express';
const router = express.Router();

import patientService from '../services/patientsService';

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.send(patients);
});

export default router;