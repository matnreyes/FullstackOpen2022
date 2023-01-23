/* 
  Run instructions: 
    npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
      target: 2
      hours: [1, 0, 2, 4.5, 0, 3, 1, 0, 4]
*/
interface UserInput {
  target: number;
  hours: Array<number>
}

interface Rating {
  rating: number;
  description: string;
}

interface ActivityInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseInput = (args: Array<string>) : UserInput => {
  if (args.length < 4) {
    throw new Error('Missing fields');
  }

  const input: UserInput = {
    target: 0,
    hours: []
  };

  if (!isNaN(Number(args[3]))) {
    input.target = Number(args[2]);
  }

  for (let x = 3; x < args.length; x++) {
    if (isNaN(Number(args[x]))) {
      throw new Error('Invalid input');
    }

    input.hours.push(Number(args[x]));
  }

  return input;
};

const calculateExercises = (hours: Array<number>, target: number): ActivityInfo => {
  const periodLength = hours.length;
  const totalHours  = hours.reduce((a, b) => a + b, 0);
  const trainingDays = (hours.filter(h => h > 0)).length;
  const average: number = totalHours / periodLength;
  const calculateRating = (): Rating => {
    if (average >= target) {
      const rating: Rating = {
        rating: 3,
        description: 'Surpassed your target hours. Good job!'
      };
      return rating;
    } else if (trainingDays > (periodLength * 0.5))  {
      const rating: Rating = {
        rating: 2,
        description: 'You kept up with your schedule. Keep going!'
      };
      return rating;
    }

    const rating: Rating = {
      rating: 1,
      description: 'Improvements could be made. Try altering exercise frequency or target.'
    };

    return rating;
  };

  const rating : Rating = calculateRating();

  const activity: ActivityInfo = {
    periodLength,
    trainingDays,
    success: average > target,
    rating: rating.rating,
    ratingDescription: rating.description,
    target,
    average
  };
  return activity;
};

try {
  const {hours, target} = parseInput(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage);
}