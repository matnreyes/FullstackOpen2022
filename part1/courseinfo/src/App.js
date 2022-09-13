const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = (props) => (
  <>
    <p>
      {props.parts.part1.name} {props.parts.part1.exercises}
    </p>
    <p>
      {props.parts.part2.name} {props.parts.part2.exercises}
    </p>
    <p>
      {props.parts.part3.name} {props.parts.part3.exercises}
    </p>
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.total}</p>
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : {
      part1 : {
        name: 'Fundamentals of React',
        exercises: 10
      },
      part2 : {
        name: 'Using props to pass data',
        exercises: 7
      },
      part3: {
        name: 'State of a component',
        exercises: 14
      }
    }
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.part1.exercises + course.parts.part2.exercises + course.parts.part3.exercises} />
    </div>
  )
}

export default App