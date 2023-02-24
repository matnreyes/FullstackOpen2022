"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@material-ui/core");
const AddPatientModal_1 = __importDefault(require("../AddPatientModal"));
const constants_1 = require("../constants");
const HealthRatingBar_1 = __importDefault(require("../components/HealthRatingBar"));
const state_1 = require("../state");
const core_2 = require("@material-ui/core");
const core_3 = require("@material-ui/core");
const core_4 = require("@material-ui/core");
const PatientListPage = () => {
    const [{ patients }, dispatch] = (0, state_1.useStateValue)();
    const [modalOpen, setModalOpen] = react_1.default.useState(false);
    const [error, setError] = react_1.default.useState();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewPatient = (values) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { data: newPatient } = yield axios_1.default.post(`${constants_1.apiBaseUrl}/patients`, values);
            dispatch({ type: "ADD_PATIENT", payload: newPatient });
            closeModal();
        }
        catch (e) {
            if (axios_1.default.isAxiosError(e)) {
                console.error(((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) || "Unrecognized axios error");
                setError(String((_c = (_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || "Unrecognized axios error");
            }
            else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    });
    return (<div className="App">
      <core_1.Box>
        <core_1.Typography align="center" variant="h6">
          Patient list
        </core_1.Typography>
      </core_1.Box>
      <core_1.Table style={{ marginBottom: "1em" }}>
        <core_1.TableHead>
          <core_3.TableRow>
            <core_2.TableCell>Name</core_2.TableCell>
            <core_2.TableCell>Gender</core_2.TableCell>
            <core_2.TableCell>Occupation</core_2.TableCell>
            <core_2.TableCell>Health Rating</core_2.TableCell>
          </core_3.TableRow>
        </core_1.TableHead>
        <core_4.TableBody>
          {Object.values(patients).map((patient) => (<core_3.TableRow key={patient.id}>
              <core_2.TableCell>{patient.name}</core_2.TableCell>
              <core_2.TableCell>{patient.gender}</core_2.TableCell>
              <core_2.TableCell>{patient.occupation}</core_2.TableCell>
              <core_2.TableCell>
                <HealthRatingBar_1.default showText={false} rating={1}/>
              </core_2.TableCell>
            </core_3.TableRow>))}
        </core_4.TableBody>
      </core_1.Table>
      <AddPatientModal_1.default modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal}/>
      <core_1.Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </core_1.Button>
    </div>);
};
exports.default = PatientListPage;
