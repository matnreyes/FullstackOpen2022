const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ total }) => <b>Total of {total} exercises</b>

const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.id} part={part}/>)}
        <Total total={parts.reduce((s, p) => s + p.exercises, 0)}/>
    </>


const Course = ({ course }) => 
    <>
        <h2>{course.name}</h2>
        <Content parts={course.parts} />
    </>

export default Course