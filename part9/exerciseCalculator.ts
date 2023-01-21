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

const calculateExercises = (hours: Array<number>, target: number): ActivityInfo => {
  // MUST calculate daily exercise hours
  // Compares it to the target amount of daily hours 
    /* 
      Returns an object that includes:
      - the number of days
      - the number of training days
      - the original target value
      - the calculated average time
      - boolean value describing if the target was reached
      - rating between 1-3 that tells how the hours are met
      - text value explaining the rating
    */
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
      }
      return rating;
    }

    const rating: Rating = {
      rating: 1,
      description: 'Improvements could be made. Try altering exercise frequency or target.'
    }

    return rating;
  }

  const rating : Rating = calculateRating()

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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))