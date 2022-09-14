const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = (props) => {
  const Part = (partProp) => (
    <>
      <p>{partProp.part.name} {partProp.part.exercises}</p>
    </>
  ) 

  return (
    <>
      <Part part={props.parts.part1} />
      <Part part={props.parts.part2} />
      <Part part={props.parts.part3} />
    </>
  )
}

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