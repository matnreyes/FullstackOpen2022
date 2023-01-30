import { Course } from './types';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
  const course: Course = {
    name: "Half Stack application development",
    parts: [{
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }]
  };

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((a, b) => b.exerciseCount + a, 0)}/>
    </div>
  );
};

export default App;
