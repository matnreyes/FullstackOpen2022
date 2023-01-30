import { CoursePart } from './types';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
  },
  {
    type: "normal",
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part"
  },
  {
    type: "groupProject",
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    type: "submission",
    name: "Deeper type usage",
    description: "Confusing description",
    exerciseSubmissionLink: "http://fake-exercise-submission.made-up-url.dev",
    exerciseCount: 14
  },
  {
    type: "special",
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"]
  }
]

const App = () => {
    return (
    <div>
      <Header name="Half Stack application development"/>
      <Content parts={courseParts}/>
      <Total total={courseParts.reduce((a, b) => b.exerciseCount + a, 0)}/>
    </div>
  );
};

export default App;
