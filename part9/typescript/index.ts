import express from 'express';
const app = express();
require('express-async-errors');
import bmiTools from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;

  // Validate entry
  if (!height || isNaN(Number(height))) {
    res.json({ error: 'invalid field' }).status(400);
  } else if (!weight || isNaN(Number(weight))) {
    res.json({ error: 'invalid filed' }).status(400);
  }

  try {
    const BMI: string = bmiTools.calculateBMI(Number(height), Number(weight));
    res.json({ height, weight, BMI });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json(error.message).status(400);
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    throw new Error ('parameters missing');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(target)) {
    throw new Error('malformatted parameters');
  }
  

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  daily_exercises.forEach((n: number) => {
    if (isNaN(n)) {
      throw new Error('malformatted parameters');
    }
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const activityInfo = calculateExercises(daily_exercises, Number(target));
  res.json(activityInfo);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});