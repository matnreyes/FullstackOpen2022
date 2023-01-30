import { Part } from '../types';

interface ContentProps {
  parts: Array<Part>;
}

const Content = (props: ContentProps) => {
  return (
    <ul>
      {props.parts.map((part, index) => (
        <li key={index}> {part.name}: {part.exerciseCount} </li>
      ))}
    </ul>
  );
};

export default Content;