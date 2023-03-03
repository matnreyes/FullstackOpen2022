import { setPatient, updateEntries, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useState } from 'react';
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

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


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
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(String(e?.response?.data));
      }
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
      <Button variant="contained" color={"primary"} onClick={() => openModal()}>add new entry</Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitEntry}
        error={error}
      />
    </div>
  );
};

export default PatientPage;