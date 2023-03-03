import { setPatient, updateEntries, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";

import { CardContent, Typography, Card, Button } from "@material-ui/core";
import EntryDetails from "./EntryDetails";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import OtherIcon from "@mui/icons-material/TransgenderTwoTone";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div>
        Missing id
      </div>
    );
  }

  const fetchPatient = async (patientId: string) => {
    try {
      const { data: patientDataFromAPI } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
      dispatch(setPatient(patientDataFromAPI));
    } catch (e) {
      console.log(e);
    }
  };

  if (!patient || (id !== patient.id)) {
    void fetchPatient(id);
  }

  const [{ patient: viewedPatient }] = useStateValue();

  if (!viewedPatient) {
    return (
      <div>
        Invalid patient
      </div>
    );
  }

  const entries = viewedPatient.entries;

  const genderIconSwitch = () => {
    switch (viewedPatient.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default: 
        return <OtherIcon />;
    }
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${viewedPatient.id}/entries`, { entry: values });

      dispatch(updateEntries(updatedPatient));
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return (
    <div style={({ paddingTop: 20 })}>
      <Typography variant="h5">
        {viewedPatient.name} {genderIconSwitch()}
      </Typography> 
      <p>occupation: {viewedPatient.occupation}</p>
      <p>ssn: {viewedPatient.ssn}</p>
      <Typography variant="h6">entries</Typography>
      {entries.map(entry => 
        <Card key={entry.id} variant="outlined">
          <CardContent>
            <EntryDetails entry={entry} />
          </CardContent>
        </Card>
      )}
      <Button variant="contained" color={"primary"}>add new entry</Button>
      <AddEntryModal modalOpen={true} onClose={() => { console.log('hello');}} onSubmit={submitEntry} />
    </div>
  );
};

export default PatientPage;