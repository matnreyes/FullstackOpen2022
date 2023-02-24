"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const lab_1 = require("@material-ui/lab");
const AddPatientForm_1 = __importDefault(require("./AddPatientForm"));
const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }) => (<core_1.Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <core_1.DialogTitle>Add a new patient</core_1.DialogTitle>
    <core_1.Divider />
    <core_1.DialogContent>
      {error && <lab_1.Alert severity="error">{`Error: ${error}`}</lab_1.Alert>}
      <AddPatientForm_1.default onSubmit={onSubmit} onCancel={onClose}/>
    </core_1.DialogContent>
  </core_1.Dialog>);
exports.default = AddPatientModal;
