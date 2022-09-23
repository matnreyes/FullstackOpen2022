const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ total }) => <b>Total of {total} exercises</b>

const Content = ({ course }) =>
    <>
        <h2>{course.name}</h2>
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
        <Total total={course.parts.reduce((s, p) => s + p.exercises, 0)}/>
    </>

export default Content