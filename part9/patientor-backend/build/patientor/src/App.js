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
const react_router_dom_1 = require("react-router-dom");
const core_1 = require("@material-ui/core");
const constants_1 = require("./constants");
const state_1 = require("./state");
const PatientListPage_1 = __importDefault(require("./PatientListPage"));
const core_2 = require("@material-ui/core");
const App = () => {
    const [, dispatch] = (0, state_1.useStateValue)();
    react_1.default.useEffect(() => {
        void axios_1.default.get(`${constants_1.apiBaseUrl}/ping`);
        const fetchPatientList = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data: patientListFromApi } = yield axios_1.default.get(`${constants_1.apiBaseUrl}/patients`);
                dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
            }
            catch (e) {
                console.error(e);
            }
        });
        void fetchPatientList();
    }, [dispatch]);
    return (<div className="App">
      <react_router_dom_1.BrowserRouter>
        <core_1.Container>
          <core_2.Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </core_2.Typography>
          <core_1.Button component={react_router_dom_1.Link} to="/" variant="contained" color="primary">
            Home
          </core_1.Button>
          <core_1.Divider hidden/>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<PatientListPage_1.default />}/>
          </react_router_dom_1.Routes>
        </core_1.Container>
      </react_router_dom_1.BrowserRouter>
    </div>);
};
exports.default = App;
