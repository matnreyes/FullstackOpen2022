import { Entry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import assertNever from "assert-never";
import { Favorite, MedicalInformation, Work, Spa } from '@mui/icons-material';

interface EntryDetailsProps {
  entry: Entry;
}

interface HospitalProps {
  discharge: {
    date: string,
    criteria: string
  };
}

const HospitalEntry = ({ discharge }: HospitalProps) => {
  return (
    <div>
      <strong>Discharge: </strong><br />
      {discharge.date}: {discharge.criteria}
    </div>
  );
};

interface OccupationalProps {
  sickLeave: {
    startDate: string,
    endDate: string,
  } | undefined;
  employerName: string;
}

const OccupationalHealthEntry = ({ employerName, sickLeave }: OccupationalProps) => {
  return (
    <div>
      {sickLeave &&
        <div>
          <strong>Sick leave:</strong> <br />
          {sickLeave.startDate} - {sickLeave.endDate}
        </div>
      }
      <strong>Employer:</strong> <br />
      {employerName}
    </div>
  );
};

interface HealthProps {
  healthCheckRating: HealthCheckRating;
}

const HealthEntry = ({ healthCheckRating }: HealthProps) => {
  switch (healthCheckRating) {
    case 0:
      return <Favorite sx={({ color: "green" })}/>;
    case 1: 
      return <Favorite sx={({ color: "yellow" })}/>;
    case 2:
      return <Favorite sx={({ color: "orange" })}/>;
    case 3:
      return <Favorite sx={({ color: "red" })}/>;
    default:
        return <div></div>;
  }
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const [{ diagnosisInfo }] = useStateValue();

  const entrySwitch = () => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry discharge={entry.discharge} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthEntry sickLeave={entry.sickLeave} employerName={entry.employerName}/>;
      case "HealthCheck":
        return <HealthEntry healthCheckRating={entry.healthCheckRating} />;
      default:
        return assertNever(entry);
    }
  };

  const iconSwitch = () => {
    switch (entry.type) {
      case "Hospital":
        return <MedicalInformation />;
      case "OccupationalHealthcare":
        return <Work />;
      case "HealthCheck":
        return <Spa />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      {entry.date} {iconSwitch()} <br />
      <i>{entry.description}</i><br/>    
      {entrySwitch()}
      {entry.diagnosisCodes && 
        <div>
          <strong>Diagnoses:</strong>
          <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>{code}: {diagnosisInfo?.map(d => d.code === code && d.name)}</li>
          )}
          </ul>  
        </div>
      }
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default EntryDetails;