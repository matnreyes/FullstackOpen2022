import express from 'express'
const app = express()
const bmiTools = require('./bmiCalculator')

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  try {
    bmiTools.parseMeasurements([height, weight])
    const BMI = bmiTools.calculateBMI(height, weight)
    res.json({ height, weight, BMI })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json(error.message)
    }
  }
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})