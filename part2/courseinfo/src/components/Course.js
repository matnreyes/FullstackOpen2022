import Part from './Part'
import Total from './Total'

const Course = ({ course }) =>
        <>
            <h2>{course.name}</h2>
            {course.parts.map(part => <Part key={part.id} part={part}/>)}
            <Total total={course.parts.reduce((s, p) => s + p.exercises, 0)}/>
        </>

export default Course