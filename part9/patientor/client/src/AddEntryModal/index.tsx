import { Dialog, DialogTitle, DialogContent, Divider, ButtonGroup, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import AddHealthForm from "./AddHealthForm";
import AddOccupationalForm from "./AddOccupationalForm";
import AddHospitalForm from "./AddHospitalForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  error?: string;
}

interface ButtonProps {
  setForm: (value: string) => void;
}

const EntryButtonGroup = ({ setForm }: ButtonProps) => {
  console.log(setForm);
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => setForm("HealthCheck")}>Health check</Button>
      <Button onClick={() => setForm("OccupationalHealthcare")}>Occupation</Button>
      <Button onClick={() => setForm("Hospital")}>Hospital</Button>
    </ButtonGroup>
  );
};

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => { 
  const [formType, setFormType] = useState<string>("");

  const setForm = (buttonType: string) => {
    setFormType(buttonType);
  };

  const clearForm = () => {
    setFormType("");
    onClose();
  };

  const entryFormSwitch = () => {
    switch (formType) {
      case "Hospital":
        return <AddHospitalForm onSubmit={onSubmit} onCancel={clearForm}/>;
      case "OccupationalHealthcare":
        return <AddOccupationalForm onSubmit={onSubmit} onCancel={clearForm}/>;
      case "HealthCheck":
        return <AddHealthForm onSubmit={onSubmit} onCancel={clearForm} />;
      default:
        return <EntryButtonGroup setForm={setForm} />;
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>New health check entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        {entryFormSwitch()}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
