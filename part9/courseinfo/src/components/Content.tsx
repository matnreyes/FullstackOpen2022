import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part part={part} key={index}/>
      ))}
    </div>
  );
};

export default Content;