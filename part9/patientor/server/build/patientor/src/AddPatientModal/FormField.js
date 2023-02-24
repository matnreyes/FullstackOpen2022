"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisSelection = exports.NumberField = exports.TextField = exports.SelectField = void 0;
const react_1 = __importStar(require("react"));
const formik_1 = require("formik");
const core_1 = require("@material-ui/core");
const core_2 = require("@material-ui/core");
const Input_1 = __importDefault(require("@material-ui/core/Input"));
const FormikSelect = (_a) => {
    var { field } = _a, props = __rest(_a, ["field"]);
    return <core_1.Select {...field} {...props}/>;
};
const SelectField = ({ name, label, options }) => (<>
    <core_2.InputLabel>{label}</core_2.InputLabel>
    <formik_1.Field fullWidth style={{ marginBottom: "0.5em" }} label={label} component={FormikSelect} name={name}>
      {options.map((option) => (<core_1.MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </core_1.MenuItem>))}
    </formik_1.Field>
  </>);
exports.SelectField = SelectField;
const TextField = ({ field, label, placeholder }) => (<div style={{ marginBottom: "1em" }}>
    <core_1.TextField fullWidth label={label} placeholder={placeholder} {...field}/>
    <core_1.Typography variant="subtitle2" style={{ color: "red" }}>
      <formik_1.ErrorMessage name={field.name}/>
    </core_1.Typography>
  </div>);
exports.TextField = TextField;
const NumberField = ({ field, label, min, max }) => {
    const [value, setValue] = (0, react_1.useState)();
    return (<div style={{ marginBottom: "1em" }}>
      <core_1.TextField fullWidth label={label} placeholder={String(min)} type="number" {...field} value={value} onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value === undefined)
                return;
            if (value > max)
                setValue(max);
            else if (value <= min)
                setValue(min);
            else
                setValue(Math.floor(value));
        }}/>
      <core_1.Typography variant="subtitle2" style={{ color: "red" }}>
        <formik_1.ErrorMessage name={field.name}/>
      </core_1.Typography>
    </div>);
};
exports.NumberField = NumberField;
const DiagnosisSelection = ({ diagnoses, setFieldValue, setFieldTouched, }) => {
    const [selectedDiagnoses, setDiagnoses] = (0, react_1.useState)([]);
    const field = "diagnosisCodes";
    const onChange = (data) => {
        setDiagnoses([...data]);
        setFieldTouched(field, true);
        setFieldValue(field, selectedDiagnoses);
    };
    const stateOptions = diagnoses.map((diagnosis) => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code,
    }));
    return (<core_1.FormControl style={{ width: 552, marginBottom: '30px' }}>
      <core_2.InputLabel>Diagnoses</core_2.InputLabel>
      <core_1.Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value)} input={<Input_1.default />}>
        {stateOptions.map((option) => (<core_1.MenuItem key={option.key} value={option.value}>
            {option.text}
          </core_1.MenuItem>))}
      </core_1.Select>
      <formik_1.ErrorMessage name={field}/>
    </core_1.FormControl>);
};
exports.DiagnosisSelection = DiagnosisSelection;
