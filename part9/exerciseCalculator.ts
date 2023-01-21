interface ActivityInfo {
  days: number;
  trainingDays: number;
  targetTDays: number;
  averageTime: number;
  hitTarget: boolean;
  rating: number;
  ratingExpanded: string;
}

const calculateExercises = (hours: Array<string>): ActivityInfo => {
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
  const activity: ActivityInfo
  return activity
}