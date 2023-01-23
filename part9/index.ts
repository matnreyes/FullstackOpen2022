import express from 'express';
const app = express();
import bmiTools from './bmiCalculator';

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

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});