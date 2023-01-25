/* 
  NOTE: 
    This project does not express my (Matias Reyes) views on BMI calculations, rather
    this project only follows current definitions for BMI numbers. 

  Run instructions:
    npm run calculateBmi (height in cm) (weight kg)
*/

interface Measurements {
  height: number;
  weight: number;
}


const parseMeasurements = (args: Array<string>): Measurements => {
  const values = args.slice(-2);
  
  if (!isNaN(Number(values[0])) && !isNaN(Number(values[1]))) {
    return {
      height: Number(values[0]),
      weight: Number(values[1])
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

const calculateBMI = (a: number, b: number): string => {
  const height = a / 100;
  const BMI: number = b / (height * height);
  if (BMI < 16) {
    return 'Underweight (Severe Thinness)';
  } else if (BMI < 17) {
    return 'Underweight (Moderate Thinness)';
  } else if (BMI < 18.5) {
    return 'Underweight (Mild Thinness)';
  } else if (BMI < 25) {
    return 'Normal range';
  } else if (BMI < 30) {
    return 'Overweight (Pre-obese)';
  } else if (BMI < 35) {
    return 'Obese (Class I)';
  } else if (BMI < 40) {
    return 'Obese (Class II)';
  } else if (BMI >= 40) {
    return 'Obese (Class III)';
  }
  
  throw new Error('Unreachable code');
};

// try {
//   const {height, weight} = parseMeasurements(process.argv);
//   console.log(calculateBMI(height, weight));
// } catch (error: unknown) {
//   let errorMessage = 'Error happened';
//   if (error instanceof Error) {
//     errorMessage = error.message;
//   }
//   console.log(errorMessage);
// }

const bmiTools = { parseMeasurements, calculateBMI };

export default bmiTools;