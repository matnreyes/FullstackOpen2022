import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// import AddHealthForm from "./AddHealthForm";
import AddHospitalForm from "./AddHospitalForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>New health check entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHospitalForm onSubmit={onSubmit} onCancel={onClose}/>
      {/* <AddHealthForm onSubmit={onSubmit} onCancel={onClose} /> */}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
