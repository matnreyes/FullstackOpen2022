import { CoursePart } from '../types';

interface PartProp {
  part: CoursePart;
}

const Part = (props: PartProp) => {
  switch(props.part.type) {
    case "normal": 
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong><br/>
          {props.part.description}
        </p>
      )
    case "groupProject":
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong><br/>
          Project exercises: {props.part.groupProjectCount}
        </p>
      )
    case "submission":
      return (
        <p>
          <strong>{props.part.name} {props.part.exerciseCount}</strong> <br/>
          {props.part.description} <br/>
          submit to {props.part.exerciseSubmissionLink}
        </p>
      )
  }
};

export default Part;