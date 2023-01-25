import express from 'express';
const router = express.Router();

import diagnoseService from '../services/diagnoseService';

router.get('/', (_req, res) => {
  const diagnoses = diagnoseService.getAll();
  res.send(diagnoses);
});


export default router;