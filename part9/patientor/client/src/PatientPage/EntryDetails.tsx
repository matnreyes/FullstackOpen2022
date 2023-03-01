import { Entry } from "../types";
import axios from "axios";

interface EntryProps {
  entry: Entry
}


const EntryDetails = (props: EntryProps) => {
  const { 
    date,
    description,
    diagnosisCodes
  } = props.entry;



  return (
    <div>
      <p>{date}: {description}</p>
      <ul>
        {diagnosisCodes?.map(code => 
          <li key={code}>
            {code}
          </li>
        )}
      </ul>
    </div>
  );
};

export default EntryDetails;