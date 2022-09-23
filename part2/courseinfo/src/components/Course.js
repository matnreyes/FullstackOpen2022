import Content from './Content'
import Header from './Header'

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.part}/>
        </>
    )

}

export default Course