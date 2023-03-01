import { Entry } from "../types";
import { useStateValue } from "../state";

interface EntryProps {
  entry: Entry
}


const EntryDetails = (props: EntryProps) => {
  const [{ diagnosisInfo }] = useStateValue();
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
            {code}: {diagnosisInfo?.map(d => d.code === code && d.name)}
          </li>
        )}
      </ul>
    </div>
  );
};

export default EntryDetails;