import { Diagnosis } from "../types";

interface DiagnosisProps {
  diagnosis: Diagnosis;
}

const DiagnosisDetails = ( props: DiagnosisProps ) => {
  const { code, name } = props.diagnosis;
  return (
    <li>
      {code}: {name}
    </li>
  );
};

export default DiagnosisDetails;