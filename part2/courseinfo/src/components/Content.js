import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => 
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}  
        <Total total={parts.reduce((prevPart, part) => prevPart + part.exercises, 0)} />
    </>

export default Content