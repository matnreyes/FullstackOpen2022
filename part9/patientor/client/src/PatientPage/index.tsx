import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";

import { Typography } from "@material-ui/core";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import OtherIcon from "@mui/icons-material/TransgenderTwoTone";

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
      dispatch({ type: "SET_PATIENT", payload: patientDataFromAPI });
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

  return (
    <div>
      <Typography variant="h5">
        {viewedPatient.name} 
      {viewedPatient.gender === "male" ? <MaleIcon />
      : viewedPatient.gender === "female" ? <FemaleIcon />
      : <OtherIcon />
      }
      </Typography>
      <p>occupation: {viewedPatient.occupation}</p>
      <p>ssn: {viewedPatient.ssn}</p>
    </div>
  );
};

export default PatientPage;