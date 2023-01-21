/* 
  Run instructions:
    npm run calculateBmi (height in cm) (weight kg)
*/

interface Measurements {
  height: number;
  weight: number;
}

const parseMeasurements = (args: Array<string>): Measurements => {
  if (args.length < 4) throw new Error('Missing argument');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Values were not numbers')
  }
}

const calculateBMI = (a: number, b: number) => {
  const height = a / 100
  const BMI: number = b / (height * height)
  if (BMI < 16) {
    return 'Underweight (Severe Thinness)'
  } else if (BMI < 17) {
    return 'Underweight (Moderate Thinness)'
  } else if (BMI < 18.5) {
    return 'Underweight (Mild Thinness)'
  } else if (BMI < 25) {
    return 'Normal range'
  } else if (BMI < 30) {
    return 'Overweight (Pre-obese)'
  } else if (BMI < 35) {
    return 'Obese (Class I)'
  } else if (BMI < 40) {
    return 'Obese (Class II)'
  } else if (BMI >= 40) {
    return 'Obese (Class III)'
  }

  throw new Error('Unreachable code')
}

try {
  const {height, weight} = parseMeasurements(process.argv)
  console.log(calculateBMI(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Error happened'
  if (error instanceof Error) {
    errorMessage = error.message
  }
  console.log(errorMessage)
}
