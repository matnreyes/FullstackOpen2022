import Content from './Content'

const Course = ({ courses }) => 
    <>
        {courses.map(course => <Content key={course.id} course={course}/>)}
    </>

export default Course